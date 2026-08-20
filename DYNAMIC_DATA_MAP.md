# DYNAMIC DATA MAP — DHURBA DHAKAL PORTFOLIO & CMS

This document traces the complete end-to-end architecture for every entity in the system:
**Database Table → Backend Model → REST API Endpoint → Admin CMS UI → Frontend API Service → Frontend Component → Public UI**.

---

## 1. Global Settings & Metadata
* **Database Table:** `global_settings`
* **Backend Model:** `App\Models\GlobalSetting`
* **Backend Controller:** 
  * Public: `App\Http\Controllers\Api\V1\GlobalSettingsController@show`
  * Admin: `App\Http\Controllers\Api\V1\Admin\GlobalSettingsController@show`, `@update`
* **API Endpoints:**
  * `GET /api/v1/settings` (Public)
  * `GET /api/v1/admin/settings` (Protected: `auth:sanctum`)
  * `PUT /api/v1/admin/settings` (Protected: `auth:sanctum`)
* **Admin CMS Page:** `/admin/settings` (`app/admin/settings/page.tsx`)
* **Frontend API Client:** `getGlobalSettings()` (`lib/api.ts`), `getAdminSettings()`, `updateAdminSettings()` (`lib/adminApi.ts`)
* **Frontend Components:**
  * `Hero.tsx` (Live location, hire availability badge, social URLs)
  * `Footer.tsx` (Primary & secondary emails, location, GitHub, LinkedIn, Facebook)
  * `FloatingWhatsApp.tsx` (Live phone / WhatsApp direct contact)
  * `ResumeModal.tsx` (Printable CV header, email, location, URLs)
  * `app/sitemap.ts` & `app/robots.ts` (SEO metadata, base URL)
* **Public Route:** `http://localhost:3000`

---

## 2. Hero Profile & Developer Story
* **Database Table:** `hero_profiles`
* **Backend Model:** `App\Models\HeroProfile`
* **Backend Controller:**
  * Public: `App\Http\Controllers\Api\V1\ProfileController@show`
  * Admin: `App\Http\Controllers\Api\V1\Admin\HeroProfileController@show`, `@update`
* **API Endpoints:**
  * `GET /api/v1/profile` (Public)
  * `GET /api/v1/admin/hero` (Protected: `auth:sanctum`)
  * `PUT /api/v1/admin/hero` (Protected: `auth:sanctum`)
* **Admin CMS Page:** `/admin/settings` (Tab 2: Hero Narrative Editor)
* **Frontend API Client:** `getHeroProfile()` (`lib/api.ts`), `getAdminHero()`, `updateAdminHero()` (`lib/adminApi.ts`)
* **Frontend Components:**
  * `Hero.tsx` (Full name, primary title, secondary title, bio narrative)
  * `ResumeModal.tsx` (Full name, primary title, secondary title, executive summary)
* **Public Route:** `http://localhost:3000#about`

---

## 3. Technical Skills Matrix
* **Database Tables:** `skill_categories`, `skills`
* **Backend Models:** `App\Models\SkillCategory`, `App\Models\Skill`
* **Backend Controllers:**
  * Public: `App\Http\Controllers\Api\V1\SkillsController@index`
  * Admin: `App\Http\Controllers\Api\V1\Admin\SkillCategoryController`, `App\Http\Controllers\Api\V1\Admin\SkillController`
* **API Endpoints:**
  * `GET /api/v1/skills` (Public)
  * `GET /api/v1/admin/skills` (Protected: `auth:sanctum`)
  * `POST /api/v1/admin/skills/categories`, `PUT /api/v1/admin/skills/categories/{id}`, `DELETE /api/v1/admin/skills/categories/{id}`
  * `POST /api/v1/admin/skills`, `PUT /api/v1/admin/skills/{id}`, `DELETE /api/v1/admin/skills/{id}`, `POST /api/v1/admin/skills/reorder`
* **Admin CMS Page:** `/admin/skills` (`app/admin/skills/page.tsx`)
* **Frontend API Client:** `getSkills()` (`lib/api.ts`), `getAdminSkills()`, `createAdminSkillCategory()`, `createAdminSkill()`, `deleteAdminSkill()` (`lib/adminApi.ts`)
* **Frontend Components:**
  * `SkillsBento.tsx` (Category tabs, skill items, proficiency levels: *Strong/Primary* vs *Working*, level labels)
  * `ResumeModal.tsx` (Primary & secondary skill categorization)
* **Public Route:** `http://localhost:3000#skills`

---

## 4. Professional Work Experience
* **Database Table:** `work_experiences`
* **Backend Model:** `App\Models\WorkExperience`
* **Backend Controllers:**
  * Public: `App\Http\Controllers\Api\V1\ExperienceController@work`
  * Admin: `App\Http\Controllers\Api\V1\Admin\WorkExperienceController` (Full CRUD)
* **API Endpoints:**
  * `GET /api/v1/experience/work` (Public)
  * `GET /api/v1/admin/experience/work`, `POST /api/v1/admin/experience/work`, `GET /api/v1/admin/experience/work/{id}`, `PUT /api/v1/admin/experience/work/{id}`, `DELETE /api/v1/admin/experience/work/{id}`
