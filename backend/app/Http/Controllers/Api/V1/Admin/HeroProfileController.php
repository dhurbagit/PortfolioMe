<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateHeroProfileRequest;
use App\Models\AuditLog;
use App\Models\HeroProfile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Cache;

class HeroProfileController extends Controller
{
    /**
     * Retrieve complete Hero Profile record for administrative management.
     */
    public function show(Request $request): JsonResponse
    {
        $profile = HeroProfile::firstOrCreate(['id' => 1]);

        return response()->json([
            'success' => true,
            'message' => 'Admin hero profile retrieved successfully.',
            'data' => $profile,
        ], 200);
    }

    /**
     * Update Hero Profile content, bio, and highlights with audit logging.
     */
    public function update(UpdateHeroProfileRequest $request): JsonResponse
    {
        $profile = HeroProfile::firstOrCreate(['id' => 1]);
        $profile->update($request->validated());

        Cache::forget('portfolio_bootstrap_payload');

        // Write Audit Log
        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'updated_hero_profile',
            'entity_type' => HeroProfile::class,
            'entity_id' => (string) $profile->id,
            'description' => "Administrator {$request->user()->name} updated the hero profile information.",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Hero profile updated successfully.',
            'data' => $profile->fresh(),
        ], 200);
    }
}
