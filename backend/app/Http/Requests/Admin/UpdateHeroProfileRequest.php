<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHeroProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:150'],
            'primary_title' => ['required', 'string', 'max:255'],
            'secondary_title' => ['required', 'string', 'max:255'],
            'short_bio' => ['required', 'string', 'max:2000'],
            'full_bio' => ['nullable', 'string', 'max:5000'],
            'avatar_url' => ['nullable', 'string', 'max:500'],
            'cover_url' => ['nullable', 'string', 'max:500'],
            'highlights' => ['nullable', 'array'],
            'highlights.*' => ['string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
