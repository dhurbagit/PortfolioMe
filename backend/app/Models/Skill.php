<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = [
        'skill_category_id',
        'name',
        'level_label',
        'proficiency_type',
        'icon_key',
        'context',
        'display_order',
        'is_visible',
    ];

    protected $casts = [
        'is_visible' => 'boolean',
        'display_order' => 'integer',
    ];

    public function category()
    {
        return $this->belongsTo(SkillCategory::class, 'skill_category_id');
    }
}
