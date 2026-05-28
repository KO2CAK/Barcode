import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, Check, Copy, Moon, Printer, RotateCcw, Sun } from "lucide-react";
import QuickPresets from "./QuickPresets";
import PreviewPanel from "./PreviewPanel";
import DownloadButtons from "./DownloadButtons";
import {
  downloadPngFromElement,
  downloadSvgFromElement,
  printGeneratedElement,
} from "../../lib/download";
import { isUrl, normalizeUrl } from "../../lib/utils";
import SpotlightCard from "../reactbits/SpotlightCard";

const DEFAULT_VALUE = "https://fitpan.netlify.app";
const HISTORY_KEY = "qr-barcode-generator-history";

export default function GeneratorCard() {
  const previewRef = useRef(null);

  const [mode, setMode] = useState("qr");
  const [rawValue, setRawValue] = useState(DEFAULT_VALUE);
  const [size, setSize] = useState(260);
  const [foreground, setForeground] = useState("#111827");
  const [background, setBackground] = useState("#ffffff");
  const [previewTheme, setPreviewTheme] = useState("light");
  const [recent, setRecent] = useState([]);
  const [copyState, setCopyState] = useState("idle");

  const value = useMemo(() => normalizeUrl(rawValue), [rawValue]);
  const looksLikeUrl = isUrl(rawValue);
  const isEmpty = !value;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");

      if (Array.isArray(saved)) {
        setRecent(saved.filter(Boolean).slice(0, 5));
      }
    } catch {
      setRecent([]);
    }
  }, []);

  const commitHistory = (nextValue = value) => {
    const normalized = normalizeUrl(nextValue);

    if (!normalized) {
      return;
    }

    setRecent((current) => {
      const next = [
        normalized,
        ...current.filter((item) => item !== normalized),
      ].slice(0, 5);

      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));

      return next;
    });
  };

  const handleDownloadPng = () => {
    if (isEmpty) {
      return;
    }

    downloadPngFromElement({
      container: previewRef.current,
      filename: mode === "qr" ? "qr-code.png" : "barcode.png",
      background,
    });
    commitHistory();
  };

  const handleDownloadSvg = () => {
    if (isEmpty) {
      return;
    }

    downloadSvgFromElement(
      previewRef.current,
      mode === "qr" ? "qr-code.svg" : "barcode.svg"
    );
    commitHistory();
  };

  const handleCopy = async () => {
    if (isEmpty) {
      return;
    }

    await navigator.clipboard.writeText(value);
    setCopyState("copied");
    commitHistory();
    window.setTimeout(() => setCopyState("idle"), 1400);
  };

  const handlePrint = () => {
    if (isEmpty) {
      return;
    }

    printGeneratedElement(
      previewRef.current,
      mode === "qr" ? "QR Code" : "CODE128 Barcode"
    );
    commitHistory();
  };

  return (
    <section
      id="generator"
      className="mx-auto grid w-full max-w-6xl gap-5 px-5 py-6 lg:grid-cols-[1fr_0.95fr]"
    >
      <SpotlightCard className="p-5">
        <div className="mb-6">
          <p className="text-sm font-black text-white">
            Static Generator
          </p>
          <h2 className="mt-2 text-3xl font-black">
            Convert anything into QR or barcode
          </h2>
          <p className="mt-3 leading-7 text-zinc-400">
            Link social media paling cocok jadi QR Code. Kode produk, SKU, atau
            nomor invoice paling cocok jadi Barcode CODE128.
          </p>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-2 rounded-lg bg-black/20 p-2">
          <button
            type="button"
            onClick={() => setMode("qr")}
            className={
              mode === "qr"
                ? "rounded-lg bg-white px-4 py-3 font-black text-black"
                : "rounded-lg px-4 py-3 font-black text-zinc-300 hover:bg-white/10"
            }
          >
            QR Code
          </button>

          <button
            type="button"
            onClick={() => setMode("barcode")}
            className={
              mode === "barcode"
                ? "rounded-lg bg-white px-4 py-3 font-black text-black"
                : "rounded-lg px-4 py-3 font-black text-zinc-300 hover:bg-white/10"
            }
          >
            Barcode
          </button>
        </div>

        <label className="mb-2 block text-sm font-black text-zinc-200">
          Link / text / code
        </label>
        <textarea
          value={rawValue}
          onChange={(event) => setRawValue(event.target.value)}
          rows={6}
          placeholder="Contoh: https://instagram.com/username"
          className="w-full resize-y rounded-lg border border-white/10 bg-black/80 p-4 leading-7 text-white placeholder:text-zinc-600"
        />

        <div className="mt-4">
          <QuickPresets
            onSelect={(preset) => {
              setRawValue(preset.value);
              setMode(preset.mode);
              commitHistory(preset.value);
            }}
          />
        </div>

        {recent.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-black text-zinc-200">Recent</p>
            <div className="flex flex-wrap gap-2">
              {recent.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setRawValue(item);
                    setMode(isUrl(item) ? "qr" : "barcode");
                  }}
                  className="max-w-full truncate rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs font-bold text-zinc-300 transition hover:border-white/40 hover:bg-white/15"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === "barcode" && looksLikeUrl && (
          <div className="mt-4 flex gap-3 rounded-lg border border-white/20 bg-white/10 p-4 text-sm leading-6 text-zinc-100">
            <AlertTriangle className="mt-0.5 shrink-0" size={18} />
            <p>
              Link panjang biasanya lebih mudah discan sebagai QR Code. Barcode
              tetap bisa dicoba, tapi hasilnya bisa terlalu lebar.
            </p>
          </div>
        )}

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <label className="mb-2 block text-sm font-black text-zinc-200">
              Size
            </label>
            <input
              type="range"
              min="160"
              max="420"
              value={size}
              onChange={(event) => setSize(Number(event.target.value))}
              className="w-full accent-white"
            />
            <p className="mt-1 text-sm text-zinc-500">
              {mode === "qr" ? `${size}px` : `${Math.round(size * 0.42)}px tall`}
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-black text-zinc-200">
              Code color
            </label>
            <input
              type="color"
              value={foreground}
              onChange={(event) => setForeground(event.target.value)}
              className="h-12 w-full cursor-pointer rounded-lg border border-white/10 bg-transparent"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-black text-zinc-200">
              Background
            </label>
            <input
              type="color"
              value={background}
              onChange={(event) => setBackground(event.target.value)}
              className="h-12 w-full cursor-pointer rounded-lg border border-white/10 bg-transparent"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={handleCopy}
            disabled={isEmpty}
            className={`inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/10 px-5 py-3 font-black text-white transition ${
              isEmpty ? "cursor-not-allowed opacity-50" : "hover:bg-white/20"
            }`}
          >
            {copyState === "copied" ? <Check size={18} /> : <Copy size={18} />}
            {copyState === "copied" ? "Copied" : "Copy Value"}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            disabled={isEmpty}
            className={`inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/10 px-5 py-3 font-black text-white transition ${
              isEmpty ? "cursor-not-allowed opacity-50" : "hover:bg-white/20"
            }`}
          >
            <Printer size={18} />
            Print Label
          </button>

          <button
            type="button"
            onClick={() => {
              setRawValue("");
              setMode("qr");
              setCopyState("idle");
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/10 px-5 py-3 font-black text-white transition hover:bg-white/20"
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-black/20 p-2">
          <button
            type="button"
            onClick={() => setPreviewTheme("light")}
            className={
              previewTheme === "light"
                ? "inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 font-black text-black"
                : "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-black text-zinc-300 hover:bg-white/10"
            }
          >
            <Sun size={16} />
            Light
          </button>
          <button
            type="button"
            onClick={() => setPreviewTheme("dark")}
            className={
              previewTheme === "dark"
                ? "inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 font-black text-white"
                : "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-black text-zinc-300 hover:bg-white/10"
            }
          >
            <Moon size={16} />
            Dark
          </button>
        </div>

        <div className="mt-3">
          <DownloadButtons
            disabled={isEmpty}
            onDownloadPng={handleDownloadPng}
            onDownloadSvg={handleDownloadSvg}
          />
        </div>
      </SpotlightCard>

      <PreviewPanel
        mode={mode}
        value={value}
        size={size}
        foreground={foreground}
        background={background}
        previewTheme={previewTheme}
        previewRef={previewRef}
      />
    </section>
  );
}
