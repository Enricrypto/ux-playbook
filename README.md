# UX Psychology Playbook

A psychology-driven design reference for product teams. Browse 50+ behavioral patterns, explore the science behind every UX decision, and run AI-powered audits on any website or GitHub repository.

---

## What it does

**Patterns** — 50+ psychology-backed UX patterns for SaaS, mobile, and e-commerce. Filter by platform, goal, or psychology principle. Each pattern links the behavioral science to a concrete implementation with real examples and conversion data.

**Laws** — The cognitive and behavioral laws that explain how users think and decide. Hick's Law, Loss Aversion, the Peak-End Rule, the Zeigarnik Effect — mapped to real design decisions, not textbook definitions.

**Goal-based flows** — Pattern sequences organized by business objective. Conversion funnels, retention loops, re-engagement flows — the right patterns in the right order.

**Ethics** — The line between persuasion and manipulation, with a 2025–2026 regulatory landscape overview covering FTC, GDPR, DSA, and CMA enforcement.

**Pre-launch checklist** — A prioritized checklist covering conversion, onboarding, retention, and ethics. Progress persists in the browser.

**Audit tool** — Paste any public website URL or GitHub repository. Claude analyzes it against the psychology patterns in this playbook and returns:
- A friction map with impact-ranked issues
- Psychology gaps — patterns absent or misapplied in your flow
- A fix-first list of 4 recommendations ordered by impact-to-effort ratio

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Display font | Fraunces |
| Body font | Plus Jakarta Sans |
| Icons | Hugeicons |
| AI | Anthropic Claude (`claude-sonnet-4-6`) |

---

## Getting started

### Prerequisites

- Node.js 18+
- An Anthropic API key — [get one at console.anthropic.com](https://console.anthropic.com)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/Enricrypto/ux-playbook.git
cd ux-playbook

# 2. Install dependencies
npm install

# 3. Add your API key
cp .env.example .env.local
# Open .env.local and replace the placeholder with your real key

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

Create a `.env.local` file in the project root (this file is gitignored and never committed):

```env
ANTHROPIC_API_KEY=sk-ant-...
```

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes — audit tool only | Your Anthropic API key. The rest of the app works without it. |

---

## Deploying

### Vercel (recommended)

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add `ANTHROPIC_API_KEY` under **Project Settings → Environment Variables**
4. Deploy

### Other platforms

Set `ANTHROPIC_API_KEY` as a server environment variable. The audit API route runs server-side — any platform supporting Next.js SSR works (Railway, Render, Fly.io, etc.).

---

## Project structure

```
app/
├── page.tsx              # Landing page
├── patterns/page.tsx     # Pattern browser — search, filter, expand
├── laws/page.tsx         # Psychology laws grouped by category
├── flows/page.tsx        # Goal-based pattern sequences
├── ethics/page.tsx       # Ethical guardrails + regulatory landscape
├── checklist/page.tsx    # Pre-launch audit checklist (localStorage)
├── audit/page.tsx        # AI audit tool UI
└── api/
    └── audit/route.ts    # POST /api/audit — Claude-powered analysis

components/
├── Navbar.tsx            # Fixed top nav
├── LogoMark.tsx          # UX / Playbook logo mark
├── PatternCard.tsx       # Expandable pattern card
└── ui/
    └── tags.tsx          # PlatformTag, GoalTag, PriorityBadge

lib/
└── data.ts               # All patterns, laws, flows, checklist items
```

---

## How the audit works

1. You paste a URL (website or GitHub repo)
2. The server fetches the content — HTML text for websites, README + file tree for GitHub repos
3. It calls Claude with a system prompt containing all 50+ patterns and psychology laws, prompt-cached for efficiency
4. Claude returns a structured JSON audit: score, friction points, psychology gaps, and a ranked fix list
5. The UI renders the results in the playbook's design system

---

## Adding content

All content lives in `lib/data.ts` — no database, no CMS.

### Add a pattern

```ts
{
  id: "your-pattern-id",
  icon: "Star",           // Hugeicons name mapped in PatternCard.tsx
  title: "Pattern name",
  desc: "One-line summary",
  tags: ["SaaS", "Mobile"],
  goals: ["Conversion", "Retention"],
  psychology: "The cognitive principle behind it",
  how: "Step-by-step implementation guidance",
  example: "Real-world example",
  metric: "What to measure",
  stat1: "42%", stat1l: "Stat description",
  stat2: "2×",  stat2l: "Stat description",
}
```

### Add a psychology law

```ts
{
  name: "Law name",
  def: "One-sentence definition",
  use: "Direct UX application",
  category: "Cognitive", // "Cognitive" | "Behavioral" | "Emotional"
}
```

---

## License

MIT
