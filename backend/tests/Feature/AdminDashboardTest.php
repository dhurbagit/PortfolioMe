<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\ContactSubmission;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminDashboardTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_authenticated_admin_can_access_dashboard_metrics(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();

        // Create sample audit log
        AuditLog::create([
            'user_id' => $admin->id,
            'action' => 'test_action',
            'description' => 'Tested CMS dashboard functionality.',
            'ip_address' => '127.0.0.1',
        ]);

        // Create sample unread inquiry
        ContactSubmission::create([
            'sender_name' => 'Project Inquirer',
            'sender_email' => 'client@example.com',
            'subject' => 'Laravel Project Consultation',
            'message' => 'Hello Dhurba, let us discuss an enterprise web application.',
            'status' => 'unread',
        ]);

        $response = $this->actingAs($admin, 'sanctum')
            ->getJson('/api/v1/admin/dashboard');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'CMS Dashboard vital metrics retrieved successfully.',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'summary' => [
                        'projects' => ['total', 'published', 'featured'],
                        'experiences' => ['work_roles', 'freelance_suites', 'education_records'],
                        'skills' => ['total_skills', 'categories'],
                        'services' => ['total'],
                        'reviews' => ['total', 'approved', 'pending_moderation'],
                        'inbox' => ['total_messages', 'unread_messages'],
                        'media' => ['total_files', 'total_bytes'],
                    ],
                    'system' => [
                        'php_version',
                        'laravel_version',
                        'environment',
                        'timezone',
                        'server_time',
                    ],
                    'recent_activities',
                    'recent_inquiries',
                ],
            ]);

        $data = $response->json('data.summary');
        $this->assertEquals(5, $data['projects']['total']);
        $this->assertEquals(3, $data['experiences']['work_roles']);
        $this->assertEquals(1, $data['inbox']['unread_messages']);
    }

    public function test_unauthenticated_request_to_dashboard_is_rejected(): void
    {
        $response = $this->getJson('/api/v1/admin/dashboard');

        $response->assertStatus(401);
    }
}
