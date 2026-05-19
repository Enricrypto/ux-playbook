import Link from "next/link";
import { patterns, laws } from "@/lib/data";
import { LogoMark } from "@/components/LogoMark";
import { HeroWaves } from "@/components/HeroWaves";
import { CardWaves } from "@/components/CardWaves";
import { ScrollReveal } from "@/components/ScrollReveal";

const featuredPatterns = patterns.slice(0, 3);
const featuredLaws = laws.slice(0, 3);

export default function HomePage() {
  return (
    <div className="overflow-auto">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <div className="hero-gradient relative overflow-hidden" style={{ height: "46vh" }}>
        <HeroWaves />
      </div>
      <section className="px-4 sm:px-8 md:px-12 py-16" style={{ backgroundColor: "#F5F0EB" }}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-[3fr_2fr] gap-10 md:gap-16 items-center">
          <h1
            className="font-display font-normal text-gray-900 leading-[1.02]"
            style={{ fontSize: "clamp(3.5rem, 8vw, 5.5rem)" }}
          >
            Design with<br />
            <em className="font-display italic">intention.</em>
          </h1>

          <div className="flex flex-col gap-5">
            <div className="space-y-3">
              <p className="text-gray-600 text-base leading-relaxed">
                50+ psychology-backed patterns, decision frameworks, and a live audit tool.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                Everything a sharp product team needs to ship experiences that actually work.
              </p>
            </div>
            <Link
              href="/patterns"
              className="self-start inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-gray-900 font-medium text-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#D95C3A" }}
            >
              <span className="w-2 h-2 rounded-full bg-gray-900/50 shrink-0" />
              Explore Patterns
            </Link>
          </div>
        </div>
      </section>

      {/* ── THE FRAMEWORK ──────────────────────────────────────── */}
      <section className="px-4 sm:px-8 md:px-12 py-24" style={{ backgroundColor: "#B87AD4" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-normal text-gray-900 mb-4 leading-[1.1]">
            Three tools.<br />
            <em className="italic font-display">One discipline.</em>
          </h2>
          <p className="text-gray-900/60 text-lg max-w-lg mb-20 leading-relaxed">
            For designers and PMs who know that gut feel isn&apos;t enough, and want
            the research to back up every decision.
          </p>

          <div className="space-y-10 sm:space-y-16">
            {[
              {
                num: "01",
                title: "50+ battle-tested patterns",
                desc: "SaaS, mobile, and e-commerce patterns grounded in behavioral science. Filter by platform, goal, or psychology principle.",
                href: "/patterns",
              },
              {
                num: "02",
                title: "The science behind every choice",
                desc: "Hick's Law, the Peak-End Rule, Loss Aversion, mapped to real design decisions with practical application notes.",
                href: "/laws",
              },
              {
                num: "03",
                title: "Paste a URL. Get a report.",
                desc: "Share a website or GitHub repository and receive a psychology-mapped audit, friction points, missed conversions, and what to fix first.",
                href: "/audit",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.num} delay={i * 120}>
                <Link
                  href={item.href}
                  className="group grid grid-cols-[56px_1fr] sm:grid-cols-[96px_1fr] gap-6 sm:gap-16 items-start"
                >
                  <span className="font-display text-5xl sm:text-8xl font-normal text-gray-900 leading-none">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl font-normal text-gray-900 mb-3 leading-tight group-hover:opacity-70 transition-opacity">
                      {item.title}
                    </h3>
                    <p className="text-gray-900/60 text-base leading-relaxed max-w-lg">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PATTERNS IN PRACTICE ───────────────────────────────── */}
      <section className="px-4 sm:px-8 md:px-12 py-24" style={{ backgroundColor: "#EDEAE3" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-[2fr_3fr] gap-10 md:gap-16 items-start">

          {/* Left: text */}
          <div className="md:sticky md:top-32">
            <p className="text-xs tracking-[0.22em] uppercase font-medium mb-5" style={{ color: "#9E9589" }}>
              Patterns in Practice
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-normal text-gray-900 leading-[1.1] mb-6">
              From principles<br />
              <em className="font-display italic">to pixels.</em>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-xs">
              Psychology-backed patterns mapped to real design decisions. Filter by platform, goal, or principle.
            </p>
            <Link
              href="/patterns"
              className="text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ color: "#D95C3A" }}
            >
              Explore all {patterns.length} patterns →
            </Link>
          </div>

          {/* Right: pattern cards */}
          <div className="space-y-4">
            {featuredPatterns.map((p) => (
              <div key={p.id} className="rounded-2xl p-6 shadow-sm" style={{ position: "relative", overflow: "hidden", background: "#FDFAF8" }}>
                <CardWaves />
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {p.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] tracking-wide uppercase font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-display text-xl font-normal text-gray-900 mb-2 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                  <div
                    className="shrink-0 text-[10px] tracking-wide font-semibold px-3 py-1.5 rounded-full border self-start"
                    style={{ borderColor: "#E8C4B8", color: "#D95C3A" }}
                  >
                    {p.stat1}
                  </div>
                </div>
                <p className="mt-4 text-xs font-medium" style={{ color: "#D95C3A" }}>
                  {p.psychology}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── PSYCHOLOGY LAWS ────────────────────────────────────── */}
      <section className="px-4 sm:px-8 md:px-12 py-24" style={{ backgroundColor: "#EDE5F5" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-[3fr_2fr] gap-10 md:gap-16 items-start">

          {/* Left: law cards */}
          <div className="space-y-4">
            {featuredLaws.map((law) => (
              <div key={law.name} className="rounded-2xl p-6 shadow-sm" style={{ position: "relative", overflow: "hidden", background: "#FDFAF8" }}>
                <CardWaves />
                <p className="text-[10px] tracking-[0.22em] uppercase font-medium mb-4" style={{ color: "#9E9589" }}>
                  {law.category}
                </p>
                <h3 className="font-display text-xl font-normal text-gray-900 mb-2 leading-snug">
                  {law.name}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B6460" }}>
                  {law.def}
                </p>
                <p className="text-xs leading-relaxed font-medium" style={{ color: "#7B3FA0" }}>
                  {law.use}
                </p>
              </div>
            ))}
          </div>

          {/* Right: text */}
          <div className="md:sticky md:top-32">
            <p className="text-xs tracking-[0.22em] uppercase font-medium mb-5" style={{ color: "#9E9589" }}>
              Psychology Laws
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-normal text-gray-900 leading-[1.1] mb-6">
              Know the rules.<br />
              <em className="italic font-display" style={{ color: "#7B3FA0" }}>
                Break them on purpose.
              </em>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-xs">
              {laws.length} laws mapped to real design decisions, not just textbook definitions.
            </p>
            <Link
              href="/laws"
              className="text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ color: "#7B3FA0" }}
            >
              View all {laws.length} laws →
            </Link>
          </div>

        </div>
      </section>

      {/* ── AUDIT CTA ──────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 md:px-12 py-24" style={{ backgroundColor: "#C9A8DC" }}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-[3fr_2fr] gap-10 md:gap-16 items-center">
          <h2
            className="font-display font-normal text-gray-900 leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
          >
            Stop guessing.<br />
            <em className="italic font-display" style={{ color: "#6B3A8A" }}>
              Start auditing.
            </em>
          </h2>

          <div className="flex flex-col gap-5">
            <p className="text-base leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>
              Paste any website URL or GitHub repository. Get a psychology-mapped
              report, friction points, missed conversions, and what to fix first.
            </p>
            <Link
              href="/audit"
              className="self-start inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-gray-900 font-medium text-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#D95C3A" }}
            >
              <span className="w-2 h-2 rounded-full bg-gray-900/40 shrink-0" />
              Run your first audit
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer
        className="px-4 sm:px-8 md:px-12 py-10 border-t"
        style={{ backgroundColor: "#EDEAE3", borderColor: "#DDD8D0" }}
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <LogoMark />
            <p className="text-sm mt-1" style={{ color: "#9E9589" }}>
              Design with intention. Ship with confidence.
            </p>
          </div>
          <div className="flex items-center gap-6">
            {[
              { href: "/patterns", label: "Patterns" },
              { href: "/laws", label: "Laws" },
              { href: "/flows", label: "Flows" },
              { href: "/checklist", label: "Checklist" },
              { href: "/audit", label: "Audit" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition-colors hover:opacity-60"
                style={{ color: "#6B6460" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
