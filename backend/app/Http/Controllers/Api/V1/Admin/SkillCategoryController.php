<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreSkillCategoryRequest;
use App\Models\AuditLog;
use App\Models\SkillCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SkillCategoryController extends Controller
{
    /**
     * Retrieve all skill categories with full relational skills.
     */
    public function index(Request $request): JsonResponse
    {
        $categories = SkillCategory::orderBy('display_order')->with('skills')->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ], 200);
    }

    /**
     * Create a new Skill Category.
     */
    public function store(StoreSkillCategoryRequest $request): JsonResponse
    {
        $category = SkillCategory::create($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'created_skill_category',
            'entity_type' => SkillCategory::class,
            'entity_id' => (string) $category->id,
            'description' => "Created skill category: {$category->name}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Skill category created successfully.',
            'data' => $category,
        ], 201);
    }

    /**
     * Update an existing Skill Category.
     */
    public function update(StoreSkillCategoryRequest $request, $id): JsonResponse
    {
        $category = SkillCategory::findOrFail($id);
        $category->update($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'updated_skill_category',
            'entity_type' => SkillCategory::class,
            'entity_id' => (string) $category->id,
            'description' => "Updated skill category: {$category->name}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Skill category updated successfully.',
            'data' => $category->fresh(),
        ], 200);
    }

    /**
     * Delete a Skill Category and cascade delete associated skills.
     */
    public function destroy(Request $request, $id): JsonResponse
    {
        $category = SkillCategory::findOrFail($id);
        $name = $category->name;
        $category->delete();

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'deleted_skill_category',
            'entity_type' => SkillCategory::class,
            'entity_id' => (string) $id,
            'description' => "Deleted skill category: {$name}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Skill category deleted successfully.',
        ], 200);
    }
}