* **Admin CMS Page:** `/admin/experience` (`app/admin/experience/page.tsx`)
* **Frontend API Client:** `getWorkExperience()` (`lib/api.ts`), `getAdminWorkExperience()`, `createAdminWorkExperience()`, `deleteAdminWorkExperience()` (`lib/adminApi.ts`)
* **Frontend Components:**
  * `WorkExperience.tsx` (Interactive experience slider, company tab jump buttons, responsibilities list, tech stack tags)
  * `ResumeModal.tsx` (Career history list, positions, dates)
* **Public Route:** `http://localhost:3000#experience`

---

## 5. Freelance Experience & Practice Suites
* **Database Table:** `freelance_suites`
* **Backend Model:** `App\Models\FreelanceSuite`
* **Backend Controllers:**
  * Public: `App\Http\Controllers\Api\V1\ExperienceController@freelance`
  * Admin: `App\Http\Controllers\Api\V1\Admin\FreelanceSuiteController` (Full CRUD)
* **API Endpoints:**
  * `GET /api/v1/experience/freelance` (Public)
  * `GET /api/v1/admin/experience/freelance`, `POST /api/v1/admin/experience/freelance`, `PUT /api/v1/admin/experience/freelance/{id}`, `DELETE /api/v1/admin/experience/freelance/{id}`
* **Admin CMS Page:** `/admin/experience`
* **Frontend API Client:** `getFreelanceSuites()` (`lib/api.ts`)
* **Frontend Components:**
  * `FreelanceExperience.tsx` (Studio Bento suites, suite numbers, capability bullets, contact triggers)
* **Public Route:** `http://localhost:3000#freelance`

---

## 6. Design Experience & UI/UX Capabilities
* **Database Table:** `design_experiences`
* **Backend Model:** `App\Models\DesignExperience`
* **Backend Controllers:**
  * Public: `App\Http\Controllers\Api\V1\ExperienceController@design`
  * Admin: `App\Http\Controllers\Api\V1\Admin\DesignExperienceController` (Full CRUD)
* **API Endpoints:**
  * `GET /api/v1/experience/design` (Public)
  * `GET /api/v1/admin/experience/design`, `POST /api/v1/admin/experience/design`, `PUT /api/v1/admin/experience/design/{id}`, `DELETE /api/v1/admin/experience/design/{id}`
* **Admin CMS Page:** `/admin/experience`
* **Frontend API Client:** `getDesignExperience()` (`lib/api.ts`)
* **Frontend Components:**
  * `DesignExperience.tsx` (Visual capabilities grid, tags, philosophy banner)
* **Public Route:** `http://localhost:3000#design`

---

## 7. Higher Education
* **Database Table:** `education`
* **Backend Model:** `App\Models\Education`
* **Backend Controllers:**
  * Public: `App\Http\Controllers\Api\V1\ExperienceController@education`
  * Admin: `App\Http\Controllers\Api\V1\Admin\EducationController` (Full CRUD)
* **API Endpoints:**
  * `GET /api/v1/experience/education` (Public)
  * `GET /api/v1/admin/experience/education`, `POST /api/v1/admin/experience/education`, `PUT /api/v1/admin/experience/education/{id}`, `DELETE /api/v1/admin/experience/education/{id}`
* **Admin CMS Page:** `/admin/experience`
* **Frontend API Client:** `getEducation()` (`lib/api.ts`)
* **Frontend Components:**
  * `Education.tsx` (Degree, Institution, Core Coursework matrix)
  * `ResumeModal.tsx` (Academic credentials in printable CV)
* **Public Route:** `http://localhost:3000#education`

---

## 8. Featured Software Projects & Case Studies
* **Database Table:** `projects`
* **Backend Model:** `App\Models\Project`
* **Backend Controllers:**
  * Public: `App\Http\Controllers\Api\V1\ProjectController@index`, `@show`
  * Admin: `App\Http\Controllers\Api\V1\Admin\ProjectController` (Full CRUD, publish toggle, reorder)
* **API Endpoints:**
  * `GET /api/v1/projects` (Public)
  * `GET /api/v1/projects/{slug}` (Public dynamic case study)
  * `GET /api/v1/admin/projects`, `POST /api/v1/admin/projects`, `PUT /api/v1/admin/projects/{id}`, `DELETE /api/v1/admin/projects/{id}`, `PATCH /api/v1/admin/projects/{id}/publish`, `POST /api/v1/admin/projects/reorder`
* **Admin CMS Page:** `/admin/projects` (`app/admin/projects/page.tsx`)
* **Frontend API Client:** `getProjects()`, `getProjectBySlug()` (`lib/api.ts`), `getAdminProjects()`, `createAdminProject()`, `updateAdminProject()`, `deleteAdminProject()`, `toggleAdminProjectPublish()` (`lib/adminApi.ts`)
* **Frontend Components:**
  * `ProjectShowcase.tsx` (Swiper carousel, jump tabs, role, metrics, key deliverables, image lightboxes)
  * `app/projects/[slug]/page.tsx` (Full case study architectural deep-dive, deliverables matrix)
