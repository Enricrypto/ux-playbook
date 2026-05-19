"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { Menu01FreeIcons, Cancel01FreeIcons } from "@hugeicons/core-free-icons"
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
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm">
        <Link href="/" className="px-2 py-1 mr-1 shrink-0" onClick={() => setOpen(false)}>
          <LogoMark />
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-0.5">
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-gray-800 hover:bg-white/20 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <HugeiconsIcon icon={open ? Cancel01FreeIcons : Menu01FreeIcons} size={18} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="pointer-events-auto absolute top-18 left-4 right-4 rounded-2xl overflow-hidden"
          style={{ background: "rgba(245,240,235,0.96)", backdropFilter: "blur(16px)", boxShadow: "0 8px 32px rgba(30,14,58,0.12)" }}
        >
          {nav.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  minHeight: "52px",
                  padding: "0 1.25rem",
                  fontSize: "0.9375rem",
                  fontWeight: active ? 600 : 400,
                  color: active ? "#D95C3A" : "#1E0E3A",
                  background: active ? "rgba(217,92,58,0.07)" : "transparent",
                  borderBottom: "1px solid rgba(30,14,58,0.06)",
                  transition: "background 0.15s",
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
