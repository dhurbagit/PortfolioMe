<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePhilosophyRequest;
use App\Models\AuditLog;
use App\Models\Philosophy;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PhilosophyController extends Controller
{
    public function index(): JsonResponse
    {
        $philosophies = Philosophy::orderBy('display_order')->get();

        return response()->json([
            'success' => true,
            'data' => $philosophies,
        ], 200);
    }

    public function store(StorePhilosophyRequest $request): JsonResponse
    {
        $philosophy = Philosophy::create($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'created_philosophy',
            'entity_type' => Philosophy::class,
            'entity_id' => (string) $philosophy->id,
            'description' => "Added development philosophy: {$philosophy->title}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Development philosophy principle created successfully.',
            'data' => $philosophy,
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $philosophy = Philosophy::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $philosophy,
        ], 200);
    }

    public function update(StorePhilosophyRequest $request, $id): JsonResponse
    {
        $philosophy = Philosophy::findOrFail($id);
        $philosophy->update($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'updated_philosophy',
            'entity_type' => Philosophy::class,
            'entity_id' => (string) $philosophy->id,
            'description' => "Updated development philosophy: {$philosophy->title}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Development philosophy principle updated successfully.',
            'data' => $philosophy->fresh(),
        ], 200);
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        $philosophy = Philosophy::findOrFail($id);
        $title = $philosophy->title;
        $philosophy->delete();

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'deleted_philosophy',
            'entity_type' => Philosophy::class,
            'entity_id' => (string) $id,
            'description' => "Deleted development philosophy: {$title}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Development philosophy principle deleted successfully.',
        ], 200);
    }
}
