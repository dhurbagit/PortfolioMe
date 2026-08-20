"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Building,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ACADEMIC_FOCUS = [
  "Software Engineering & Architecture",
  "Object-Oriented Programming (OOP)",
  "Relational Database Management Systems (RDBMS)",
  "Web Technologies & Internet Computing",
  "System Analysis & Design",
  "Data Structures & Algorithm Fundamentals",
];

interface EducationProps {
  educationData?: any[];
}

export const Education: React.FC<EducationProps> = ({ educationData }) => {
  const educations =
    Array.isArray(educationData) && educationData.length > 0
      ? educationData
      : [
          {
            degree: "BSc IT",
            field_of_study: "Bachelor of Science in Information Technology",
            institution: "Lord Buddha Education Foundation",
            location: "Nepal",
            coursework: ACADEMIC_FOCUS,
          },
        ];

  return (
    <section
      id="education"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 bg-slate-100/80 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto w-full space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>Academic Background</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Higher <span className="text-blue-700">Education</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md">
            Formal academic foundations in computer science, software engineering, and information systems.
          </p>
        </div>

        {/* Academic Cards Grid */}
        <div className="space-y-6">
          {educations.map((edu, index) => {
            const degree = edu.degree || "Degree";
            const fieldOfStudy =
              edu.field_of_study || edu.field || "Information Technology";
            const institution = edu.institution || "University";
            const location = edu.location || "Nepal";
            const coursework: string[] =
              Array.isArray(edu.coursework) && edu.coursework.length > 0
                ? edu.coursework
                : typeof edu.coursework === "string"
                ? edu.coursework.split(",").map((s: string) => s.trim())
                : ACADEMIC_FOCUS;

            return (
              <motion.div
                key={edu.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-9 shadow-card-soft hover:shadow-card-hover transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Degree & Institution */}
                  <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-100 pb-5 lg:pb-0 lg:pr-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full uppercase">
                        {edu.degree_type || (index === 0 ? "Undergraduate Degree" : "Academic Qualification")}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        {degree}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
                        {fieldOfStudy}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Building className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>{institution}</span>
                      </div>
                      {location && (
                        <span className="text-slate-400 hidden sm:inline">•</span>
                      )}
                      {location && (
                        <span className="text-slate-500">{location}</span>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Key Coursework & Academic Foundations */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      <span>Core Curriculum &amp; Focus Areas</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {coursework.map((subject: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{subject}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
