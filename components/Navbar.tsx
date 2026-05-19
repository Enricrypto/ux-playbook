"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { Menu01FreeIcons, Cancel01FreeIcons } from "@hugeicons/core-free-icons"
import { LogoMark } from "./LogoMark"

const primaryNav = [
  { href: "/patterns", label: "Patterns" },
  { href: "/laws", label: "Laws" },
  { href: "/checklist", label: "Checklist" },
]

const secondaryNav = [
  { href: "/flows", label: "Flows" },
  { href: "/ethics", label: "Ethics" },
]

const allNav = [...primaryNav, ...secondaryNav, { href: "/audit", label: "Audit" }]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const auditActive = pathname === "/audit"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm">
        <Link href="/" className="px-2 py-1 mr-1 shrink-0" onClick={() => setOpen(false)}>
          <LogoMark />
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-0.5">
          {primaryNav.map(({ href, label }) => {
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

          {/* Divider */}
          <span className="w-px h-3.5 mx-1.5 rounded-full bg-gray-800/20" />

          {/* Secondary — de-emphasised */}
          {secondaryNav.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                  active
                    ? "bg-white/25 text-gray-900 font-medium opacity-100"
                    : "text-gray-700 opacity-50 hover:opacity-90 hover:bg-white/15"
                }`}
              >
                {label}
              </Link>
            )
          })}

          {/* Audit — filled CTA pill */}
          <Link
            href="/audit"
            className="ml-1.5 px-4 py-1.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{
              backgroundColor: auditActive ? "#B84A2A" : "#D95C3A",
              boxShadow: auditActive ? "inset 0 1px 3px rgba(0,0,0,0.2)" : "none",
            }}
          >
            Audit
          </Link>
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
        <nav
          className="pointer-events-auto absolute top-18 left-4 right-4 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(245,240,235,0.96)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 32px rgba(30,14,58,0.12)",
          }}
        >
          {allNav.map(({ href, label }) => {
            const active = pathname === href
            const isAudit = href === "/audit"
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
                  fontSize: isAudit ? "0.9375rem" : "0.9375rem",
                  fontWeight: isAudit ? 600 : active ? 600 : 400,
                  color: isAudit ? "#D95C3A" : active ? "#D95C3A" : "#1E0E3A",
                  background: isAudit
                    ? "rgba(217,92,58,0.07)"
                    : active
                    ? "rgba(217,92,58,0.07)"
                    : "transparent",
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
