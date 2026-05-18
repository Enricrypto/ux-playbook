"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Brain,
  Filter,
  ShieldCheck,
  CheckSquare,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Patterns", icon: LayoutGrid },
  { href: "/laws", label: "Psychology laws", icon: Brain },
  { href: "/flows", label: "Goal-based flows", icon: Filter },
  { href: "/ethics", label: "Ethical guardrails", icon: ShieldCheck },
  { href: "/checklist", label: "Audit checklist", icon: CheckSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen border-r border-gray-100 bg-white flex flex-col">
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-0.5">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-gray-900 text-sm">UX Playbook</span>
        </div>
        <p className="text-xs text-gray-400 mt-1 leading-tight">
          Psychology-driven design patterns for SaaS, Mobile & E-com
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                active
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Add patterns in{" "}
          <code className="text-gray-500 font-mono bg-gray-50 px-1 rounded">
            lib/data.ts
          </code>
        </p>
      </div>
    </aside>
  );
}
