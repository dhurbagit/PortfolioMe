"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Database, GitBranch } from "lucide-react";

export const DeveloperParallaxBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Scroll parallax tracking
  const { scrollY } = useScroll();

  // Smooth springs for scroll layers
  const smoothScroll = useSpring(scrollY, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Layer 0: Big Name Typography (Moves at gentle 0.12x scroll speed)
  const nameY = useTransform(smoothScroll, [0, 3000], [0, -350]);
  const subNameY = useTransform(smoothScroll, [0, 3000], [0, -280]);

  // Layer 1: Slow Grid & Circuit matrix (0.05x scroll speed)
  const layer1Y = useTransform(smoothScroll, [0, 4000], [0, -200]);

  // Layer 2: Medium Developer Syntax Tokens & Code Snippets (0.15x scroll speed)
  const layer2Y = useTransform(smoothScroll, [0, 4000], [0, -600]);
  const layer2OppositeY = useTransform(smoothScroll, [0, 4000], [0, 300]);

  // Layer 3: Fast Floating Code Glyphs (0.25x scroll speed)
  const layer3Y = useTransform(smoothScroll, [0, 4000], [0, -1000]);

  // Layer 4: Glowing Radial Orbs (Drifting & Pulsing)
  const orb1Y = useTransform(smoothScroll, [0, 4000], [0, 400]);
  const orb2Y = useTransform(smoothScroll, [0, 4000], [0, -500]);
  const orb3Y = useTransform(smoothScroll, [0, 4000], [0, 250]);

  // Mouse interaction parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 30;
      const y = (clientY / window.innerHeight - 0.5) * 30;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none print:hidden">
      
      {/* 1. Base Ambient Glow Orbs (Parallax Layer) */}
      <motion.div
        style={{ y: orb1Y }}
        animate={{
          x: mousePosition.x * 0.5,
          scale: [1, 1.08, 1],
        }}
        transition={{ scale: { duration: 12, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute -top-[10%] -left-[10%] w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full bg-gradient-radial from-blue-500/10 via-indigo-500/5 to-transparent blur-[140px]"
      />

      <motion.div
        style={{ y: orb2Y }}
        animate={{
          x: mousePosition.x * -0.6,
          scale: [1, 1.12, 1],
        }}
        transition={{ scale: { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 } }}
        className="absolute top-[35%] -right-[15%] w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full bg-gradient-radial from-red-500/8 via-rose-500/4 to-transparent blur-[150px]"
      />

      <motion.div
        style={{ y: orb3Y }}
        animate={{
          x: mousePosition.x * 0.4,
        }}
        className="absolute top-[70%] left-[20%] w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full bg-gradient-radial from-blue-600/8 via-indigo-600/4 to-transparent blur-[130px]"
      />

      {/* 2. BIG BACKGROUND TYPOGRAPHY: "DHURBA" & "WEB DEVELOPER" */}
      <motion.div
        style={{ y: nameY }}
        animate={{
          x: mousePosition.x * 0.7,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 15 }}
        className="absolute top-[80px] sm:top-[110px] left-0 right-0 flex flex-col items-center justify-center text-center max-w-7xl mx-auto px-4 pointer-events-none"
      >
        {/* Massive "DHURBA" Outline Typography */}
        <div className="font-black text-[68px] sm:text-[130px] md:text-[170px] lg:text-[210px] tracking-tighter uppercase leading-none text-slate-900/[0.03] select-none">
          DHURBA
        </div>

        {/* Big "WEB DEVELOPER" Secondary Layer */}
        <div className="font-black text-[22px] sm:text-[42px] md:text-[56px] lg:text-[70px] tracking-[0.25em] sm:tracking-[0.35em] uppercase leading-none text-blue-900/[0.045] -mt-3 sm:-mt-8 select-none font-mono">
          WEB DEVELOPER
        </div>

        {/* Subtle Decorative Subtitle Line */}
        <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono font-bold text-slate-900/[0.05] tracking-[0.3em] uppercase mt-2 select-none">
          <span>LARAVEL</span>
          <span>•</span>
          <span>PHP</span>
          <span>•</span>
          <span>FULL STACK</span>
          <span>•</span>
          <span>UI DESIGN</span>
        </div>
      </motion.div>

      {/* Second Floating Watermark in Mid Page */}
      <motion.div
        style={{ y: subNameY }}
        animate={{
          x: mousePosition.x * -0.5,
        }}
        className="absolute top-[1600px] left-0 right-0 flex items-center justify-center text-center pointer-events-none"
      >
        <div className="font-black text-[45px] sm:text-[90px] md:text-[130px] tracking-tighter uppercase leading-none text-indigo-900/[0.025] select-none font-mono">
          DHURBA DHAKAL
        </div>
      </motion.div>

      {/* 3. Developer Matrix Grid & Dot Array (Slow Parallax Layer 1) */}
      <motion.div
        style={{ y: layer1Y }}
        className="absolute inset-0 bg-light-grid opacity-65"
      />

      {/* Vertical Code Guide Lines */}
      <div className="absolute inset-0 flex justify-between max-w-6xl mx-auto px-6 opacity-[0.035] border-x border-slate-900 pointer-events-none">
        <div className="w-px h-full bg-slate-900" />
        <div className="w-px h-full bg-slate-900 hidden sm:block" />
        <div className="w-px h-full bg-slate-900 hidden md:block" />
        <div className="w-px h-full bg-slate-900 hidden lg:block" />
      </div>

      {/* 4. Floating Developer Code Chips & Tokens (Parallax Layer 2) */}
      <motion.div
        style={{ y: layer2Y }}
        animate={{
          x: mousePosition.x * 0.8,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute inset-0 max-w-6xl mx-auto"
      >
        {/* Token 1: Laravel API Route */}
        <div className="absolute top-[180px] left-[2%] sm:left-[5%] opacity-40 hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 backdrop-blur-md border border-blue-200/80 shadow-xs font-mono text-[11px] text-blue-900">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Route::apiResource(&apos;projects&apos;, ProjectController::class);</span>
          </div>
        </div>

        {/* Token 2: TypeScript / Full-Stack Promise */}
        <div className="absolute top-[480px] right-[2%] sm:right-[6%] opacity-35 hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 backdrop-blur-md border border-indigo-200/80 shadow-xs font-mono text-[11px] text-indigo-900">
            <span className="text-purple-600 font-bold">async</span>
            <span>fn(payload: Data): Promise&lt;Response&gt;</span>
          </div>
        </div>

        {/* Token 3: SQL Transaction & Performance */}
        <div className="absolute top-[900px] left-[4%] sm:left-[8%] opacity-35 hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-xs font-mono text-[10.5px] text-slate-700">
            <Database className="w-3.5 h-3.5 text-blue-600" />
            <span>DB::transaction(fn() =&gt; $order-&gt;fulfill());</span>
          </div>
        </div>

        {/* Token 4: Git Status Commit */}
        <div className="absolute top-[1400px] right-[4%] sm:right-[10%] opacity-35 hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 backdrop-blur-md border border-emerald-200/80 shadow-xs font-mono text-[10.5px] text-emerald-900">
            <GitBranch className="w-3.5 h-3.5 text-emerald-600" />
            <span>git commit -m &quot;feat: enterprise full-stack core&quot;</span>
          </div>
        </div>

        {/* Token 5: HTTP Status 200 */}
        <div className="absolute top-[1900px] left-[3%] sm:left-[6%] opacity-40 hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-emerald-300 shadow-xs font-mono text-[10px] text-emerald-800 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>HTTP/2.0 200 OK — REST API Verified</span>
          </div>
        </div>
      </motion.div>

      {/* 5. Opposite Parallax Floating Syntax Elements (Parallax Layer 3) */}
      <motion.div
        style={{ y: layer2OppositeY }}
        animate={{
          x: mousePosition.x * -0.9,
        }}
        transition={{ type: "spring", stiffness: 45, damping: 18 }}
        className="absolute inset-0 max-w-6xl mx-auto"
      >
        {/* Syntax Glyphs & Watermarks */}
        <div className="absolute top-[320px] right-[14%] font-mono text-4xl sm:text-6xl font-black text-slate-900/[0.035] tracking-tighter">
          &lt;/&gt;
        </div>

        <div className="absolute top-[750px] right-[8%] font-mono text-3xl sm:text-5xl font-black text-blue-900/[0.04]">
          &#123; JSON &#125;
        </div>

        <div className="absolute top-[1200px] left-[10%] font-mono text-4xl sm:text-6xl font-black text-red-900/[0.035]">
          PHP 8.3
        </div>

        <div className="absolute top-[1650px] right-[12%] font-mono text-3xl sm:text-5xl font-black text-indigo-900/[0.04]">
          PostgreSQL
        </div>

        <div className="absolute top-[2200px] left-[8%] font-mono text-4xl sm:text-6xl font-black text-slate-900/[0.035]">
          Docker
        </div>
      </motion.div>

      {/* 6. Fast Floating Ambient Particles (Parallax Layer 4) */}
      <motion.div
        style={{ y: layer3Y }}
        className="absolute inset-0"
      >
        <div className="absolute top-[260px] left-[25%] w-1.5 h-1.5 rounded-full bg-blue-500/30 blur-[0.5px]" />
        <div className="absolute top-[520px] right-[28%] w-2 h-2 rounded-full bg-red-500/30 blur-[0.5px]" />
        <div className="absolute top-[940px] left-[32%] w-1.5 h-1.5 rounded-full bg-indigo-500/30 blur-[0.5px]" />
        <div className="absolute top-[1380px] right-[22%] w-2 h-2 rounded-full bg-blue-500/30 blur-[0.5px]" />
        <div className="absolute top-[1820px] left-[18%] w-1.5 h-1.5 rounded-full bg-emerald-500/30 blur-[0.5px]" />
        <div className="absolute top-[2300px] right-[35%] w-2 h-2 rounded-full bg-purple-500/30 blur-[0.5px]" />
      </motion.div>
    </div>
  );
};
