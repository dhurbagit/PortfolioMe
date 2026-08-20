<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ReorderSkillsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'orders' => ['required', 'array'],
            'orders.*.id' => ['required', 'exists:skills,id'],
            'orders.*.display_order' => ['required', 'integer', 'min:0'],
        ];
    }
}
