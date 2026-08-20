<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DesignExperience extends Model
{
    protected $fillable = [
        'title',
        'category',
        'description',
        'tools_and_skills',
        'icon_key',
        'display_order',
        'is_visible',
    ];

    protected $casts = [
        'tools_and_skills' => 'array',
        'is_visible' => 'boolean',
        'display_order' => 'integer',
    ];
}
