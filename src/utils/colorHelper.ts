/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Interpolate between two colors
 */
export function interpolateColor(
  from: string,
  to: string,
  progress: number
): string {
  const fromRgb = hexToRgb(from);
  const toRgb = hexToRgb(to);

  if (!fromRgb || !toRgb) return from;

  const r = fromRgb.r + (toRgb.r - fromRgb.r) * progress;
  const g = fromRgb.g + (toRgb.g - fromRgb.g) * progress;
  const b = fromRgb.b + (toRgb.b - fromRgb.b) * progress;

  return rgbToHex(r, g, b);
}

/**
 * Parse CSS color string
 */
export function parseColor(color: string): {
  r: number;
  g: number;
  b: number;
  a?: number;
} | null {
  // Handle hex
  if (color.startsWith('#')) {
    return hexToRgb(color);
  }

  // Handle rgb/rgba
  const rgbMatch = color.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
  );
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1]),
      g: parseInt(rgbMatch[2]),
      b: parseInt(rgbMatch[3]),
      a: rgbMatch[4] ? parseFloat(rgbMatch[4]) : undefined,
    };
  }

  return null;
}

/**
 * Format color as CSS string
 */
export function formatColor(
  r: number,
  g: number,
  b: number,
  a?: number
): string {
  if (a !== undefined && a < 1) {
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
  }
  return rgbToHex(r, g, b);
}
