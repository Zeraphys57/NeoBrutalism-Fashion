// Route-level loading UI. Mirrors the ProductDetail split so the layout doesn't
// jump when real content arrives. Pure CSS (animate-pulse) — no client JS.

const SKELETON = "animate-pulse b-border";
const FILL = { backgroundColor: "#E0D9CF" };

export default function Loading() {
  return (
    <div className="min-h-screen bg-chalk pt-[68px]">
      {/* Back-nav bar skeleton */}
      <div className="flex items-center justify-between gap-4 border-b-[3px] border-ink px-6 py-3 md:px-12">
        <div className={`${SKELETON} h-4 w-16`} style={FILL} />
        <div className={`${SKELETON} hidden h-4 w-64 md:block`} style={FILL} />
        <div className={`${SKELETON} h-4 w-20`} style={FILL} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr]">
        {/* Image column */}
        <div className="px-6 pt-8 md:px-12 lg:pr-8">
          <div className={`${SKELETON} aspect-[4/5] w-full`} style={FILL} />
          <div className={`${SKELETON} mt-4 aspect-[3/4] w-full`} style={FILL} />
          <div className="mt-4 grid max-w-[356px] grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`${SKELETON} aspect-square`} style={FILL} />
            ))}
          </div>
        </div>

        {/* Info column */}
        <div className="flex flex-col px-6 pb-24 pt-10 md:px-12 lg:pl-12">
          <div className={`${SKELETON} h-4 w-32`} style={FILL} />
          <div className={`${SKELETON} mt-4 h-16 w-4/5`} style={FILL} />
          <div className={`${SKELETON} mt-3 h-10 w-3/5`} style={FILL} />

          {/* Price */}
          <div className={`${SKELETON} mt-8 h-14 w-44`} style={FILL} />

          {/* Description lines */}
          <div className="mt-8 flex flex-col gap-2.5">
            <div className={`${SKELETON} h-3 w-full`} style={FILL} />
            <div className={`${SKELETON} h-3 w-11/12`} style={FILL} />
            <div className={`${SKELETON} h-3 w-9/12`} style={FILL} />
          </div>

          {/* Specs */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`${SKELETON} h-10 w-full`} style={FILL} />
            ))}
          </div>

          {/* Size row */}
          <div className="mt-10 flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={`${SKELETON} h-11 w-11`} style={FILL} />
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-3">
            <div className={`${SKELETON} h-14 w-full`} style={FILL} />
            <div className={`${SKELETON} h-14 w-full`} style={FILL} />
          </div>
        </div>
      </div>
    </div>
  );
}
