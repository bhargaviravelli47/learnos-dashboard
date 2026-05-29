import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/Sidebar";
import HeroTile from "@/components/HeroTile";
import CourseGrid from "@/components/CourseGrid";
import ActivityTile from "@/components/ActivityTile";
import CourseSkeleton from "@/components/skeletons/CourseSkeleton";
import { Course } from "@/types";

async function CoursesServer() {
  const supabase = createClient();

  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return (
      <div className="col-span-full flex items-center justify-center rounded-2xl border border-red-500/20 bg-red-950/20 p-8 text-red-400">
        <p className="text-sm">Failed to load courses. Please try again later.</p>
      </div>
    );
  }

  return <CourseGrid courses={courses as Course[]} />;
}

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#080C14] font-sans text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Bento Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Hero tile spans full width on desktop */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
              <HeroTile name="Alex" streak={14} />
            </div>

            {/* Course tiles */}
            <Suspense fallback={<CourseSkeleton />}>
              <CoursesServer />
            </Suspense>

            {/* Activity tile */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2">
              <ActivityTile />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
