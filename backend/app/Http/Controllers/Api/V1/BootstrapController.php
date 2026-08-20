<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\DesignExperience;
use App\Models\Education;
use App\Models\FreelanceSuite;
use App\Models\GlobalSetting;
use App\Models\HeroProfile;
use App\Models\Philosophy;
use App\Models\Project;
use App\Models\Service;
use App\Models\SkillCategory;
use App\Models\WorkExperience;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class BootstrapController extends Controller
{
    /**
     * Return entire portfolio payload in 1 single ultra-fast roundtrip.
     */
    public function __invoke(Request $request): JsonResponse
    {
        // Cache payload for 60 seconds to ensure sub-millisecond response times
        $data = Cache::remember('portfolio_bootstrap_payload', 60, function () {
            return [
                'settings' => GlobalSetting::firstOrCreate(['id' => 1]),
                'profile' => HeroProfile::firstOrCreate(['id' => 1]),
                'skills' => SkillCategory::with(['skills' => function ($q) {
                    $q->where('is_visible', true)->orderBy('display_order');
                }])->where('is_visible', true)->orderBy('display_order')->get(),
                'work_experience' => WorkExperience::where('is_visible', true)->orderBy('display_order')->get(),
                'freelance' => FreelanceSuite::where('is_visible', true)->orderBy('display_order')->get(),
                'design' => DesignExperience::where('is_visible', true)->orderBy('display_order')->get(),
                'education' => Education::where('is_visible', true)->orderBy('display_order')->get(),
                'projects' => Project::published()->orderBy('display_order')->get(),
                'services' => Service::where('is_visible', true)->orderBy('display_order')->get(),
                'philosophies' => Philosophy::where('is_visible', true)->orderBy('display_order')->get(),
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'Bootstrap data loaded successfully.',
            'data' => $data,
        ], 200);
    }
}
