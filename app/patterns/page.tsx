"use client";

import { useState, useMemo } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01FreeIcons } from "@hugeicons/core-free-icons";
import { patterns, type Platform, type Goal } from "@/lib/data";
import { PatternCard } from "@/components/PatternCard";

const platforms = ["All", "SaaS", "Mobile", "E-com"] as const;
const goals = ["All", "Conversion", "Retention", "Engagement", "Onboarding"] as const;

export default function PatternsPage() {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState<Platform | "All">("All");
  const [goal, setGoal] = useState<Goal | "All">("All");

  const filtered = useMemo(
    () =>
      patterns.filter((p) => {
        const matchSearch =
          !search ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.desc.toLowerCase().includes(search.toLowerCase()) ||
          p.psychology.toLowerCase().includes(search.toLowerCase());
        const matchPlatform = platform === "All" || p.tags.includes(platform);
        const matchGoal = goal === "All" || p.goals.includes(goal);
        return matchSearch && matchPlatform && matchGoal;
      }),
    [search, platform, goal]
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-24 pb-16">
      <div className="mb-6">
        <h1 className="font-display text-3xl md:text-4xl font-normal text-gray-900">Design patterns</h1>
        <p className="text-sm mt-1" style={{ color: "#9E9589" }}>
          {patterns.length} patterns grounded in psychology and validated against real product data.
          Click any card to expand.
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <div className="relative">
          <HugeiconsIcon
            icon={Search01FreeIcons}
            size={16}
            color="#9E9589"
            strokeWidth={1.5}
            className="absolute left-4 top-1/2 -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search patterns, psychology, examples..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#D95C3A]/20 focus:border-[#D95C3A]/40"
            style={{ borderColor: "#E8E3DC" }}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <FilterGroup label="Platform" options={platforms} value={platform} onChange={setPlatform} />
          <FilterGroup label="Goal" options={goals} value={goal} onChange={setGoal} />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-sm" style={{ color: "#9E9589" }}>
            No patterns match your filters.
          </div>
        ) : (
          filtered.map((p) => <PatternCard key={p.id} pattern={p} />)
        )}
      </div>
    </div>
  );
}

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="text-xs" style={{ color: "#9E9589" }}>
        {label}:
      </span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className="text-xs px-2.5 py-1 rounded-md border transition-colors"
          style={
            value === o
              ? { backgroundColor: "#FDF0EB", color: "#D95C3A", borderColor: "#E8C4B8", fontWeight: 500 }
              : { backgroundColor: "white", color: "#6B6460", borderColor: "#E8E3DC" }
          }
        >
          {o}
        </button>
      ))}
    </div>
  );
}
