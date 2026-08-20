<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\DesignExperience;
use App\Models\Education;
use App\Models\FreelanceSuite;
use App\Models\WorkExperience;
use Illuminate\Http\JsonResponse;

class ExperienceController extends Controller
{
    /**
     * Retrieve all visible professional work experiences.
     */
    public function work(): JsonResponse
    {
        $experiences = WorkExperience::where('is_visible', true)
            ->orderBy('display_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $experiences,
        ], 200);
    }

    /**
     * Retrieve all visible freelance studio suites.
     */
    public function freelance(): JsonResponse
    {
        $suites = FreelanceSuite::where('is_visible', true)
            ->orderBy('display_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $suites,
        ], 200);
    }

    /**
     * Retrieve all visible design & UI/UX experience pillars.
     */
    public function design(): JsonResponse
    {
        $designs = DesignExperience::where('is_visible', true)
            ->orderBy('display_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $designs,
        ], 200);
    }

    /**
     * Retrieve all visible higher education and academic records.
     */
    public function education(): JsonResponse
    {
        $educations = Education::where('is_visible', true)
            ->orderBy('display_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $educations,
        ], 200);
    }
}
