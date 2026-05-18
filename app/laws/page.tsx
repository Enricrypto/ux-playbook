import { laws } from "@/lib/data";

const categoryColors: Record<string, string> = {
  Cognitive: "bg-blue-50 text-blue-700 border-blue-200",
  Behavioral: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Emotional: "bg-violet-50 text-violet-700 border-violet-200",
};

export default function LawsPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Psychology laws</h1>
        <p className="text-sm text-gray-500 mt-1">
          The cognitive and behavioral principles underlying every pattern in this playbook.
        </p>
      </div>

      <div className="flex gap-3 mb-6 text-xs">
        {["Cognitive", "Behavioral", "Emotional"].map((c) => (
          <span key={c} className={`px-2.5 py-1 rounded-md border font-medium ${categoryColors[c]}`}>{c}</span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {laws.map((law) => (
          <div key={law.name} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h2 className="font-semibold text-gray-900 text-sm">{law.name}</h2>
              <span className={`text-xs px-2 py-0.5 rounded border font-medium flex-shrink-0 ${categoryColors[law.category]}`}>
                {law.category}
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">{law.def}</p>
            <div className="border-t border-gray-50 pt-3">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">UX application</p>
              <p className="text-sm text-blue-700 leading-relaxed">{law.use}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-8">
        Add laws in <code className="font-mono bg-gray-100 px-1 rounded">lib/data.ts</code> under the <code className="font-mono bg-gray-100 px-1 rounded">laws</code> array.
      </p>
    </div>
  );
}
