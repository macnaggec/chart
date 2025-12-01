export async function exportChartAsPng(
  element: HTMLElement | null,
  filename: string = 'chart'
): Promise<void> {
  if (!element) {
    console.error('Export failed: No element provided');
    return;
  }

  const svgElement = element.querySelector('svg');

  if (!svgElement) {
    console.error('Export failed: No SVG element found');
    return;
  }

  try {
    const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;

    inlineStyles(svgElement, clonedSvg);

    const bbox = svgElement.getBoundingClientRect();
    const width = bbox.width;
    const height = bbox.height;

    clonedSvg.setAttribute('width', String(width));
    clonedSvg.setAttribute('height', String(height));

    const svgData = new XMLSerializer().serializeToString(clonedSvg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();

    img.onload = () => {
      const scale = window.devicePixelRatio || 1;
      const canvas = document.createElement('canvas');
      canvas.width = width * scale;
      canvas.height = height * scale;

      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.error('Export failed: Could not get canvas context');
        URL.revokeObjectURL(svgUrl);
        return;
      }

      const bgColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--bg-primary').trim() || '#ffffff';
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Export failed: Could not create blob');
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = url;
        link.click();

        URL.revokeObjectURL(url);
        URL.revokeObjectURL(svgUrl);
      }, 'image/png');
    };

    img.onerror = () => {
      console.error('Export failed: Could not load SVG as image');
      URL.revokeObjectURL(svgUrl);
    };

    img.src = svgUrl;
  } catch (error) {
    console.error('Export failed:', error);
  }
}

function inlineStyles(source: Element, target: Element): void {
  const computedStyle = window.getComputedStyle(source);

  const styleProps = [
    'fill',
    'stroke',
    'stroke-width',
    'stroke-opacity',
    'fill-opacity',
    'opacity',
    'font-family',
    'font-size',
    'font-weight',
    'text-anchor',
    'dominant-baseline',
  ];

  if (target instanceof SVGElement || target instanceof HTMLElement) {
    styleProps.forEach(prop => {
      const value = computedStyle.getPropertyValue(prop);

      if (value) {
        (target as SVGElement).style.setProperty(prop, value);
      }
    });
  }

  const sourceChildren = source.children;
  const targetChildren = target.children;

  for (let i = 0; i < sourceChildren.length && i < targetChildren.length; i++) {
    inlineStyles(sourceChildren[i], targetChildren[i]);
  }
}

export function generateExportFilename(prefix: string = 'chart'): string {
  const now = new Date();
  const timestamp = now.toISOString().slice(0, 19).replace(/[T:]/g, '-');
  return `${prefix}-${timestamp}`;
}
