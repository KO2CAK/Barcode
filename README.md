# QR & Barcode Generator

A lightweight, frontend-only website for generating clean QR Codes and CODE128 barcodes from links, social profiles, plain text, SKU values, invoice numbers, and internal product codes.

The project is designed as a fast static tool that can be deployed to Netlify, Vercel, or GitHub Pages without a backend, login system, database, API key, or server-side processing.

## Overview

QR & Barcode Generator helps users choose the right scannable format for the job:

- Use **QR Code** for website links, social media links, and longer text.
- Use **Barcode CODE128** for short product codes, SKU values, invoice numbers, and internal IDs.

If a user selects Barcode mode for a URL, the app shows a gentle recommendation to use QR Code because long URLs often become too wide and unreliable as 1D barcodes.

## Features

- QR Code generation for links and text
- Barcode CODE128 generation for short codes
- URL auto-detection and normalization
- Quick presets for website and social links
- Size control
- Foreground and background color controls
- PNG download
- SVG download
- Copy generated value
- Reset action
- Print label action
- Light and dark preview modes
- Recent local history using `localStorage`
- Empty-state preview
- Responsive layout for desktop and mobile
- Monochrome black-and-white visual theme
- React Bits-inspired animation and `GridScan` background

## Tech Stack

- Vite
- React
- Tailwind CSS
- qrcode.react
- react-barcode
- lucide-react
- framer-motion
- clsx
- tailwind-merge
- three
- postprocessing
- face-api.js

`face-api.js` is included for the optional `GridScan` webcam capability, but webcam tracking is not enabled by default.

## Project Structure

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
      AnimatedContent.jsx
      BlurText.jsx
      GridScan.jsx
      GridScan.css
      ShinyText.jsx
      SpotlightCard.jsx
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

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

This project is static and does not require environment variables.

For Netlify:

```txt
Build command: npm run build
Publish directory: dist
```

The same `dist` output can also be deployed to Vercel or GitHub Pages.

## Privacy

All generation happens in the browser. The app does not upload user input to a server, store private data remotely, or require an account.

## License

This project is ready to adapt for personal, business, or client use. Add a license file if you plan to distribute it publicly.
