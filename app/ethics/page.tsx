import { Check, X, AlertTriangle } from "lucide-react";

const ethical = [
  "Scarcity shown only when genuinely true — verified against real inventory",
  "Progress bars that reflect actual completion state, not inflated figures",
  "Social proof sourced from real, verified users with honest attribution",
  "One-click cancel and unsubscribe — accessible from all surfaces",
  "Full pricing visible before the payment step — no drip pricing",
  "Default opt-in only for directly relevant communications",
  "Gentle friction before irreversible actions ('Are you sure?')",
  "Empty states guide users forward — they do not fake existing activity",
];

const dark = [
  "Fake countdown timers or manufactured urgency (no real expiry)",
  "Hidden fees appearing only at the final checkout step",
  "Pre-ticked boxes for upsells, upgrades, or marketing consent",
  "Roach motel — trivially easy to subscribe, deliberately hard to cancel",
  "Confirmshaming dismiss copy ('No thanks, I hate saving money')",
  "Misdirection — visual hierarchy tricks that pull the eye from the real primary action",
  "Forced account creation before allowing any purchase or trial",
  "Fake social proof ('73 people viewing this right now') unverified",
];

const regulatory = [
  { body: "FTC (USA)", rule: "Negative Option Rule", risk: "Subscription dark patterns, hidden renewal terms, difficult cancellation" },
  { body: "EU GDPR / DSA", rule: "Articles 7 & 25", risk: "Pre-ticked consent, dark patterns in cookie flows, deceptive interfaces" },
  { body: "EU DSA", rule: "Dark patterns prohibition", risk: "Any deceptive or manipulative interface affecting user choices" },
  { body: "UK CMA", rule: "Consumer Protection Act", risk: "Drip pricing, fake reviews, urgency claims that are misleading" },
];

export default function EthicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Ethical guardrails</h1>
        <p className="text-sm text-gray-500 mt-1">
          The line between persuasion and manipulation. Ethical UX builds long-term LTV. Dark patterns erode trust and carry growing legal risk.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 mb-8">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-800">The key test</p>
          <p className="text-sm text-amber-700 mt-0.5 leading-relaxed">
            A hotel showing &quot;2 rooms left&quot; when that&apos;s factually true is persuasion. The same message shown regardless of availability is a dark pattern. The design looks identical. The ethics are not. Intent and accuracy are what separate them.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <h2 className="font-semibold text-emerald-800 text-sm">Ethical persuasion</h2>
          </div>
          <div className="space-y-2.5">
            {ethical.map((item, i) => (
              <div key={i} className="flex gap-2.5 text-sm text-gray-700 leading-snug">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
              <X className="w-3.5 h-3.5 text-red-600" />
            </div>
            <h2 className="font-semibold text-red-800 text-sm">Dark patterns to avoid</h2>
          </div>
          <div className="space-y-2.5">
            {dark.map((item, i) => (
              <div key={i} className="flex gap-2.5 text-sm text-gray-700 leading-snug">
                <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-8">
        <h2 className="font-semibold text-gray-900 text-sm mb-1">Regulatory landscape (2025–2026)</h2>
        <p className="text-xs text-gray-500 mb-4">Enforcement is accelerating. These are not theoretical risks.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 pr-4 text-xs text-gray-400 font-medium">Regulator</th>
                <th className="text-left py-2 pr-4 text-xs text-gray-400 font-medium">Rule</th>
                <th className="text-left py-2 text-xs text-gray-400 font-medium">Covers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {regulatory.map((r) => (
                <tr key={r.body}>
                  <td className="py-2.5 pr-4 font-medium text-gray-800 text-xs">{r.body}</td>
                  <td className="py-2.5 pr-4 text-gray-600 text-xs">{r.rule}</td>
                  <td className="py-2.5 text-gray-600 text-xs">{r.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
        <h2 className="font-semibold text-blue-900 text-sm mb-2">The business case for ethical design</h2>
        <p className="text-sm text-blue-800 leading-relaxed">
          Ethical design is not a tradeoff against performance. Companies with transparent flows report higher long-term LTV, more referrals, and fewer support escalations than those relying on manipulation. Trust-driven conversions retain at measurably higher rates over multi-year horizons. Dark patterns give, at best, a short-term metric lift that is quickly erased by churn, chargebacks, and reputational damage.
        </p>
      </div>
    </div>
  );
}
