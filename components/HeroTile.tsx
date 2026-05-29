"use client";

import { motion } from "framer-motion";
import { Flame, Clock, Target } from "lucide-react";

interface HeroTileProps {
  name: string;
  streak: number;
}

export default function HeroTile({ name, streak }: HeroTileProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.05 }}
      whileHover={{ scale: 1.005 }}
      className="grain-overlay relative overflow-hidden rounded-2xl border border-white/6 bg-[#0d1117] p-6 lg:p-8"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute -right-10 top-0 h-48 w-48 rounded-full bg-violet-600/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-32 w-64 rounded-full bg-emerald-500/4 blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Greeting */}
        <div>
          <p className="font-mono-custom text-xs text-white/30 uppercase tracking-widest mb-2">
            {greeting}
          </p>
          <h1 className="font-syne text-3xl font-bold text-white lg:text-4xl">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Bhargavi
            </span>
          </h1>
          <p className="mt-2 font-syne text-sm text-white/40">
            You have 3 courses in progress. Keep the momentum going.
          </p>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3">
          {/* Streak */}
          <div className="flex items-center gap-2 rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-3">
            <Flame size={18} className="text-orange-400" />
            <div>
              <p className="font-syne text-xl font-bold text-white leading-none">{streak}</p>
              <p className="font-mono-custom text-[10px] text-white/40 uppercase tracking-widest mt-0.5">
                day streak
              </p>
            </div>
          </div>

          {/* Time today */}
          <div className="flex items-center gap-2 rounded-xl border border-white/6 bg-white/4 px-4 py-3">
            <Clock size={18} className="text-cyan-400/70" />
            <div>
              <p className="font-syne text-xl font-bold text-white leading-none">2.4h</p>
              <p className="font-mono-custom text-[10px] text-white/40 uppercase tracking-widest mt-0.5">
                today
              </p>
            </div>
          </div>

          {/* Goal */}
          <div className="hidden items-center gap-2 rounded-xl border border-white/6 bg-white/4 px-4 py-3 sm:flex">
            <Target size={18} className="text-emerald-400/70" />
            <div>
              <p className="font-syne text-xl font-bold text-white leading-none">80%</p>
              <p className="font-mono-custom text-[10px] text-white/40 uppercase tracking-widest mt-0.5">
                weekly goal
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
