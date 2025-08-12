import { NextResponse } from "next/server";

// Converts hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

// Converts RGB to Hex
function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

// Converts RGB to HSL
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

// Converts HSL to RGB
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}

// Generates a harmonious (analogous) palette
function generateHarmoniousPalette(baseColor: string): string[] {
  const { r, g, b } = hexToRgb(baseColor);
  const [h, s, l] = rgbToHsl(r, g, b);

  // Analogous hues: base, +30°, -30°, +15°, -15°
  const analogousHues: number[] = [
    h,
    (h + 30 + 360) % 360,
    (h - 30 + 360) % 360,
    (h + 15 + 360) % 360,
    (h - 15 + 360) % 360,
  ];

  // Keep the same s/l for harmony
  return analogousHues.map((H) => {
    const [R, G, B] = hslToRgb(H / 360, s / 100, l / 100);
    return rgbToHex(Math.round(R), Math.round(G), Math.round(B));
  });
}

export async function GET() {
  // Optionally, return a sample palette
  return NextResponse.json([
    "#A1B2C3",
    "#FFD700",
    "#33FF57",
    "#FF5733",
    "#6A0DAD",
  ]);
}

export async function POST(request: Request) {
  try {
    const { baseColor } = await request.json();

    if (!baseColor) {
      return NextResponse.json(
        { message: "Missing baseColor" },
        { status: 400 }
      );
    }

    const palette = generateHarmoniousPalette(baseColor);
    return NextResponse.json({
      message: "Palette generated",
      palette,
    });
  } catch (e: unknown) {
    const errorMessage =
      typeof e === "object" && e !== null && "message" in e
        ? (e as { message?: string }).message
        : String(e);
    return NextResponse.json(
      { message: "Failed to generate palette", error: errorMessage },
      { status: 500 }
    );
  }
}
