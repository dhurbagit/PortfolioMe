<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'service_number' => ['nullable', 'string', 'max:20'],
            'title' => ['required', 'string', 'max:200'],
            'tagline' => ['nullable', 'string', 'max:200'],
            'description' => ['required', 'string', 'max:2000'],
            'icon_key' => ['nullable', 'string', 'max:100'],
            'capabilities' => ['nullable', 'array'],
            'capabilities.*' => ['string', 'max:200'],
            'accent_color' => ['nullable', 'string', 'max:50'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_visible' => ['nullable', 'boolean'],
        ];
    }
}
