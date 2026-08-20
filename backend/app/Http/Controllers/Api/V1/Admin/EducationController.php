<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreEducationRequest;
use App\Models\AuditLog;
use App\Models\Education;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    public function index(): JsonResponse
    {
        $educations = Education::orderBy('display_order')->get();

        return response()->json([
            'success' => true,
            'data' => $educations,
        ], 200);
    }

    public function store(StoreEducationRequest $request): JsonResponse
    {
        $education = Education::create($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'created_education',
            'entity_type' => Education::class,
            'entity_id' => (string) $education->id,
            'description' => "Added education record: {$education->degree} at {$education->institution}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Education record created successfully.',
            'data' => $education,
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $education = Education::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $education,
        ], 200);
    }

    public function update(StoreEducationRequest $request, $id): JsonResponse
    {
        $education = Education::findOrFail($id);
        $education->update($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'updated_education',
            'entity_type' => Education::class,
            'entity_id' => (string) $education->id,
            'description' => "Updated education record: {$education->degree} at {$education->institution}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Education record updated successfully.',
            'data' => $education->fresh(),
        ], 200);
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        $education = Education::findOrFail($id);
        $name = "{$education->degree} at {$education->institution}";
        $education->delete();

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'deleted_education',
            'entity_type' => Education::class,
            'entity_id' => (string) $id,
            'description' => "Deleted education record: {$name}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Education record deleted successfully.',
        ], 200);
    }
}
