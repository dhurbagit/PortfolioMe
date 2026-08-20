<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectCmsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_public_can_retrieve_published_projects(): void
    {
        $response = $this->getJson('/api/v1/projects');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'title',
                        'slug',
                        'category',
                        'summary',
                        'key_deliverables',
                        'tech_stack',
                    ],
                ],
            ]);

        $this->assertEquals(5, count($response->json('data')));
    }

    public function test_public_can_filter_projects_by_category_and_featured(): void
    {
        $response = $this->getJson('/api/v1/projects?featured=1');

        $response->assertStatus(200);
        foreach ($response->json('data') as $item) {
            $this->assertTrue($item['is_featured']);
        }
    }

    public function test_public_can_retrieve_single_project_by_slug(): void
    {
        $response = $this->getJson('/api/v1/projects/ndpc-payment-platform');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'slug' => 'ndpc-payment-platform',
                    'title' => 'Nepal Digital Payment Core Platform',
                ],
            ]);
    }

    public function test_public_cannot_view_unpublished_project(): void
    {
        $project = Project::first();
        $project->update(['is_published' => false]);

        $response = $this->getJson("/api/v1/projects/{$project->slug}");
        $response->assertStatus(404);
    }

    public function test_admin_can_crud_projects_and_audit_log_is_recorded(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();

        // 1. Create Project
        $response = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/v1/admin/projects', [
                'title' => 'Automated Settlement & Reconciliation System',
                'slug' => 'automated-settlement-reconciliation',
                'category' => 'Financial Transaction Core',
                'role_title' => 'Lead Backend Architect',
                'summary' => 'Automated nightly settlement balancing and multi-ledger reconciliation.',
                'full_description' => 'Detailed case study narrative on handling financial batch reconciliation.',
                'challenge' => 'Processing high-volume batch records with zero transaction loss.',
                'solution' => 'Utilized chunked database streams and transactional audit trails.',
                'key_deliverables' => ['Built settlement processor', 'Created ledger matching engine'],
                'tech_stack' => ['Laravel', 'PHP 8.2', 'MySQL', 'Redis'],
                'metrics_label' => 'Performance',
                'metrics_value' => 'Zero Discrepancy Rate',
                'is_featured' => true,
                'is_published' => true,
                'display_order' => 6,
            ]);

        $response->assertStatus(201);
        $id = $response->json('data.id');

        $this->assertDatabaseHas('projects', ['id' => $id, 'slug' => 'automated-settlement-reconciliation']);
        $this->assertDatabaseHas('audit_logs', ['action' => 'created_project', 'user_id' => $admin->id]);

        // 2. Update Project
        $updateResponse = $this->actingAs($admin, 'sanctum')
            ->putJson("/api/v1/admin/projects/{$id}", [
                'title' => 'Automated Settlement & Reconciliation System v2',
                'slug' => 'automated-settlement-reconciliation',
                'category' => 'Financial Transaction Core',
                'summary' => 'Updated automated settlement balancing summary.',
                'key_deliverables' => ['Built settlement processor v2'],
                'tech_stack' => ['Laravel', 'PHP 8.2', 'MySQL', 'Redis', 'Docker'],
            ]);

        $updateResponse->assertStatus(200)
            ->assertJson(['data' => ['title' => 'Automated Settlement & Reconciliation System v2']]);

        // 3. Toggle Publish
        $toggleResponse = $this->actingAs($admin, 'sanctum')
            ->patchJson("/api/v1/admin/projects/{$id}/publish");

        $toggleResponse->assertStatus(200)
            ->assertJson(['data' => ['is_published' => false]]);

        // 4. Delete Project
        $deleteResponse = $this->actingAs($admin, 'sanctum')
            ->deleteJson("/api/v1/admin/projects/{$id}");

        $deleteResponse->assertStatus(200);
        $this->assertDatabaseMissing('projects', ['id' => $id]);
        $this->assertDatabaseHas('audit_logs', ['action' => 'deleted_project']);
    }

    public function test_admin_can_reorder_projects(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();
        $projects = Project::take(2)->get();

        $response = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/v1/admin/projects/reorder', [
                'orders' => [
                    ['id' => $projects[0]->id, 'display_order' => 50],
                    ['id' => $projects[1]->id, 'display_order' => 60],
                ],
            ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('projects', ['id' => $projects[0]->id, 'display_order' => 50]);
        $this->assertDatabaseHas('projects', ['id' => $projects[1]->id, 'display_order' => 60]);
    }
}
