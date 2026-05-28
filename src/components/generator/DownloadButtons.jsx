import { Download, FileDown } from "lucide-react";

export default function DownloadButtons({ disabled, onDownloadPng, onDownloadSvg }) {
  const disabledClass = disabled
    ? "cursor-not-allowed opacity-50"
    : "hover:bg-zinc-200";

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={onDownloadPng}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 font-black text-black shadow-glow transition ${disabledClass}`}
      >
        <Download size={18} />
        Download PNG
      </button>

      <button
        type="button"
        onClick={onDownloadSvg}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/10 px-5 py-3 font-black text-white transition ${
          disabled ? "cursor-not-allowed opacity-50" : "hover:bg-white/20"
        }`}
      >
        <FileDown size={18} />
        Download SVG
      </button>
    </div>
  );
}
