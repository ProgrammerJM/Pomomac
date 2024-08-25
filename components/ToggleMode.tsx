"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BsSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa6";

export function ToggleMode() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="relative focus:outline-none rounded-full cursor-pointer"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <BsSunFill className="text-yellow-500" size={20} />
      ) : (
        <FaMoon className="text-yellow-500" size={20} />
      )}
    </button>
  );
}
