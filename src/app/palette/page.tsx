"use client";

import { useState } from "react";
import {
  Palette,
  Copy,
  Download,
  Sparkles,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function PaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [palette, setPalette] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const generatePalette = async () => {
    setLoading(true);
    setError(null);
    setPalette([]);

    try {
      const response = await fetch("/api/color-palette", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baseColor }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate palette");
      }

      const data = await response.json();
      setPalette(data.palette);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error("Failed to copy color:", err);
    }
  };

  const exportPalette = () => {
    if (palette.length === 0) return;

    const paletteData = {
      baseColor,
      palette,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(paletteData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `color-palette-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getRandomColor = () => {
    const colors = [
      "#ef4444",
      "#f97316",
      "#f59e0b",
      "#eab308",
      "#84cc16",
      "#22c55e",
      "#10b981",
      "#14b8a6",
      "#06b6d4",
      "#0ea5e9",
      "#3b82f6",
      "#6366f1",
      "#8b5cf6",
      "#a855f7",
      "#d946ef",
      "#ec4899",
      "#f43f5e",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBaseColor(randomColor);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Palette className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Color Palette Generator
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Create beautiful, harmonious color palettes from any base color.
            Perfect for designers, developers, and creative projects.
          </p>
        </div>

        {/* Color Input Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    disabled={loading}
                    className="w-16 h-16 rounded-xl cursor-pointer border-4 border-white shadow-lg disabled:opacity-50"
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-30"></div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Base Color
                  </label>
                  <input
                    type="text"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    disabled={loading}
                    className="px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
                    placeholder="#3b82f6"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={getRandomColor}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-colors disabled:opacity-50">
                  <Sparkles className="w-4 h-4" />
                  Random
                </button>
                <button
                  onClick={generatePalette}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none">
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Palette className="w-4 h-4" />
                  )}
                  {loading ? "Generating..." : "Generate Palette"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-700 dark:text-red-400 text-center">
                <strong>Error:</strong> {error}
              </p>
            </div>
          </div>
        )}

        {/* Palette Display */}
        {palette.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                Generated Palette
              </h2>
              <button
                onClick={exportPalette}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {palette.map((color, index) => (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div
                    className="h-32 w-full cursor-pointer relative"
                    style={{ backgroundColor: color }}
                    onClick={() => copyToClipboard(color)}>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Copy className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-medium text-slate-700 dark:text-slate-300">
                        {color.toUpperCase()}
                      </span>
                      <button
                        onClick={() => copyToClipboard(color)}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors">
                        <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      </button>
                    </div>
                    {copiedColor === color && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1 animate-pulse">
                        Copied!
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                Click on any color to copy its hex code to clipboard
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {palette.length === 0 && !loading && !error && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
              <Palette className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Ready to Create
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Choose a base color and click &quot;Generate Palette&quot; to
                create your harmonious color scheme
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
