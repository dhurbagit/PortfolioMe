<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGlobalSettingsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules for updating Global Website Settings.
     */
    public function rules(): array
    {
        return [
            'site_title' => ['required', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:1000'],
            'logo_url' => ['nullable', 'string', 'max:500'],
            'favicon_url' => ['nullable', 'string', 'max:500'],
            'primary_email' => ['required', 'string', 'email', 'max:255'],
            'secondary_email' => ['nullable', 'string', 'email', 'max:255'],
            'phone_whatsapp' => ['nullable', 'string', 'max:50'],
            'location' => ['nullable', 'string', 'max:100'],
            'timezone' => ['nullable', 'string', 'max:100'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'linkedin_url' => ['nullable', 'url', 'max:255'],
            'facebook_url' => ['nullable', 'url', 'max:255'],
            'availability_status' => ['nullable', 'string', 'max:150'],
            'experience_badge' => ['nullable', 'string', 'max:100'],
            'copyright_text' => ['nullable', 'string', 'max:255'],
            'is_available_for_hire' => ['nullable', 'boolean'],
        ];
    }
}
