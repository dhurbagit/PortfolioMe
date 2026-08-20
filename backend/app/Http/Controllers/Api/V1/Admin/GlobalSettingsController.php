<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateGlobalSettingsRequest;
use App\Models\AuditLog;
use App\Models\GlobalSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Cache;

class GlobalSettingsController extends Controller
{
    /**
     * Retrieve full settings record for the CMS administrative editor.
     */
    public function show(Request $request): JsonResponse
    {
        $settings = GlobalSetting::firstOrCreate(['id' => 1]);

        return response()->json([
            'success' => true,
            'message' => 'Admin global settings retrieved successfully.',
            'data' => $settings,
        ], 200);
    }

    /**
     * Update Global Website Settings with validation and audit logging.
     */
    public function update(UpdateGlobalSettingsRequest $request): JsonResponse
    {
        $settings = GlobalSetting::firstOrCreate(['id' => 1]);
        $oldData = $settings->toArray();

        $settings->update($request->validated());

        Cache::forget('portfolio_bootstrap_payload');

        // Record Audit Log
        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'updated_global_settings',
            'entity_type' => GlobalSetting::class,
            'entity_id' => (string) $settings->id,
            'description' => "Administrator {$request->user()->name} updated global website settings.",
            'payload' => [
                'updated_fields' => array_keys($request->validated()),
            ],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Global website settings updated successfully.',
            'data' => $settings->fresh(),
        ], 200);
    }
}
