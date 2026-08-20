<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreDesignExperienceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:200'],
            'category' => ['nullable', 'string', 'max:150'],
            'description' => ['required', 'string', 'max:2000'],
            'tools_and_skills' => ['required', 'array', 'min:1'],
            'tools_and_skills.*' => ['string', 'max:100'],
            'icon_key' => ['nullable', 'string', 'max:100'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_visible' => ['nullable', 'boolean'],
        ];
    }
}
