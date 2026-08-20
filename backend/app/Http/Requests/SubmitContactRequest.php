<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubmitContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'sender_name' => ['required', 'string', 'min:2', 'max:150'],
            'sender_email' => ['required', 'string', 'email', 'max:255'],
            'sender_phone' => ['nullable', 'string', 'max:50'],
            'subject' => ['required', 'string', 'min:3', 'max:255'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
            'website_hp' => ['nullable', 'string', 'max:0'], // Anti-spam honeypot
        ];
    }

    public function messages(): array
    {
        return [
            'sender_name.required' => 'Please provide your full name.',
            'sender_email.required' => 'Please provide a valid email address.',
            'sender_email.email' => 'Please provide a valid email format.',
            'subject.required' => 'Please specify the subject of your inquiry.',
            'message.required' => 'Please write your message.',
            'message.min' => 'Message must contain at least 10 characters.',
            'website_hp.max' => 'Spam bot submission rejected.',
        ];
    }
}
