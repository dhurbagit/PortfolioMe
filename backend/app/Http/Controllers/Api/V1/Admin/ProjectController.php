<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ReorderProjectsRequest;
use App\Http\Requests\Admin\StoreProjectRequest;
use App\Models\AuditLog;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    /**
     * Retrieve all projects (including drafts) for the CMS administrator.
     */
    public function index(Request $request): JsonResponse
    {
        $projects = Project::orderBy('display_order')->get();

        return response()->json([
            'success' => true,
            'data' => $projects,
        ], 200);
    }

    /**
     * Create a new project case study.
     */
    public function store(StoreProjectRequest $request): JsonResponse
    {
        $project = Project::create($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'created_project',
            'entity_type' => Project::class,
            'entity_id' => (string) $project->id,
            'description' => "Created project case study: {$project->title}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Project created successfully.',
            'data' => $project,
        ], 201);
    }

    /**
     * Retrieve a single project for editing.
     */
    public function show($id): JsonResponse
    {
        $project = Project::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $project,
        ], 200);
    }

    /**
     * Update an existing project case study.
     */
    public function update(StoreProjectRequest $request, $id): JsonResponse
    {
        $project = Project::findOrFail($id);
        $project->update($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'updated_project',
            'entity_type' => Project::class,
            'entity_id' => (string) $project->id,
            'description' => "Updated project: {$project->title}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Project updated successfully.',
            'data' => $project->fresh(),
        ], 200);
    }

    /**
     * Delete a project.
     */
    public function destroy(Request $request, $id): JsonResponse
    {
        $project = Project::findOrFail($id);
        $title = $project->title;
        $project->delete();

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'deleted_project',
            'entity_type' => Project::class,
            'entity_id' => (string) $id,
            'description' => "Deleted project: {$title}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully.',
        ], 200);
    }

    /**
     * Toggle the publishing status of a project.
     */
    public function togglePublish(Request $request, $id): JsonResponse
    {
        $project = Project::findOrFail($id);
        $project->is_published = ! $project->is_published;
        $project->save();

        $statusLabel = $project->is_published ? 'published' : 'unpublished';

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'toggled_project_status',
            'entity_type' => Project::class,
            'entity_id' => (string) $project->id,
            'description' => "Project {$project->title} was {$statusLabel}.",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => "Project {$statusLabel} successfully.",
            'data' => [
                'id' => $project->id,
                'is_published' => $project->is_published,
            ],
        ], 200);
    }

    /**
     * Batch reorder project display sequence.
     */
    public function reorder(ReorderProjectsRequest $request): JsonResponse
    {
        DB::transaction(function () use ($request) {
            foreach ($request->input('orders') as $item) {
                Project::where('id', $item['id'])->update(['display_order' => $item['display_order']]);
            }
        });

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'reordered_projects',
            'entity_type' => Project::class,
            'description' => 'Reordered projects showcase display sequence.',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Projects display sequence updated successfully.',
        ], 200);
    }
}
