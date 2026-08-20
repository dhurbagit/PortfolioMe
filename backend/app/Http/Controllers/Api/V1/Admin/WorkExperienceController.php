<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreWorkExperienceRequest;
use App\Models\AuditLog;
use App\Models\WorkExperience;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WorkExperienceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $experiences = WorkExperience::orderBy('display_order')->get();

        return response()->json([
            'success' => true,
            'data' => $experiences,
        ], 200);
    }

    public function store(StoreWorkExperienceRequest $request): JsonResponse
    {
        $experience = WorkExperience::create($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'created_work_experience',
            'entity_type' => WorkExperience::class,
            'entity_id' => (string) $experience->id,
            'description' => "Added work experience: {$experience->position} at {$experience->company_name}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Work experience record created successfully.',
            'data' => $experience,
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $experience = WorkExperience::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $experience,
        ], 200);
    }

    public function update(StoreWorkExperienceRequest $request, $id): JsonResponse
    {
        $experience = WorkExperience::findOrFail($id);
        $experience->update($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'updated_work_experience',
            'entity_type' => WorkExperience::class,
            'entity_id' => (string) $experience->id,
            'description' => "Updated work experience: {$experience->position} at {$experience->company_name}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Work experience record updated successfully.',
            'data' => $experience->fresh(),
        ], 200);
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        $experience = WorkExperience::findOrFail($id);
        $name = "{$experience->position} at {$experience->company_name}";
        $experience->delete();

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'deleted_work_experience',
            'entity_type' => WorkExperience::class,
            'entity_id' => (string) $id,
            'description' => "Deleted work experience: {$name}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Work experience record deleted successfully.',
        ], 200);
    }
}
