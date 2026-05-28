# Project Setup — QR & Barcode Generator

## 1. Create the project

```bash
npm create vite@latest qr-barcode-generator -- --template react
cd qr-barcode-generator
```

## 2. Install dependencies

```bash
npm install
npm install qrcode.react react-barcode lucide-react framer-motion clsx tailwind-merge
npm install -D tailwindcss@^3 postcss autoprefixer
npx tailwindcss init -p
```

Optional for some React Bits components:

```bash
npm install gsap
```

## 3. Copy files

Copy the files from this starter pack into the Vite project.

## 4. Run dev server

```bash
npm run dev
```

## 5. Build for production

```bash
npm run build
```

## 6. Deploy to Netlify

- Build command: `npm run build`
- Publish directory: `dist`

## Notes about OpenAI / Agent

Your ChatGPT Plus subscription is for ChatGPT. It does not automatically include OpenAI API usage.

For this static barcode website MVP, you do not need OpenAI API.

Use OpenAI Agent / ChatGPT Agent / Codex as your coding assistant to edit the project, but do not put API keys into this frontend project.
