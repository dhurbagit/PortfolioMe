import { API_BASE_URL } from "./api";

const TOKEN_KEY = "dhurba_admin_token";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function removeAdminToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export async function adminFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; errors?: any }> {
  const token = getAdminToken();

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (res.status === 401) {
      removeAdminToken();
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/admin/login")
      ) {
        window.location.href = "/admin/login";
      }
      return {
        success: false,
        message: "Session expired or unauthenticated. Please log in again.",
      };
    }

    const json = await res.json();
    return json;
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Network connection error with backend server.",
    };
  }
}

// 1. Authentication
export async function adminLogin(email: string, password: string) {
  const res = await adminFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password, device_name: "Admin Web Portal" }),
  });

  if (res.success && res.data?.token) {
    setAdminToken(res.data.token);
  }

  return res;
}

export async function adminLogout() {
  await adminFetch("/auth/logout", { method: "POST" });
  removeAdminToken();
}

export async function getAdminMe() {
  return adminFetch("/auth/me");
}

// 2. Dashboard & System Status
export async function getAdminDashboard() {
  return adminFetch("/admin/dashboard");
}

export async function getAdminSystemStatus() {
  return adminFetch("/admin/system/status");
}

export async function getAdminAuditLogs(search = "", action = "") {
  let query = "";
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (action) params.append("action", action);
  if (params.toString()) query = `?${params.toString()}`;
  return adminFetch(`/admin/audit-logs${query}`);
}

// 3. Global Settings & Hero
export async function getAdminSettings() {
  return adminFetch("/admin/settings");
}

export async function updateAdminSettings(data: any) {
  return adminFetch("/admin/settings", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function getAdminHero() {
  return adminFetch("/admin/hero");
}

export async function updateAdminHero(data: any) {
  return adminFetch("/admin/hero", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// 4. Projects CMS
export async function getAdminProjects() {
  return adminFetch("/admin/projects");
}

export async function createAdminProject(data: any) {
  return adminFetch("/admin/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateAdminProject(id: number | string, data: any) {
  return adminFetch(`/admin/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminProject(id: number | string) {
  return adminFetch(`/admin/projects/${id}`, { method: "DELETE" });
}

export async function toggleAdminProjectPublish(id: number | string) {
  return adminFetch(`/admin/projects/${id}/publish`, { method: "PATCH" });
}

// 5. Skills CMS
export async function getAdminSkills() {
  return adminFetch("/admin/skills");
}

export async function createAdminSkillCategory(data: any) {
  return adminFetch("/admin/skills/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function createAdminSkill(data: any) {
  return adminFetch("/admin/skills", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminSkill(id: number | string) {
  return adminFetch(`/admin/skills/${id}`, { method: "DELETE" });
}

// 6. Experience CMS
export async function getAdminWorkExperience() {
  return adminFetch("/admin/experience/work");
}

export async function createAdminWorkExperience(data: any) {
  return adminFetch("/admin/experience/work", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminWorkExperience(id: number | string) {
  return adminFetch(`/admin/experience/work/${id}`, { method: "DELETE" });
}

export async function getAdminFreelanceSuites() {
  return adminFetch("/admin/experience/freelance");
}

export async function createAdminFreelanceSuite(data: any) {
  return adminFetch("/admin/experience/freelance", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminFreelanceSuite(id: number | string) {
  return adminFetch(`/admin/experience/freelance/${id}`, { method: "DELETE" });
}

export async function getAdminDesignExperiences() {
  return adminFetch("/admin/experience/design");
}

export async function createAdminDesignExperience(data: any) {
  return adminFetch("/admin/experience/design", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminDesignExperience(id: number | string) {
  return adminFetch(`/admin/experience/design/${id}`, { method: "DELETE" });
}

export async function getAdminEducation() {
  return adminFetch("/admin/experience/education");
}

export async function createAdminEducation(data: any) {
  return adminFetch("/admin/experience/education", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminEducation(id: number | string) {
  return adminFetch(`/admin/experience/education/${id}`, { method: "DELETE" });
}

// 7. Services & Philosophies CMS
export async function getAdminServices() {
  return adminFetch("/admin/services");
}

export async function createAdminService(data: any) {
  return adminFetch("/admin/services", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminService(id: number | string) {
  return adminFetch(`/admin/services/${id}`, { method: "DELETE" });
}

export async function getAdminPhilosophies() {
  return adminFetch("/admin/philosophies");
}

export async function createAdminPhilosophy(data: any) {
  return adminFetch("/admin/philosophies", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminPhilosophy(id: number | string) {
  return adminFetch(`/admin/philosophies/${id}`, { method: "DELETE" });
}

// 7. Inbox & Contact Submissions
export async function getAdminInbox(status = "") {
  const query = status ? `?status=${status}` : "";
  return adminFetch(`/admin/inbox${query}`);
}

export async function getAdminInboxDetail(id: number | string) {
  return adminFetch(`/admin/inbox/${id}`);
}

export async function updateAdminInboxStatus(id: number | string, status: string) {
  return adminFetch(`/admin/inbox/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function deleteAdminInbox(id: number | string) {
  return adminFetch(`/admin/inbox/${id}`, { method: "DELETE" });
}

// 8. Reviews CMS
export async function getAdminReviews(approved?: boolean) {
  const query = approved !== undefined ? `?approved=${approved ? 1 : 0}` : "";
  return adminFetch(`/admin/reviews${query}`);
}

export async function toggleAdminReviewApproval(id: number | string) {
  return adminFetch(`/admin/reviews/${id}/approve`, { method: "PATCH" });
}

export async function deleteAdminReview(id: number | string) {
  return adminFetch(`/admin/reviews/${id}`, { method: "DELETE" });
}

// 9. Media Assets CMS
export async function getAdminMedia(folder = "") {
  const query = folder ? `?folder=${folder}` : "";
  return adminFetch(`/admin/media${query}`);
}

export async function uploadAdminMedia(formData: FormData) {
  return adminFetch("/admin/media/upload", {
    method: "POST",
    body: formData,
  });
}

export async function deleteAdminMedia(id: string) {
  return adminFetch(`/admin/media/${id}`, { method: "DELETE" });
}
