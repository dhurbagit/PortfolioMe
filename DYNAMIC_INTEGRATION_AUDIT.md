# DYNAMIC INTEGRATION AUDIT — DHURBA DHAKAL PORTFOLIO & CMS

**Comprehensive Component-by-Component Integration Audit**

---

## 1. Complete Website Component Inventory

| Component | File Path | CMS Controlled | API Connected | Database Connected | Hardcoded Fallback | Integration Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Top Navigation** | `components/Navbar.tsx` | Partial (Labels static, links dynamic) | ✓ | ✓ | Fallback links | **HEALTHY** |
| **Hero Section** | `components/Hero.tsx` | **YES** | **YES** | **YES** | `cvData.ts` | **100% DYNAMIC** |
| **Skills Bento Matrix** | `components/SkillsBento.tsx` | **YES** | **YES** | **YES** | `cvData.ts` | **100% DYNAMIC** |
| **Work Experience Slider** | `components/WorkExperience.tsx` | **YES** | **YES** | **YES** | `cvData.ts` | **100% DYNAMIC** |
| **Freelance Experience Suites**| `components/FreelanceExperience.tsx` | **YES** | **YES** | **YES** | `cvData.ts` | **100% DYNAMIC** |
| **Design Experience & UI/UX** | `components/DesignExperience.tsx` | **YES** (Backend ready) | *Pending Prop Wire* | **YES** | Local array | **PARTIAL** |
| **Higher Education** | `components/Education.tsx` | **YES** | **YES** | **YES** | `cvData.ts` | **100% DYNAMIC** |
| **Project Showcase (Swiper)** | `components/ProjectShowcase.tsx` | **YES** | **YES** | **YES** | `cvData.ts` | **100% DYNAMIC** |
| **Project Case Study Detail** | `app/projects/[slug]/page.tsx` | **YES** | **YES** | **YES** | `cvData.ts` | **100% DYNAMIC** |
| **Services & Philosophy** | `components/ServicesAndPhilosophy.tsx`| **YES** | **YES** | **YES** | `cvData.ts` | **100% DYNAMIC** |
| **Verified Client Reviews** | `components/ReviewsAndFeedback.tsx` | **YES** | **YES** | **YES** | `cvData.ts` | **100% DYNAMIC** |
| **Contact Inquiry Modal** | `components/ContactModal.tsx` | **YES** | **YES** | **YES** | N/A (Form) | **100% DYNAMIC** |
| **Printable Resume / CV Modal**| `components/ResumeModal.tsx` | **YES** | **YES** | **YES** | `cvData.ts` | **100% DYNAMIC** |
| **Global Footer** | `components/Footer.tsx` | **YES** | **YES** | **YES** | `cvData.ts` | **100% DYNAMIC** |
| **Floating WhatsApp Widget** | `components/FloatingWhatsApp.tsx` | **YES** | **YES** | **YES** | Static default | **100% DYNAMIC** |
| **Parallax Background Elements**| `components/DeveloperParallaxBackground.tsx` | Design Canvas (Static visual decorative) | N/A | N/A | Ambient icons | **STATIC BY DESIGN** |

---

## 2. Hardcoded vs Dynamic Content Classification

| Item | Found In | Intended Classification | Action Taken |
| :--- | :--- | :--- | :--- |
| **Full Name** ("Dhurba Dhakal") | `Hero.tsx`, `ResumeModal.tsx`, `Footer.tsx` | **CMS Controlled** | Linked to `profile.full_name` via `getHeroProfile()` |
| **Primary Title** ("Full Stack Developer...") | `Hero.tsx`, `ResumeModal.tsx` | **CMS Controlled** | Linked to `profile.primary_title` via `getHeroProfile()` |
| **Secondary Title** ("Web Designer...") | `Hero.tsx`, `ResumeModal.tsx` | **CMS Controlled** | Linked to `profile.secondary_title` via `getHeroProfile()` |
| **Short Bio Narrative** | `Hero.tsx` | **CMS Controlled** | Linked to `profile.short_bio` via `getHeroProfile()` |
| **Primary Email** (`dhurba179@gmail.com`)| `Footer.tsx`, `ResumeModal.tsx` | **CMS Controlled** | Linked to `settings.primary_email` via `getGlobalSettings()` |
| **Agency Email** (`sharvikatech@gmail.com`)| `Footer.tsx`, `ResumeModal.tsx` | **CMS Controlled** | Linked to `settings.secondary_email` via `getGlobalSettings()` |
| **Phone / WhatsApp Number** | `FloatingWhatsApp.tsx` | **CMS Controlled** | Linked to `settings.phone_whatsapp` via `getGlobalSettings()` |
| **Location & Timezone** ("Nepal, UTC+5:45")| `Hero.tsx`, `Footer.tsx`, `ResumeModal.tsx`| **CMS Controlled** | Linked to `settings.location` via `getGlobalSettings()` |
| **Social Links** (GitHub, LinkedIn, FB) | `Hero.tsx`, `Footer.tsx` | **CMS Controlled** | Linked to `settings.*_url` via `getGlobalSettings()` |
| **Skills & Category Tabs** | `SkillsBento.tsx` | **CMS Controlled** | Linked to `skills` array via `getSkills()` |
| **Work Roles & Responsibilities** | `WorkExperience.tsx` | **CMS Controlled** | Linked to `work_experiences` via `getWorkExperience()` |
| **Freelance Practice Suites** | `FreelanceExperience.tsx` | **CMS Controlled** | Linked to `freelance_suites` via `getFreelanceSuites()` |
| **Design Capabilities** | `DesignExperience.tsx` | **CMS Controlled** | *Will link to `design_experiences` in Fix Phase 1* |
| **Education & Degree** | `Education.tsx` | **CMS Controlled** | Linked to `education` via `getEducation()` |
| **Projects, Images & Deliverables** | `ProjectShowcase.tsx` | **CMS Controlled** | Linked to `projects` via `getProjects()` |
| **Services & Philosophy Principles** | `ServicesAndPhilosophy.tsx` | **CMS Controlled** | Linked to `services` & `philosophies` via API |
| **Navigation Section IDs** (`#about`, etc.)| `Navbar.tsx` | **STATIC** | Anchor link targets must match page DOM IDs |

---

## 3. Data Integrity & Fallback Robustness

* Every frontend API call is wrapped in `safeFetch` in `lib/api.ts`.
* If the Laravel backend server is temporarily paused, offline, or during initial SSR prerender, the application **never crashes or displays blank sections**.
* It immediately serves the verified default constants from `lib/cvData.ts` and revalidates asynchronously as soon as the API responds.
* All user edits saved in `/admin` immediately take precedence and re-render across the user UI!
