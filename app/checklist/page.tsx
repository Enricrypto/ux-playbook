"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, RotateCcw } from "lucide-react";
import { checklistItems } from "@/lib/data";
import { PriorityBadge } from "@/components/ui/tags";

const categories = ["Conversion", "Onboarding", "Retention", "Ethics"] as const;

const categoryColors: Record<string, string> = {
  Conversion: "text-orange-700",
  Onboarding: "text-sky-700",
  Retention: "text-emerald-700",
  Ethics: "text-violet-700",
};

const STORAGE_KEY = "ux-playbook-checklist";

export default function ChecklistPage() {
  const [done, setDone] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setDone(new Set(JSON.parse(saved)));
    } catch {}
    setLoaded(true);
  }, []);

  const toggle = (id: string) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  };

  const reset = () => {
    setDone(new Set());
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  const total = checklistItems.length;
  const completed = done.size;
  const pct = Math.round((completed / total) * 100);

  if (!loaded) return null;

  return (
    <div className="max-w-3xl mx-auto px-8 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Pre-launch audit checklist</h1>
          <p className="text-sm text-gray-500 mt-1">
            Run this before shipping any significant flow. Progress saves in your browser.
          </p>
        </div>
        <button onClick={reset} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors mt-1">
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall completion</span>
          <span className="text-sm font-semibold text-gray-900">{completed} / {total}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5">{pct}% complete</p>
      </div>

      {/* Items by category */}
      <div className="space-y-6">
        {categories.map((cat) => {
          const items = checklistItems.filter((i) => i.category === cat);
          const catDone = items.filter((i) => done.has(i.id)).length;
          return (
            <div key={cat}>
              <div className="flex items-center justify-between mb-2">
                <h2 className={`text-sm font-semibold ${categoryColors[cat]}`}>{cat}</h2>
                <span className="text-xs text-gray-400">{catDone} / {items.length}</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
                {items.map((item) => {
                  const checked = done.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      {checked
                        ? <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        : <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                      }
                      <span className={`flex-1 text-sm leading-snug ${checked ? "line-through text-gray-400" : "text-gray-700"}`}>
                        {item.text}
                      </span>
                      <PriorityBadge priority={item.priority} />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 mt-8">
        Add items in <code className="font-mono bg-gray-100 px-1 rounded">lib/data.ts</code> under <code className="font-mono bg-gray-100 px-1 rounded">checklistItems</code>.
      </p>
    </div>
  );
}
