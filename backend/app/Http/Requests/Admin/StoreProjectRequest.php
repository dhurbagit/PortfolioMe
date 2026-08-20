<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if (! $this->has('slug') || empty($this->input('slug'))) {
            $this->merge([
                'slug' => Str::slug($this->input('title', '')),
            ]);
        } else {
            $this->merge([
                'slug' => Str::slug($this->input('slug')),
            ]);
        }
    }

    public function rules(): array
    {
        $projectId = $this->route('project') ?? $this->route('id');

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'alpha_dash', 'unique:projects,slug,' . $projectId],
            'category' => ['required', 'string', 'max:150'],
            'role_title' => ['nullable', 'string', 'max:150'],
            'summary' => ['required', 'string', 'max:2000'],
            'full_description' => ['nullable', 'string', 'max:10000'],
            'challenge' => ['nullable', 'string', 'max:5000'],
            'solution' => ['nullable', 'string', 'max:5000'],
            'key_deliverables' => ['required', 'array', 'min:1'],
            'key_deliverables.*' => ['string', 'max:500'],
            'tech_stack' => ['required', 'array', 'min:1'],
            'tech_stack.*' => ['string', 'max:100'],
            'metrics_label' => ['nullable', 'string', 'max:100'],
            'metrics_value' => ['nullable', 'string', 'max:150'],
            'thumbnail_url' => ['nullable', 'string', 'max:500'],
            'gallery_urls' => ['nullable', 'array'],
            'gallery_urls.*' => ['string', 'max:500'],
            'demo_url' => ['nullable', 'url', 'max:500'],
            'github_url' => ['nullable', 'url', 'max:500'],
            'accent_theme' => ['nullable', 'string', 'in:royal,indigo,purple,emerald,crimson'],
            'is_featured' => ['nullable', 'boolean'],
            'is_published' => ['nullable', 'boolean'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
