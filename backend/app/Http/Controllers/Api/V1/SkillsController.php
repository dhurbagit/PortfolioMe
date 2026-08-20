<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\SkillCategory;
use Illuminate\Http\JsonResponse;

class SkillsController extends Controller
{
    /**
     * Retrieve public Technical Skills Matrix structured by category.
     */
    public function index(): JsonResponse
    {
        $categories = SkillCategory::where('is_visible', true)
            ->orderBy('display_order')
            ->with(['skills' => function ($query) {
                $query->where('is_visible', true)->orderBy('display_order');
            }])
            ->get()
            ->map(function ($cat) {
                return [
                    'id' => $cat->id,
                    'name' => $cat->name,
                    'slug' => $cat->slug,
                    'icon_key' => $cat->icon_key,
                    'description' => $cat->description,
                    'philosophy_highlights' => $cat->philosophy_highlights ?? [],
                    'skills' => $cat->skills->map(function ($skill) {
                        return [
                            'id' => $skill->id,
                            'name' => $skill->name,
                            'level_label' => $skill->level_label,
                            'proficiency_type' => $skill->proficiency_type,
                            'icon_key' => $skill->icon_key,
                            'context' => $skill->context,
                        ];
                    }),
                ];
            });

        return response()->json([
            'success' => true,
            'message' => 'Technical skills matrix retrieved successfully.',
            'data' => $categories,
        ], 200);
    }
}
