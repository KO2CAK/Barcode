import Barcode from "react-barcode";
import { QRCodeSVG } from "qrcode.react";
import SpotlightCard from "../reactbits/SpotlightCard";

export default function PreviewPanel({
  mode,
  value,
  size,
  foreground,
  background,
  previewTheme,
  previewRef,
}) {
  const barcodeHeight = Math.round(size * 0.42);
  const barcodeLineWidth = Math.max(1.2, Number((size / 180).toFixed(2)));
  const previewSurface =
    previewTheme === "light"
      ? "border-zinc-200 bg-zinc-100"
      : "border-white/15 bg-black/70";

  return (
    <SpotlightCard as="section" className="p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-white">
            Preview
          </p>
          <h2 className="mt-1 text-2xl font-black">Generated Result</h2>
        </div>

        <span className="rounded-lg border border-white/10 bg-black/20 px-3 py-1 text-xs font-bold text-zinc-300">
          {mode === "qr" ? "QR Code" : "CODE128"}
        </span>
      </div>

      <div
        ref={previewRef}
        className={`grid min-h-[360px] place-items-center overflow-auto rounded-lg border border-dashed p-6 ${previewSurface}`}
      >
        {!value ? (
          <p className="max-w-xs text-center text-zinc-500">
            Masukkan link, teks, atau kode untuk melihat hasilnya.
          </p>
        ) : mode === "qr" ? (
          <div
            className="rounded-lg p-4 shadow-2xl"
            style={{ backgroundColor: background }}
          >
            <QRCodeSVG
              value={value}
              size={size}
              bgColor={background}
              fgColor={foreground}
              level="H"
              includeMargin
            />
          </div>
        ) : (
          <div
            className="max-w-full overflow-auto rounded-lg p-4 shadow-2xl"
            style={{ backgroundColor: background }}
          >
            <Barcode
              value={value}
              format="CODE128"
              width={barcodeLineWidth}
              height={barcodeHeight}
              displayValue
              background={background}
              lineColor={foreground}
              fontSize={Math.max(14, Math.round(size / 16))}
              margin={12}
            />
          </div>
        )}
      </div>

      <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4">
        <p className="text-xs font-black text-zinc-500">
          Value
        </p>
        <p className="mt-2 break-all text-sm leading-6 text-zinc-300">
          {value || "-"}
        </p>
      </div>
    </SpotlightCard>
  );
}
