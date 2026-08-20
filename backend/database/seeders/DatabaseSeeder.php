<?php

namespace Database\Seeders;

use App\Models\DesignExperience;
use App\Models\Education;
use App\Models\FreelanceSuite;
use App\Models\GlobalSetting;
use App\Models\HeroProfile;
use App\Models\Philosophy;
use App\Models\Project;
use App\Models\Review;
use App\Models\Service;
use App\Models\Skill;
use App\Models\SkillCategory;
use App\Models\User;
use App\Models\WorkExperience;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database with Dhurba Dhakal's authentic portfolio data.
     */
    public function run(): void
    {
        // 1. Single Administrator Account
        User::updateOrCreate(
            ['email' => 'dhurba179@gmail.com'],
            [
                'name' => 'Dhurba Dhakal',
                'password' => Hash::make(env('ADMIN_DEFAULT_PASSWORD', '123456789')),
                'email_verified_at' => now(),
            ]
        );

        // 2. Global Settings
        GlobalSetting::updateOrCreate(
            ['id' => 1],
            [
                'site_title' => 'Dhurba Dhakal | Full Stack Developer | Laravel & PHP Developer',
                'meta_description' => 'Portfolio of Dhurba Dhakal, Full Stack Developer with 2+ years of experience specializing in Laravel, PHP, MySQL, REST APIs, dynamic CMS platforms, and modern web applications with React, Next.js, Node.js, and PostgreSQL.',
                'primary_email' => 'dhurba179@gmail.com',
                'secondary_email' => 'sharvikatech@gmail.com',
                'phone_whatsapp' => '+9779800000000',
                'location' => 'Nepal',
                'timezone' => 'UTC+5:45 (NPT)',
                'github_url' => 'https://github.com/dhurbagit',
                'linkedin_url' => 'https://linkedin.com',
                'facebook_url' => 'https://facebook.com',
                'availability_status' => 'Full-Time • Remote • Freelance Ready',
                'experience_badge' => '2+ Years Experience',
                'copyright_text' => '© ' . date('Y') . ' Dhurba Dhakal. All rights reserved.',
                'is_available_for_hire' => true,
            ]
        );

        // 3. Hero & Profile
        HeroProfile::updateOrCreate(
            ['id' => 1],
            [
                'full_name' => 'Dhurba Dhakal',
                'primary_title' => 'Full Stack Developer | Laravel & PHP Developer',
                'secondary_title' => 'Web Designer • Freelancer • Software Developer',
                'short_bio' => 'Software Developer and Web Designer with 2+ years of professional software development experience specializing in PHP and Laravel applications. Proven expertise in engineering transactional web platforms, dynamic CMS architectures, RESTful APIs, relational databases, responsive frontend interfaces, and business workflow software.',
                'full_bio' => 'I am a dedicated Full Stack Developer based in Nepal with hands-on professional experience in software engineering, backend architecture, and user interface design. Over the past 2+ years, I have engineered mission-critical payment management systems, dynamic enterprise CMS platforms, inventory tracking solutions, and responsive client websites. My technical philosophy centers on writing clean, maintainable, object-oriented code that delivers measurable business value.',
                'highlights' => [
                    'Specialized in PHP, Laravel Framework, MVC, and Eloquent ORM',
                    'Engineered transactional financial and business software platforms',
                    'Experienced in full lifecycle design-to-deployment workflows',
                    'Degree in Information Technology (BSc IT)',
                ],
                'is_active' => true,
            ]
        );

        // 4. Skill Categories & Skills
        $backendCategory = SkillCategory::updateOrCreate(
            ['slug' => 'backend'],
            [
                'name' => 'Backend & APIs',
                'icon_key' => 'Terminal',
                'description' => 'Core backend engineering focusing on secure MVC architecture, RESTful API design, and high-integrity business logic.',
                'philosophy_highlights' => [
                    'Secure Architecture: Building hardened server-side endpoints with validation and error boundaries.',
                    'Data Integrity: Strict transaction control and idempotent API behaviors.',
                    'Maintainable MVC: Clean separation of concerns between controllers, models, and domain logic.',
                ],
                'display_order' => 1,
                'is_visible' => true,
            ]
        );

        $backendSkills = [
            ['name' => 'PHP (PHP 8+)', 'proficiency_type' => 'primary', 'level_label' => 'Primary Specialization', 'context' => 'Modern PHP, OOP, Types, Dependency Injection'],
            ['name' => 'Laravel Framework', 'proficiency_type' => 'primary', 'level_label' => 'Primary Specialization', 'context' => 'MVC, Eloquent ORM, Blade, Routing, Middleware, Queues'],
            ['name' => 'RESTful API Engineering', 'proficiency_type' => 'primary', 'level_label' => 'Primary Specialization', 'context' => 'API Resources, JSON responses, Authentication'],
            ['name' => 'Node.js & Express.js', 'proficiency_type' => 'working', 'level_label' => 'Working Experience', 'context' => 'Server runtimes, microservices, asynchronous I/O'],
            ['name' => 'Authentication & Middleware', 'proficiency_type' => 'primary', 'level_label' => 'Primary Specialization', 'context' => 'Sanctum, JWT, session security, rate limiting'],
        ];

        foreach ($backendSkills as $i => $skill) {
            Skill::updateOrCreate(
                ['skill_category_id' => $backendCategory->id, 'name' => $skill['name']],
                [
                    'proficiency_type' => $skill['proficiency_type'],
                    'level_label' => $skill['level_label'],
                    'context' => $skill['context'],
                    'display_order' => $i + 1,
                    'is_visible' => true,
                ]
            );
        }

        $frontendCategory = SkillCategory::updateOrCreate(
            ['slug' => 'frontend'],
            [
                'name' => 'Frontend & UI Design',
                'icon_key' => 'Layout',
                'description' => 'Creating responsive, accessible, and dynamic interfaces that bridge visual aesthetics and technical performance.',
                'philosophy_highlights' => [
                    'Mobile-First Responsiveness: Fluid cross-device usability across mobile, tablet, and desktop.',
                    'Intuitive Ergonomics: Clean visual hierarchy that reduces cognitive friction for end-users.',
                    'Component Modularization: Reusable, maintainable frontend structures.',
                ],
                'display_order' => 2,
                'is_visible' => true,
            ]
        );

        $frontendSkills = [
            ['name' => 'HTML5 / Modern CSS3', 'proficiency_type' => 'primary', 'level_label' => 'Primary Specialization', 'context' => 'Semantic layouts, Flexbox, CSS Grid, animations'],
            ['name' => 'JavaScript (ES6+)', 'proficiency_type' => 'primary', 'level_label' => 'Primary Specialization', 'context' => 'DOM manipulation, async/await, event handling, fetch'],
            ['name' => 'React.js & Next.js', 'proficiency_type' => 'working', 'level_label' => 'Working Experience', 'context' => 'Components, hooks, SSR, App Router, state management'],
            ['name' => 'Tailwind CSS & Bootstrap', 'proficiency_type' => 'primary', 'level_label' => 'Primary Specialization', 'context' => 'Responsive styling, design systems, utility patterns'],
            ['name' => 'jQuery & AJAX', 'proficiency_type' => 'primary', 'level_label' => 'Primary Specialization', 'context' => 'Dynamic DOM updating, asynchronous server communication'],
        ];

        foreach ($frontendSkills as $i => $skill) {
            Skill::updateOrCreate(
                ['skill_category_id' => $frontendCategory->id, 'name' => $skill['name']],
                [
                    'proficiency_type' => $skill['proficiency_type'],
                    'level_label' => $skill['level_label'],
                    'context' => $skill['context'],
                    'display_order' => $i + 1,
                    'is_visible' => true,
                ]
            );
        }

        $dbCategory = SkillCategory::updateOrCreate(
            ['slug' => 'database'],
            [
                'name' => 'Database & Persistence',
                'icon_key' => 'Database',
                'description' => 'Relational database modeling, query optimization, indexing, and transactional integrity.',
                'philosophy_highlights' => [
                    'Normalized Schemas: Clean relational integrity with foreign key constraints.',
                    'Query Efficiency: Utilizing eager loading and indexes to prevent N+1 bottlenecks.',
                    'Migration Discipline: Predictable, version-controlled database schema evolution.',
                ],
                'display_order' => 3,
                'is_visible' => true,
            ]
        );

        $dbSkills = [
            ['name' => 'MySQL Database', 'proficiency_type' => 'primary', 'level_label' => 'Primary Specialization', 'context' => 'Relational design, indexing, foreign keys, query optimization'],
            ['name' => 'PostgreSQL', 'proficiency_type' => 'working', 'level_label' => 'Working Experience', 'context' => 'Complex querying, JSONB fields, transactions'],
            ['name' => 'Database Migrations & Seeders', 'proficiency_type' => 'primary', 'level_label' => 'Primary Specialization', 'context' => 'Version-controlled database evolutions, automated test fixtures'],
            ['name' => 'Eloquent ORM & Query Builder', 'proficiency_type' => 'primary', 'level_label' => 'Primary Specialization', 'context' => 'Eager loading, relationships, scopes, mutators'],
        ];

        foreach ($dbSkills as $i => $skill) {
            Skill::updateOrCreate(
                ['skill_category_id' => $dbCategory->id, 'name' => $skill['name']],
                [
                    'proficiency_type' => $skill['proficiency_type'],
                    'level_label' => $skill['level_label'],
                    'context' => $skill['context'],
                    'display_order' => $i + 1,
                    'is_visible' => true,
                ]
            );
        }

        $devopsCategory = SkillCategory::updateOrCreate(
            ['slug' => 'devops-tools'],
            [
                'name' => 'DevOps, CMS & Tools',
                'icon_key' => 'Wrench',
                'description' => 'Version control workflows, CMS administration, Linux server environments, and developer tooling.',
                'philosophy_highlights' => [
                    'Business Empowerment: Building systems that allow administrators to manage digital content effortlessly.',
                    'Consistent Environments: Leveraging Docker and Linux for dependable development cycles.',
                    'Authentic Engineering: Categorized real-world skills without inflated or arbitrary percentages.',
                ],
                'display_order' => 4,
                'is_visible' => true,
            ]
        );

        $devopsSkills = [
            ['name' => 'Git & GitHub Collaboration', 'proficiency_type' => 'primary', 'level_label' => 'Primary Specialization', 'context' => 'Branching, PRs, version history, release tagging'],
            ['name' => 'Custom CMS Development', 'proficiency_type' => 'primary', 'level_label' => 'Primary Specialization', 'context' => 'Admin portals, content moderation, media management'],
            ['name' => 'Docker & Containerization', 'proficiency_type' => 'tool', 'level_label' => 'Working Experience', 'context' => 'Reproducible dev environments, container configuration'],
            ['name' => 'Linux / Ubuntu Environments', 'proficiency_type' => 'tool', 'level_label' => 'Working Experience', 'context' => 'Server administration, shell commands, process management'],
            ['name' => 'Postman & API Testing', 'proficiency_type' => 'tool', 'level_label' => 'Primary Specialization', 'context' => 'Endpoint validation, authorization testing, payload mocks'],
        ];

        foreach ($devopsSkills as $i => $skill) {
            Skill::updateOrCreate(
                ['skill_category_id' => $devopsCategory->id, 'name' => $skill['name']],
                [
                    'proficiency_type' => $skill['proficiency_type'],
                    'level_label' => $skill['level_label'],
                    'context' => $skill['context'],
                    'display_order' => $i + 1,
                    'is_visible' => true,
                ]
            );
        }

        // 5. Work Experiences
        $experiences = [
            [
                'role_number' => '01',
                'company_name' => 'Nepal Digital Payment Company Limited',
                'position' => 'Developer',
                'status' => 'Currently Working',
                'location' => 'Nepal',
                'overview' => 'Currently working as a Developer at Nepal Digital Payment Company Limited, contributing to software development, transactional infrastructure, and technology-driven business solutions.',
                'responsibilities' => [
                    'Web application development and database-driven application engineering.',
                    'Backend development and business logic implementation with PHP and Laravel.',
                    'API development, third-party service integration, and frontend/backend integration.',
                    'Application maintenance, continuous debugging, and technical problem solving.',
                ],
                'tech_stack' => ['PHP', 'Laravel', 'JavaScript', 'MySQL', 'APIs', 'Git'],
                'accent_theme' => 'royal',
                'display_order' => 1,
            ],
            [
                'role_number' => '02',
                'company_name' => 'Nector Digit',
                'position' => 'Web Designer & Developer',
                'status' => 'Previous Role',
                'location' => 'Nepal',
                'overview' => 'Worked as a Web Designer and Developer, combining frontend design and web development to create responsive, functional, and visually engaging websites and digital solutions.',
                'responsibilities' => [
                    'Website design, UI implementation, and responsive layout engineering across all devices.',
                    'Frontend development using HTML, CSS, JavaScript, Bootstrap, jQuery, and AJAX.',
                    'Custom CMS integration, website customization, and client requirement implementation.',
                    'Website maintenance, cross-browser compatibility, and performance optimization.',
                ],
                'tech_stack' => ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'PHP', 'Laravel'],
                'accent_theme' => 'indigo',
                'display_order' => 2,
            ],
            [
                'role_number' => '03',
                'company_name' => 'Nepal Pasta Food Company',
                'position' => 'Senior IT Manager',
                'status' => 'Previous Role',
                'location' => 'Nepal',
                'overview' => 'Worked as a Senior IT Manager with responsibility for technology-related operations, digital systems, website management, IT coordination, and technology-driven business requirements.',
                'responsibilities' => [
                    'IT management, digital operations, and business technology systems oversight.',
                    'Website management, CMS administration, and product information management.',
                    'Technology planning, technical coordination, and system administration.',
                    'Business requirement analysis and digital workflow improvement across departments.',
                ],
                'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'CMS', 'Web Technologies', 'SEO', 'Digital Systems'],
                'accent_theme' => 'crimson',
                'display_order' => 3,
            ],
        ];

        foreach ($experiences as $exp) {
            WorkExperience::updateOrCreate(
                ['company_name' => $exp['company_name']],
                $exp
            );
        }

        // 6. Freelance Studio Suites
        $suites = [
            [
                'suite_number' => '01',
                'title' => 'Full-Stack & Laravel Engineering',
                'subtitle' => 'Custom Web Applications & Backend Logic',
                'description' => 'End-to-end web application development using Laravel and modern PHP. Building scalable databases, clean MVC architectures, secure business workflows, and RESTful APIs tailored to specific client operations.',
                'capabilities' => [
                    'Custom Laravel Web Applications',
                    'RESTful API Development & Third-Party Integration',
                    'Relational Database Architecture & Optimization',
                    'Role-Based Access Control & Secure Authentication',
                    'Business Process Automation & Logic',
                ],
                'technologies' => ['Laravel', 'PHP 8+', 'MySQL', 'REST APIs', 'PostgreSQL', 'Git'],
                'accent_color' => 'blue',
                'display_order' => 1,
            ],
            [
                'suite_number' => '02',
                'title' => 'UI Design & Responsive Web',
                'subtitle' => 'Clean Visuals, Fast Load Times & Cross-Device Ergonomics',
                'description' => 'Translating client ideas and brand identities into responsive, modern websites. Ensuring intuitive layouts, accessible typography, mobile-first design, and seamless performance across all screen sizes.',
                'capabilities' => [
                    'Modern Business & Brand Website Design',
                    'Mobile-First Responsive Layouts',
                    'Design-to-Code Implementation (HTML/CSS/JS)',
                    'Modern UI with Tailwind CSS & Bootstrap',
                    'Interactive Frontend Components & Micro-animations',
                ],
                'technologies' => ['HTML5/CSS3', 'JavaScript', 'Tailwind CSS', 'Bootstrap 5', 'Figma', 'UI/UX'],
                'accent_color' => 'indigo',
                'display_order' => 2,
            ],
            [
                'suite_number' => '03',
                'title' => 'Custom CMS & Operations',
                'subtitle' => 'Empowering Non-Technical Teams with Intuitive Control',
                'description' => 'Building tailored Content Management Systems that give business owners complete autonomy over their products, pages, media, and data—eliminating reliance on developers for routine updates.',
                'capabilities' => [
                    'Bespoke Admin Panels & CMS Platforms',
                    'Product Catalog & Inventory Management',
                    'Dynamic Content & Media Management Systems',
                    'SEO Structure & Performance Optimization',
                    'Website Maintenance, Auditing & Technical Support',
                ],
                'technologies' => ['Custom CMS', 'Admin Dashboards', 'SEO Best Practices', 'MySQL', 'PHP', 'AJAX'],
                'accent_color' => 'purple',
                'display_order' => 3,
            ],
        ];

        foreach ($suites as $suite) {
            FreelanceSuite::updateOrCreate(
                ['title' => $suite['title']],
                $suite
            );
        }

        // 7. Design Experiences
        $designs = [
            [
                'title' => 'UI/UX Design',
                'category' => 'Visual & Interface Engineering',
                'description' => 'Designing clean, intuitive, and modern web interfaces focused on usability, visual hierarchy, and cross-device consistency.',
                'tools_and_skills' => ['Figma', 'Responsive Layouts', 'Design Systems', 'Visual Hierarchy'],
                'icon_key' => 'Layout',
                'display_order' => 1,
            ],
            [
                'title' => 'CMS Interfaces',
                'category' => 'Administrative Ergonomics',
                'description' => 'Creating admin dashboards and content management interfaces that make data entry and content updates effortless for business users.',
                'tools_and_skills' => ['Admin Dashboards', 'Media Managers', 'SEO Controls'],
                'icon_key' => 'Sparkles',
                'display_order' => 2,
            ],
            [
                'title' => 'Design-to-Code',
                'category' => 'Production Execution',
                'description' => 'Because I have both design and development experience, I understand how to translate designs directly into functional production interfaces.',
                'tools_and_skills' => ['HTML5/CSS3', 'Bootstrap 5', 'Tailwind CSS', 'Production Code'],
                'icon_key' => 'Code2',
                'display_order' => 3,
            ],
        ];

        foreach ($designs as $des) {
            DesignExperience::updateOrCreate(
                ['title' => $des['title']],
                $des
            );
        }

        // 8. Higher Education
        Education::updateOrCreate(
            ['degree' => 'BSc IT'],
            [
                'degree' => 'BSc IT',
                'field_of_study' => 'Bachelor of Science in Information Technology',
                'institution' => 'Lord Buddha Education Foundation',
                'location' => 'Nepal',
                'duration' => 'Completed',
                'coursework' => [
                    'Software Engineering & Architecture',
                    'Object-Oriented Programming (OOP)',
                    'Relational Database Management Systems (RDBMS)',
                    'Web Technologies & Internet Computing',
                    'System Analysis & Design',
                    'Data Structures & Algorithm Fundamentals',
                ],
                'academic_overview' => 'Comprehensive academic grounding in computing theory, relational databases, web technologies, software architecture, and practical engineering methodologies.',
                'display_order' => 1,
                'is_visible' => true,
            ]
        );

        // 9. Featured Projects
        $projects = [
            [
                'title' => 'Nepal Digital Payment Core Platform',
                'slug' => 'ndpc-payment-platform',
                'category' => 'FinTech & Transactional Infrastructure',
                'role_title' => 'Developer & Backend Engineer',
                'summary' => 'A robust transactional web application developed for Nepal Digital Payment Company Limited, powering secure operations, data persistence, and partner API integrations.',
                'full_description' => 'Engineered transactional backend modules with strict database transaction boundaries, error recovery, and auditing logs to support mission-critical payment operations.',
                'challenge' => 'Handling high-reliability payment transactions with zero data inconsistency across distributed endpoints.',
                'solution' => 'Utilized Laravel DB transactions, Eloquent domain models, and sanitized API gateways with rate limiting.',
                'key_deliverables' => [
                    'Built transactional backend modules with PHP and Laravel framework.',
                    'Engineered secure relational database schemas with indexing and query optimizations.',
                    'Implemented external API integrations and automated transaction verification flows.',
                ],
                'tech_stack' => ['PHP', 'Laravel', 'MySQL', 'REST APIs', 'Git', 'JavaScript', 'Tailwind CSS'],
                'metrics_label' => 'Environment',
                'metrics_value' => 'High-Security Transaction Engine',
                'thumbnail_url' => '/projects/ndpc_payment_dashboard.jpg',
                'accent_theme' => 'royal',
                'is_featured' => true,
                'is_published' => true,
                'display_order' => 1,
            ],
            [
                'title' => 'Multi-Tenant Merchant & Analytics Engine',
                'slug' => 'merchant-analytics-engine',
                'category' => 'Enterprise Web Application',
                'role_title' => 'Full Stack Developer',
                'summary' => 'An enterprise analytics and merchant reconciliation dashboard enabling business administrators to monitor transaction flows, volume metrics, and settlement schedules.',
                'full_description' => 'Developed high-performance administrative reporting dashboards with aggregated SQL queries, charting visualization, and dynamic export modules.',
                'challenge' => 'Visualizing complex multi-merchant transactional datasets in real time without lag.',
                'solution' => 'Implemented indexed SQL views, cached analytics pipelines, and dynamic client-side filtering.',
                'key_deliverables' => [
                    'Engineered real-time transaction monitoring and settlement reconciliation views.',
                    'Created dynamic reporting tools with CSV/Excel export and automated audit trails.',
                    'Integrated role-based access control (RBAC) ensuring data isolation.',
                ],
                'tech_stack' => ['Laravel', 'PHP 8.2', 'MySQL', 'JavaScript', 'Chart.js', 'Bootstrap 5', 'AJAX'],
                'metrics_label' => 'Scale',
                'metrics_value' => 'Enterprise Reporting Dashboard',
                'thumbnail_url' => '/projects/merchant_analytics_dashboard.jpg',
                'accent_theme' => 'indigo',
                'is_featured' => true,
                'is_published' => true,
                'display_order' => 2,
            ],
            [
                'title' => 'Nepal Pasta Food Company Dynamic Web & CMS',
                'slug' => 'nepal-pasta-web-cms',
                'category' => 'Corporate CMS & Digital Systems',
                'role_title' => 'Senior IT Manager & Web Architect',
                'summary' => 'A dynamic corporate website and content management platform built for Nepal Pasta Food Company, featuring product catalog management and automated barcode tracking.',
                'full_description' => 'Designed and deployed a full custom CMS for product lifecycle management, automated barcode generation, and department coordination.',
                'challenge' => 'Transitioning manual product information management into a centralized, searchable digital system.',
                'solution' => 'Developed an intuitive Laravel-powered CMS with barcode generation and media asset management.',
                'key_deliverables' => [
                    'Architected dynamic product catalog with automated barcode generation and inventory tracking.',
                    'Built administrative CMS giving non-technical staff full control over digital assets.',
                    'Delivered SEO optimization and mobile-responsive layouts across all devices.',
                ],
                'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'Custom CMS', 'HTML5/CSS3', 'SEO', 'Barcode API'],
                'metrics_label' => 'Impact',
                'metrics_value' => 'Centralized Digital System',
                'thumbnail_url' => '/projects/inventory_billing_system.jpg',
                'accent_theme' => 'crimson',
                'is_featured' => true,
                'is_published' => true,
                'display_order' => 3,
            ],
            [
                'title' => 'Enterprise Inventory & Billing System',
                'slug' => 'inventory-billing-system',
                'category' => 'Business Operations Software',
                'role_title' => 'Lead Full-Stack Architect',
                'summary' => 'A comprehensive point-of-sale, stock tracking, and automated invoicing software platform engineered for retail distribution and warehouse workflows.',
                'full_description' => 'Built an end-to-end billing and stock control system with atomic database transactions, PDF invoice generation, and real-time inventory alerts.',
                'challenge' => 'Preventing stock race conditions during peak checkout hours and multi-terminal operations.',
                'solution' => 'Engineered pessimistic row-level locking on inventory items during transaction checkout.',
                'key_deliverables' => [
                    'Automated invoice generation, tax calculations, and printable receipt formatting.',
                    'Multi-location stock tracking with low-inventory threshold triggers.',
                    'Customer ledger management and outstanding payment tracking.',
                ],
                'tech_stack' => ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'DomPDF', 'Tailwind CSS'],
                'metrics_label' => 'Feature',
                'metrics_value' => 'Automated Tax & Stock Engine',
                'thumbnail_url' => '/projects/inventory_billing_system.jpg',
                'accent_theme' => 'purple',
                'is_featured' => true,
                'is_published' => true,
                'display_order' => 4,
            ],
            [
                'title' => 'Smart Classroom & EdTech Management SaaS',
                'slug' => 'smart-classroom-edtech-saas',
                'category' => 'EdTech Platform & SaaS Architecture',
                'role_title' => 'SaaS Concept & Product Developer',
                'summary' => 'A smart classroom management platform designed for schools to unify smart board classroom interactions, teacher management tools, homework delivery, and student attendance.',
                'full_description' => 'Architected a modular educational platform connecting teachers, students, and smart classroom hardware into an integrated digital environment.',
                'challenge' => 'Creating an interface that works seamlessly on interactive smart boards as well as mobile devices.',
                'solution' => 'Built a responsive React and Laravel system with high-touch targets and low-bandwidth asset delivery.',
                'key_deliverables' => [
                    'Designed software architecture for smart board integration, teacher applications, and homework tracking.',
                    'Planned extended SaaS modules for online classes and real-time attendance analytics.',
                    'Demonstrates practical experience designing software around real-world institutional workflows.',
                ],
                'tech_stack' => ['Laravel', 'React.js', 'Node.js', 'MySQL', 'EdTech SaaS', 'Smart Board UI'],
                'metrics_label' => 'Domain',
                'metrics_value' => 'Education Technology SaaS',
                'thumbnail_url' => '/projects/merchant_analytics_dashboard.jpg',
                'accent_theme' => 'emerald',
                'is_featured' => true,
                'is_published' => true,
                'display_order' => 5,
            ],
        ];

        foreach ($projects as $proj) {
            Project::updateOrCreate(
                ['slug' => $proj['slug']],
                $proj
            );
        }

        // 10. Services
        $services = [
            [
                'service_number' => '01',
                'title' => 'Laravel Application Development',
                'tagline' => 'Enterprise Web Applications',
                'description' => 'Custom web applications built with Laravel MVC, clean routing, authentication, and secure business logic tailored to your exact operational workflows.',
                'capabilities' => ['Custom Web Applications', 'MVC Architecture', 'Modular Codebases'],
                'accent_color' => 'blue',
                'display_order' => 1,
            ],
            [
                'service_number' => '02',
                'title' => 'PHP Backend Engineering',
                'tagline' => 'Scalable Server-Side Solutions',
                'description' => 'High-performance backend systems with modern Object-Oriented PHP 8+, robust error handling, secure database queries, and clean architecture.',
                'capabilities' => ['Modern OOP PHP 8+', 'Robust Error Handling', 'High-Performance Logic'],
                'accent_color' => 'indigo',
                'display_order' => 2,
            ],
            [
                'service_number' => '03',
                'title' => 'RESTful API Design & Integration',
                'tagline' => 'Connected Digital Ecosystems',
                'description' => 'Designing secure, versioned, and documented REST APIs for mobile apps, frontend integration, and third-party payment/service connections.',
                'capabilities' => ['Versioned API Endpoints', 'Payment Gateway Integrations', 'JSON Web APIs'],
                'accent_color' => 'emerald',
                'display_order' => 3,
            ],
            [
                'service_number' => '04',
                'title' => 'Database Design & Optimization',
                'tagline' => 'Relational Data Integrity',
                'description' => 'Normalized MySQL and PostgreSQL database schema design, indexing, foreign keys, query optimization, and structured Eloquent ORM relationships.',
                'capabilities' => ['Schema Modeling & Normalization', 'Query Indexing & Optimization', 'Database Migrations'],
                'accent_color' => 'amber',
                'display_order' => 4,
            ],
            [
                'service_number' => '05',
                'title' => 'Responsive Web Design & UI/UX',
                'tagline' => 'Fluid Cross-Device Experiences',
                'description' => 'Translating visual concepts into clean, mobile-first responsive web layouts using modern CSS, Tailwind, Bootstrap, and interactive JavaScript.',
                'capabilities' => ['Mobile-First Layouts', 'Tailwind CSS & Bootstrap', 'Design-to-Code'],
                'accent_color' => 'rose',
                'display_order' => 5,
            ],
            [
                'service_number' => '06',
                'title' => 'Custom CMS Development',
                'tagline' => 'Empowered Content Operations',
                'description' => 'Tailored administrative panels and content management systems that allow non-technical teams to manage pages, media, and products effortlessly.',
                'capabilities' => ['Intuitive Admin Portals', 'Media & Content Management', 'Product Catalog Control'],
                'accent_color' => 'purple',
                'display_order' => 6,
            ],
            [
                'service_number' => '07',
                'title' => 'Modern Full-Stack Applications',
                'tagline' => 'React, Next.js & Node.js',
                'description' => 'Building modern, component-driven web applications combining React/Next.js frontends with robust Node.js or Laravel backend services.',
                'capabilities' => ['React.js & Next.js App Router', 'Node.js Microservices', 'Full-Stack Architecture'],
                'accent_color' => 'cyan',
                'display_order' => 7,
            ],
            [
                'service_number' => '08',
                'title' => 'Maintenance & Performance Tuning',
                'tagline' => 'Reliability & Uptime Assurance',
                'description' => 'Ongoing web maintenance, bug fixes, speed optimization, SEO health audits, security patches, and system upgrades for existing applications.',
                'capabilities' => ['Speed & Query Optimization', 'Security Patching', 'SEO & Compatibility Audits'],
                'accent_color' => 'slate',
                'display_order' => 8,
            ],
        ];

        foreach ($services as $srv) {
            Service::updateOrCreate(
                ['service_number' => $srv['service_number']],
                $srv
            );
        }

        // 11. Development Philosophies
        $philosophies = [
            [
                'principle_number' => '01',
                'title' => 'Understand the Business First',
                'tagline' => 'Domain-Driven Thinking',
                'description' => 'Great software begins by understanding the operational problem, workflow, and user need before writing a single line of code.',
                'icon_key' => 'Target',
                'display_order' => 1,
            ],
            [
                'principle_number' => '02',
                'title' => 'Clean & Reliable Code',
                'tagline' => 'Engineering Discipline',
                'description' => 'Prioritizing readable, well-structured, and dependable code over unnecessary complexity or transient hype.',
                'icon_key' => 'Code2',
                'display_order' => 2,
            ],
            [
                'principle_number' => '03',
                'title' => 'Design for Users',
                'tagline' => 'Human-Centric UX',
                'description' => 'Software must be intuitive, responsive, and easy to navigate for real daily users and administrators.',
                'icon_key' => 'HeartHandshake',
                'display_order' => 3,
            ],
            [
                'principle_number' => '04',
                'title' => 'Code for the Future',
                'tagline' => 'Maintainability & Scale',
                'description' => 'Clean, structured MVC and REST codebases that remain maintainable and adapt as the organization grows.',
                'icon_key' => 'TrendingUp',
                'display_order' => 4,
            ],
            [
                'principle_number' => '05',
                'title' => 'Keep Learning',
                'tagline' => 'Continuous Growth',
                'description' => 'Consistently expanding from Laravel/PHP strengths into modern full-stack architectures and tooling.',
                'icon_key' => 'BrainCircuit',
                'display_order' => 5,
            ],
        ];

        foreach ($philosophies as $phil) {
            Philosophy::updateOrCreate(
                ['principle_number' => $phil['principle_number']],
                $phil
            );
        }

        // 12. Verified Client Reviews
        $reviews = [
            [
                'reviewer_name' => 'Suman Shrestha',
                'reviewer_role' => 'Managing Director',
                'company_or_context' => 'Nepal Pasta Food Company',
                'service_used' => 'CMS Platform & Product Management',
                'rating' => 5,
                'comment' => 'Dhurba built our dynamic business website and central CMS platform with barcode integration. He thoroughly understands business operations and delivered a clean, maintainable system that our team uses daily with ease.',
                'display_date' => 'Recent Client',
                'is_verified' => true,
                'is_approved' => true,
                'likes_count' => 19,
                'display_order' => 1,
            ],
            [
                'reviewer_name' => 'Rohan Adhikari',
                'reviewer_role' => 'Project Coordinator',
                'company_or_context' => 'Digital Solutions Client',
                'service_used' => 'Laravel & REST API Backend',
                'rating' => 5,
                'comment' => 'Exceptional Laravel developer. Dhurba developed our backend services and third-party API integrations on schedule. His understanding of database design and MVC structure is top-notch.',
                'display_date' => 'Verified Review',
                'is_verified' => true,
                'is_approved' => true,
                'likes_count' => 14,
                'display_order' => 2,
            ],
            [
                'reviewer_name' => 'Pooja Karki',
                'reviewer_role' => 'Marketing & Brand Lead',
                'company_or_context' => 'Brand Platform Client',
                'service_used' => 'Web Design & UI/UX',
                'rating' => 5,
                'comment' => 'Great eye for design and responsive frontend execution. Dhurba translated our design concepts into a fast, mobile-friendly interface with Bootstrap and JavaScript. Highly recommended!',
                'display_date' => 'Verified Review',
                'is_verified' => true,
                'is_approved' => true,
                'likes_count' => 12,
                'display_order' => 3,
            ],
            [
                'reviewer_name' => 'Bikash Thapa',
                'reviewer_role' => 'Operations Manager',
                'company_or_context' => 'Workforce Tracking Project',
                'service_used' => 'Business Workflow System',
                'rating' => 5,
                'comment' => 'The task management and shift tracking workflow Dhurba built streamlined our daily review cycle. Very collaborative, dependable, and responsive developer.',
                'display_date' => 'Verified Review',
                'is_verified' => true,
                'is_approved' => true,
                'likes_count' => 10,
                'display_order' => 4,
            ],
        ];

        foreach ($reviews as $rev) {
            Review::updateOrCreate(
                ['reviewer_name' => $rev['reviewer_name']],
                $rev
            );
        }
    }
}
