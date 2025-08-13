"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Palette, Code2, Home, Sun, Moon, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // On mount, check current theme
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Palette Generator", href: "/palette", icon: Palette },
    { name: "API Playground", href: "/api-access", icon: Code2 },
    { name: "Docs", href: "/docs", icon: BookOpen }, // ✅ Added Docs link
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-white/20 dark:border-slate-700/20 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-100">
          <Palette className="w-6 h-6 text-indigo-500" />
          ColorGen
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ name, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1 px-3 py-2 rounded-full transition-colors ${
                pathname === href
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400"
              }`}>
              <Icon className="w-4 h-4" />
              {name}
            </Link>
          ))}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          {theme === "light" ? (
            <Moon className="w-5 h-5 text-slate-700" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-400" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg px-4 py-2 flex justify-around">
        {navLinks.map(({ name, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 text-xs ${
              pathname === href
                ? "text-indigo-500 font-semibold"
                : "text-slate-600 dark:text-slate-300"
            }`}>
            <Icon className="w-5 h-5" />
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
