import { MetadataRoute } from "next";
import { getProjects } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Base static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // Dynamic Case Study Routes
  try {
    const projects = await getProjects();
    if (Array.isArray(projects)) {
      projects.forEach((project: any) => {
        if (project.slug) {
          routes.push({
            url: `${baseUrl}/projects/${project.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
          });
        }
      });
    }
  } catch {
    // Ignore fetch error in sitemap generation
  }

  return routes;
}
