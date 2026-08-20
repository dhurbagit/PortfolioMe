<?php

namespace Tests\Feature;

use App\Models\DesignExperience;
use App\Models\Education;
use App\Models\FreelanceSuite;
use App\Models\User;
use App\Models\WorkExperience;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExperienceCmsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_public_can_retrieve_all_experience_modules(): void
    {
        // 1. Work Experience
        $workResponse = $this->getJson('/api/v1/experience/work');
        $workResponse->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => ['id', 'company_name', 'position', 'responsibilities', 'tech_stack'],
                ],
            ]);
        $this->assertEquals(3, count($workResponse->json('data')));

        // 2. Freelance Suites
        $freelanceResponse = $this->getJson('/api/v1/experience/freelance');
        $freelanceResponse->assertStatus(200);
        $this->assertEquals(3, count($freelanceResponse->json('data')));

        // 3. Design Experience
        $designResponse = $this->getJson('/api/v1/experience/design');
        $designResponse->assertStatus(200);
        $this->assertEquals(3, count($designResponse->json('data')));

        // 4. Education
        $educationResponse = $this->getJson('/api/v1/experience/education');
        $educationResponse->assertStatus(200);
        $this->assertEquals(1, count($educationResponse->json('data')));
    }

    public function test_admin_can_crud_work_experience(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();

        // 1. Create
        $response = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/v1/admin/experience/work', [
                'role_number' => '04',
                'company_name' => 'NextGen Cloud Systems',
                'position' => 'Senior Backend Engineer',
                'status' => 'Currently Working',
                'location' => 'Kathmandu, Nepal',
                'overview' => 'Leading backend architectural engineering and microservice integrations.',
                'responsibilities' => ['Architecting scalable APIs', 'Optimizing database queries'],
                'tech_stack' => ['Laravel', 'PostgreSQL', 'Docker'],
                'accent_theme' => 'royal',
                'display_order' => 4,
                'is_visible' => true,
            ]);

        $response->assertStatus(201);
        $id = $response->json('data.id');

        $this->assertDatabaseHas('work_experiences', ['id' => $id, 'company_name' => 'NextGen Cloud Systems']);
        $this->assertDatabaseHas('audit_logs', ['action' => 'created_work_experience']);

        // 2. Update
        $updateResponse = $this->actingAs($admin, 'sanctum')
            ->putJson("/api/v1/admin/experience/work/{$id}", [
                'role_number' => '04',
                'company_name' => 'NextGen Cloud Systems Ltd.',
                'position' => 'Principal Backend Engineer',
                'status' => 'Currently Working',
                'location' => 'Kathmandu, Nepal',
                'overview' => 'Leading backend architectural engineering and microservice integrations.',
                'responsibilities' => ['Architecting scalable APIs', 'Optimizing database queries'],
                'tech_stack' => ['Laravel', 'PostgreSQL', 'Docker', 'Redis'],
                'accent_theme' => 'royal',
                'display_order' => 4,
                'is_visible' => true,
            ]);

        $updateResponse->assertStatus(200)
            ->assertJson(['data' => ['position' => 'Principal Backend Engineer']]);

        // 3. Delete
        $deleteResponse = $this->actingAs($admin, 'sanctum')
            ->deleteJson("/api/v1/admin/experience/work/{$id}");

        $deleteResponse->assertStatus(200);
        $this->assertDatabaseMissing('work_experiences', ['id' => $id]);
        $this->assertDatabaseHas('audit_logs', ['action' => 'deleted_work_experience']);
    }

    public function test_admin_can_crud_freelance_suites_and_education(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();

        // 1. Create Freelance Suite
        $suiteResponse = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/v1/admin/experience/freelance', [
                'suite_number' => '04',
                'title' => 'Security Auditing & Hardening',
                'subtitle' => 'Application Vulnerability Assessment',
                'description' => 'Hardening Laravel and PHP backends against common OWASP vectors.',
                'capabilities' => ['Rate Limiting Audits', 'CSRF and Session Verification'],
                'technologies' => ['PHP', 'Laravel Sanctum', 'Security Headers'],
                'accent_color' => 'red',
                'display_order' => 4,
                'is_visible' => true,
            ]);

        $suiteResponse->assertStatus(201);
        $suiteId = $suiteResponse->json('data.id');
        $this->assertDatabaseHas('freelance_suites', ['id' => $suiteId]);

        // 2. Create Education Record
        $eduResponse = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/v1/admin/experience/education', [
                'degree' => 'Laravel Certified Developer',
                'field_of_study' => 'Advanced Backend Architecture',
                'institution' => 'Laravel Professional Certification',
                'location' => 'International',
                'duration' => 'Certified',
                'coursework' => ['Advanced Routing', 'Database Optimizations', 'Security'],
                'display_order' => 2,
                'is_visible' => true,
            ]);

        $eduResponse->assertStatus(201);
        $eduId = $eduResponse->json('data.id');
        $this->assertDatabaseHas('educations', ['id' => $eduId]);
    }
}
