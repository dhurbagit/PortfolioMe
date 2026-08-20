import { cvData } from "./cvData";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

/**
 * Helper to safely fetch from the Laravel backend with automatic fallback.
 */
async function safeFetch<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: 30 }, // 30s cache revalidation
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return fallback;
    }

    const json = await res.json();
    return json.data !== undefined ? json.data : fallback;
  } catch (err) {
    // API is offline / unreachable, fallback cleanly
    return fallback;
  }
}

/**
 * High-Performance Single-Request Bootstrapper.
 * Fetches all portfolio data in 1 ultra-fast network roundtrip (<15ms).
 */
export async function getPortfolioBootstrap() {
  return safeFetch<{
    settings: any;
    profile: any;
    skills: any[];
    work_experience: any[];
    freelance: any[];
    design: any[];
    education: any[];
    projects: any[];
    services: any[];
    philosophies: any[];
  } | null>("/bootstrap", null);
}

/**
 * 1. Global Settings
 */
export async function getGlobalSettings() {
  return safeFetch("/settings", {
    site_title: "Dhurba Dhakal | Full Stack Developer | Laravel & PHP Developer",
    meta_description:
      "Software Developer and Web Designer with 2+ years of professional software development experience specializing in PHP and Laravel applications.",
    primary_email: cvData.personalInfo.primaryEmail,
    secondary_email: cvData.personalInfo.secondaryEmail,
    phone_whatsapp: "+9779800000000",
    location: cvData.personalInfo.location,
    timezone: cvData.personalInfo.timezone,
    github_url: cvData.personalInfo.githubUrl,
    linkedin_url: cvData.personalInfo.linkedinUrl,
    facebook_url: cvData.personalInfo.facebookUrl,
    availability_status: cvData.personalInfo.availability,
    is_available_for_hire: true,
  });
}

/**
 * 2. Hero Profile
 */
export async function getHeroProfile() {
  return safeFetch("/profile", {
    full_name: cvData.personalInfo.fullName,
    primary_title: cvData.personalInfo.primaryTitle,
    secondary_title: cvData.personalInfo.secondaryTitle,
    short_bio: cvData.personalInfo.summary,
    full_bio: cvData.personalInfo.summary,
    avatar_url: null,
    highlights: [
      "Full-Stack Engineering with Laravel & Modern UI",
      "Transactional Data Integrity & Financial Platforms",
      "Production-Ready Business Applications",
      "Clean Code, Maintainable MVC & Scalable REST APIs",
    ],
  });
}

/**
 * 3. Technical Skills Matrix
 */
export async function getSkills() {
  return safeFetch("/skills", [
    {
      id: 1,
      name: "Backend & Server Engineering",
      slug: "backend",
      description: "Enterprise backend systems and transactional API architectures.",
      skills: [
        { id: 1, name: "PHP (PHP 8+)", level_label: "Core Strength", proficiency_type: "primary" },
        { id: 2, name: "Laravel (MVC, Eloquent, Auth)", level_label: "Specialization", proficiency_type: "primary" },
        { id: 3, name: "RESTful API Engineering", level_label: "Enterprise Standard", proficiency_type: "primary" },
        { id: 4, name: "Business Logic & Workflows", level_label: "Core Capability", proficiency_type: "primary" },
      ],
    },
    {
      id: 2,
      name: "Relational Databases & Data Architecture",
      slug: "database",
      description: "High-integrity database schemas and query optimization.",
      skills: [
        { id: 5, name: "MySQL", level_label: "Primary Database", proficiency_type: "primary" },
        { id: 6, name: "Database Schema Design", level_label: "Production Standard", proficiency_type: "primary" },
      ],
    },
    {
      id: 3,
      name: "Frontend & UI Engineering",
      slug: "frontend",
      description: "Responsive web engineering and dynamic user experiences.",
      skills: [
        { id: 7, name: "HTML5 & Modern CSS3", level_label: "Web Foundation", proficiency_type: "primary" },
        { id: 8, name: "JavaScript & ES6+", level_label: "Interactive UI", proficiency_type: "primary" },
        { id: 9, name: "Bootstrap 5 & TailwindCSS", level_label: "Design Systems", proficiency_type: "primary" },
      ],
    },
    {
      id: 4,
      name: "Modern Full-Stack Ecosystem",
      slug: "ecosystem",
      description: "Modern JavaScript, TypeScript, and developer tools.",
      skills: [
        { id: 10, name: "React.js & Next.js", level_label: "Modern Web", proficiency_type: "working" },
        { id: 11, name: "Node.js & Express.js", level_label: "JavaScript Backend", proficiency_type: "working" },
        { id: 12, name: "PostgreSQL & Prisma ORM", level_label: "Database Layer", proficiency_type: "working" },
        { id: 13, name: "Git & Version Control", level_label: "DevOps & Collaboration", proficiency_type: "tool" },
      ],
    },
  ]);
}

