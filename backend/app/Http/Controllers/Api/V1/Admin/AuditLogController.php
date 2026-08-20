<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuditLogController extends Controller
{
    /**
     * List audit logs with action and search filtering.
     */
    public function index(Request $request): JsonResponse
    {
        $query = AuditLog::with('user:id,name,email')->latest();

        if ($request->has('action') && ! empty($request->input('action'))) {
            $query->where('action', $request->input('action'));
        }

        if ($request->has('search') && ! empty($request->input('search'))) {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('description', 'like', "%{$searchTerm}%")
                    ->orWhere('ip_address', 'like', "%{$searchTerm}%")
                    ->orWhere('action', 'like', "%{$searchTerm}%");
            });
        }

        $logs = $query->take(100)->get();

        return response()->json([
            'success' => true,
            'data' => $logs,
        ], 200);
    }

    /**
     * Purge historical audit logs older than 30 days.
     */
    public function purge(Request $request): JsonResponse
    {
        $days = $request->input('older_than_days', 30);
        $deletedCount = AuditLog::where('created_at', '<', now()->subDays($days))->delete();

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'purged_audit_logs',
            'entity_type' => AuditLog::class,
            'description' => "Purged {$deletedCount} historical audit logs older than {$days} days.",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => "Successfully purged {$deletedCount} older audit log records.",
            'deleted_count' => $deletedCount,
        ], 200);
    }
}
