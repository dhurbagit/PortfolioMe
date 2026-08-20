<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkExperience extends Model
{
    protected $fillable = [
        'role_number',
        'company_name',
        'position',
        'status',
        'location',
        'overview',
        'responsibilities',
        'tech_stack',
        'accent_theme',
        'company_logo_url',
        'display_order',
        'is_visible',
    ];

    protected $casts = [
        'responsibilities' => 'array',
        'tech_stack' => 'array',
        'is_visible' => 'boolean',
        'display_order' => 'integer',
    ];
}
