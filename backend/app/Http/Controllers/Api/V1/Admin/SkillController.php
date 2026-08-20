<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ReorderSkillsRequest;
use App\Http\Requests\Admin\StoreSkillRequest;
use App\Models\AuditLog;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SkillController extends Controller
{
    /**
     * Create a new Technical Skill under a category.
     */
    public function store(StoreSkillRequest $request): JsonResponse
    {
        $skill = Skill::create($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'created_skill',
            'entity_type' => Skill::class,
            'entity_id' => (string) $skill->id,
            'description' => "Added technical skill: {$skill->name}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Technical skill created successfully.',
            'data' => $skill->load('category'),
        ], 201);
    }

    /**
     * Update an existing Technical Skill.
     */
    public function update(StoreSkillRequest $request, $id): JsonResponse
    {
        $skill = Skill::findOrFail($id);
        $skill->update($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'updated_skill',
            'entity_type' => Skill::class,
            'entity_id' => (string) $skill->id,
            'description' => "Updated technical skill: {$skill->name}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Technical skill updated successfully.',
            'data' => $skill->fresh()->load('category'),
        ], 200);
    }

    /**
     * Delete a Technical Skill.
     */
    public function destroy(Request $request, $id): JsonResponse
    {
        $skill = Skill::findOrFail($id);
        $name = $skill->name;
        $skill->delete();

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'deleted_skill',
            'entity_type' => Skill::class,
            'entity_id' => (string) $id,
            'description' => "Deleted technical skill: {$name}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Technical skill deleted successfully.',
        ], 200);
    }

    /**
     * Batch reorder skills display sequence.
     */
    public function reorder(ReorderSkillsRequest $request): JsonResponse
    {
        DB::transaction(function () use ($request) {
            foreach ($request->input('orders') as $item) {
                Skill::where('id', $item['id'])->update(['display_order' => $item['display_order']]);
            }
        });

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'reordered_skills',
            'entity_type' => Skill::class,
            'description' => 'Reordered technical skill priorities and display order.',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Skills display order updated successfully.',
        ], 200);
    }
}
