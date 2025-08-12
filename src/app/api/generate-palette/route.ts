// app/api/generate-palette/route.ts
import { NextResponse } from "next/server";

function generatePalette(base: string) {
  return [base, "#FFD700", "#33FF57", "#FF5733", "#6A0DAD"];
}

function getRandomHex() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const baseColor = searchParams.get("color") || getRandomHex();

  const palette = generatePalette(baseColor);

  return NextResponse.json({ baseColor, palette });
}
