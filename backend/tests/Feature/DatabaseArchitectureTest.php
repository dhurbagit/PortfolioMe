<?php

namespace Tests\Feature;

use App\Models\DesignExperience;
use App\Models\Education;
use App\Models\FreelanceSuite;
use App\Models\GlobalSetting;
use App\Models\Philosophy;
use App\Models\Project;
use App\Models\Review;
use App\Models\Service;
use App\Models\Skill;
use App\Models\SkillCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DatabaseArchitectureTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_single_admin_user_exists_and_is_authenticated(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();

        $this->assertNotNull($admin);
        $this->assertEquals('Dhurba Dhakal', $admin->name);
        $this->assertEquals(1, User::count(), 'Enforce single-admin principle (strictly 1 admin user)');
    }

    public function test_global_settings_seeded_with_dhurba_details(): void
    {
        $settings = GlobalSetting::first();

        $this->assertNotNull($settings);
        $this->assertEquals('dhurba179@gmail.com', $settings->primary_email);
        $this->assertEquals('sharvikatech@gmail.com', $settings->secondary_email);
        $this->assertTrue($settings->is_available_for_hire);
    }

    public function test_skill_categories_and_skills_relationship(): void
    {
        $backendCategory = SkillCategory::where('slug', 'backend')->with('skills')->first();

        $this->assertNotNull($backendCategory);
        $this->assertGreaterThanOrEqual(4, $backendCategory->skills->count());

        $phpSkill = $backendCategory->skills->where('name', 'PHP (PHP 8+)')->first();
        $this->assertNotNull($phpSkill);
        $this->assertEquals('primary', $phpSkill->proficiency_type);
        $this->assertEquals($backendCategory->id, $phpSkill->category->id);
    }

    public function test_projects_model_and_scopes(): void
    {
        $projects = Project::published()->get();
        $this->assertGreaterThanOrEqual(5, $projects->count());

        $featured = Project::featured()->get();
        $this->assertGreaterThanOrEqual(3, $featured->count());

        $firstProject = $projects->first();
        $this->assertIsArray($firstProject->key_deliverables);
        $this->assertIsArray($firstProject->tech_stack);
    }

    public function test_experiences_education_and_reviews(): void
    {
        $this->assertEquals(3, \App\Models\WorkExperience::count());
        $this->assertEquals(3, FreelanceSuite::count());
        $this->assertEquals(3, DesignExperience::count());
        $this->assertEquals(1, Education::count());
        $this->assertEquals(8, Service::count());
        $this->assertEquals(5, Philosophy::count());
        $this->assertEquals(4, Review::approved()->count());
    }
}
