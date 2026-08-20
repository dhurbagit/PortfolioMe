<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'reviewer_name' => ['required', 'string', 'max:150'],
            'reviewer_role' => ['nullable', 'string', 'max:150'],
            'company_or_context' => ['nullable', 'string', 'max:150'],
            'service_used' => ['required', 'string', 'max:150'],
            'rating' => ['required', 'integer', 'between:1,5'],
            'comment' => ['required', 'string', 'max:2000'],
            'display_date' => ['nullable', 'string', 'max:100'],
            'is_verified' => ['nullable', 'boolean'],
            'is_approved' => ['nullable', 'boolean'],
            'likes_count' => ['nullable', 'integer', 'min:0'],
            'display_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
