"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Audit01FreeIcons,
  SparklesFreeIcons,
  CheckListFreeIcons,
  Search01FreeIcons,
  Alert01FreeIcons,
} from "@hugeicons/core-free-icons";

interface FrictionPoint {
  area: string;
  issue: string;
  impact: "high" | "medium" | "low";
}

interface PsychologyGap {
  pattern: string;
  explanation: string;
  recommendation: string;
}

interface Fix {
  title: string;
  why: string;
  how: string;
  effort: "low" | "medium" | "high";
  impact: "high" | "medium" | "low";
}

interface AuditResult {
  score: number;
  summary: string;
  frictionPoints: FrictionPoint[];
  psychologyGaps: PsychologyGap[];
  fixFirst: Fix[];
}

const impactStyle = (level: string) => {
  if (level === "high")   return { color: "#D95C3A", bg: "rgba(217,92,58,0.08)",   border: "rgba(217,92,58,0.2)"   };
  if (level === "medium") return { color: "#B87AD4", bg: "rgba(184,122,212,0.08)", border: "rgba(184,122,212,0.2)" };
  return                         { color: "#9E9589", bg: "rgba(158,149,137,0.08)", border: "rgba(158,149,137,0.2)" };
};

export default function AuditPage() {
  const searchParams = useSearchParams();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const param = searchParams.get("url");
    if (param) setUrl(param);
  }, [searchParams]);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAudit = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Audit failed"); return; }
      setResult(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-24 pb-16">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-normal text-gray-900">Audit tool</h1>
        <p className="text-sm mt-1" style={{ color: "#9E9589" }}>
          Psychology-mapped UX audit. Paste a website URL or GitHub repository.
        </p>
      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl border p-6 mb-8" style={{ borderColor: "#E8E3DC" }}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Website URL or GitHub repository
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <HugeiconsIcon
              icon={Search01FreeIcons}
              size={16}
              color="#9E9589"
              strokeWidth={1.5}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              type="url"
              placeholder="https://yoursite.com  or  https://github.com/user/repo"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runAudit()}
              className="w-full pl-9 pr-4 py-2.5 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#D95C3A]/20 focus:border-[#D95C3A]/40 focus:bg-white transition-colors"
              style={{ borderColor: "#E8E3DC" }}
            />
          </div>
          <button
            onClick={runAudit}
            disabled={loading || !url.trim()}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-40 sm:shrink-0"
            style={{ backgroundColor: "#D95C3A" }}
          >
            {loading ? "Auditing…" : "Run audit"}
          </button>
        </div>
        <p className="text-xs mt-2" style={{ color: "#9E9589" }}>
          Accepts any public URL or GitHub repository link.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div
          className="rounded-xl border p-4 mb-6 flex gap-3 items-start"
          style={{ backgroundColor: "rgba(217,92,58,0.06)", borderColor: "rgba(217,92,58,0.2)" }}
        >
          <HugeiconsIcon icon={Alert01FreeIcons} size={16} color="#D95C3A" strokeWidth={1.5} className="mt-0.5 shrink-0" />
          <p className="text-sm" style={{ color: "#D95C3A" }}>{error}</p>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-3">
          {[80, 65, 90].map((w, i) => (
            <div key={i} className="bg-white rounded-xl border p-5 animate-pulse" style={{ borderColor: "#E8E3DC" }}>
              <div className="h-3 rounded-full mb-3" style={{ backgroundColor: "#EDE8E2", width: `${w}%` }} />
              <div className="h-2.5 rounded-full" style={{ backgroundColor: "#EDE8E2", width: "55%" }} />
            </div>
          ))}
          <p className="text-xs text-center pt-2" style={{ color: "#9E9589" }}>
            Analyzing against 50+ psychology patterns…
          </p>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="space-y-8">

          {/* Score + summary */}
          <div className="bg-white rounded-xl border p-5" style={{ borderColor: "#E8E3DC" }}>
            <div className="flex items-start justify-between gap-8">
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-2" style={{ color: "#9E9589" }}>
                  Overall assessment
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#4B4540" }}>{result.summary}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-display font-normal leading-none" style={{ fontSize: "3.5rem", color: "#D95C3A" }}>
                  {result.score}
                </p>
                <p className="text-xs" style={{ color: "#9E9589" }}>/ 100</p>
              </div>
            </div>
          </div>

          {/* Friction map */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <HugeiconsIcon icon={Audit01FreeIcons} size={15} color="#9E9589" strokeWidth={1.5} />
              <h2 className="font-display text-base font-normal text-gray-900">Friction map</h2>
            </div>
            <div className="space-y-2">
              {result.frictionPoints.map((fp, i) => {
                const s = impactStyle(fp.impact);
                return (
                  <div key={i} className="bg-white rounded-xl border p-4 flex gap-4 items-start" style={{ borderColor: "#E8E3DC" }}>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium shrink-0 mt-0.5 capitalize"
                      style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                    >
                      {fp.impact}
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] mb-0.5" style={{ color: "#9E9589" }}>{fp.area}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "#4B4540" }}>{fp.issue}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Psychology gaps */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <HugeiconsIcon icon={SparklesFreeIcons} size={15} color="#9E9589" strokeWidth={1.5} />
              <h2 className="font-display text-base font-normal text-gray-900">Psychology gaps</h2>
            </div>
            <div className="space-y-2">
              {result.psychologyGaps.map((gap, i) => (
                <div key={i} className="bg-white rounded-xl border p-4" style={{ borderColor: "#E8E3DC" }}>
                  <p className="font-display text-sm font-normal text-gray-900 mb-1">{gap.pattern}</p>
                  <p className="text-xs leading-relaxed mb-2" style={{ color: "#9E9589" }}>{gap.explanation}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#D95C3A" }}>{gap.recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fix-first list */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <HugeiconsIcon icon={CheckListFreeIcons} size={15} color="#9E9589" strokeWidth={1.5} />
              <h2 className="font-display text-base font-normal text-gray-900">Fix-first list</h2>
            </div>
            <div className="space-y-2">
              {result.fixFirst.map((fix, i) => {
                const s = impactStyle(fix.impact);
                return (
                  <div key={i} className="bg-white rounded-xl border p-4" style={{ borderColor: "#E8E3DC" }}>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-display text-sm font-normal shrink-0" style={{ color: "rgba(217,92,58,0.3)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="font-display text-sm font-normal text-gray-900">{fix.title}</p>
                      </div>
                      <span
                        className="text-xs px-2.5 py-0.5 rounded-full font-medium shrink-0 capitalize"
                        style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                      >
                        {fix.impact} impact
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed mb-1.5" style={{ color: "#9E9589" }}>{fix.why}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "#4B4540" }}>{fix.how}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* Pre-run feature preview */}
      {!result && !loading && !error && (
        <div className="mt-2">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: "#9E9589" }}>
            What you&apos;ll get
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { icon: Audit01FreeIcons,     title: "Friction map",      desc: "Every unnecessary step, field, or decision identified and prioritized." },
              { icon: SparklesFreeIcons,    title: "Psychology gaps",   desc: "Patterns from this playbook that are absent or misapplied in your flow." },
              { icon: CheckListFreeIcons,   title: "Fix-first list",    desc: "4 ranked recommendations ordered by impact-to-effort ratio." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border p-4" style={{ borderColor: "#E8E3DC" }}>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: "rgba(217,92,58,0.08)" }}
                >
                  <HugeiconsIcon icon={item.icon} size={14} color="#D95C3A" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#9E9589" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
