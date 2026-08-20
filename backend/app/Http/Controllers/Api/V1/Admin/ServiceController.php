<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreServiceRequest;
use App\Models\AuditLog;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(): JsonResponse
    {
        $services = Service::orderBy('display_order')->get();

        return response()->json([
            'success' => true,
            'data' => $services,
        ], 200);
    }

    public function store(StoreServiceRequest $request): JsonResponse
    {
        $service = Service::create($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'created_service',
            'entity_type' => Service::class,
            'entity_id' => (string) $service->id,
            'description' => "Added service: {$service->title}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Service offering created successfully.',
            'data' => $service,
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $service = Service::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $service,
        ], 200);
    }

    public function update(StoreServiceRequest $request, $id): JsonResponse
    {
        $service = Service::findOrFail($id);
        $service->update($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'updated_service',
            'entity_type' => Service::class,
            'entity_id' => (string) $service->id,
            'description' => "Updated service: {$service->title}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Service offering updated successfully.',
            'data' => $service->fresh(),
        ], 200);
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        $service = Service::findOrFail($id);
        $title = $service->title;
        $service->delete();

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'deleted_service',
            'entity_type' => Service::class,
            'entity_id' => (string) $id,
            'description' => "Deleted service: {$title}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Service offering deleted successfully.',
        ], 200);
    }
}
