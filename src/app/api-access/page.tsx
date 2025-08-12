"use client";

import { useState, useEffect } from "react";
import { Palette, Code2, Link as LinkIcon, PaintBucket } from "lucide-react";

export default function ApiAccessPage() {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const defaultApiUrl = `${origin}/api/generate-palette`; // No params
  const customApiUrl = `${origin}/api/generate-palette?color=${encodeURIComponent(
    baseColor
  )}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20 dark:border-slate-700/20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
            API Playground
          </h1>
        </div>

        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          Experiment with our Color Palette Generator API directly from your
          browser.
        </p>

        {/* Default API URL */}
        <div className="mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
            <LinkIcon className="w-5 h-5" /> Base API (no color)
          </h2>
          <div className="bg-slate-900 text-green-300 font-mono p-3 rounded-lg text-sm overflow-x-auto border border-slate-700">
            {defaultApiUrl || "/api/generate-palette"}
          </div>
        </div>

        {/* Custom API */}
        <div className="mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
            <Palette className="w-5 h-5" /> Custom Base Color
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-14 h-14 rounded-lg shadow-inner cursor-pointer border border-slate-300 dark:border-slate-600"
            />
            <span className="font-mono text-slate-700 dark:text-slate-300 text-sm">
              {baseColor}
            </span>
          </div>
          <div className="bg-slate-900 text-green-300 font-mono p-3 rounded-lg text-sm overflow-x-auto border border-slate-700">
            {customApiUrl ||
              `/api/generate-palette?color=${encodeURIComponent(baseColor)}`}
          </div>
        </div>

        {/* Example Usage */}
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
            <PaintBucket className="w-5 h-5" /> Example Fetch
          </h2>
          <pre className="bg-slate-900 text-sky-300 p-4 rounded-lg text-sm overflow-x-auto border border-slate-700">
            {`fetch("${customApiUrl}")
  .then(res => res.json())
  .then(data => console.log(data.palette));`}
          </pre>
        </div>
      </div>
    </div>
  );
}
