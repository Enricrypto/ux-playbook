import { laws } from "@/lib/data";

const categories = ["Cognitive", "Behavioral", "Emotional"] as const;

const categoryConfig: Record<string, { color: string; bgColor: string; borderColor: string }> = {
  Cognitive:  { color: "#D95C3A", bgColor: "rgba(217,92,58,0.08)",   borderColor: "rgba(217,92,58,0.18)"   },
  Behavioral: { color: "#1E0E3A", bgColor: "rgba(30,14,58,0.07)",    borderColor: "rgba(30,14,58,0.14)"    },
  Emotional:  { color: "#B87AD4", bgColor: "rgba(184,122,212,0.10)", borderColor: "rgba(184,122,212,0.22)" },
};

export default function LawsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-24 pb-16">
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-normal text-gray-900">
          Psychology laws
        </h1>
        <p className="text-sm mt-2" style={{ color: "#9E9589" }}>
          The cognitive and behavioral principles underlying every pattern in this playbook.
        </p>
      </div>

      <div className="flex gap-2.5 mb-12">
        {categories.map((cat) => {
          const cfg = categoryConfig[cat];
          return (
            <span
              key={cat}
              className="text-xs px-3 py-1.5 rounded-full font-medium"
              style={{ backgroundColor: cfg.bgColor, color: cfg.color }}
            >
              {cat}
            </span>
          );
        })}
      </div>

      <div className="space-y-14">
        {categories.map((cat) => {
          const catLaws = laws.filter((l) => l.category === cat);
          const cfg = categoryConfig[cat];
          return (
            <div key={cat}>
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="text-xs font-semibold uppercase tracking-[0.18em] shrink-0"
                  style={{ color: cfg.color }}
                >
                  {cat}
                </span>
                <div className="flex-1 h-px" style={{ backgroundColor: cfg.borderColor }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {catLaws.map((law) => (
                  <div
                    key={law.name}
                    className="rounded-xl p-5"
                    style={{ backgroundColor: "white", border: "1px solid #EDE8E2" }}
                  >
                    <h2 className="font-display text-lg font-normal text-gray-900 mb-2 leading-snug">
                      {law.name}
                    </h2>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B6460" }}>
                      {law.def}
                    </p>
                    <div className="pt-3" style={{ borderTop: "1px solid #F0ECE6" }}>
                      <p
                        className="text-xs font-semibold uppercase tracking-[0.12em] mb-1.5"
                        style={{ color: "#9E9589" }}
                      >
                        UX application
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: cfg.color }}>
                        {law.use}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
