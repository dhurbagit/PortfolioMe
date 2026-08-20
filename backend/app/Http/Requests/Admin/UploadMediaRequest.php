<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UploadMediaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'file' => [
                'required',
                'file',
                'max:10240', // Max 10MB
                'mimes:jpg,jpeg,png,webp,svg,gif,pdf',
            ],
            'alt_text' => ['nullable', 'string', 'max:255'],
            'folder' => ['nullable', 'string', 'max:50', 'alpha_dash'],
        ];
    }

    public function messages(): array
    {
        return [
            'file.required' => 'Please select a file to upload.',
            'file.max' => 'The uploaded file size must not exceed 10MB.',
            'file.mimes' => 'Allowed file formats: JPG, PNG, WebP, SVG, GIF, PDF.',
        ];
    }
}
