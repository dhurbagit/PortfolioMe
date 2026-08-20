<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateReviewRequest;
use App\Models\AuditLog;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * List all reviews for moderation and curation.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Review::orderBy('display_order')->latest();

        if ($request->has('approved')) {
            $query->where('is_approved', $request->boolean('approved'));
        }

        $reviews = $query->get();

        return response()->json([
            'success' => true,
            'data' => $reviews,
        ], 200);
    }

    /**
     * Retrieve single review for inspection.
     */
    public function show($id): JsonResponse
    {
        $review = Review::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $review,
        ], 200);
    }

    /**
     * Update review details (e.g. fix typos, toggle verification).
     */
    public function update(UpdateReviewRequest $request, $id): JsonResponse
    {
        $review = Review::findOrFail($id);
        $review->update($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'updated_review',
            'entity_type' => Review::class,
            'entity_id' => (string) $review->id,
            'description' => "Updated review by: {$review->reviewer_name}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Review updated successfully.',
            'data' => $review->fresh(),
        ], 200);
    }

    /**
     * Toggle review approval status.
     */
    public function toggleApproval(Request $request, $id): JsonResponse
    {
        $review = Review::findOrFail($id);
        $review->is_approved = ! $review->is_approved;
        $review->save();

        $status = $review->is_approved ? 'approved' : 'unapproved';

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'toggled_review_approval',
            'entity_type' => Review::class,
            'entity_id' => (string) $review->id,
            'description' => "Review by {$review->reviewer_name} was marked as {$status}.",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => "Review {$status} successfully.",
            'data' => [
                'id' => $review->id,
                'is_approved' => $review->is_approved,
            ],
        ], 200);
    }

    /**
     * Delete review.
     */
    public function destroy(Request $request, $id): JsonResponse
    {
        $review = Review::findOrFail($id);
        $reviewer = $review->reviewer_name;
        $review->delete();

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'deleted_review',
            'entity_type' => Review::class,
            'entity_id' => (string) $id,
            'description' => "Deleted review by: {$reviewer}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Review deleted successfully.',
        ], 200);
    }
}
