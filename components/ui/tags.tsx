import { cn } from "@/lib/utils";

type Platform = "SaaS" | "Mobile" | "E-com";
type Goal = "Conversion" | "Retention" | "Engagement" | "Onboarding";
type Priority = "must" | "should" | "nice";

const platformColors: Record<Platform, string> = {
  SaaS: "bg-blue-50 text-blue-700 border-blue-200",
  Mobile: "bg-purple-50 text-purple-700 border-purple-200",
  "E-com": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const goalColors: Record<Goal, string> = {
  Conversion: "bg-orange-50 text-orange-700 border-orange-200",
  Retention: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Engagement: "bg-violet-50 text-violet-700 border-violet-200",
  Onboarding: "bg-sky-50 text-sky-700 border-sky-200",
};

const priorityStyles: Record<Priority, string> = {
  must: "bg-red-50 text-red-700 border-red-200",
  should: "bg-amber-50 text-amber-700 border-amber-200",
  nice: "bg-gray-50 text-gray-600 border-gray-200",
};

const priorityLabel: Record<Priority, string> = {
  must: "Must",
  should: "Should",
  nice: "Nice to have",
};

export function PlatformTag({ platform }: { platform: Platform }) {
  return (
    <span className={cn("text-xs px-2 py-0.5 rounded border font-medium", platformColors[platform])}>
      {platform}
    </span>
  );
}

export function GoalTag({ goal }: { goal: Goal }) {
  return (
    <span className={cn("text-xs px-2 py-0.5 rounded border font-medium", goalColors[goal])}>
      {goal}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={cn("text-xs px-2 py-0.5 rounded border font-medium", priorityStyles[priority])}>
      {priorityLabel[priority]}
    </span>
  );
}
