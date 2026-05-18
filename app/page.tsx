"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { patterns } from "@/lib/data";
import { PatternCard } from "@/components/PatternCard";

const platforms = ["All", "SaaS", "Mobile", "E-com"] as const;
const goals = ["All", "Conversion", "Retention", "Engagement", "Onboarding"] as const;

export default function PatternsPage() {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState<string>("All");
  const [goal, setGoal] = useState<string>("All");

  const filtered = useMemo(() =>
    patterns.filter((p) => {
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase()) ||
        p.psychology.toLowerCase().includes(search.toLowerCase());
      const matchPlatform = platform === "All" || p.tags.includes(platform as never);
      const matchGoal = goal === "All" || p.goals.includes(goal as never);
      return matchSearch && matchPlatform && matchGoal;
    }),
    [search, platform, goal]
  );

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Design patterns</h1>
        <p className="text-sm text-gray-500 mt-1">
          {patterns.length} patterns grounded in psychology and validated against real product data. Click any card to expand.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search patterns, psychology, examples..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
          />
        </div>
        <FilterGroup label="Platform" options={platforms} value={platform} onChange={setPlatform} />
        <FilterGroup label="Goal" options={goals} value={goal} onChange={setGoal} />
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            No patterns match your filters.
          </div>
        ) : (
          filtered.map((p) => <PatternCard key={p.id} pattern={p} />)
        )}
      </div>

      <p className="text-xs text-gray-400 mt-8">
        To add a pattern, edit <code className="font-mono bg-gray-100 px-1 rounded">lib/data.ts</code>.
      </p>
    </div>
  );
}

function FilterGroup({ label, options, value, onChange }: { label: string; options: readonly string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="text-xs text-gray-400">{label}:</span>
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)}
          className={"text-xs px-2.5 py-1 rounded-md border transition-colors " + (value === o ? "bg-blue-50 text-blue-700 border-blue-200 font-medium" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300")}>
          {o}
        </button>
      ))}
    </div>
  );
}
