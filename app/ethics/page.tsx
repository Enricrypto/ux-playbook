import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle01FreeIcons,
  Cancel01FreeIcons,
  Alert01FreeIcons,
} from "@hugeicons/core-free-icons";

const ethical = [
  "Scarcity shown only when genuinely true, verified against real inventory",
  "Progress bars that reflect actual completion state, not inflated figures",
  "Social proof sourced from real, verified users with honest attribution",
  "One-click cancel and unsubscribe, accessible from all surfaces",
  "Full pricing visible before the payment step, no drip pricing",
  "Default opt-in only for directly relevant communications",
  "Gentle friction before irreversible actions ('Are you sure?')",
  "Empty states guide users forward, they do not fake existing activity",
];

const dark = [
  "Fake countdown timers or manufactured urgency (no real expiry)",
  "Hidden fees appearing only at the final checkout step",
  "Pre-ticked boxes for upsells, upgrades, or marketing consent",
  "Roach motel, trivially easy to subscribe, deliberately hard to cancel",
  "Confirmshaming dismiss copy ('No thanks, I hate saving money')",
  "Misdirection, visual hierarchy tricks that pull the eye from the real primary action",
  "Forced account creation before allowing any purchase or trial",
  "Fake social proof ('73 people viewing this right now') unverified",
];

const regulatory = [
  { body: "FTC (USA)",     rule: "Negative Option Rule",           risk: "Subscription dark patterns, hidden renewal terms, difficult cancellation" },
  { body: "EU GDPR / DSA", rule: "Articles 7 & 25",               risk: "Pre-ticked consent, dark patterns in cookie flows, deceptive interfaces" },
  { body: "EU DSA",        rule: "Dark patterns prohibition",      risk: "Any deceptive or manipulative interface affecting user choices" },
  { body: "UK CMA",        rule: "Consumer Protection Act",        risk: "Drip pricing, fake reviews, urgency claims that are misleading" },
];

export default function EthicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 pt-24 pb-16">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-normal text-gray-900">
          Ethical guardrails
        </h1>
        <p className="text-sm mt-1" style={{ color: "#9E9589" }}>
          The line between persuasion and manipulation. Ethical UX builds long-term LTV.
          Dark patterns erode trust and carry growing legal risk.
        </p>
      </div>

      <div className="rounded-xl p-5 flex gap-4 mb-8" style={{ backgroundColor: "#1E0E3A" }}>
        <HugeiconsIcon
          icon={Alert01FreeIcons}
          size={18}
          color="#C39EE8"
          strokeWidth={1.5}
          className="shrink-0 mt-0.5"
        />
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: "#C39EE8" }}>
            The key test
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            A hotel showing &quot;2 rooms left&quot; when that&apos;s factually true is persuasion.
            The same message shown regardless of availability is a dark pattern. The design looks
            identical. The ethics are not. Intent and accuracy are what separate them.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div
          className="rounded-xl border p-5"
          style={{ borderColor: "#E8E3DC", backgroundColor: "white" }}
        >
          <div className="flex items-center gap-2.5 mb-5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(217,92,58,0.1)" }}
            >
              <HugeiconsIcon icon={CheckmarkCircle01FreeIcons} size={15} color="#D95C3A" strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-base font-normal text-gray-900">
              Ethical persuasion
            </h2>
          </div>
          <div className="space-y-3">
            {ethical.map((item, i) => (
              <div key={i} className="flex gap-2.5 text-sm leading-snug" style={{ color: "#4B4540" }}>
                <HugeiconsIcon
                  icon={CheckmarkCircle01FreeIcons}
                  size={15}
                  color="#D95C3A"
                  strokeWidth={1.5}
                  className="shrink-0 mt-0.5"
                />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-xl border p-5"
          style={{ borderColor: "#E8E3DC", backgroundColor: "#FAF8F5" }}
        >
          <div className="flex items-center gap-2.5 mb-5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(158,149,137,0.12)" }}
            >
              <HugeiconsIcon icon={Cancel01FreeIcons} size={15} color="#9E9589" strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-base font-normal text-gray-900">
              Dark patterns to avoid
            </h2>
          </div>
          <div className="space-y-3">
            {dark.map((item, i) => (
              <div key={i} className="flex gap-2.5 text-sm leading-snug" style={{ color: "#4B4540" }}>
                <HugeiconsIcon
                  icon={Cancel01FreeIcons}
                  size={15}
                  color="#9E9589"
                  strokeWidth={1.5}
                  className="shrink-0 mt-0.5"
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="rounded-xl border p-5 mb-8"
        style={{ borderColor: "#E8E3DC", backgroundColor: "white" }}
      >
        <h2 className="font-display text-base font-normal text-gray-900 mb-1">
          Regulatory landscape (2025–2026)
        </h2>
        <p className="text-xs mb-5" style={{ color: "#9E9589" }}>
          Enforcement is accelerating. These are not theoretical risks.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0ECE6" }}>
                <th className="text-left pb-2.5 pr-4 text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "#9E9589" }}>Regulator</th>
                <th className="text-left pb-2.5 pr-4 text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "#9E9589" }}>Rule</th>
                <th className="text-left pb-2.5 text-xs font-semibold uppercase tracking-[0.12em]"      style={{ color: "#9E9589" }}>Covers</th>
              </tr>
            </thead>
            <tbody>
              {regulatory.map((r, i) => (
                <tr key={r.body} style={{ borderBottom: i < regulatory.length - 1 ? "1px solid #F8F5F2" : undefined }}>
                  <td className="py-3 pr-4 text-xs font-medium text-gray-900">{r.body}</td>
                  <td className="py-3 pr-4 text-xs" style={{ color: "#6B6460" }}>{r.rule}</td>
                  <td className="py-3 text-xs"       style={{ color: "#6B6460" }}>{r.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl p-5" style={{ backgroundColor: "#1E0E3A" }}>
        <h2 className="font-display text-base font-normal mb-2" style={{ color: "#C39EE8" }}>
          The business case for ethical design
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
          Ethical design is not a tradeoff against performance. Companies with transparent flows
          report higher long-term LTV, more referrals, and fewer support escalations than those
          relying on manipulation. Trust-driven conversions retain at measurably higher rates over
          multi-year horizons. Dark patterns give, at best, a short-term metric lift that is quickly
          erased by churn, chargebacks, and reputational damage.
        </p>
      </div>
    </div>
  );
}
