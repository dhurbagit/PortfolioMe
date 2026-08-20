<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubmitReviewRequest;
use App\Models\AuditLog;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Retrieve all approved reviews and testimonials.
     */
    public function index(): JsonResponse
    {
        $reviews = Review::approved()->get();

        return response()->json([
            'success' => true,
            'data' => $reviews,
        ], 200);
    }

    /**
     * Submit visitor or client feedback.
     */
    public function store(SubmitReviewRequest $request): JsonResponse
    {
        $review = Review::create([
            'reviewer_name' => $request->input('name'),
            'reviewer_role' => $request->input('role', 'Verified Client'),
            'company_or_context' => $request->input('company', 'Independent Collaborator'),
            'service_used' => $request->input('service_used'),
            'rating' => $request->input('rating'),
            'comment' => $request->input('comment'),
            'display_date' => 'Recent Feedback',
            'is_verified' => true,
            'is_approved' => true, // Approved and immediately visible
            'likes_count' => 1,
            'display_order' => 0,
        ]);

        AuditLog::create([
            'user_id' => null,
            'action' => 'submitted_client_review',
            'entity_type' => Review::class,
            'entity_id' => (string) $review->id,
            'description' => "New review submitted by {$review->reviewer_name} ({$review->rating} stars).",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thank you! Your feedback has been verified and recorded.',
            'data' => $review,
        ], 201);
    }

    /**
     * Increment like / helpful counter for a review.
     */
    public function like(Request $request, $id): JsonResponse
    {
        $review = Review::findOrFail($id);
        $review->increment('likes_count');

        return response()->json([
            'success' => true,
            'message' => 'Helpful vote recorded.',
            'data' => [
                'id' => $review->id,
                'likes_count' => $review->likes_count,
            ],
        ], 200);
    }
}
