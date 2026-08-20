<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactSubmission extends Model
{
    protected $fillable = [
        'sender_name',
        'sender_email',
        'subject',
        'message',
        'sender_ip',
        'user_agent',
        'status',
        'replied_at',
    ];

    protected $casts = [
        'replied_at' => 'datetime',
    ];

    public function scopeUnread($query)
    {
        return $query->where('status', 'unread');
    }
}
