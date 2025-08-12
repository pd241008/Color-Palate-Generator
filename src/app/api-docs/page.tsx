"use client";
import { useEffect, useState } from "react";
import { Clipboard, Check } from "lucide-react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 p-1 rounded"
      title="Copy to clipboard">
      {copied ? (
        <Check
          size={16}
          className="text-green-400"
        />
      ) : (
        <Clipboard size={16} />
      )}
    </button>
  );
}

export default function ApiDocsPage() {
  const [baseUrl, setBaseUrl] = useState(
    "https://yourwebsite.com/api/generate-palette"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(`${window.location.origin}/api/generate-palette`);
    }
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-700 sticky top-0 p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">API Docs</h2>
        <nav className="space-y-3 text-gray-300">
          <a
            href="#intro"
            className="block hover:text-indigo-400">
            Introduction
          </a>
          <a
            href="#base-url"
            className="block hover:text-indigo-400">
            Base URL
          </a>
          <a
            href="#endpoint"
            className="block hover:text-indigo-400">
            Endpoint
          </a>
          <a
            href="#examples"
            className="block hover:text-indigo-400">
            Examples
          </a>
          <a
            href="#license"
            className="block hover:text-indigo-400">
            License
          </a>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 text-gray-200">
        {/* Intro */}
        <section
          id="intro"
          className="mb-10">
          <h1 className="text-4xl font-bold mb-4">
            🎨 Color Palette Generator API
          </h1>
          <p className="text-lg text-gray-400">
            A free API to generate beautiful color palettes. No authentication
            required.
          </p>
        </section>

        {/* Base URL */}
        <section
          id="base-url"
          className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Base URL</h2>
          <div className="relative bg-gray-800 rounded p-3 font-mono text-sm">
            <CopyButton text={baseUrl} />
            {baseUrl}
          </div>
        </section>

        {/* Endpoint */}
        <section
          id="endpoint"
          className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">
            GET /api/generate-palette
          </h2>
          <p className="mb-3">
            Generates a color palette. Optionally pass a{" "}
            <code className="bg-gray-700 px-1 rounded">color</code> query
            parameter.
          </p>
          <table className="w-full text-sm border border-gray-700 mb-4">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-2 border border-gray-600">Name</th>
                <th className="p-2 border border-gray-600">Type</th>
                <th className="p-2 border border-gray-600">Required</th>
                <th className="p-2 border border-gray-600">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-600">color</td>
                <td className="p-2 border border-gray-600">string</td>
                <td className="p-2 border border-gray-600">No</td>
                <td className="p-2 border border-gray-600">
                  Base color in hex. URL-encode if including <code>#</code>.
                  Default: <code>#3b82f6</code>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Examples */}
        <section
          id="examples"
          className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Examples</h2>

          <h3 className="text-lg font-semibold mb-1">Curl Request</h3>
          <div className="relative bg-gray-800 rounded p-3 font-mono text-sm mb-4">
            <CopyButton text={`curl "${baseUrl}?color=%23ff5733"`} />
            {`# Default
curl "${baseUrl}"

# With base color
curl "${baseUrl}?color=%23ff5733"`}
          </div>

          <h3 className="text-lg font-semibold mb-1">Response</h3>
          <div className="relative bg-gray-800 rounded p-3 font-mono text-sm mb-4">
            <CopyButton
              text={`{
  "palette": ["#ff5733","#33ff57","#ffd700","#6a0dad","#a1b2c3"]
}`}
            />
            {`{
  "palette": [
    "#ff5733",
    "#33ff57",
    "#ffd700",
    "#6a0dad",
    "#a1b2c3"
  ]
}`}
          </div>

          <h3 className="text-lg font-semibold mb-1">JavaScript</h3>
          <div className="relative bg-gray-800 rounded p-3 font-mono text-sm">
            <CopyButton
              text={`async function getPalette(color = "#ff5733") {
  const res = await fetch("${baseUrl}?color=" + encodeURIComponent(color));
  const data = await res.json();
  console.log(data.palette);
}
getPalette();`}
            />
            {`async function getPalette(color = "#ff5733") {
  const res = await fetch("${baseUrl}?color=" + encodeURIComponent(color));
  const data = await res.json();
  console.log(data.palette);
}
getPalette();`}
          </div>
        </section>

        {/* License */}
        <section id="license">
          <h2 className="text-2xl font-semibold mb-3">License</h2>
          <p className="text-gray-400">
            This API is free to use under the MIT License. Attribution is
            appreciated but not required.
          </p>
        </section>
      </main>
    </div>
  );
}
