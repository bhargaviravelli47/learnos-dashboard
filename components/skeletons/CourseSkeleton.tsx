export default function CourseSkeleton() {
  return (
    <>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="col-span-1 flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/5 bg-[#0d1117] p-5"
        >
          {/* Icon skeleton */}
          <div className="h-10 w-10 rounded-xl skeleton-shimmer" />

          {/* Title skeleton */}
          <div className="space-y-2 flex-1">
            <div className="h-3 w-3/4 rounded-full skeleton-shimmer" />
            <div className="h-3 w-1/2 rounded-full skeleton-shimmer" />
          </div>

          {/* Progress skeleton */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-2 w-12 rounded-full skeleton-shimmer" />
              <div className="h-2 w-8 rounded-full skeleton-shimmer" />
            </div>
            <div className="h-1.5 w-full rounded-full skeleton-shimmer" />
          </div>
        </div>
      ))}
    </>
  );
}
