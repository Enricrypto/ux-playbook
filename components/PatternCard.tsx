"use client";

import { useState } from "react";
import {
  Star, TrendingUp, Users, Zap, Clock, Percent, RefreshCw,
  DoorOpen, Sparkles, ArrowUpCircle, ShieldCheck, ChevronDown, ChevronUp,
} from "lucide-react";
import { Pattern } from "@/lib/data";
import { PlatformTag, GoalTag } from "@/components/ui/tags";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Star, TrendingUp, Users, Zap, Clock, Percent, RefreshCw,
  DoorOpen, Sparkles, ArrowUpCircle, ShieldCheck,
};

export function PatternCard({ pattern }: { pattern: Pattern }) {
  const [open, setOpen] = useState(false);
  const Icon = iconMap[pattern.icon] ?? Star;

  return (
    <div
      className={cn(
        "rounded-xl border bg-white transition-shadow",
        open ? "border-blue-200 shadow-sm" : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
      )}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-5 py-4 flex items-start gap-4"
      >
        <div className="mt-0.5 w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 text-sm">{pattern.title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{pattern.desc}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {pattern.tags.map((t) => <PlatformTag key={t} platform={t} />)}
            {pattern.goals.map((g) => <GoalTag key={g} goal={g} />)}
          </div>
        </div>
        <div className="text-gray-400 flex-shrink-0 mt-1">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Detail label="Psychology basis" value={pattern.psychology} />
            <Detail label="How to implement" value={pattern.how} />
            <Detail label="Real examples" value={pattern.example} />
            <Detail label="Key metric" value={pattern.metric} />
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

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-sm text-gray-700 leading-relaxed">{value}</p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-gray-50 rounded-lg px-4 py-3">
      <p className="text-xl font-semibold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5 leading-snug">{label}</p>
    </div>
  );
}
