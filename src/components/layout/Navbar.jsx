import { QrCode } from "lucide-react";

export default function Navbar() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
      <a href="/" className="flex items-center gap-3 font-black">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-black shadow-glow">
          <QrCode size={22} strokeWidth={3} />
        </span>
        <span>QR & Barcode Generator</span>
      </a>

      <a
        href="#generator"
        className="rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/90 backdrop-blur transition hover:bg-white/20"
      >
        Generate Now
      </a>
    </header>
  );
}
