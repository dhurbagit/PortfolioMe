<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreSkillRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'skill_category_id' => ['required', 'exists:skill_categories,id'],
            'name' => ['required', 'string', 'max:150'],
            'level_label' => ['nullable', 'string', 'max:100'],
            'proficiency_type' => ['required', 'in:primary,working,tool'],
            'icon_key' => ['nullable', 'string', 'max:100'],
            'context' => ['nullable', 'string', 'max:500'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_visible' => ['nullable', 'boolean'],
        ];
    }
}