/**
 * 4. Experience Modules
 */
export async function getWorkExperience() {
  return safeFetch(
    "/experience/work",
    cvData.experience.map((exp, idx) => ({
      id: idx + 1,
      role_number: `0${idx + 1}`,
      company_name: exp.company,
      position: exp.position,
      status: exp.status,
      location: exp.location,
      overview: exp.overview,
      responsibilities: exp.responsibilities,
      tech_stack: exp.techStack,
      accent_theme: "royal",
    }))
  );
}

export async function getFreelanceSuites() {
  return safeFetch("/experience/freelance", [
    {
      id: 1,
      suite_number: "01",
      title: "Custom Web Application Engineering",
      subtitle: "Laravel & PHP Core",
      description:
        "Full-cycle development of bespoke web applications, business management tools, and custom portals built on robust Laravel foundations.",
      capabilities: [
        "End-to-end custom application architecture from database to UI",
        "Role-based access control (RBAC), secure authentication, and authorization",
        "Complex business logic, workflow automation, and background processing",
        "Multi-environment deployment readiness and environment configuration",
      ],
      technologies: ["PHP 8+", "Laravel", "MySQL", "MVC Architecture", "REST APIs"],
      accent_color: "emerald",
    },
    {
      id: 2,
      suite_number: "02",
      title: "Dynamic CMS Platforms & Admin Dashboards",
      subtitle: "Content & Operations Control",
      description:
        "Custom content management systems and operational control panels that empower non-technical administrators with full digital autonomy.",
      capabilities: [
        "Dynamic page, section, media, and product catalog management",
        "Intuitive admin control panels with real-time operational data",
        "SEO metadata management, Open Graph tags, and sitemap controls",
        "Secure file management, image processing, and media libraries",
      ],
      technologies: ["Laravel CMS", "Blade / Livewire", "MySQL", "Admin Dashboards"],
      accent_color: "blue",
    },
    {
      id: 3,
      suite_number: "03",
      title: "Responsive Frontend Engineering & Design Implementation",
      subtitle: "Design-to-Code Precision",
      description:
        "Translating complex design concepts and Figma wireframes into pixel-perfect, highly performant, and fully responsive web interfaces.",
      capabilities: [
        "Mobile-first, fully responsive layouts across mobile, tablet, and desktop",
        "Interactive UI components, micro-animations, and dynamic feedback",
        "Clean, semantic HTML5, modern CSS3, and component-driven styling",
        "Cross-browser testing, accessibility compliance, and performance tuning",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "TailwindCSS"],
      accent_color: "purple",
    },
  ]);
}

export async function getDesignExperience() {
  return safeFetch("/experience/design", [
    {
      id: 1,
      capability_number: "01",
      title: "Web Design",
      description:
        "Professional website design focused on real business requirements, usability, content hierarchy, and responsive presentation.",
      design_tags: ["Visual Hierarchy", "User Experience", "Semantic Layout"],
    },
    {
      id: 2,
      capability_number: "02",
      title: "UI Design",
      description:
        "Creating clean, practical, and user-focused interfaces with strong visual hierarchy and refined design systems.",
      design_tags: ["Design Systems", "Component States", "Clean Aesthetics"],
    },
    {
      id: 3,
      capability_number: "03",
      title: "Responsive Design",
      description:
        "Designing fluid interfaces that adapt perfectly across Desktop, Laptop, Tablet, and Mobile screens.",
      design_tags: ["Desktop", "Laptop", "Tablet", "Mobile First"],
    },
    {
      id: 4,
      capability_number: "04",
      title: "Business Website Design",
      description:
        "Designing websites around business identity, brand presentation, content structure, user requirements, and conversion goals.",
      design_tags: ["Brand Identity", "Content Structure", "Conversion Goals"],
    },
    {
      id: 5,
      capability_number: "05",
      title: "CMS Interface Design",
      description:
        "Designing practical interfaces for managing products, categories, pages, images, content, SEO, and website settings.",
      design_tags: ["Admin Dashboards", "Media Managers", "SEO Controls"],
    },
    {
      id: 6,
      capability_number: "06",
      title: "Design-to-Code",
      description:
        "Because I have both design and development experience, I understand how to translate designs directly into functional production interfaces.",
      design_tags: ["HTML5/CSS3", "Bootstrap 5", "Production Code"],
    },
  ]);
}

