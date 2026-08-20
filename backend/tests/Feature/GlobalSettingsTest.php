<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\GlobalSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GlobalSettingsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_public_can_retrieve_global_settings_without_auth(): void
    {
        $response = $this->getJson('/api/v1/settings');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'site_title' => 'Dhurba Dhakal | Full Stack Developer | Laravel & PHP Developer',
                    'primary_email' => 'dhurba179@gmail.com',
                    'secondary_email' => 'sharvikatech@gmail.com',
                    'location' => 'Nepal',
                    'is_available_for_hire' => true,
                ],
            ]);
    }

    public function test_admin_can_retrieve_full_settings_with_auth(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();

        $response = $this->actingAs($admin, 'sanctum')
            ->getJson('/api/v1/admin/settings');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'id',
                    'site_title',
                    'meta_description',
                    'primary_email',
                    'secondary_email',
                    'phone_whatsapp',
                    'created_at',
                    'updated_at',
                ],
            ]);
    }

    public function test_admin_can_update_settings_and_audit_log_is_created(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();

        $updatedPayload = [
            'site_title' => 'Dhurba Dhakal — Senior Laravel & Full-Stack Architect',
            'meta_description' => 'Updated professional portfolio of Dhurba Dhakal.',
            'primary_email' => 'dhurba179@gmail.com',
            'secondary_email' => 'sharvikatech@gmail.com',
            'phone_whatsapp' => '+9779800000000',
            'location' => 'Kathmandu, Nepal',
            'timezone' => 'UTC+5:45 (NPT)',
            'github_url' => 'https://github.com/dhurbagit',
            'linkedin_url' => 'https://linkedin.com',
            'facebook_url' => 'https://facebook.com',
            'availability_status' => 'Available for Q3/Q4 Enterprise Projects',
            'is_available_for_hire' => true,
            'copyright_text' => '© 2026 Dhurba Dhakal. All rights reserved.',
        ];

        $response = $this->actingAs($admin, 'sanctum')
            ->putJson('/api/v1/admin/settings', $updatedPayload);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Global website settings updated successfully.',
                'data' => [
                    'site_title' => 'Dhurba Dhakal — Senior Laravel & Full-Stack Architect',
                    'location' => 'Kathmandu, Nepal',
                ],
            ]);

        $this->assertDatabaseHas('global_settings', [
            'site_title' => 'Dhurba Dhakal — Senior Laravel & Full-Stack Architect',
            'location' => 'Kathmandu, Nepal',
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'updated_global_settings',
            'user_id' => $admin->id,
        ]);
    }

    public function test_update_settings_validation_errors(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();

        // Invalid email and missing site_title
        $response = $this->actingAs($admin, 'sanctum')
            ->putJson('/api/v1/admin/settings', [
                'site_title' => '',
                'primary_email' => 'not-an-email',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['site_title', 'primary_email']);
    }

    public function test_unauthenticated_user_cannot_update_settings(): void
    {
        $response = $this->putJson('/api/v1/admin/settings', [
            'site_title' => 'Hacked Title',
            'primary_email' => 'hacker@example.com',
        ]);

        $response->assertStatus(401);
    }
}
