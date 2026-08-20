"use client";

import React, { useEffect, useState } from "react";
import {
  Cpu,
  Plus,
  Trash2,
  CheckCircle2,
  Loader2,
  X,
  Layers,
  Save,
} from "lucide-react";
import {
  getAdminSkills,
  createAdminSkill,
  deleteAdminSkill,
} from "@/lib/adminApi";

export default function AdminSkillsPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | string>(
    1
  );
  const [skillName, setSkillName] = useState("");
  const [levelLabel, setLevelLabel] = useState("Core Strength");
  const [proficiencyType, setProficiencyType] = useState("primary");
  const [notification, setNotification] = useState("");

  const loadSkills = async () => {
    setIsLoading(true);
    const res = await getAdminSkills();
    if (res.success && res.data) {
      setCategories(res.data);
      if (res.data.length > 0) setSelectedCategoryId(res.data[0].id);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    const res = await createAdminSkill({
      skill_category_id: selectedCategoryId,
      name: skillName.trim(),
      level_label: levelLabel,
      proficiency_type: proficiencyType,
      display_order: 1,
      is_visible: true,
    });

    if (res.success) {
      setSkillName("");
      setIsModalOpen(false);
      loadSkills();
      setNotification("New skill added to category.");
    } else {
      alert(res.message || "Failed to add skill.");
    }
  };

  const handleDeleteSkill = async (id: number | string) => {
    if (!confirm("Are you sure you want to remove this skill?")) return;
    const res = await deleteAdminSkill(id);
    if (res.success) {
      loadSkills();
      setNotification("Skill removed.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Technical Skills Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Organize core capabilities, language proficiencies, and developer tooling.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {notification && (
        <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center justify-between">
          <span>{notification}</span>
          <button
            onClick={() => setNotification("")}
            className="text-emerald-400"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Categories & Skills Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="md:col-span-2 p-12 text-center text-slate-500 text-xs">
            <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
            <span>Loading skills matrix...</span>
          </div>
        ) : (
          categories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="space-y-0.5">
                  <h3 className="font-bold text-white text-base">{cat.name}</h3>
                  <p className="text-xs text-slate-400">{cat.description}</p>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                  {cat.skills?.length || 0} skills
                </span>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {cat.skills?.map((s: any) => (
                  <div
                    key={s.id}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 group hover:border-slate-700"
                  >
                    <span>{s.name}</span>
                    <button
                      onClick={() => handleDeleteSkill(s.id)}
                      className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Skill Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-hidden">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-fadeIn">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900 flex-shrink-0">
              <h2 className="text-lg font-bold text-white">
                Add Technical Skill
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              id="skill-cms-form"
              onSubmit={handleAddSkill}
              className="flex-1 overflow-y-auto p-6 space-y-4 text-xs"
            >
              <div className="space-y-1">
                <label className="font-bold text-slate-300 uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 uppercase tracking-wider">
                  Skill Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Laravel Sanctum, Redis, Docker"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 uppercase tracking-wider">
                  Proficiency Type
                </label>
                <select
                  value={proficiencyType}
                  onChange={(e) => setProficiencyType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="primary">Primary (Core Strength)</option>
                  <option value="working">Working Knowledge</option>
                  <option value="tool">Developer Tool</option>
                </select>
              </div>
            </form>

            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-end gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="skill-cms-form"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all cursor-pointer"
              >
                Save Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
