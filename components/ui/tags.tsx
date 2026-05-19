import type { Platform, Goal } from "@/lib/data";

type Priority = "must" | "should" | "nice";

const platformStyles: Record<Platform, { color: string; bg: string; border: string }> = {
  SaaS:   { color: "#D95C3A", bg: "rgba(217,92,58,0.08)",   border: "rgba(217,92,58,0.2)"   },
  Mobile: { color: "#1E0E3A", bg: "rgba(30,14,58,0.07)",    border: "rgba(30,14,58,0.15)"   },
  "E-com":{ color: "#B87AD4", bg: "rgba(184,122,212,0.1)",  border: "rgba(184,122,212,0.22)"},
};

const goalStyles: Record<Goal, { color: string; bg: string; border: string }> = {
  Conversion: { color: "#D95C3A", bg: "rgba(217,92,58,0.08)",   border: "rgba(217,92,58,0.2)"   },
  Retention:  { color: "#B87AD4", bg: "rgba(184,122,212,0.1)",  border: "rgba(184,122,212,0.22)"},
  Engagement: { color: "#1E0E3A", bg: "rgba(30,14,58,0.07)",    border: "rgba(30,14,58,0.15)"   },
  Onboarding: { color: "#9E9589", bg: "rgba(158,149,137,0.1)",  border: "rgba(158,149,137,0.2)" },
};

const priorityStyles: Record<Priority, { color: string; bg: string; border: string; label: string }> = {
  must:   { color: "#D95C3A", bg: "rgba(217,92,58,0.08)",  border: "rgba(217,92,58,0.2)",  label: "Must"        },
  should: { color: "#9E9589", bg: "rgba(158,149,137,0.1)", border: "rgba(158,149,137,0.2)",label: "Should"      },
  nice:   { color: "#9E9589", bg: "rgba(158,149,137,0.06)",border: "rgba(158,149,137,0.15)",label: "Nice to have"},
};

const tagBase = "text-xs px-2 py-0.5 rounded font-medium";

export function PlatformTag({ platform }: { platform: Platform }) {
  const s = platformStyles[platform];
  return (
    <span className={tagBase} style={{ color: s.color, backgroundColor: s.bg, border: `1px solid ${s.border}` }}>
      {platform}
    </span>
  );
}

export function GoalTag({ goal }: { goal: Goal }) {
  const s = goalStyles[goal];
  return (
    <span className={tagBase} style={{ color: s.color, backgroundColor: s.bg, border: `1px solid ${s.border}` }}>
      {goal}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const s = priorityStyles[priority];
  return (
    <span className={tagBase} style={{ color: s.color, backgroundColor: s.bg, border: `1px solid ${s.border}` }}>
      {s.label}
    </span>
  );
}
