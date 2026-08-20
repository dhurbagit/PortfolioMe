<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $table = 'educations';

    protected $fillable = [
        'degree',
        'field_of_study',
        'institution',
        'location',
        'duration',
        'coursework',
        'academic_overview',
        'display_order',
        'is_visible',
    ];

    protected $casts = [
        'coursework' => 'array',
        'is_visible' => 'boolean',
        'display_order' => 'integer',
    ];
}
