<?php

namespace Tests\Feature;

use App\Models\HeroProfile;
use App\Models\Skill;
use App\Models\SkillCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HeroAndSkillsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_public_can_retrieve_hero_profile(): void
    {
        $response = $this->getJson('/api/v1/profile');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'full_name' => 'Dhurba Dhakal',
                    'primary_title' => 'Full Stack Developer | Laravel & PHP Developer',
                ],
            ]);
    }

    public function test_admin_can_update_hero_profile(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();

        $response = $this->actingAs($admin, 'sanctum')
            ->putJson('/api/v1/admin/hero', [
                'full_name' => 'Dhurba Dhakal',
                'primary_title' => 'Principal Full-Stack & Laravel Engineer',
                'secondary_title' => 'Web Designer • Freelancer • Technical Consultant',
                'short_bio' => 'Updated senior bio description for Dhurba Dhakal.',
                'full_bio' => 'Updated comprehensive journey narrative.',
                'highlights' => ['100% Reliable Delivery', 'Laravel Core Expertise'],
                'is_active' => true,
            ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'primary_title' => 'Principal Full-Stack & Laravel Engineer',
                ],
            ]);

        $this->assertDatabaseHas('hero_profiles', [
            'primary_title' => 'Principal Full-Stack & Laravel Engineer',
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'updated_hero_profile',
            'user_id' => $admin->id,
        ]);
    }

    public function test_public_can_retrieve_skills_matrix(): void
    {
        $response = $this->getJson('/api/v1/skills');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'slug',
                        'description',
                        'skills' => [
                            '*' => [
                                'id',
                                'name',
                                'level_label',
                                'proficiency_type',
                            ],
                        ],
                    ],
                ],
            ]);
    }

    public function test_admin_can_crud_skill_categories_and_skills(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();

        // 1. Create Category
        $catResponse = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/v1/admin/skills/categories', [
                'name' => 'Mobile & Cross-Platform',
                'slug' => 'mobile-cross-platform',
                'icon_key' => 'Smartphone',
                'description' => 'Hybrid and responsive mobile app ecosystems.',
                'display_order' => 5,
                'is_visible' => true,
            ]);

        $catResponse->assertStatus(201);
        $catId = $catResponse->json('data.id');

        // 2. Create Skill under category
        $skillResponse = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/v1/admin/skills', [
                'skill_category_id' => $catId,
                'name' => 'React Native',
                'level_label' => 'Working Knowledge',
                'proficiency_type' => 'working',
                'display_order' => 1,
                'is_visible' => true,
            ]);

        $skillResponse->assertStatus(201);
        $skillId = $skillResponse->json('data.id');

        // 3. Update Skill
        $updateResponse = $this->actingAs($admin, 'sanctum')
            ->putJson("/api/v1/admin/skills/{$skillId}", [
                'skill_category_id' => $catId,
                'name' => 'React Native & Expo',
                'level_label' => 'Working Experience',
                'proficiency_type' => 'working',
                'display_order' => 1,
                'is_visible' => true,
            ]);

        $updateResponse->assertStatus(200)
            ->assertJson([
                'data' => [
                    'name' => 'React Native & Expo',
                ],
            ]);

        // 4. Delete Skill
        $deleteSkillResponse = $this->actingAs($admin, 'sanctum')
            ->deleteJson("/api/v1/admin/skills/{$skillId}");

        $deleteSkillResponse->assertStatus(200);
        $this->assertDatabaseMissing('skills', ['id' => $skillId]);
    }

    public function test_admin_can_reorder_skills(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();
        $skills = Skill::take(2)->get();

        $response = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/v1/admin/skills/reorder', [
                'orders' => [
                    ['id' => $skills[0]->id, 'display_order' => 10],
                    ['id' => $skills[1]->id, 'display_order' => 20],
                ],
            ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('skills', ['id' => $skills[0]->id, 'display_order' => 10]);
        $this->assertDatabaseHas('skills', ['id' => $skills[1]->id, 'display_order' => 20]);
    }
}
