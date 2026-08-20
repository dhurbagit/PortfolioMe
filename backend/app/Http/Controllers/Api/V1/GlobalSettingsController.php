<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\GlobalSetting;
use Illuminate\Http\JsonResponse;

class GlobalSettingsController extends Controller
{
    /**
     * Retrieve public website configuration and branding details.
     */
    public function show(): JsonResponse
    {
        $settings = GlobalSetting::firstOrCreate(['id' => 1]);

        return response()->json([
            'success' => true,
            'message' => 'Global website settings retrieved successfully.',
            'data' => [
                'site_title' => $settings->site_title,
                'meta_description' => $settings->meta_description,
                'logo_url' => $settings->logo_url,
                'favicon_url' => $settings->favicon_url,
                'primary_email' => $settings->primary_email,
                'secondary_email' => $settings->secondary_email,
                'phone_whatsapp' => $settings->phone_whatsapp,
                'location' => $settings->location,
                'timezone' => $settings->timezone,
                'github_url' => $settings->github_url,
                'linkedin_url' => $settings->linkedin_url,
                'facebook_url' => $settings->facebook_url,
                'availability_status' => $settings->availability_status,
                'experience_badge' => $settings->experience_badge,
                'copyright_text' => $settings->copyright_text,
                'is_available_for_hire' => (bool) $settings->is_available_for_hire,
            ],
        ], 200);
    }
}
