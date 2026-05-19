"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogoMark } from "./LogoMark"

const nav = [
  { href: "/patterns", label: "Patterns" },
  { href: "/laws", label: "Laws" },
  { href: "/flows", label: "Flows" },
  { href: "/ethics", label: "Ethics" },
  { href: "/checklist", label: "Checklist" },
  { href: "/audit", label: "Audit" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm">
        <Link href="/" className="px-2 py-1 mr-1 shrink-0">
          <LogoMark />
        </Link>
        <nav className="flex items-center gap-0.5">
          {nav.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  active
                    ? "bg-white/25 text-gray-900 font-medium"
                    : "text-gray-800 hover:bg-white/20 hover:text-gray-900"
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
