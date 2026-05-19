"use client";

export function PatternProgress({ viewed, total }: { viewed: number; total: number }) {
  if (total === 0) return null;
  const pct = Math.round((viewed / total) * 100);

  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#EDE8E2" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: "#D95C3A" }}
        />
      </div>
      <p className="text-xs shrink-0 tabular-nums" style={{ color: "#9E9589" }}>
        <strong className="text-gray-700">{viewed}</strong> / {total} explored
      </p>
    </div>
  );
}
