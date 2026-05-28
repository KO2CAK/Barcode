import { lazy, Suspense } from "react";
import { ArrowRight, BadgeCheck, LockKeyhole, Zap } from "lucide-react";
import GeneratorCard from "./components/generator/GeneratorCard";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AnimatedContent from "./components/reactbits/AnimatedContent";
import BlurText from "./components/reactbits/BlurText";
import ShinyText from "./components/reactbits/ShinyText";
import SpotlightCard from "./components/reactbits/SpotlightCard";

const GridScan = lazy(() => import("./components/reactbits/GridScan"));

export default function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_30%),linear-gradient(180deg,#000_0%,#0a0a0a_58%,#000_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <Suspense fallback={null}>
          <GridScan
            sensitivity={0.5}
            lineThickness={1}
            linesColor="#2d2d2d"
            gridScale={0.11}
            scanColor="#ffffff"
            scanOpacity={0.26}
            scanGlow={0.36}
            scanDuration={2.4}
            scanDelay={1.4}
            enablePost
            bloomIntensity={0.16}
            chromaticAberration={0.001}
            noiseIntensity={0.008}
          />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.82)_72%,#000_100%)]" />

      <div className="relative z-10">
        <Navbar />

        <section className="mx-auto grid w-full max-w-6xl gap-5 px-5 pb-4 pt-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <AnimatedContent>
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-black text-white">
              <Zap size={16} />
              <ShinyText>Static, fast, scan-ready</ShinyText>
            </div>

            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl">
              <BlurText text="QR & Barcode Generator" />
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              Convert website, social links, text, SKU, product codes, and
              invoices into QR Code or CODE128 Barcode without accounts,
              uploads, or backend processing.
            </p>

            <a
              href="#generator"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-black text-black shadow-glow transition hover:bg-zinc-200"
            >
              Start Generate
              <ArrowRight size={18} />
            </a>
          </AnimatedContent>

          <AnimatedContent delay={0.1} className="grid gap-3 sm:grid-cols-2">
            {[
              [BadgeCheck, "QR for links", "URLs and long text stay easy to scan."],
              [LockKeyhole, "Private by design", "Everything runs locally in the browser."],
            ].map(([Icon, title, desc]) => (
              <SpotlightCard key={title} className="p-4">
                <Icon className="mb-3 text-white" size={22} />
                <h2 className="text-lg font-black text-white">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{desc}</p>
              </SpotlightCard>
            ))}
          </AnimatedContent>
        </section>

        <GeneratorCard />

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-5 py-8 md:grid-cols-3">
          {[
            ["QR for links", "Website, Instagram, TikTok, LinkedIn, Facebook."],
            ["Barcode for codes", "SKU, product code, invoice number, internal ID."],
            ["Static & fast", "Easily to convert."],
          ].map(([title, desc]) => (
            <AnimatedContent
              key={title}
              className="h-full"
            >
              <SpotlightCard className="h-full p-5">
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-zinc-400">{desc}</p>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </section>

        <Footer />
      </div>
    </main>
  );
}
