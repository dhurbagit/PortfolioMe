<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubmitContactRequest;
use App\Models\AuditLog;
use App\Models\ContactSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class ContactController extends Controller
{
    /**
     * Handle incoming visitor contact messages with honeypot and rate limiting.
     */
    public function store(SubmitContactRequest $request): JsonResponse
    {
        $throttleKey = 'contact-submission|' . $request->ip();

        // Limit: 5 messages per 10 minutes (600s)
        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);

            return response()->json([
                'success' => false,
                'message' => "Too many messages sent. Please wait {$seconds} seconds before sending another message.",
                'retry_after' => $seconds,
            ], 429);
        }

        RateLimiter::hit($throttleKey, 600);

        // Anti-spam Honeypot Check
        if ($request->filled('website_hp')) {
            // Silently drop bot submission
            return response()->json([
                'success' => true,
                'message' => 'Your message has been delivered to Dhurba Dhakal.',
            ], 200);
        }

        $submission = ContactSubmission::create([
            'sender_name' => $request->input('sender_name'),
            'sender_email' => $request->input('sender_email'),
            'sender_phone' => $request->input('sender_phone'),
            'subject' => $request->input('subject'),
            'message' => $request->input('message'),
            'status' => 'unread',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        AuditLog::create([
            'user_id' => null,
            'action' => 'submitted_contact_inquiry',
            'entity_type' => ContactSubmission::class,
            'entity_id' => (string) $submission->id,
            'description' => "Inquiry received from {$submission->sender_name} ({$submission->sender_email}): {$submission->subject}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thank you! Your message has been delivered to Dhurba Dhakal. I will get back to you shortly.',
            'data' => [
                'id' => $submission->id,
                'sender_name' => $submission->sender_name,
                'subject' => $submission->subject,
                'created_at' => $submission->created_at->toIso8601String(),
            ],
        ], 201);
    }
}
