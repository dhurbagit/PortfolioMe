# Dhurba Dhakal — Personal Developer Portfolio & Secure Headless CMS

> **Production-Ready Personal Developer Platform** built with **Next.js 16 (App Router)** and **Laravel 12 (PHP 8.2+) REST API Engine**.

---

## 📌 Executive Summary & Master Identity

- **Full Name:** **Dhurba Dhakal**
- **Primary Title:** *Full Stack Developer | Laravel & PHP Developer*
- **Secondary Title:** *Web Designer • Freelancer • Software Developer*
- **Experience:** 2+ Years Professional Software Development Experience
- **Primary Email:** `dhurba179@gmail.com`
- **Secondary Email:** `sharvikatech@gmail.com`
- **Location:** Nepal (UTC+5:45 Kathmandu)
- **Education:** *BSc IT — Lord Buddha Education Foundation*
- **Admin Model:** **Strict Single Administrator** (`dhurba179@gmail.com`) — *No public registration, multi-tenancy, or multi-vendor capabilities exist.*

---

## 🏛️ System Architecture & Technology Stack

```text
+-------------------------------------------------------------------------+
|                          CLIENT APPLICATION LAYER                       |
|   Next.js 16 (Turbopack) • React 19 • TailwindCSS • Framer Motion      |
|   • Public Portfolio UI: Responsive Bento Grids, Interactive Modals    |
|   • Dynamic Case Studies (/projects/[slug]) with Dynamic Metadata      |
|   • Admin CMS Dashboard (/admin) with Single-Admin Auth Guards         |
+-------------------------------------------------------------------------+
                                    ▲
                                    │ (HTTP / JSON / Bearer Sanctum Token)
                                    ▼
+-------------------------------------------------------------------------+
|                        HEADLESS REST API LAYER (v1)                     |
|   Laravel 12 Framework • PHP 8.2+ • Laravel Sanctum API Tokens          |
|   • Security Headers Middleware (CSP, Anti-Sniff, X-Frame SAMEORIGIN)   |
|   • Brute-Force Rate Limiting (5 login attempts / 15 mins)              |
|   • Contact Honeypot Anti-Spam Engine & IP Throttling                   |
|   • Immutable Audit Logging System (AuditLog Model)                     |
+-------------------------------------------------------------------------+
                                    ▲
                                    │ (Eloquent ORM / Relational DB)
                                    ▼
+-------------------------------------------------------------------------+
|                           DATABASE & STORAGE LAYER                      |
|   PostgreSQL 16+ (Primary DB) • MySQL 8.0+ / SQLite Support             |
|   • 18 Normalized Tables: users, settings, hero, skills, projects,     |
|     work_exp, freelance, design_exp, education, reviews, inbox, media  |
|   • Storage Disk with Symbolic Link (storage/app/public)                |
+-------------------------------------------------------------------------+
```

---

## 🚀 Quick Start & Local Development

### 1. Prerequisites
- **Node.js:** v20.x or v22.x
- **PHP:** v8.2+ with `pdo`, `sqlite`, `curl`, `mbstring`, `fileinfo` extensions
- **Composer:** v2.x
- **Git**

---

### 2. Backend Setup (Laravel 12 API)
```bash
# 1. Navigate to backend directory
cd backend

# 2. Install PHP dependencies
composer install

# 3. Environment configuration
cp .env.example .env
php artisan key:generate

# 4. Run database migrations & seed Dhurba Dhakal's profile data
php artisan migrate:fresh --seed

# 5. Create storage symbolic link for media assets
php artisan storage:link

# 6. Run automated test suite (51 tests / 417 assertions)
php artisan test

# 7. Start Laravel API server (Port 8000)
php artisan serve --port=8000
```
> **Backend API Health Check:** [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)

---

