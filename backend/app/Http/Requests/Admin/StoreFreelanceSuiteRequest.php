<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreFreelanceSuiteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'suite_number' => ['nullable', 'string', 'max:20'],
            'title' => ['required', 'string', 'max:200'],
            'subtitle' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:2000'],
            'capabilities' => ['required', 'array', 'min:1'],
            'capabilities.*' => ['string', 'max:500'],
            'technologies' => ['required', 'array', 'min:1'],
            'technologies.*' => ['string', 'max:100'],
            'accent_color' => ['nullable', 'string', 'max:50'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_visible' => ['nullable', 'boolean'],
        ];
    }
}
