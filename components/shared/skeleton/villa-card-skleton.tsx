export default function VillaCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-85 rounded-sm overflow-hidden bg-white shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
      <div className="min-h-65 md:min-h-0 animate-pulse bg-slate-200" />
      <div className="flex flex-col justify-center gap-3 px-8 py-10 md:px-11">
        <div className="h-7 w-3/5 rounded bg-slate-200 animate-pulse" />
        <div className="h-3 w-20 rounded bg-slate-200 animate-pulse" />
        <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
        <div className="h-4 w-4/5 rounded bg-slate-200 animate-pulse" />
        <div className="flex gap-4 pt-4 border-t border-slate-100">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-14 w-14 rounded bg-slate-200 animate-pulse"
            />
          ))}
        </div>
        <div className="h-10 w-36 rounded bg-slate-200 animate-pulse mt-2" />
      </div>
    </div>
  );
}
