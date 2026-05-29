"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

// Generate mock activity data for the last 12 weeks
function generateActivityData() {
  const data: { week: number; day: number; count: number }[] = [];
  const now = new Date();
  for (let w = 11; w >= 0; w--) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(now);
      date.setDate(date.getDate() - w * 7 - (6 - d));
      const count =
        date > now
          ? 0
          : Math.random() > 0.3
          ? Math.floor(Math.random() * 5) + 1
          : 0;
      data.push({ week: 11 - w, day: d, count });
    }
  }
  return data;
}

const activityData = Array.from({ length: 84 }, (_, i) => ({
  week: Math.floor(i / 7),
  day: i % 7,
  count: (i * 3) % 5,
}));

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function getColor(count: number) {
  if (count === 0) return "bg-white/4";
  if (count === 1) return "bg-cyan-900/60";
  if (count === 2) return "bg-cyan-700/70";
  if (count === 3) return "bg-cyan-500/80";
  return "bg-cyan-400";
}

export default function ActivityTile() {
  const today = new Date();
  const totalDays = activityData.filter((d) => d.count > 0).length;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.4 }}
      whileHover={{
        scale: 1.01,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="grain-overlay relative overflow-hidden rounded-2xl border border-white/6 bg-[#0d1117] p-5"
    >
      {/* Glow */}
      <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-emerald-400" />
            <h2 className="font-syne text-sm font-semibold text-white">
              Learning Activity
            </h2>
          </div>
          <span className="font-mono-custom text-xs text-white/30">
            {totalDays} active days
          </span>
        </div>

        {/* Grid */}
        <div className="overflow-x-auto">
          <div className="flex gap-1.5 min-w-fit">
            {/* Day labels */}
            <div className="flex flex-col gap-1 pt-5">
              {DAYS.map((d, i) => (
                <div
                  key={i}
                  className="h-3 w-3 flex items-center justify-center font-mono-custom text-[9px] text-white/20"
                >
                  {i % 2 === 1 ? d : ""}
                </div>
              ))}
            </div>

            {/* Weeks */}
            {Array.from({ length: 12 }, (_, week) => (
              <div key={week} className="flex flex-col gap-1">
                {/* Month label placeholder */}
                <div className="h-4 font-mono-custom text-[9px] text-white/20">
                  {week === 0
                    ? MONTHS[
                        (today.getMonth() - 11 + 12) % 12
                      ]
                    : week === 4
                    ? MONTHS[(today.getMonth() - 8 + 12) % 12]
                    : week === 8
                    ? MONTHS[(today.getMonth() - 4 + 12) % 12]
                    : ""}
                </div>
                {Array.from({ length: 7 }, (_, day) => {
                  const cell = activityData.find(
                    (d) => d.week === week && d.day === day
                  );
                  return (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: (week * 7 + day) * 0.003,
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                      title={`${cell?.count ?? 0} sessions`}
                      className={`h-3 w-3 rounded-sm ${getColor(cell?.count ?? 0)} transition-colors hover:brightness-150 cursor-pointer`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 justify-end">
          <span className="font-mono-custom text-[10px] text-white/20">Less</span>
          {[0, 1, 2, 3, 4].map((v) => (
            <div key={v} className={`h-3 w-3 rounded-sm ${getColor(v)}`} />
          ))}
          <span className="font-mono-custom text-[10px] text-white/20">More</span>
        </div>
      </div>
    </motion.article>
  );
}
