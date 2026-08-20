<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class MediaAsset extends Model
{
    use HasUuids;

    protected $fillable = [
        'original_name',
        'filename',
        'mime_type',
        'file_size_bytes',
        'disk_path',
        'public_url',
        'alt_text',
    ];

    protected $appends = ['url'];

    public function getUrlAttribute(): string
    {
        return $this->attributes['public_url'] ?? '';
    }

    protected $casts = [
        'file_size_bytes' => 'integer',
    ];
}
