"use client";

import {
  Moon,
  Sun,
} from "lucide-react";

import {
  useTheme,
} from "next-themes";

import {
  useEffect,
  useState,
} from "react";

export default function ThemeToggle() {

  const {
    theme,
    setTheme,
  } = useTheme();

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() =>
        setTheme(
          theme === "dark"
            ? "light"
            : "dark"
        )
      }

      className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2 rounded-2xl"
    >

      {theme === "dark"
        ? (
          <Sun
            size={18}
            className="text-yellow-500"
          />
        )
        : (
          <Moon
            size={18}
            className="text-indigo-600"
          />
        )}

    </button>
  );
}