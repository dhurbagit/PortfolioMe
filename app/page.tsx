"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SkillsBento } from "@/components/SkillsBento";
import { WorkExperience } from "@/components/WorkExperience";
import { FreelanceExperience } from "@/components/FreelanceExperience";
import { DesignExperience } from "@/components/DesignExperience";
import { Education } from "@/components/Education";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ServicesAndPhilosophy } from "@/components/ServicesAndPhilosophy";
import { ReviewsAndFeedback } from "@/components/ReviewsAndFeedback";
import { DeveloperParallaxBackground } from "@/components/DeveloperParallaxBackground";
import { ContactModal } from "@/components/ContactModal";
import { ResumeModal } from "@/components/ResumeModal";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import {
  getPortfolioBootstrap,
  getGlobalSettings,
  getHeroProfile,
  getSkills,
  getWorkExperience,
  getFreelanceSuites,
  getDesignExperience,
  getEducation,
  getProjects,
  getServices,
  getPhilosophies,
} from "@/lib/api";

export default function HomePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Live dynamic data state connected to Laravel Backend CMS
  const [settings, setSettings] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [skills, setSkills] = useState<any[] | null>(null);
  const [experiences, setExperiences] = useState<any[] | null>(null);
  const [freelanceSuites, setFreelanceSuites] = useState<any[] | null>(null);
  const [designCapabilities, setDesignCapabilities] = useState<any[] | null>(null);
  const [education, setEducation] = useState<any[] | null>(null);
  const [projects, setProjects] = useState<any[] | null>(null);
  const [services, setServices] = useState<any[] | null>(null);
  const [philosophies, setPhilosophies] = useState<any[] | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        // 1. Try High-Speed Single Roundtrip (<15ms)
        const bootstrap = await getPortfolioBootstrap();
        if (bootstrap && isMounted) {
          if (bootstrap.settings) setSettings(bootstrap.settings);
          if (bootstrap.profile) setProfile(bootstrap.profile);
          if (Array.isArray(bootstrap.skills)) setSkills(bootstrap.skills);
          if (Array.isArray(bootstrap.work_experience)) setExperiences(bootstrap.work_experience);
          if (Array.isArray(bootstrap.freelance)) setFreelanceSuites(bootstrap.freelance);
          if (Array.isArray(bootstrap.design)) setDesignCapabilities(bootstrap.design);
          if (Array.isArray(bootstrap.education)) setEducation(bootstrap.education);
          if (Array.isArray(bootstrap.projects)) setProjects(bootstrap.projects);
          if (Array.isArray(bootstrap.services)) setServices(bootstrap.services);
          if (Array.isArray(bootstrap.philosophies)) setPhilosophies(bootstrap.philosophies);
          return;
        }

        // 2. Resilient Concurrent Fallback
        const [
          sRes,
          pRes,
          skRes,
          expRes,
          freeRes,
          desRes,
          eduRes,
          prRes,
          srvRes,
          phiRes,
        ] = await Promise.all([
          getGlobalSettings(),
          getHeroProfile(),
          getSkills(),
          getWorkExperience(),
          getFreelanceSuites(),
          getDesignExperience(),
          getEducation(),
          getProjects(),
          getServices(),
          getPhilosophies(),
        ]);

        if (isMounted) {
          if (sRes) setSettings(sRes);
          if (pRes) setProfile(pRes);
          if (Array.isArray(skRes) && skRes.length > 0) setSkills(skRes);
          if (Array.isArray(expRes) && expRes.length > 0) setExperiences(expRes);
          if (Array.isArray(freeRes) && freeRes.length > 0)
            setFreelanceSuites(freeRes);
          if (Array.isArray(desRes) && desRes.length > 0)
            setDesignCapabilities(desRes);
          if (Array.isArray(eduRes) && eduRes.length > 0) setEducation(eduRes);
          if (Array.isArray(prRes) && prRes.length > 0) setProjects(prRes);
          if (Array.isArray(srvRes) && srvRes.length > 0) setServices(srvRes);
          if (Array.isArray(phiRes) && phiRes.length > 0)
            setPhilosophies(phiRes);
        }
      } catch {
        // Safe fallback to defaults
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenContact = () => setIsContactModalOpen(true);
  const handleCloseContact = () => setIsContactModalOpen(false);

  const handleOpenResume = () => setIsResumeModalOpen(true);
  const handleCloseResume = () => setIsResumeModalOpen(false);

  return (
    <div className="relative min-h-screen bg-background text-slate-900 overflow-x-hidden selection:bg-blue-100 selection:text-blue-700">
      {/* Interactive Global Parallax Matrix Elements */}
      <DeveloperParallaxBackground />

      {/* Top Floating Navigation */}
      <Navbar
        onOpenContact={handleOpenContact}
        onOpenResume={handleOpenResume}
        profile={profile}
        settings={settings}
      />

      {/* Main Content: Distinct Themed Sections */}
      <main className="relative z-10 w-full flex flex-col">
        {/* Section 1: Hero & Three Pillars (Dynamic Profile & Settings) */}
        <Hero
          onOpenContact={handleOpenContact}
          onOpenResume={handleOpenResume}
          profile={profile}
          settings={settings}
        />

        {/* Section 2: Technical Skills Matrix (Dynamic Skills & Categories) */}
        <SkillsBento skillsData={skills || undefined} />

        {/* Section 3: Professional Work Experience (Dynamic Roles & Workflows) */}
        <WorkExperience experiencesData={experiences || undefined} />

        {/* Section 4: Freelance Experience & Services (Dynamic Freelance Suites) */}
        <FreelanceExperience
          onOpenContact={handleOpenContact}
          suitesData={freelanceSuites || undefined}
        />

        {/* Section 5: Design Experience & UI/UX (Dynamic Visual Capabilities) */}
        <DesignExperience
          capabilitiesData={designCapabilities || undefined}
        />

        {/* Section 6: Higher Education (Dynamic Academic Degree & Coursework) */}
        <Education educationData={education || undefined} />

        {/* Section 7: Featured Software Projects (Dynamic Swiper & Case Studies) */}
        <ProjectShowcase projectsData={projects || undefined} />

        {/* Section 8: Services & Development Philosophy (Dynamic Services & Guiding Principles) */}
        <ServicesAndPhilosophy
          servicesData={services || undefined}
          philosophiesData={philosophies || undefined}
        />

        {/* Section 9: Verified Client Reviews & Interactive Feedback with Star Ratings */}
        <ReviewsAndFeedback />
      </main>

      {/* Footer (Dynamic Emails, Location, Socials, Bio, Name) */}
      <Footer
        onOpenContact={handleOpenContact}
        onOpenResume={handleOpenResume}
        settings={settings}
        profile={profile}
      />

      {/* Floating WhatsApp & Direct Call Widget (Dynamic Phone Number) */}
      <FloatingWhatsApp
        phoneNumber={settings?.phone_whatsapp || "+9779800000000"}
      />

      {/* Animated Contact Modal (Directly submits to Laravel backend /api/v1/contact) */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={handleCloseContact}
        title="Let's Build Something Together"
        description="Have a project, business idea, or development opportunity? Let's connect and turn it into a practical digital solution."
        settings={settings}
      />

      {/* Interactive Printable CV / Resume Modal (Dynamic Live Data Sync) */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={handleCloseResume}
        profile={profile}
        settings={settings}
        experiences={experiences || undefined}
        skills={skills || undefined}
        education={education || undefined}
        projects={projects || undefined}
      />
    </div>
  );
}
