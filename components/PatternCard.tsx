"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  StarFreeIcons,
  ChartIncreaseFreeIcons,
  UserMultipleFreeIcons,
  SparklesFreeIcons,
  Clock01FreeIcons,
  PercentFreeIcons,
  RepeatFreeIcons,
  Door01FreeIcons,
  ArrowUp01FreeIcons,
  ShieldFreeIcons,
  ArrowDown01FreeIcons,
} from "@hugeicons/core-free-icons";
import { Pattern } from "@/lib/data";
import { PlatformTag, GoalTag } from "@/components/ui/tags";

const GOAL_COLORS: Record<string, { hex: string; r: number; g: number; b: number }> = {
  Conversion:  { hex: "#D95C3A", r: 217, g: 92,  b: 58  },
  Retention:   { hex: "#B87AD4", r: 184, g: 122, b: 212 },
  Engagement:  { hex: "#1E0E3A", r: 30,  g: 14,  b: 58  },
  Onboarding:  { hex: "#9E9589", r: 158, g: 149, b: 137 },
};

function getPatternIcon(name: string) {
  if (name === "Star")           return StarFreeIcons;
  if (name === "TrendingUp")     return ChartIncreaseFreeIcons;
  if (name === "Users")          return UserMultipleFreeIcons;
  if (name === "Zap")            return SparklesFreeIcons;
  if (name === "Clock")          return Clock01FreeIcons;
  if (name === "Percent")        return PercentFreeIcons;
  if (name === "RefreshCw")      return RepeatFreeIcons;
  if (name === "DoorOpen")       return Door01FreeIcons;
  if (name === "Sparkles")       return SparklesFreeIcons;
  if (name === "ArrowUpCircle")  return ArrowUp01FreeIcons;
  if (name === "ShieldCheck")    return ShieldFreeIcons;
  return StarFreeIcons;
}

export function PatternCard({ pattern }: { pattern: Pattern }) {
  const [open, setOpen] = useState(false);
  const Icon = getPatternIcon(pattern.icon);
  const gc = GOAL_COLORS[pattern.goals[0]] ?? GOAL_COLORS.Conversion;

  return (
    <div
      className="rounded-xl transition-all"
      style={{
        background: "#FDFAF8",
        border: open ? `1px solid rgba(${gc.r},${gc.g},${gc.b},0.25)` : "1px solid #EDE8E2",
        borderLeft: `3px solid rgba(${gc.r},${gc.g},${gc.b},0.45)`,
        boxShadow: open ? `0 1px 8px rgba(${gc.r},${gc.g},${gc.b},0.08)` : undefined,
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-5 py-4 flex items-start gap-4"
      >
        <div
          className="mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `rgba(${gc.r},${gc.g},${gc.b},0.08)` }}
        >
          <HugeiconsIcon icon={Icon} size={16} color={gc.hex} strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-base font-normal text-gray-900">{pattern.title}</p>
          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#9E9589" }}>{pattern.desc}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {pattern.tags.map((t) => <PlatformTag key={t} platform={t} />)}
            {pattern.goals.map((g) => <GoalTag key={g} goal={g} />)}
          </div>
        </div>
        <div className="shrink-0 mt-1.5" style={{ color: "#C5BDB5" }}>
          <HugeiconsIcon
            icon={open ? ArrowUp01FreeIcons : ArrowDown01FreeIcons}
            size={14}
            color="#C5BDB5"
            strokeWidth={1.5}
          />
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4" style={{ borderTop: `1px solid rgba(${gc.r},${gc.g},${gc.b},0.1)` }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Detail label="Psychology basis"  value={pattern.psychology} accent={gc.hex} />
            <Detail label="How to implement"  value={pattern.how} />
            <Detail label="Real examples"     value={pattern.example} />
            <Detail label="Key metric"        value={pattern.metric} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatCard value={pattern.stat1} label={pattern.stat1l} />
            <StatCard value={pattern.stat2} label={pattern.stat2l ?? ""} />
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div>
      <p
        className="text-xs font-semibold uppercase tracking-[0.12em] mb-1"
        style={{ color: accent ?? "#9E9589" }}
      >
        {label}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: "#4B4540" }}>{value}</p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-3 rounded-lg" style={{ backgroundColor: "#F5F0EB" }}>
      <p className="font-display text-xl font-normal" style={{ color: "#D95C3A" }}>{value}</p>
      <p className="text-xs mt-0.5 leading-snug" style={{ color: "#9E9589" }}>{label}</p>
    </div>
  );
}
