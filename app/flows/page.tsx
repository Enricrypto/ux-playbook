"use client";

import { useState } from "react";
import { ShoppingCart, RefreshCw, Heart, ArrowRight } from "lucide-react";
import { funnels, patterns } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart, RefreshCw, Heart,
};

const colorMap: Record<string, { bg: string; text: string; border: string; step: string[] }> = {
  blue: {
    bg: "bg-blue-600", text: "text-blue-700", border: "border-blue-200",
    step: ["bg-blue-50", "bg-blue-100", "bg-blue-200", "bg-blue-300", "bg-blue-400"],
  },
  green: {
    bg: "bg-emerald-600", text: "text-emerald-700", border: "border-emerald-200",
    step: ["bg-emerald-50", "bg-emerald-100", "bg-emerald-200", "bg-emerald-300", "bg-emerald-400"],
  },
  purple: {
    bg: "bg-violet-600", text: "text-violet-700", border: "border-violet-200",
    step: ["bg-violet-50", "bg-violet-100", "bg-violet-200", "bg-violet-300", "bg-violet-400"],
  },
};

export default function FlowsPage() {
  const [active, setActive] = useState(0);
  const funnel = funnels[active];
  const colors = colorMap[funnel.color];

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Goal-based flows</h1>
        <p className="text-sm text-gray-500 mt-1">
          Recommended pattern sequences by business objective.
        </p>
      </div>

      <div className="flex gap-2 mb-8">
        {funnels.map((f, i) => {
          const Icon = iconMap[f.icon] ?? ShoppingCart;
          const c = colorMap[f.color];
          return (
            <button
              key={f.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-colors ${
                active === i
                  ? `${c.bg} text-white border-transparent font-medium`
                  : `bg-white ${c.text} ${c.border} hover:bg-gray-50`
              }`}
            >
              <Icon className="w-4 h-4" />
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-2 mb-8">
        {funnel.steps.map((step, i) => (
          <div key={i}>
            <div className={`${colors.step[i]} rounded-xl px-5 py-4 flex items-center gap-4`}
              style={{ marginLeft: `${i * 20}px` }}>
              <div className="w-6 h-6 rounded-full bg-white bg-opacity-60 flex items-center justify-center text-xs font-semibold text-gray-700 flex-shrink-0">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">{step.label}</p>
                <p className="text-xs text-gray-600 mt-0.5">{step.meta}</p>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {step.patterns.map((pid) => {
                  const p = patterns.find((x) => x.id === pid);
                  return p ? (
                    <span key={pid} className="text-xs bg-white bg-opacity-60 px-2 py-0.5 rounded text-gray-700 border border-white border-opacity-40">
                      {p.title}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
            {i < funnel.steps.length - 1 && (
              <div className="flex" style={{ marginLeft: `${i * 20 + 28}px` }}>
                <ArrowRight className="w-3.5 h-3.5 text-gray-300 rotate-90 my-0.5" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="text-sm font-medium text-gray-900 mb-3">Patterns used in this flow</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[...new Set(funnel.steps.flatMap((s) => s.patterns))].map((pid) => {
            const p = patterns.find((x) => x.id === pid);
            return p ? (
              <div key={pid} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">{p.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{p.desc}</p>
                </div>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}