* **Public Route:** `http://localhost:3000#projects`, `http://localhost:3000/projects/[slug]`

---

## 9. Services & Development Philosophy
* **Database Tables:** `services`, `philosophies`
* **Backend Models:** `App\Models\Service`, `App\Models\Philosophy`
* **Backend Controllers:**
  * Public: `App\Http\Controllers\Api\V1\ServiceController@index`, `App\Http\Controllers\Api\V1\PhilosophyController@index`
  * Admin: `App\Http\Controllers\Api\V1\Admin\ServiceController`, `App\Http\Controllers\Api\V1\Admin\PhilosophyController` (Full CRUD)
* **API Endpoints:**
  * `GET /api/v1/services`, `GET /api/v1/philosophies` (Public)
  * `GET /api/v1/admin/services`, `POST /api/v1/admin/services`, `PUT /api/v1/admin/services/{id}`, `DELETE /api/v1/admin/services/{id}`
  * `GET /api/v1/admin/philosophies`, `POST /api/v1/admin/philosophies`, `PUT /api/v1/admin/philosophies/{id}`, `DELETE /api/v1/admin/philosophies/{id}`
* **Admin CMS Page:** `/admin/settings`
* **Frontend API Client:** `getServices()`, `getPhilosophies()` (`lib/api.ts`)
* **Frontend Components:**
  * `ServicesAndPhilosophy.tsx` (8 Clean service offering cards, 5 guiding principles)
* **Public Route:** `http://localhost:3000#services`

---

## 10. Client Reviews & Feedback Moderation
* **Database Table:** `reviews`
* **Backend Model:** `App\Models\Review`
* **Backend Controllers:**
  * Public: `App\Http\Controllers\Api\V1\ReviewController@index`, `@store`, `@like`
  * Admin: `App\Http\Controllers\Api\V1\Admin\ReviewController` (List, approve/reject toggle, delete)
* **API Endpoints:**
  * `GET /api/v1/reviews` (Public - approved only)
  * `POST /api/v1/reviews` (Public - user submission with anti-spam check)
  * `POST /api/v1/reviews/{id}/like` (Public - like increment)
  * `GET /api/v1/admin/reviews`, `PATCH /api/v1/admin/reviews/{id}/approve`, `DELETE /api/v1/admin/reviews/{id}`
* **Admin CMS Page:** `/admin/reviews` (`app/admin/reviews/page.tsx`)
* **Frontend API Client:** `getReviews()`, `submitReview()`, `likeReview()` (`lib/api.ts`), `getAdminReviews()`, `toggleAdminReviewApproval()`, `deleteAdminReview()` (`lib/adminApi.ts`)
* **Frontend Components:**
  * `ReviewsAndFeedback.tsx` (Review cards, 5-star ratings, interactive like button, submission modal form)
* **Public Route:** `http://localhost:3000#feedback`

---

## 11. Contact Inquiries & Admin Inbox
* **Database Table:** `contact_submissions`
* **Backend Model:** `App\Models\ContactSubmission`
* **Backend Controllers:**
  * Public: `App\Http\Controllers\Api\V1\ContactController@store`
  * Admin: `App\Http\Controllers\Api\V1\Admin\InboxController` (Index, show, status update, delete)
* **API Endpoints:**
  * `POST /api/v1/contact` (Public - rate limited, honeypot spam protection)
  * `GET /api/v1/admin/inbox`, `GET /api/v1/admin/inbox/{id}`, `PATCH /api/v1/admin/inbox/{id}/status`, `DELETE /api/v1/admin/inbox/{id}`
* **Admin CMS Page:** `/admin/inbox` (`app/admin/inbox/page.tsx`)
* **Frontend API Client:** `submitContact()` (`lib/api.ts`), `getAdminInbox()`, `getAdminInboxDetail()`, `updateAdminInboxStatus()`, `deleteAdminInbox()` (`lib/adminApi.ts`)
* **Frontend Components:**
  * `ContactModal.tsx` (Contact inquiry modal form with real-time submit, validation, error/success toasts)
* **Public Route:** Triggered via any *"Let's Connect"* / *"Let's Talk"* buttons.

---

## 12. Media Assets Library & Storage
* **Database Table:** `media_assets`
* **Backend Model:** `App\Models\MediaAsset`
* **Backend Controller:** `App\Http\Controllers\Api\V1\Admin\MediaController`
* **API Endpoints:**
  * `POST /api/v1/admin/media/upload` (Protected: `auth:sanctum`)
  * `GET /api/v1/admin/media`, `GET /api/v1/admin/media/{id}`, `PUT /api/v1/admin/media/{id}`, `DELETE /api/v1/admin/media/{id}`
* **Admin CMS Page:** `/admin/media` (`app/admin/media/page.tsx`)
* **Frontend API Client:** `getAdminMedia()`, `uploadAdminMedia()`, `deleteAdminMedia()` (`lib/adminApi.ts`)
* **Frontend Components:**
  * Embedded directly in Project, Hero, and CMS image selection workflows.
