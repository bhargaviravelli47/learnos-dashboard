"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Database,
  Globe,
  Cpu,
  Layers,
  GitBranch,
  Terminal,
  Palette,
  BookOpen,
  Zap,
  LucideIcon,
} from "lucide-react";
import { Course } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Database,
  Globe,
  Cpu,
  Layers,
  GitBranch,
  Terminal,
  Palette,
  BookOpen,
  Zap,
};

const GRADIENT_ACCENTS = [
  { from: "from-cyan-500", to: "to-blue-600", glow: "rgba(0,229,255,0.15)" },
  { from: "from-violet-500", to: "to-purple-700", glow: "rgba(124,58,237,0.15)" },
  { from: "from-emerald-400", to: "to-teal-600", glow: "rgba(16,185,129,0.15)" },
  { from: "from-orange-400", to: "to-rose-600", glow: "rgba(251,146,60,0.15)" },
];

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const accent = GRADIENT_ACCENTS[index % GRADIENT_ACCENTS.length];
  const Icon = ICON_MAP[course.icon_name] ?? BookOpen;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (inView) {
      // Animate progress from 0 to actual value
      const timeout = setTimeout(() => {
        setAnimatedProgress(course.progress);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [inView, course.progress]);

 return (
  <motion.article
    ref={ref}
    className="grain-overlay group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/6 bg-[#0d1117] p-5 cursor-pointer"
    style={{
      boxShadow: "0 0 0 1px rgba(255,255,255,0.04)",
    }}
    whileHover={{
      boxShadow: `0 0 30px ${accent.glow}, 0 0 1px rgba(255,255,255,0.1)`,
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    }}
  >
    {/* Mesh gradient background */}
    <div className="absolute inset-0 overflow-hidden">
      <div
        className={`absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${accent.from} ${accent.to}`}
        style={{ filter: "blur(40px)" }}
      />
    </div>

    {/* Content */}
    <div className="relative z-10 flex flex-1 flex-col gap-4">
      {/* Icon */}
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${accent.from} ${accent.to} shadow-lg`}
      >
        <Icon size={18} className="text-white" />
      </div>

      {/* Title */}
      <div className="flex-1">
        <h3 className="font-syne text-sm font-semibold text-white leading-snug">
          {course.title}
        </h3>
      </div>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="font-mono-custom text-[10px] text-white/30 uppercase tracking-wider">
            Progress
          </span>
          <span className="font-mono-custom text-xs font-bold text-white/70">
            {course.progress}%
          </span>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/6">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${accent.from} ${accent.to}`}
            initial={{ width: "0%" }}
            animate={{ width: inView ? `${course.progress}%` : "0%" }}
            transition={{
              duration: 1.2,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.3,
            }}
          />
        </div>
      </div>
    </div>
  </motion.article>
);
}