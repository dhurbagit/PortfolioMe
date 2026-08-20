<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\HeroProfile;
use Illuminate\Http\JsonResponse;

class ProfileController extends Controller
{
    /**
     * Retrieve public Hero Profile and biographical details for Dhurba Dhakal.
     */
    public function show(): JsonResponse
    {
        $profile = HeroProfile::where('is_active', true)->first() ?? HeroProfile::firstOrCreate(['id' => 1]);

        return response()->json([
            'success' => true,
            'message' => 'Hero profile retrieved successfully.',
            'data' => [
                'full_name' => $profile->full_name,
                'primary_title' => $profile->primary_title,
                'secondary_title' => $profile->secondary_title,
                'short_bio' => $profile->short_bio,
                'full_bio' => $profile->full_bio,
                'avatar_url' => $profile->avatar_url,
                'cover_url' => $profile->cover_url,
                'highlights' => $profile->highlights ?? [],
            ],
        ], 200);
    }
}
