<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Retrieve all published projects with optional category and featured filtering.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Project::published();

        if ($request->has('category') && ! empty($request->input('category'))) {
            $query->where('category', $request->input('category'));
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        $projects = $query->get();

        return response()->json([
            'success' => true,
            'data' => $projects,
        ], 200);
    }

    /**
     * Retrieve single published project case study by slug.
     */
    public function show(string $slug): JsonResponse
    {
        $project = Project::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $project,
        ], 200);
    }
}
