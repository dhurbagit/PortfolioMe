<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreEducationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'degree' => ['required', 'string', 'max:100'],
            'field_of_study' => ['required', 'string', 'max:200'],
            'institution' => ['required', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:100'],
            'duration' => ['nullable', 'string', 'max:100'],
            'coursework' => ['required', 'array', 'min:1'],
            'coursework.*' => ['string', 'max:255'],
            'academic_overview' => ['nullable', 'string', 'max:2000'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_visible' => ['nullable', 'boolean'],
        ];
    }
}
