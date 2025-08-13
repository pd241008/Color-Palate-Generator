"use client";

import { Code2, Server, Terminal } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 pt-20 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-lg">
            <Code2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold text-slate-800 dark:text-slate-100">
            ColorGen API Documentation
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Learn how to integrate the ColorGen API into your projects and
            generate beautiful palettes in seconds.
          </p>
        </header>

        {/* Base URL */}
        <section className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/20 p-6">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
            <Server className="w-6 h-6 text-indigo-500" /> Base URL
          </h2>
          <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto">
            https://yourdomain.com/api/colors
          </pre>
        </section>

        {/* Endpoints */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
            Endpoints
          </h2>

          {/* Random Palette */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/20 p-6">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
              1. Get Random Palette
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-3">
              Generates a set of random colors.
            </p>
            <pre className="bg-slate-900 text-blue-400 p-4 rounded-lg overflow-x-auto">
              GET /api/colors
            </pre>
            <h4 className="mt-4 font-semibold text-slate-700 dark:text-slate-300">
              Example Response:
            </h4>
            <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto">
              {`[
  "#A1B2C3",
  "#FFD700",
  "#33FF57",
  "#FF5733",
  "#6A0DAD"
]`}
            </pre>
          </div>

          {/* Palette by Base */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/20 p-6">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
              2. Get Palette by Base Color
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-3">
              Generates a palette based on a specific base color.
            </p>
            <pre className="bg-slate-900 text-blue-400 p-4 rounded-lg overflow-x-auto">
              GET /api/colors?base=ff5733
            </pre>
            <h4 className="mt-4 font-semibold text-slate-700 dark:text-slate-300">
              Example Response:
            </h4>
            <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto">
              {`[
  "#FF5733",
  "#FF8A65",
  "#FFD54F",
  "#4DB6AC",
  "#9575CD"
]`}
            </pre>
          </div>
        </section>

        {/* Parameters */}
        <section className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/20 p-6">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Query Parameters
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-300 dark:border-slate-700 rounded-lg">
              <thead>
                <tr className="bg-slate-200 dark:bg-slate-700">
                  <th className="p-2 text-left">Parameter</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-300 dark:border-slate-700">
                  <td className="p-2">base</td>
                  <td className="p-2">string (hex)</td>
                  <td className="p-2">
                    Base color to generate related palette from.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Example Usage */}
        <section className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/20 p-6">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-indigo-500" /> Example Usage
            (JavaScript)
          </h2>
          <pre className="bg-slate-900 text-yellow-300 p-4 rounded-lg overflow-x-auto">
            {`fetch("https://yourdomain.com/api/colors?base=ff5733")
  .then(res => res.json())
  .then(data => console.log(data));`}
          </pre>
        </section>
      </div>
    </div>
  );
}
