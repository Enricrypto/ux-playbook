"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Grid02FreeIcons,
  AiBrain01FreeIcons,
  FlowCircleFreeIcons,
  Shield01FreeIcons,
  CheckListFreeIcons,
  Audit01FreeIcons
} from "@hugeicons/core-free-icons"

const nav = [
  { href: "/patterns", label: "Patterns", icon: Grid02FreeIcons },
  { href: "/laws", label: "Psychology laws", icon: AiBrain01FreeIcons },
  { href: "/flows", label: "Goal-based flows", icon: FlowCircleFreeIcons },
  { href: "/ethics", label: "Ethical guardrails", icon: Shield01FreeIcons },
  { href: "/checklist", label: "Audit checklist", icon: CheckListFreeIcons },
  { href: "/audit", label: "Audit", icon: Audit01FreeIcons }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className='w-60 min-h-screen flex flex-col border-r'
      style={{ backgroundColor: "#F7F4F0", borderColor: "#E8E3DC" }}
    >
      <div className='px-5 py-5 border-b' style={{ borderColor: "#E8E3DC" }}>
        <Link href='/' className='block group'>
          <span className='font-display font-semibold text-gray-900 text-base group-hover:opacity-75 transition-opacity'>
            UX Playbook
          </span>
          <p
            className='text-xs mt-0.5 leading-tight'
            style={{ color: "#9E9589" }}
          >
            Psychology-driven design
          </p>
        </Link>
      </div>

      <nav className='flex-1 px-3 py-4 space-y-0.5'>
        {nav.map(({ href, label, icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-[#FDF0EB] text-[#D95C3A] font-medium"
                  : "text-[#6B6460] hover:bg-[#EDE9E4] hover:text-[#1a1612]"
              }`}
            >
              <HugeiconsIcon
                icon={icon}
                size={16}
                color='currentColor'
                strokeWidth={active ? 2 : 1.5}
              />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className='px-5 py-4 border-t' style={{ borderColor: "#E8E3DC" }}>
        <p className='text-xs' style={{ color: "#9E9589" }}>
          Edit content in{" "}
          <code
            className='font-mono px-1 rounded'
            style={{ color: "#7A7067", backgroundColor: "#EDE9E4" }}
          >
            lib/data.ts
          </code>
        </p>
      </div>
    </aside>
  )
}
