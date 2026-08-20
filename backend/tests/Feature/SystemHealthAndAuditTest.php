<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SystemHealthAndAuditTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_admin_can_list_and_search_audit_logs(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();

        AuditLog::create([
            'user_id' => $admin->id,
            'action' => 'security_audit_test',
            'description' => 'Tested security diagnostics suite.',
            'ip_address' => '127.0.0.1',
        ]);

        $response = $this->actingAs($admin, 'sanctum')
            ->getJson('/api/v1/admin/audit-logs?search=diagnostics');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => ['id', 'action', 'description', 'ip_address', 'created_at'],
                ],
            ]);

        $this->assertGreaterThanOrEqual(1, count($response->json('data')));
    }

    public function test_admin_can_retrieve_system_health_and_security_status(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();

        $response = $this->actingAs($admin, 'sanctum')
            ->getJson('/api/v1/admin/system/status');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'health' => [
                        'database' => ['status' => 'operational'],
                        'storage' => ['status' => 'operational'],
                    ],
                    'security' => [
                        'single_admin_enforced' => true,
                        'security_headers_active' => true,
                    ],
                ],
            ]);
    }

    public function test_http_security_headers_are_attached_to_responses(): void
    {
        $response = $this->getJson('/api/v1/health');

        $response->assertStatus(200)
            ->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertHeader('X-Frame-Options', 'SAMEORIGIN')
            ->assertHeader('X-XSS-Protection', '1; mode=block')
            ->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    }

    public function test_unauthenticated_user_cannot_access_audit_logs(): void
    {
        $response = $this->getJson('/api/v1/admin/audit-logs');
        $response->assertStatus(401);
    }
}
