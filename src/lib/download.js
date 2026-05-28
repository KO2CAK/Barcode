function getSvgSource(container) {
  const svg = container?.querySelector("svg");

  if (!svg) {
    throw new Error("SVG element not found.");
  }

  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svg);

  if (!source.includes("xmlns=")) {
    source = source.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  return { svg, source };
}

export function downloadSvgFromElement(container, filename = "generated-code.svg") {
  const { source } = getSvgSource(container);

  const blob = new Blob([source], {
    type: "image/svg+xml;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

export function downloadPngFromElement({
  container,
  filename = "generated-code.png",
  background = "#ffffff",
  scale = 3,
}) {
  const { svg, source } = getSvgSource(container);

  const blob = new Blob([source], {
    type: "image/svg+xml;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const image = new Image();

  image.onload = () => {
    const bounds = svg.getBoundingClientRect();
    const width = Math.ceil(bounds.width || 300);
    const height = Math.ceil(bounds.height || 300);

    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = height * scale;

    const context = canvas.getContext("2d");

    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((pngBlob) => {
      if (!pngBlob) {
        URL.revokeObjectURL(url);
        throw new Error("Failed to create PNG file.");
      }

      const pngUrl = URL.createObjectURL(pngBlob);
      const link = document.createElement("a");

      link.href = pngUrl;
      link.download = filename;
      link.click();

      URL.revokeObjectURL(pngUrl);
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  image.onerror = () => {
    URL.revokeObjectURL(url);
    throw new Error("Failed to load SVG for PNG export.");
  };

  image.src = url;
}

export function printGeneratedElement(container, title = "Generated Code") {
  const { source } = getSvgSource(container);
  const printWindow = window.open("", "_blank", "width=720,height=720");

  if (!printWindow) {
    return false;
  }

  printWindow.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          body {
            align-items: center;
            display: flex;
            font-family: Arial, sans-serif;
            justify-content: center;
            margin: 0;
            min-height: 100vh;
          }
          svg {
            max-height: 90vh;
            max-width: 90vw;
          }
        </style>
      </head>
      <body>${source}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();

  return true;
}
