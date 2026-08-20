<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateContactStatusRequest;
use App\Models\AuditLog;
use App\Models\ContactSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InboxController extends Controller
{
    /**
     * List contact inquiries with status filtering.
     */
    public function index(Request $request): JsonResponse
    {
        $query = ContactSubmission::latest();

        if ($request->has('status') && ! empty($request->input('status'))) {
            $query->where('status', $request->input('status'));
        }

        $submissions = $query->get();

        return response()->json([
            'success' => true,
            'data' => $submissions,
        ], 200);
    }

    /**
     * View single contact inquiry detail and auto-mark as read.
     */
    public function show(Request $request, $id): JsonResponse
    {
        $submission = ContactSubmission::findOrFail($id);

        if ($submission->status === 'unread') {
            $submission->update(['status' => 'read']);
        }

        return response()->json([
            'success' => true,
            'data' => $submission->fresh(),
        ], 200);
    }

    /**
     * Update inquiry processing status (unread, read, replied, archived).
     */
    public function updateStatus(UpdateContactStatusRequest $request, $id): JsonResponse
    {
        $submission = ContactSubmission::findOrFail($id);
        $newStatus = $request->input('status');
        $submission->update(['status' => $newStatus]);

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'updated_inquiry_status',
            'entity_type' => ContactSubmission::class,
            'entity_id' => (string) $submission->id,
            'description' => "Updated inquiry #{$submission->id} from {$submission->sender_name} to status: {$newStatus}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => "Inquiry marked as {$newStatus}.",
            'data' => $submission->fresh(),
        ], 200);
    }

    /**
     * Delete contact inquiry.
     */
    public function destroy(Request $request, $id): JsonResponse
    {
        $submission = ContactSubmission::findOrFail($id);
        $name = $submission->sender_name;
        $submission->delete();

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'deleted_inquiry',
            'entity_type' => ContactSubmission::class,
            'entity_id' => (string) $id,
            'description' => "Deleted inquiry from {$name}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Contact inquiry deleted successfully.',
        ], 200);
    }
}
