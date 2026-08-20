<?php

namespace Tests\Feature;

use App\Models\ContactSubmission;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\RateLimiter;
use Tests\TestCase;

class ContactAndInboxTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
        RateLimiter::clear('contact-submission|127.0.0.1');
    }

    public function test_public_can_submit_contact_message(): void
    {
        $response = $this->postJson('/api/v1/contact', [
            'sender_name' => 'Kiran Sharma',
            'sender_email' => 'kiran@enterprise.com',
            'sender_phone' => '+9779841000000',
            'subject' => 'FinTech Backend Consultation',
            'message' => 'Hello Dhurba, we need architectural consulting on our payment reconciliation services.',
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'data' => [
                    'sender_name' => 'Kiran Sharma',
                    'subject' => 'FinTech Backend Consultation',
                ],
            ]);

        $this->assertDatabaseHas('contact_submissions', [
            'sender_email' => 'kiran@enterprise.com',
            'status' => 'unread',
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'submitted_contact_inquiry',
        ]);
    }

    public function test_contact_honeypot_drops_spam_bots(): void
    {
        $response = $this->postJson('/api/v1/contact', [
            'sender_name' => 'Spam Bot',
            'sender_email' => 'bot@spammer.org',
            'subject' => 'Cheap SEO Services',
            'message' => 'Buy our backlink package today!',
            'website_hp' => 'http://spam-link.com', // Honeypot filled
        ]);

        // Honeypot triggers 422 or silent drop
        $this->assertDatabaseMissing('contact_submissions', [
            'sender_email' => 'bot@spammer.org',
        ]);
    }

    public function test_contact_submission_is_rate_limited(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/v1/contact', [
                'sender_name' => "Tester {$i}",
                'sender_email' => "tester{$i}@example.com",
                'subject' => "Test Subject {$i}",
                'message' => 'Test message exceeding minimum ten characters.',
            ]);
        }

        // 6th attempt must be throttled
        $response = $this->postJson('/api/v1/contact', [
            'sender_name' => 'Tester 6',
            'sender_email' => 'tester6@example.com',
            'subject' => 'Test Subject 6',
            'message' => 'Test message exceeding minimum ten characters.',
        ]);

        $response->assertStatus(429);
    }

    public function test_admin_can_view_inbox_and_auto_mark_as_read(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();

        $inquiry = ContactSubmission::create([
            'sender_name' => 'Aarav Shrestha',
            'sender_email' => 'aarav@tech.np',
            'subject' => 'Project Inquiry',
            'message' => 'We are building a scalable ERP and need a Laravel lead.',
            'status' => 'unread',
        ]);

        // 1. List inbox
        $listResponse = $this->actingAs($admin, 'sanctum')
            ->getJson('/api/v1/admin/inbox?status=unread');

        $listResponse->assertStatus(200);
        $this->assertGreaterThanOrEqual(1, count($listResponse->json('data')));

        // 2. View message -> auto-marks as read
        $showResponse = $this->actingAs($admin, 'sanctum')
            ->getJson("/api/v1/admin/inbox/{$inquiry->id}");

        $showResponse->assertStatus(200)
            ->assertJson(['data' => ['status' => 'read']]);

        $this->assertDatabaseHas('contact_submissions', [
            'id' => $inquiry->id,
            'status' => 'read',
        ]);

        // 3. Update status to replied
        $statusResponse = $this->actingAs($admin, 'sanctum')
            ->patchJson("/api/v1/admin/inbox/{$inquiry->id}/status", [
                'status' => 'replied',
            ]);

        $statusResponse->assertStatus(200);
        $this->assertDatabaseHas('contact_submissions', [
            'id' => $inquiry->id,
            'status' => 'replied',
        ]);

        // 4. Delete inquiry
        $delResponse = $this->actingAs($admin, 'sanctum')
            ->deleteJson("/api/v1/admin/inbox/{$inquiry->id}");

        $delResponse->assertStatus(200);
        $this->assertDatabaseMissing('contact_submissions', ['id' => $inquiry->id]);
    }
}
