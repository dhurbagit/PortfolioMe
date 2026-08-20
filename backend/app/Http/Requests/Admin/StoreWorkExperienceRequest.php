<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreWorkExperienceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'role_number' => ['nullable', 'string', 'max:20'],
            'company_name' => ['required', 'string', 'max:200'],
            'position' => ['required', 'string', 'max:200'],
            'status' => ['required', 'string', 'max:100'],
            'location' => ['nullable', 'string', 'max:100'],
            'overview' => ['required', 'string', 'max:2000'],
            'responsibilities' => ['required', 'array', 'min:1'],
            'responsibilities.*' => ['string', 'max:500'],
            'tech_stack' => ['required', 'array', 'min:1'],
            'tech_stack.*' => ['string', 'max:100'],
            'accent_theme' => ['nullable', 'string', 'in:royal,indigo,crimson,emerald,purple'],
            'company_logo_url' => ['nullable', 'string', 'max:500'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_visible' => ['nullable', 'boolean'],
        ];
    }
}
