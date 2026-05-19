"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingCart01FreeIcons,
  RepeatFreeIcons,
  FavouriteFreeIcons,
} from "@hugeicons/core-free-icons";
import { funnels, patterns } from "@/lib/data";

function getFunnelIcon(name: string) {
  if (name === "ShoppingCart") return ShoppingCart01FreeIcons;
  if (name === "RefreshCw") return RepeatFreeIcons;
  if (name === "Heart") return FavouriteFreeIcons;
  return ShoppingCart01FreeIcons;
}

const palette = [
  { hex: "#D95C3A", r: 217, g: 92,  b: 58  },
  { hex: "#1E0E3A", r: 30,  g: 14,  b: 58  },
  { hex: "#B87AD4", r: 184, g: 122, b: 212 },
];

export default function FlowsPage() {
  const [active, setActive] = useState(0);
  const funnel = funnels[active];
  const color = palette[active] ?? palette[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-24 pb-16">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-normal text-gray-900">
          Goal-based flows
        </h1>
        <p className="text-sm mt-1" style={{ color: "#9E9589" }}>
          Recommended pattern sequences by business objective.
        </p>
      </div>

      {/* Funnel tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {funnels.map((f, i) => {
          const c = palette[i] ?? palette[0];
          const Icon = getFunnelIcon(f.icon);
          const isActive = active === i;
          return (
            <button
              key={f.id}
              onClick={() => setActive(i)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all"
              style={
                isActive
                  ? { backgroundColor: c.hex, color: "white" }
                  : {
                      backgroundColor: `rgba(${c.r},${c.g},${c.b},0.08)`,
                      color: c.hex,
                      border: `1px solid rgba(${c.r},${c.g},${c.b},0.2)`,
                    }
              }
            >
              <HugeiconsIcon
                icon={Icon}
                size={14}
                color={isActive ? "white" : c.hex}
                strokeWidth={1.5}
              />
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Step cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {funnel.steps.map((step, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 flex flex-col gap-4"
            style={{
              backgroundColor: "white",
              border: "1px solid #EDE8E2",
            }}
          >
            <div className="flex items-start gap-4">
              <span
                className="font-display text-4xl font-normal leading-none shrink-0"
                style={{ color: `rgba(${color.r},${color.g},${color.b},0.25)` }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-display text-lg font-normal text-gray-900 leading-snug mb-1">
                  {step.label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#9E9589" }}>
                  {step.meta}
                </p>
              </div>
            </div>

            {step.patterns.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-3" style={{ borderTop: "1px solid #F0ECE6" }}>
                {step.patterns.map((pid) => {
                  const p = patterns.find((x) => x.id === pid);
                  return p ? (
                    <span
                      key={pid}
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: `rgba(${color.r},${color.g},${color.b},0.08)`,
                        color: color.hex,
                      }}
                    >
                      {p.title}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Patterns summary */}
      <div
        className="rounded-xl border p-5"
        style={{ borderColor: "#E8E3DC", backgroundColor: "white" }}
      >
        <h2 className="font-display text-base font-normal text-gray-900 mb-4">
          Patterns used in this flow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[...new Set(funnel.steps.flatMap((s) => s.patterns))].map((pid) => {
            const p = patterns.find((x) => x.id === pid);
            return p ? (
              <div
                key={pid}
                className="p-3 rounded-lg"
                style={{ backgroundColor: "#F5F0EB" }}
              >
                <p className="text-sm font-medium text-gray-900">{p.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "#9E9589" }}>
                  {p.desc}
                </p>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}