### 3. Frontend Setup (Next.js 16 Web App & Admin Portal)
```bash
# 1. Return to project root
cd ..

# 2. Install Node dependencies
npm install

# 3. Start Next.js development server (Port 3000)
npm run dev
```
> **Public Portfolio UI:** [http://localhost:3000](http://localhost:3000)  
> **Administrative CMS Portal:** [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🔐 Administrative CMS Access

| Property | Value |
| :--- | :--- |
| **Admin Login URL** | [http://localhost:3000/admin/login](http://localhost:3000/admin/login) |
| **Single Admin Email** | `dhurba179@gmail.com` |
| **Default Password** | `PortfolioSecureAdmin2026!` |
| **Security Shield** | Laravel Sanctum Token + Anti-Brute-Force Rate Limiting |

### Admin CMS Features:
1. **Overview Dashboard:** Live counters, system diagnostics, DB latency, memory usage, and recent activity logs.
2. **Website Settings & Hero:** Real-time editing of site branding, contact information, social links, and bio narratives.
3. **Projects & Case Studies:** Complete CRUD, publish/draft toggling, dynamic slug generator, deliverables builder, and tech stack tags.
4. **Skills Matrix:** Dynamic categorization, primary/working proficiency levels, and developer tooling badges.
5. **Experience & Roles:** Chronological career roles, freelance suites, and academic credentials.
6. **Contact Submissions Inbox:** Split-pane reader, status workflow (unread -> read -> replied -> archived), and deletion.
7. **Reviews Moderation:** 5-star rating inspections, instant public approval toggling, and testimonial curation.
8. **Media Manager:** Multi-format file uploads (JPG, PNG, WebP, SVG, PDF), one-click public URL copy, and disk purging.
9. **Audit Trail & Security:** Immutable log of all administrative actions, IP addresses, and diagnostic health telemetry.

---

## 📋 REST API Reference (`/api/v1`)

### 1. Public Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/health` | API health check & operational status |
| `GET` | `/api/v1/settings` | Public website settings & metadata |
| `GET` | `/api/v1/profile` | Hero profile, titles, and bio narrative |
| `GET` | `/api/v1/skills` | Technical skills matrix grouped by category |
| `GET` | `/api/v1/experience/work` | Professional work roles (NDPC, Nector Digit, Nepal Pasta) |
| `GET` | `/api/v1/experience/freelance` | Freelance service suites & capabilities |
| `GET` | `/api/v1/experience/design` | UI/UX & design engineering experience |
| `GET` | `/api/v1/experience/education` | Academic background & coursework |
| `GET` | `/api/v1/projects` | Published projects (`?category=`, `?featured=1`) |
| `GET` | `/api/v1/projects/{slug}` | Single project case study detail |
| `GET` | `/api/v1/services` | Service offerings & core disciplines |
| `GET` | `/api/v1/philosophies` | Guiding engineering principles |
| `GET` | `/api/v1/reviews` | Approved client testimonials |
| `POST` | `/api/v1/reviews` | Public visitor review submission |
| `POST` | `/api/v1/reviews/{id}/like` | Increment review helpful likes |
| `POST` | `/api/v1/contact` | Submit contact inquiry (Honeypot + Rate Limited) |

### 2. Authentication Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | Authenticate single admin & issue Sanctum token |
| `GET` | `/api/v1/auth/me` | Retrieve authenticated admin profile |
| `POST` | `/api/v1/auth/logout` | Revoke active Sanctum token |

### 3. Protected Admin Endpoints (`auth:sanctum`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/admin/dashboard` | Dashboard metrics & telemetry aggregate |
| `GET` | `/api/v1/admin/settings` | Retrieve full admin settings |
| `PUT` | `/api/v1/admin/settings` | Update global website settings |
| `GET` | `/api/v1/admin/hero` | Retrieve hero story configuration |
| `PUT` | `/api/v1/admin/hero` | Update hero story configuration |
| `GET/POST` | `/api/v1/admin/skills` | Skills matrix management |
| `GET/POST` | `/api/v1/admin/projects` | Projects & case studies CRUD |
| `PATCH` | `/api/v1/admin/projects/{id}/publish` | Toggle project published / draft state |
| `GET/POST` | `/api/v1/admin/experience/work` | Work roles CRUD |
| `GET` | `/api/v1/admin/inbox` | List contact submissions with status filter |
| `GET` | `/api/v1/admin/inbox/{id}` | Read message (auto-marks as read) |
| `PATCH` | `/api/v1/admin/inbox/{id}/status` | Transition message status |
| `DELETE` | `/api/v1/admin/inbox/{id}` | Delete contact submission |
| `GET` | `/api/v1/admin/reviews` | List all reviews for moderation |
| `PATCH` | `/api/v1/admin/reviews/{id}/approve` | Toggle review approval state |
| `POST` | `/api/v1/admin/media/upload` | Upload media asset (MIME validation, 10MB) |
| `GET` | `/api/v1/admin/media` | List media library assets |
| `DELETE` | `/api/v1/admin/media/{id}` | Delete media asset from DB & physical storage |
| `GET` | `/api/v1/admin/audit-logs` | Search & inspect immutable audit trail |
| `GET` | `/api/v1/admin/system/status` | Real-time DB latency, disk & memory diagnostics |

---

## 🛡️ Security & Defense Architecture

1. **Strict Single-Administrator Enforcement:**
   - Database seeder guarantees exactly one administrator.
   - Public user registration routes do not exist.
2. **HTTP Security Headers Middleware (`SecurityHeadersMiddleware.php`):**
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: SAMEORIGIN` (Anti-clickjacking)
   - `X-XSS-Protection: 1; mode=block`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
3. **Anti-Spam Honeypot Engine:**
   - Contact submissions include hidden trap field `website_hp`. Automated spam bots are silently discarded.
4. **Brute-Force & IP Rate Limiting:**
   - Admin login throttled at 5 attempts per 15 minutes.
   - Contact submissions throttled at 5 per 10 minutes per IP.
5. **Token Invalidation & Session Hygiene:**
   - Sanctum tokens are cryptographically hashed and revoked upon sign-out.

---

## 🚢 Production Deployment Guide

### Option A: Frontend on Vercel + Backend on VPS (Recommended)
1. **Frontend (Vercel):**
   - Link GitHub repository to Vercel.
   - Set environment variable: `NEXT_PUBLIC_API_URL=https://api.dhurbadhakal.com.np/api/v1`
   - Set environment variable: `NEXT_PUBLIC_SITE_URL=https://dhurbadhakal.com.np`
   - Deploy with standard Next.js build command (`npm run build`).

2. **Backend (Ubuntu VPS / Nginx / PHP 8.2+ / MySQL):**
   - Clone repository onto VPS in `/var/www/portfolio-backend`.
   - Configure `.env`:
     ```env
     APP_ENV=production
     APP_DEBUG=false
     APP_URL=https://api.dhurbadhakal.com.np
     FRONTEND_URL=https://dhurbadhakal.com.np
     SANCTUM_STATEFUL_DOMAINS=dhurbadhakal.com.np
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_DATABASE=dhurba_portfolio
     DB_USERNAME=dhurba_user
     DB_PASSWORD=your_secure_password
     ```
   - Run production optimizations:
     ```bash
     composer install --optimize-autoloader --no-dev
     php artisan migrate --force
     php artisan db:seed --force
     php artisan config:cache
     php artisan route:cache
     php artisan view:cache
     php artisan storage:link
     ```

---

## 🧪 Automated Testing Verification

```text
Test Suite Summary:
- PHPUnit / Pest Feature Tests: 51 Passed (417 Assertions)
- Next.js Production Build: 15 Routes Generated (0 Errors)
- Static Analysis: 100% Clean TypeScript Compilation
- Execution Time: ~1.9s
```

---

## 👤 Author & Developer

**Dhurba Dhakal**  
*Full Stack Developer | Laravel & PHP Developer*  
- **GitHub:** [https://github.com/dhurbagit](https://github.com/dhurbagit)  
- **Email:** `dhurba179@gmail.com` • `sharvikatech@gmail.com`  
- **Location:** Nepal (UTC+5:45)