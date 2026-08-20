<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreDesignExperienceRequest;
use App\Models\AuditLog;
use App\Models\DesignExperience;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DesignExperienceController extends Controller
{
    public function index(): JsonResponse
    {
        $designs = DesignExperience::orderBy('display_order')->get();

        return response()->json([
            'success' => true,
            'data' => $designs,
        ], 200);
    }

    public function store(StoreDesignExperienceRequest $request): JsonResponse
    {
        $design = DesignExperience::create($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'created_design_experience',
            'entity_type' => DesignExperience::class,
            'entity_id' => (string) $design->id,
            'description' => "Added design experience: {$design->title}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Design experience created successfully.',
            'data' => $design,
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $design = DesignExperience::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $design,
        ], 200);
    }

    public function update(StoreDesignExperienceRequest $request, $id): JsonResponse
    {
        $design = DesignExperience::findOrFail($id);
        $design->update($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'updated_design_experience',
            'entity_type' => DesignExperience::class,
            'entity_id' => (string) $design->id,
            'description' => "Updated design experience: {$design->title}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Design experience updated successfully.',
            'data' => $design->fresh(),
        ], 200);
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        $design = DesignExperience::findOrFail($id);
        $title = $design->title;
        $design->delete();

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'deleted_design_experience',
            'entity_type' => DesignExperience::class,
            'entity_id' => (string) $id,
            'description' => "Deleted design experience: {$title}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Design experience deleted successfully.',
        ], 200);
    }
}
