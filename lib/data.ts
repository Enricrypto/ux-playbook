export type Platform = "SaaS" | "Mobile" | "E-com";
export type Goal = "Conversion" | "Retention" | "Engagement" | "Onboarding";

export interface Pattern {
  id: string;
  icon: string;
  title: string;
  desc: string;
  tags: Platform[];
  goals: Goal[];
  psychology: string;
  how: string;
  example: string;
  metric: string;
  stat1: string;
  stat1l: string;
  stat2: string;
  stat2l?: string;
}

export interface PsychLaw {
  name: string;
  def: string;
  use: string;
  category: "Cognitive" | "Behavioral" | "Emotional";
}

export interface FunnelStep {
  label: string;
  meta: string;
  patterns: string[];
}

export interface Funnel {
  id: string;
  label: string;
  icon: string;
  color: string;
  steps: FunnelStep[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  category: "Conversion" | "Onboarding" | "Retention" | "Ethics";
  priority: "must" | "should" | "nice";
}

export const patterns: Pattern[] = [
  {
    id: "aha",
    icon: "Star",
    title: "Aha moment engineering",
    desc: "Shorten the path to first value as much as possible",
    tags: ["SaaS", "Mobile"],
    goals: ["Onboarding", "Retention"],
    psychology: "Dopamine reward loop + Zeigarnik effect",
    how: "Identify the single action most correlated with Day-30 retention in your analytics. Remove every step between signup and that action. Show outcome before asking for commitment. Pre-seed blank states with templates.",
    example: "Canva: first design created within 2 min of signup via curated templates (not blank canvas). Slack: first message sent before any settings screen is shown.",
    metric: "Time-to-first-value (TTFV)",
    stat1: "98%",
    stat1l: "of users are inactive 2 weeks post-signup without an aha moment",
    stat2: "+18%",
    stat2l: "ARR lift from 20% faster TTFV (Amplitude 2025)",
  },
  {
    id: "progress",
    icon: "TrendingUp",
    title: "Progress visibility",
    desc: "Show users how far they've come and what's next",
    tags: ["SaaS", "Mobile", "E-com"],
    goals: ["Onboarding", "Retention", "Engagement"],
    psychology: "Zeigarnik effect, unfinished tasks create cognitive tension that compels return behavior",
    how: "Progress bars, profile completion meters, streaks, step indicators. Never show blank dashboards, seed with sample data or templates. Celebrate milestones with micro-interactions.",
    example: "Duolingo streaks: 7-day streak users retain at 90% vs 20% without. LinkedIn profile completion bar drives return visits.",
    metric: "Onboarding completion rate",
    stat1: "+20–30%",
    stat1l: "completion lift from visual progress indicators (Stanford PTL)",
    stat2: "90%",
    stat2l: "D30 retention for Duolingo users with a 7-day streak",
  },
  {
    id: "social-proof",
    icon: "Users",
    title: "Social proof layering",
    desc: "Surface real trust signals at the moment of highest doubt",
    tags: ["SaaS", "E-com", "Mobile"],
    goals: ["Conversion"],
    psychology: "Social validation, under uncertainty, people resolve doubt by observing others' choices. Activates conformity bias.",
    how: "Layer proof by stage: testimonials on landing, review counts on product pages, recent activity feeds at checkout, case studies at pricing. Use specific numbers not vague superlatives.",
    example: "'4,218 teams switched this month' outperforms 'thousands of teams'. Place star ratings and review counts directly adjacent to buy CTAs.",
    metric: "Conversion rate near CTA",
    stat1: "+15–25%",
    stat1l: "conversion lift from social proof placed near the primary CTA",
    stat2: "71%",
    stat2l: "of buyers check reviews before purchase",
  },
  {
    id: "friction",
    icon: "Zap",
    title: "Friction reduction",
    desc: "Remove every unnecessary step, field, and decision",
    tags: ["SaaS", "E-com", "Mobile"],
    goals: ["Conversion", "Onboarding"],
    psychology: "Fogg Ability axis, easier behavior has a lower activation threshold. Cognitive load reduction removes decision fatigue.",
    how: "Reduce form fields to the minimum required now. Guest checkout as default path. Autofill everywhere. One-click payment (Apple Pay, Google Pay). Single-page checkout to show the full process upfront.",
    example: "HubSpot: 11→4 form fields = +120% conversion. Amazon 1-click. Stripe: no forced login at checkout.",
    metric: "Form completion / checkout conversion",
    stat1: "+120%",
    stat1l: "conversion: HubSpot reduced signup fields from 11 to 4",
    stat2: "24%",
    stat2l: "of shoppers abandon at forced account registration (Baymard)",
  },
  {
    id: "scarcity",
    icon: "Clock",
    title: "Ethical scarcity & urgency",
    desc: "Surface real constraints at the moment of decision",
    tags: ["E-com", "SaaS"],
    goals: ["Conversion"],
    psychology: "Loss aversion (Kahneman), fear of missing out is ~2x more motivating than an equivalent gain. Must be factually true or trust is permanently damaged.",
    how: "Show actual inventory counts. Real countdowns for genuine limited-time offers. Trial expiry notifications with days remaining. Batch discount codes with actual expiry dates.",
    example: "Booking.com: '2 rooms left at this price' (when accurate). SaaS trial expiry email: '3 days left on your trial, here's what you'll lose access to.'",
    metric: "Conversion uplift at decision point",
    stat1: "2×",
    stat1l: "more motivating to avoid loss than to achieve an equivalent gain (Kahneman)",
    stat2: "⚠️",
    stat2l: "Fake urgency triggers FTC/GDPR enforcement and permanent trust erosion",
  },
  {
    id: "anchoring",
    icon: "Percent",
    title: "Price anchoring",
    desc: "Frame value before revealing price",
    tags: ["SaaS", "E-com"],
    goals: ["Conversion"],
    psychology: "Anchoring effect, the first number seen becomes the reference point for all subsequent judgments. Higher anchor = higher willingness to pay.",
    how: "Show original or competitor price before your price. Feature most expensive plan first in pricing tables. Use a value frame before the price ('Save 8 hrs/week = $400 value, for just $49/mo'). Annual plan framed as monthly equivalent.",
    example: "Strike-through pricing on E-com. 'Most popular' badge on the middle SaaS tier. Annual plan shown as '$X/month billed annually'.",
    metric: "Plan upgrade rate / AOV",
    stat1: "30–40%",
    stat1l: "of users choose the middle tier when anchored by a premium option",
    stat2: "2×",
    stat2l: "annual plan conversion when shown as monthly equivalent",
  },
  {
    id: "habit",
    icon: "RefreshCw",
    title: "Habit loop design",
    desc: "Build trigger → action → reward → investment cycles",
    tags: ["Mobile", "SaaS"],
    goals: ["Retention", "Engagement"],
    psychology: "Hooked model (Nir Eyal): external trigger → action → variable reward → investment. Variable reward is the key driver, dopamine peaks under uncertainty, not certainty.",
    how: "External trigger: behavioral push at the right moment (not generic daily ping). Action: single tap. Variable reward: social feedback, new content, achievement unlocks. Investment: user data that makes leaving costly (content, connections, history).",
    example: "Instagram: notification → scroll → variable like/comment → post more content. Duolingo: streak notification → lesson → XP → leaderboard.",
    metric: "Day-30 / Day-90 retention",
    stat1: "3+",
    stat1l: "features used correlates with 70% higher 12-month retention (MIT Sloan)",
    stat2: "113M+",
    stat2l: "MAU driven by Duolingo's streak + social investment loop",
  },
  {
    id: "onboarding",
    icon: "DoorOpen",
    title: "Progressive onboarding",
    desc: "Show value first, collect data as it becomes relevant",
    tags: ["SaaS", "Mobile"],
    goals: ["Onboarding", "Retention"],
    psychology: "Cognitive load theory, presenting all features triggers overwhelm. Hick's Law: fewer choices = faster, more confident decisions.",
    how: "Email + password only at signup. Role-based path branching ('What would you like to do first?'). Show value before asking for more info. Contextual tooltips not auto-tours. Max 3–4 choices per screen.",
    example: "Notion: curated templates solved blank canvas paralysis without adding features. Dropbox: collects additional info contextually post-value delivery.",
    metric: "Activation rate / TTFV",
    stat1: "−20–40%",
    stat1l: "onboarding churn with role-based adaptive onboarding",
    stat2: "35%",
    stat2l: "fewer support tickets with progressive disclosure (Hotjar)",
  },
  {
    id: "personalization",
    icon: "Sparkles",
    title: "Contextual personalization",
    desc: "Surface the right thing for the right person at the right moment",
    tags: ["E-com", "Mobile", "SaaS"],
    goals: ["Engagement", "Retention", "Conversion"],
    psychology: "Peak relevance, personalized signals feel like help, not ads. Reduces decision fatigue by pre-filtering irrelevant options.",
    how: "Behavioral recommendations from browse/purchase history. Role-based UI in SaaS. 'Complete your look' bundles in E-com. Re-engagement email triggered by the specific last action (not a generic drip).",
    example: "Amazon 'frequently bought together'. Spotify Discover Weekly. SaaS re-engagement triggered by a feature not yet used, not a generic 'we miss you' email.",
    metric: "AOV / D30 engagement",
    stat1: "+20–30%",
    stat1l: "sales increase from advanced personalization",
    stat2: "71%",
    stat2l: "of buyers now expect personalized interactions",
  },
  {
    id: "upsell",
    icon: "ArrowUpCircle",
    title: "Contextual upsell & cross-sell",
    desc: "Offer upgrades when purchase intent is at its peak",
    tags: ["E-com", "SaaS"],
    goals: ["Conversion", "Retention"],
    psychology: "Commitment & consistency, users who already said yes are primed to say yes again. Peak intent occurs at or just after checkout.",
    how: "In-cart 'frequently bought together'. Free shipping threshold progress bar. Post-purchase one-click add-on. SaaS: feature gate with upgrade CTA at moment of use. Tier comparison at limit-hit.",
    example: "'Add $12 more for free shipping' (Threshold bar). 'Upgrade to unlock' at feature wall. One-click post-purchase upsell on Shopify.",
    metric: "Average order value (AOV) / upgrade rate",
    stat1: "+15–20%",
    stat1l: "above avg AOV: ideal free shipping threshold to trigger upsell",
    stat2: "3–5%",
    stat2l: "post-purchase one-click upsell conversion at near-zero friction cost",
  },
  {
    id: "microinteraction",
    icon: "ArrowUpCircle",
    title: "Micro-interactions & delight",
    desc: "Small feedback moments that build emotional attachment",
    tags: ["Mobile", "SaaS", "E-com"],
    goals: ["Engagement", "Retention"],
    psychology: "Don Norman's emotional design, visceral pleasure from responsive interfaces increases behavioral loyalty and NPS.",
    how: "Subtle animations on state change (like, save, complete). Haptic feedback on key mobile actions. Celebratory moments at milestones. Empty states with personality and a clear CTA, never just a grey box.",
    example: "Canva confetti on first design completion. Lottie animations on task complete in Todoist. iOS bouncy physics that signal responsiveness.",
    metric: "NPS / session depth",
    stat1: "84%",
    stat1l: "of users abandon in first session when shown an empty state without guidance",
    stat2: "↑",
    stat2l: "Polished micro-interactions measurably reduce perceived complexity",
  },
  {
    id: "trust",
    icon: "ShieldCheck",
    title: "Trust signal architecture",
    desc: "Reduce purchase anxiety at every friction point",
    tags: ["E-com", "SaaS"],
    goals: ["Conversion"],
    psychology: "Risk processing, amygdala activation at perceived uncertainty reduces action. Reducing perceived risk directly increases conversion.",
    how: "Payment security badges near payment field. Refund policy near buy CTA. Real reviews near add-to-cart. SSL visible. B2B: customer logos, compliance certifications near pricing.",
    example: "Stripe security badges in checkout. Money-back guarantee in checkout page header. 'Loved by 50,000+ teams' adjacent to the sign-up button.",
    metric: "Checkout conversion rate",
    stat1: "+10–15%",
    stat1l: "checkout conversion lift from trust signals placed near the CTA",
    stat2: "↓",
    stat2l: "Secure payment UX reduces risk-processing brain activation → higher completion",
  },
];

export const laws: PsychLaw[] = [
  { name: "Hick's Law", def: "Decision time grows with the number of choices available.", use: "Limit menu items to max 7. Single primary CTA per screen. Streamline checkout to essential steps only.", category: "Cognitive" },
  { name: "Fitts's Law", def: "Time to reach a target depends on its size and distance from the current position.", use: "Large, centered buy buttons. Thumb-zone CTAs on mobile. Primary action always most visually prominent.", category: "Cognitive" },
  { name: "Zeigarnik Effect", def: "Incomplete tasks are remembered more vividly than completed ones, creating a tension that drives behavior.", use: "Progress bars, profile completion meters, streaks. 'You're 80% there' prompts drive return.", category: "Behavioral" },
  { name: "Von Restorff Effect", def: "Distinctive items stand out from their surroundings and are remembered more easily.", use: "'Most popular' badge on one pricing tier. High-contrast accept button vs. muted decline button.", category: "Cognitive" },
  { name: "Miller's Law", def: "Working memory can hold approximately 7±2 items simultaneously.", use: "Group navigation into max 7 items. Chunk long forms into steps. Limit visible feature lists.", category: "Cognitive" },
  { name: "Fogg Behavior Model", def: "Behavior occurs when Motivation, Ability, and Prompt converge simultaneously. Remove any one and the behavior fails.", use: "High motivation + frictionless action + right-moment prompt = conversion. Design for all three axes.", category: "Behavioral" },
  { name: "Loss Aversion", def: "People feel losses approximately twice as strongly as equivalent gains.", use: "Trial expiry warnings. 'Don't lose your progress.' Real inventory scarcity at checkout.", category: "Behavioral" },
  { name: "Anchoring Effect", def: "The first number seen becomes the mental reference point for all subsequent judgments.", use: "Show the most expensive plan first. Strike-through pricing. Annual plan shown as monthly equivalent.", category: "Cognitive" },
  { name: "Social Validation", def: "Under uncertainty, people resolve doubt by observing and imitating others' choices.", use: "Review counts near CTAs. 'X people bought this today.' Customer logos at pricing.", category: "Behavioral" },
  { name: "Commitment & Consistency", def: "People align future actions with their past commitments and stated identities.", use: "Small yes leads to bigger yes. Post-signup upsells. Onboarding investment increases retention.", category: "Behavioral" },
  { name: "Peak-End Rule", def: "Experiences are judged almost entirely by their peak emotional moment and how they end.", use: "Design the Aha moment as unforgettable. Celebrate checkout. Smooth, respectful offboarding.", category: "Emotional" },
  { name: "Cognitive Load Theory", def: "Working memory is severely limited. Every unnecessary element competes for the same finite resource.", use: "Progressive disclosure in onboarding. Generous white space. Single task per screen.", category: "Cognitive" },
];

export const funnels: Funnel[] = [
  {
    id: "conversion",
    label: "Conversion",
    icon: "ShoppingCart",
    color: "blue",
    steps: [
      { label: "Awareness", meta: "Social proof + clear value prop visible in <5 sec", patterns: ["social-proof", "trust"] },
      { label: "Consideration", meta: "Anchoring, comparison, trust signals at pricing", patterns: ["anchoring", "trust", "social-proof"] },
      { label: "Intent", meta: "Ethical scarcity, urgency, reviews near CTA", patterns: ["scarcity", "social-proof"] },
      { label: "Purchase", meta: "Friction removal, guest checkout, 1-click pay", patterns: ["friction", "trust"] },
      { label: "Post-purchase upsell", meta: "1-click add-on at peak intent", patterns: ["upsell"] },
    ],
  },
  {
    id: "retention",
    label: "Retention",
    icon: "RefreshCw",
    color: "green",
    steps: [
      { label: "Onboarding", meta: "Progressive, role-based, AHA moment in <5 min", patterns: ["onboarding", "aha"] },
      { label: "Activation", meta: "First meaningful success, celebrate it", patterns: ["aha", "microinteraction"] },
      { label: "Habit formation", meta: "Trigger → action → variable reward loop", patterns: ["habit", "progress"] },
      { label: "Expansion", meta: "Feature discovery at limit moments", patterns: ["upsell", "personalization"] },
      { label: "Advocacy", meta: "Referral at peak satisfaction (post-win)", patterns: ["social-proof"] },
    ],
  },
  {
    id: "engagement",
    label: "Engagement",
    icon: "Heart",
    color: "purple",
    steps: [
      { label: "First session", meta: "Aha moment + delight micro-interaction", patterns: ["aha", "microinteraction"] },
      { label: "Return trigger", meta: "Personalized push/email at right moment", patterns: ["personalization", "habit"] },
      { label: "Habit anchor", meta: "Streak, progress, or social investment", patterns: ["progress", "habit"] },
      { label: "Deep feature use", meta: "3+ features = 70% higher 12-mo retention", patterns: ["personalization", "onboarding"] },
      { label: "Social loop", meta: "Invite, share, compete, embed social proof", patterns: ["social-proof", "habit"] },
    ],
  },
];

export const checklistItems: ChecklistItem[] = [
  { id: "c1", text: "Value proposition visible in under 5 seconds on landing page", category: "Conversion", priority: "must" },
  { id: "c2", text: "Friction audit complete, all non-essential form fields removed", category: "Conversion", priority: "must" },
  { id: "c3", text: "Guest checkout available as the primary path", category: "Conversion", priority: "must" },
  { id: "c4", text: "Social proof present within one scroll of primary CTA", category: "Conversion", priority: "must" },
  { id: "c5", text: "Price anchoring applied to pricing page", category: "Conversion", priority: "should" },
  { id: "c6", text: "Trust signals adjacent to payment input", category: "Conversion", priority: "must" },
  { id: "o1", text: "Aha moment identified and path to it is optimized", category: "Onboarding", priority: "must" },
  { id: "o2", text: "Role-based onboarding branching implemented", category: "Onboarding", priority: "should" },
  { id: "o3", text: "No blank dashboards, seeded with templates or sample data", category: "Onboarding", priority: "must" },
  { id: "o4", text: "Progress indicator on all multi-step flows", category: "Onboarding", priority: "must" },
  { id: "o5", text: "Signup requires email + password only", category: "Onboarding", priority: "must" },
  { id: "o6", text: "Time-to-first-value benchmarked (target <5 min, self-serve)", category: "Onboarding", priority: "should" },
  { id: "r1", text: "Day 1 / Day 3 / Day 7 behavioral trigger emails mapped to specific actions", category: "Retention", priority: "must" },
  { id: "r2", text: "Habit loop defined: trigger, action, reward, and investment", category: "Retention", priority: "should" },
  { id: "r3", text: "Streak or progress mechanic in place for core repeated behavior", category: "Retention", priority: "should" },
  { id: "r4", text: "Feature gate shows upgrade CTA (not a hard wall)", category: "Retention", priority: "must" },
  { id: "r5", text: "Re-engagement flow triggered by specific last action, not generic drip", category: "Retention", priority: "nice" },
  { id: "e1", text: "All scarcity and urgency signals are factually accurate", category: "Ethics", priority: "must" },
  { id: "e2", text: "Confirmshaming copy eliminated from all dismiss/decline states", category: "Ethics", priority: "must" },
  { id: "e3", text: "One-click cancel and unsubscribe available from all surfaces", category: "Ethics", priority: "must" },
  { id: "e4", text: "No pre-ticked upsell or marketing consent checkboxes", category: "Ethics", priority: "must" },
  { id: "e5", text: "Full pricing visible before payment step, no drip pricing", category: "Ethics", priority: "must" },
];
