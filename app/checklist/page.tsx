"use client";

import { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle01FreeIcons, Rotate01FreeIcons } from "@hugeicons/core-free-icons";
import { checklistItems } from "@/lib/data";
import { PriorityBadge } from "@/components/ui/tags";

const categories = ["Conversion", "Onboarding", "Retention", "Ethics"] as const;

const categoryConfig: Record<string, { color: string }> = {
  Conversion: { color: "#D95C3A" },
  Onboarding: { color: "#1E0E3A" },
  Retention:  { color: "#B87AD4" },
  Ethics:     { color: "#9E9589" },
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
      if (next.has(id)) next.delete(id);
      else next.add(id);
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
    <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-24 pb-16">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-normal text-gray-900">
            Pre-launch checklist
          </h1>
          <p className="text-sm mt-1" style={{ color: "#9E9589" }}>
            Run this before shipping any significant flow. Progress saves in your browser.
          </p>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-xs mt-1 transition-opacity hover:opacity-60"
          style={{ color: "#9E9589" }}
        >
          <HugeiconsIcon icon={Rotate01FreeIcons} size={13} color="#9E9589" strokeWidth={1.5} />
          Reset
        </button>
      </div>

      <div
        className="rounded-xl border p-5 mb-8"
        style={{ borderColor: "#E8E3DC", backgroundColor: "white" }}
      >
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-sm font-medium text-gray-700">Overall completion</span>
          <span className="text-sm font-medium" style={{ color: "#D95C3A" }}>
            {completed} / {total}
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#EDE8E2" }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${pct}%`, backgroundColor: "#D95C3A" }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: "#9E9589" }}>{pct}% complete</p>
      </div>

      <div className="space-y-6">
        {categories.map((cat) => {
          const items = checklistItems.filter((i) => i.category === cat);
          const catDone = items.filter((i) => done.has(i.id)).length;
          const cfg = categoryConfig[cat];
          return (
            <div key={cat}>
              <div className="flex items-center justify-between mb-2">
                <h2
                  className="text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{ color: cfg.color }}
                >
                  {cat}
                </h2>
                <span className="text-xs" style={{ color: "#9E9589" }}>
                  {catDone} / {items.length}
                </span>
              </div>
              <div
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: "#E8E3DC", backgroundColor: "white" }}
              >
                {items.map((item, idx) => {
                  const checked = done.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[#FAF8F5]"
                      style={{ borderTop: idx > 0 ? "1px solid #F0ECE6" : undefined }}
                    >
                      {checked ? (
                        <HugeiconsIcon
                          icon={CheckmarkCircle01FreeIcons}
                          size={18}
                          color="#D95C3A"
                          strokeWidth={1.5}
                          className="shrink-0"
                        />
                      ) : (
                        <div
                          className="w-[18px] h-[18px] rounded-full border-2 shrink-0"
                          style={{ borderColor: "#D4CEC8" }}
                        />
                      )}
                      <span
                        className="flex-1 text-sm leading-snug"
                        style={{ color: checked ? "#9E9589" : "#4B4540", textDecoration: checked ? "line-through" : undefined }}
                      >
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
    </div>
  );
}
