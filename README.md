# UX Psychology Playbook

An internal design system tool built on Next.js 15 with Tailwind CSS. Covers 12 psychology-grounded UX patterns, 12 cognitive laws, goal-based flows, ethical guardrails, and a pre-launch audit checklist.

## Stack

- **Next.js 15** (App Router, fully static export capable)
- **Tailwind CSS v4**
- **TypeScript**
- **lucide-react** for icons

## Local development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deployment

### Option A — Vercel (recommended, ~60 seconds)

```bash
npm i -g vercel
vercel
```

That's it. Vercel auto-detects Next.js. Your team gets a public URL immediately.

To add a custom domain: Vercel dashboard → your project → Settings → Domains.

To add auth (so only your team can access it): Vercel dashboard → Settings → Deployment Protection → enable Vercel Authentication. Everyone with access to your Vercel team can log in.

### Option B — Netlify

```bash
npm run build
# Netlify auto-detects Next.js via @netlify/plugin-nextjs
```

Or drag-and-drop the `.next` folder at netlify.com/drop.

### Option C — Self-hosted (static export)

Add to `next.config.ts`:
```ts
const nextConfig = {
  output: "export",
};
```

Then:
```bash
npm run build
# Produces /out directory — host anywhere (S3, nginx, GitHub Pages)
```

### Option D — Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

Add `output: "standalone"` to `next.config.ts` first.

## Adding content

All content lives in **`lib/data.ts`** — no database, no CMS.

### Add a new pattern

```ts
// lib/data.ts → patterns array
{
  id: "your-pattern-id",
  icon: "Star",           // any lucide-react icon name (PascalCase)
  title: "Pattern name",
  desc: "One-line summary",
  tags: ["SaaS", "Mobile"],           // Platform[]
  goals: ["Conversion", "Retention"], // Goal[]
  psychology: "The cognitive principle behind it",
  how: "Step-by-step implementation guidance",
  example: "Real-world example from known products",
  metric: "What to measure",
  stat1: "42%",
  stat1l: "Description of stat 1",
  stat2: "2×",
  stat2l: "Description of stat 2",
}
```

### Add a psychology law

```ts
// lib/data.ts → laws array
{
  name: "Law name",
  def: "One-sentence definition",
  use: "Direct UX application",
  category: "Cognitive", // "Cognitive" | "Behavioral" | "Emotional"
}
```

### Add a checklist item

```ts
// lib/data.ts → checklistItems array
{
  id: "unique-id",
  text: "The item text",
  category: "Conversion", // "Conversion" | "Onboarding" | "Retention" | "Ethics"
  priority: "must",       // "must" | "should" | "nice"
}
```

## Project structure

```
app/
  page.tsx          ← Patterns (with search + filter)
  laws/page.tsx     ← Psychology laws
  flows/page.tsx    ← Goal-based funnel flows
  ethics/page.tsx   ← Ethical guardrails
  checklist/page.tsx ← Audit checklist (saves to localStorage)
  layout.tsx        ← Root layout with sidebar

components/
  Sidebar.tsx       ← Navigation
  PatternCard.tsx   ← Expandable pattern card
  ui/tags.tsx       ← Platform / goal / priority badges

lib/
  data.ts           ← All content (patterns, laws, funnels, checklist)
  utils.ts          ← cn() helper
```

## Roadmap ideas

- **Pattern detail pages** (`/patterns/[id]`) with full implementation guide
- **Search across all content** (laws, checklist, patterns)
- **Pattern comparison view** — pick two patterns side by side
- **Team annotations** — add notes to patterns (needs a DB or CMS)
- **CMS integration** — Contentlayer, Sanity, or Notion API as the data source
- **Auth** — Clerk or NextAuth for team-only access
- **Dark mode** — Tailwind dark: classes, system-preference aware
