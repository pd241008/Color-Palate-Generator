"use client";
import { useState } from "react";

export default function PaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#f3faf9");
  const [palette, setPalette] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePalette = async () => {
    setLoading(true);
    setError(null);
    setPalette([]); // Clear previous palette
    try {
      const res = await fetch("/api/color-palette", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ baseColor }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to generate palette");
      }

      const data = await res.json();
      setPalette(data.palette);
    } catch (err: unknown) {
      console.error("Error generating palette:", err);
      setError(
        typeof err === "object" && err !== null && "message" in err
          ? String((err as { message?: unknown }).message)
          : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (color: string) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(color);
      alert(`Copied ${color} to clipboard!`);
    }
  };

  return (
    <div className="m-50 flex justify-center p-10">
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>🎨 Color Palette Generator</h1>

        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="<baseColorPicker"
            style={{ fontWeight: 500 }}>
            Base Color:{" "}
          </label>
          <input
            id="baseColorPicker"
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            style={{
              marginRight: "1rem",
              width: "40px",
              height: "30px",
              border: "none",
            }}
            disabled={loading}
          />

          <button
            onClick={generatePalette}
            disabled={loading}
            style={{
              padding: "0.5rem 1.2rem",
              fontWeight: 600,
              borderRadius: "5px",
              border: "none",
              background: "#66c5ba",
              color: "#fff",
            }}>
            {loading ? "Generating..." : "Generate Palette"}
          </button>
        </div>

        {error && (
          <p style={{ color: "red", marginTop: "0.5rem" }}>Error: {error}</p>
        )}

        {palette.length > 0 && (
          <>
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "1rem",
                flexWrap: "wrap",
              }}>
              {palette.map((color, index) => (
                <div
                  key={index}
                  style={{ textAlign: "center", cursor: "pointer" }}
                  onClick={() => copyToClipboard(color)}
                  title="Click to copy">
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: color,
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                    }}
                  />
                  <p style={{ fontSize: "0.94rem", marginTop: "0.5rem" }}>
                    {color}
                  </p>
                </div>
              ))}
            </div>
            <p
              style={{
                fontSize: "0.87rem",
                color: "#666",
                marginTop: "1rem",
              }}>
              Click on a color to copy its hex code.
            </p>
          </>
        )}

        {loading && palette.length === 0 && (
          <p className="color #888">Generating your palette...</p>
        )}
      </div>
    </div>
  );
}
