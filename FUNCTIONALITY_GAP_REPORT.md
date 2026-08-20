# FUNCTIONALITY GAP REPORT — DHURBA DHAKAL PORTFOLIO & CMS

**Audit Date:** August 19, 2026  
**Auditor:** Senior Full-Stack & Security Engineer  
**Scope:** Complete End-to-End Application Audit (Database → Backend API → Admin CMS → Next.js Frontend)

---

## Executive Summary of Findings

| Category | Total Checked | Healthy / Passed | Gaps / Action Required |
| :--- | :---: | :---: | :---: |
| **Backend REST API Endpoints** | 42 | 41 | 1 (Minor query parameter filter) |
| **Database Tables & Migrations** | 14 | 14 | 0 |
| **Admin CMS UI Pages** | 10 | 8 | 2 (Experience tabs expansion & Services tab) |
| **Frontend Public Components** | 15 | 13 | 2 (DesignExperience dynamic props, SEO server metadata) |
| **Security & Authentication** | 12 | 12 | 0 |
| **Automated Tests (PHPUnit)** | 51 tests / 417 assertions | 51 passed | 0 |

---

## Detailed Gap Analysis by Component

### 1. Frontend Design Experience Component (`components/DesignExperience.tsx`)
* **Current State:** The component renders `DESIGN_CAPABILITIES` from a static array.
* **Backend State:** Fully implemented backend API `GET /api/v1/experience/design`, `App\Models\DesignExperience`, and database table `design_experiences`.
* **Gap:** `lib/api.ts` lacks a helper for `getDesignExperience()`, and `DesignExperience.tsx` needs to accept `capabilitiesData?: any[]` to consume live data when updated via the backend.
* **Severity:** Medium (Content-to-Code binding gap).
* **Fix Plan:** Add `getDesignExperience()` in `lib/api.ts`, bind props in `components/DesignExperience.tsx`, and pass live data from `app/page.tsx`.

---

### 2. Admin Experience Management Page (`app/admin/experience/page.tsx`)
* **Current State:** The admin page currently manages `work_experiences` records.
* **Backend State:** The backend API already supports full CRUD for `work`, `freelance`, `design`, and `education`.
* **Gap:** The Admin Experience UI lacks tabbed navigation to switch between:
  1. *Professional Work Experience*
  2. *Freelance Practice Suites*
  3. *Design & UI/UX Capabilities*
  4. *Higher Education & Degrees*
* **Severity:** Medium (Admin UI feature completeness).
* **Fix Plan:** Add clean subtab switching in `app/admin/experience/page.tsx` with dedicated creation forms for Freelance suites, Design capabilities, and Education records.

---

### 3. Admin Settings Page — Services & Philosophy Editor (`app/admin/settings/page.tsx`)
* **Current State:** The settings page has Tab 1 (*Global Settings*) and Tab 2 (*Hero Narrative*).
* **Backend State:** Backend API supports full CRUD for `services` and `philosophies`.
* **Gap:** The CMS settings UI does not have Tab 3 (*Services & Capabilities*) and Tab 4 (*Engineering Philosophies*) to edit service items and philosophy principles directly.
* **Severity:** Low-Medium.
* **Fix Plan:** Add Tab 3 (*Services Offerings Editor*) and Tab 4 (*Philosophies Editor*) to `app/admin/settings/page.tsx`.

---

### 4. Dynamic SEO Server-Side Metadata in Next.js Root Layout (`app/layout.tsx`)
* **Current State:** `app/layout.tsx` has comprehensive static OpenGraph and Twitter metadata.
* **Backend State:** `GET /api/v1/settings` provides live `site_title` and `meta_description`.
* **Gap:** `app/layout.tsx` is static by default. While client-side components update dynamically, search crawler metadata should optionally fetch from `getGlobalSettings()`.
* **Severity:** Low (SEO enhancement).
* **Fix Plan:** Export dynamic `generateMetadata()` in `app/layout.tsx` with `getGlobalSettings()` for search engines.

---

### 5. Media Asset Absolute URL Resolution in Uploads
* **Current State:** Images uploaded via `/api/v1/admin/media/upload` are stored in Laravel `storage/app/public/portfolio` and returned with `/storage/...` relative paths.
* **Backend State:** Symlink `public/storage` exists.
* **Gap:** If Next.js runs on `http://localhost:3000` and Laravel on `http://localhost:8000`, relative image URLs (`/storage/...`) must be prefixed with `http://localhost:8000` or served via Next.js proxy if not already absolute.
* **Severity:** Low-Medium.
* **Fix Plan:** Add image URL resolver utility in `lib/utils.ts` to prepend `API_BASE_URL` origin for `/storage/` paths.

---

## Security Audit Summary

| Security Check | Status | Verification Detail |
| :--- | :---: | :--- |
| **SQL Injection** | **PROTECTED** | 100% Eloquent ORM & parameterized queries across all controllers. |
| **XSS Protection** | **PROTECTED** | React JSX auto-escapes all inputs; Laravel strips malicious tags. |
| **CSRF Protection** | **PROTECTED** | Token mismatch resolved via Sanctum bearer tokens & exempt API prefixes. |
| **Authentication Gate** | **PROTECTED** | Strict `auth:sanctum` middleware on all `/api/v1/admin/*` endpoints. |
| **Single Admin Isolation** | **PROTECTED** | Only `dhurba179@gmail.com` can authenticate; no public registration route. |
| **Spam & Rate Limiting** | **PROTECTED** | `throttle:10,1` on contact form, `throttle:5,1` on admin login, honeypot active. |
| **Security Headers** | **PROTECTED** | `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`. |
| **Audit Logging** | **PROTECTED** | Immutable action logging for settings, projects, experiences, and media changes. |
