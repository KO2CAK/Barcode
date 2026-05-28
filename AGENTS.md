# AGENTS.md — QR & Barcode Generator Static Website

## Project Goal

Build a lightweight, elegant, static website called **QR & Barcode Generator**.

The website must allow users to convert:
- website links
- Instagram links
- TikTok links
- LinkedIn links
- Facebook links
- plain text
- product codes / SKU / invoice codes

into:
- **QR Code** for links and long text
- **Barcode CODE128** for short product codes, SKU, invoice numbers, and internal codes

This project should stay **frontend-only/static** unless the user explicitly asks for accounts, database, history, analytics, batch upload, or server-side processing.

## Important Product Decision

Use QR Code for URLs/social links.

Use Barcode CODE128 for short codes.

Do not force long URLs into 1D barcode, because 1D barcode becomes too wide and unreliable to scan. When the input looks like a URL and the user selects Barcode, show a gentle warning and recommend QR Code.

## Tech Stack

Use:

- Vite
- React
- Tailwind CSS
- qrcode.react
- react-barcode
- lucide-react
- framer-motion
- clsx
- tailwind-merge

Optional only when needed by copied React Bits components:

- gsap

## React Bits Direction

for the text, animation, components and backgrounds you can read the documentation: https://reactbits.dev

Use React Bits for modern visual polish, but keep the website lightweight.

React Bits is not treated as one big npm dependency. Add/copy only the components needed.

Recommended React Bits components for this project:

1. **BlurText**  
   Use for the hero headline.

2. **ShinyText**  
   Use for small labels, CTA text, or feature highlights.

3. **SpotlightCard**  
   Use for generator panel and feature cards.

4. **AnimatedContent**  
   Use for scroll/fade-in sections.

5. **Squares / Grid background / Light Rays style component**  
   Use carefully for the background. Keep opacity low so the page remains readable.

Avoid heavy effects that hurt performance, especially on mobile.

## Design Direction

Style target:

- elegant
- modern
- clean
- premium SaaS/tool website
- light, fast, and easy to use
- mobile responsive
- suitable for Netlify deployment

Visual style:

- dark hero section
- soft gradients
- subtle glowing background
- rounded cards
- clear preview area
- strong CTA buttons
- green accent allowed for FitPan-inspired vibe
- avoid clutter

Suggested color palette:

```txt
Background dark: #050816
Panel dark:      #0f172a
Text primary:    #f8fafc
Text muted:      #94a3b8
Accent green:    #22c55e
Accent orange:   #f97316
Light page bg:   #f8fafc
```

## Core Features

Must implement:

- input textarea
- QR Code mode
- Barcode mode
- auto-detect URL
- quick social presets
- size control
- foreground color control
- background color control
- download PNG
- download SVG
- responsive layout
- empty state
- scan recommendation warning

Nice to have:

- copy generated value
- reset button
- recent local history using localStorage
- print label button
- dark/light preview toggle
- UTM-safe URL handling
- optional logo-in-QR later

## File Structure

Use this structure:

```txt
src/
  components/
    generator/
      GeneratorCard.jsx
      PreviewPanel.jsx
      QuickPresets.jsx
      DownloadButtons.jsx
    layout/
      Navbar.jsx
      Footer.jsx
    reactbits/
      README.md
  lib/
    download.js
    utils.js
  data/
    presets.js
  App.jsx
  main.jsx
  index.css
```

Keep logic separated:

- QR/barcode preview logic in `PreviewPanel.jsx`
- download helpers in `src/lib/download.js`
- social presets in `src/data/presets.js`
- main page composition in `App.jsx`

## UX Rules

- If input is empty, show placeholder state.
- If input is a URL and mode is Barcode, warn the user.
- Do not block the user from generating barcode, but recommend QR Code.
- Default mode should be QR Code.
- Default value can be the user's FitPan website:
  `https://fitpan.netlify.app`
- Buttons must be clear:
  - Download PNG
  - Download SVG
  - Copy Value
- The generated result must be centered and easy to screenshot.

## Performance Rules

Keep bundle lightweight:

- Do not add backend.
- Do not add authentication.
- Do not add database.
- Do not add server functions.
- Do not import all icon packs.
- Import icons individually from `lucide-react`.
- Only install React Bits dependencies required by copied components.
- Avoid full-page heavy animation loops.
- Respect `prefers-reduced-motion` where possible.

## Accessibility Rules

- Inputs need labels.
- Buttons need clear text.
- Color contrast must be readable.
- Interactive elements need focus states.
- Generated code must not rely only on color.

## Static Deployment

Target deployment:

- Netlify
- Vercel
- GitHub Pages

For Netlify:

```bash
npm run build
```

Publish directory:

```txt
dist
```

No backend or environment variable is required for the MVP.

## Do Not Do

Do not:

- add Express.js
- add Supabase
- add login
- add payment
- add API key
- add OpenAI API call
- store private data on a server
- use backend unless the user explicitly asks
- overcomplicate the design
- use copyrighted logos from Instagram/TikTok/LinkedIn/Facebook directly

Use text labels or generic icons instead of official social logos unless the user provides permission/assets.

## Implementation Notes

QR Code package:

```bash
npm install qrcode.react
```

Barcode package:

```bash
npm install react-barcode
```

Use `QRCodeSVG` for SVG rendering.

Use `Barcode` with `format="CODE128"`.

For download:

- Serialize SVG with `XMLSerializer`
- For PNG, convert SVG to image, draw into canvas, export blob

## Acceptance Criteria

The project is successful when:

- user can type any link/text/code
- QR Code appears instantly
- Barcode appears instantly
- PNG download works
- SVG download works
- layout looks elegant on desktop
- layout works on mobile
- build passes with `npm run build`
- no backend is required