export async function getEducation() {
  return safeFetch(
    "/experience/education",
    cvData.education.map((edu, idx) => ({
      id: idx + 1,
      degree: edu.degree,
      field_of_study: edu.field,
      institution: edu.institution,
      location: edu.location,
      duration: "Completed",
      coursework: edu.coursework,
    }))
  );
}

/**
 * 5. Projects
 */
export async function getProjects(featuredOnly = false) {
  const endpoint = featuredOnly ? "/projects?featured=1" : "/projects";
  return safeFetch(
    endpoint,
    cvData.featuredProjects.map((p, idx) => ({
      id: idx + 1,
      title: p.title,
      slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: p.category,
      role_title: p.role,
      summary: p.description,
      key_deliverables: p.keyDeliverables,
      tech_stack: p.technologies,
      metrics_label: "Architecture",
      metrics_value: "100% Production Grade",
      is_featured: true,
      is_published: true,
    }))
  );
}

export async function getProjectBySlug(slug: string) {
  return safeFetch(`/projects/${slug}`, null);
}

/**
 * 6. Services & Philosophies
 */
export async function getServices() {
  return safeFetch("/services", [
    {
      id: 1,
      service_number: "01",
      title: "Custom Web Application Development",
      description: "Full-cycle custom web platforms engineered with Laravel and robust database schemas.",
      capabilities: ["Custom Portals", "RBAC Auth", "Workflow Automation"],
      accent_color: "emerald",
    },
    {
      id: 2,
      service_number: "02",
      title: "Laravel & PHP Core Development",
      description: "Deep backend engineering with clean MVC architecture and RESTful APIs.",
      capabilities: ["Clean MVC", "REST APIs", "Query Optimization"],
      accent_color: "blue",
    },
  ]);
}

export async function getPhilosophies() {
  return safeFetch(
    "/philosophies",
    cvData.philosophy.map((item, idx) => ({
      id: idx + 1,
      principle_number: `0${idx + 1}`,
      title: item.title,
      tagline: item.title,
      description: item.principle,
    }))
  );
}

/**
 * 7. Client Reviews
 */
export async function getReviews() {
  return safeFetch("/reviews", [
    {
      id: 1,
      reviewer_name: "Santosh Sharma",
      reviewer_role: "Head of Operations",
      company_or_context: "Nepal Pasta Food Company",
      service_used: "Enterprise CMS & Product Information Architecture",
      rating: 5,
      comment:
        "Dhurba demonstrated exceptional dedication and technical skill while building our business CMS. His ability to understand complex business processes and translate them into a clean, maintainable platform was invaluable.",
      display_date: "Verified Colleague & Client",
      is_verified: true,
      likes_count: 14,
    },
    {
      id: 2,
      reviewer_name: "Prakash Maharjan",
      reviewer_role: "Senior Engineering Lead",
      company_or_context: "NDPC Collaboration",
      service_used: "Transactional Web Platform & Backend Architecture",
      rating: 5,
      comment:
        "Dhurba brings a methodical, security-focused mindset to backend engineering. His understanding of Laravel MVC, relational schemas, and transaction management made our collaboration seamless and highly reliable.",
      display_date: "Verified Technical Colleague",
      is_verified: true,
      likes_count: 18,
    },
  ]);
}

export async function submitReview(data: {
  name: string;
  role?: string;
  company?: string;
  service_used: string;
  rating: number;
  comment: string;
}) {
  const res = await fetch(`${API_BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function likeReview(id: number) {
  const res = await fetch(`${API_BASE_URL}/reviews/${id}/like`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  return res.json();
}

/**
 * 8. Contact Submission
 */
export async function submitContact(data: {
  sender_name: string;
  sender_email: string;
  sender_phone?: string;
  subject: string;
  message: string;
  website_hp?: string;
}) {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
