import { socialPresets } from "../../data/presets";

export default function QuickPresets({ onSelect }) {
  return (
    <div>
      <p className="mb-2 text-sm font-black text-zinc-200">Quick presets</p>
      <div className="flex flex-wrap gap-2">
        {socialPresets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => onSelect(preset)}
            className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-bold text-zinc-200 transition hover:border-white/40 hover:bg-white/15"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
