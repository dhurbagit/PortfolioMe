<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'category',
        'role_title',
        'summary',
        'full_description',
        'challenge',
        'solution',
        'key_deliverables',
        'tech_stack',
        'metrics_label',
        'metrics_value',
        'thumbnail_url',
        'gallery_urls',
        'demo_url',
        'github_url',
        'accent_theme',
        'is_featured',
        'is_published',
        'display_order',
        'seo_title',
        'seo_description',
    ];

    protected $casts = [
        'key_deliverables' => 'array',
        'tech_stack' => 'array',
        'gallery_urls' => 'array',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'display_order' => 'integer',
    ];

    public function scopePublished($query)
    {
        return $query->where('is_published', true)->orderBy('display_order');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true)->where('is_published', true);
    }
}
