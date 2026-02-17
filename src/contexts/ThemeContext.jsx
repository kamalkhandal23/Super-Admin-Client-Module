import React, { createContext, useState, useEffect, useMemo } from "react";

export const ThemeContext = createContext({
  theme: "light",
  primaryColor: "#ffffff",
  toggleTheme: () => { },
  setPrimaryColor: () => { },
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("#ffffff");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedColor = localStorage.getItem("primaryColor");

    const initialTheme = savedTheme ?? "light";
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");

    const initialColor = savedColor ?? "#ffffff";
    setPrimaryColor(initialColor);

    applyCssVars(initialColor, initialTheme, true);

    if (!savedTheme) {
      localStorage.setItem("theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      applyCssVars(primaryColor, next, true);
      return next;
    });
  };

  const updatePrimaryColor = (color) => {
    setPrimaryColor(color);
    localStorage.setItem("primaryColor", color);
    applyCssVars(color, theme, false);
  };

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      primaryColor,
      setPrimaryColor: updatePrimaryColor,
    }),
    [theme, primaryColor]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

function applyCssVars(color, theme) {
  if (theme === "dark") {
    document.documentElement.style.setProperty("--primary-color", "#1f2937");
    document.documentElement.style.setProperty("--primary-dark", "#111827");
    document.documentElement.style.setProperty("--primary-text", "#f9fafb");
    return;
  }

  // light mode

  document.documentElement.style.setProperty("--primary-color", color);
  document.documentElement.style.setProperty("--primary-dark", color);

  if (color.toLowerCase() === "#ffffff") {
    document.documentElement.style.setProperty("--primary-text", "var(--brand-color)");
  } else {
    document.documentElement.style.setProperty("--primary-text", "#ffffff");
  }
}  


function darkenColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) - (255 * percent) / 100;
  let g = ((num >> 8) & 0x00ff) - (255 * percent) / 100;
  let b = (num & 0x0000ff) - (255 * percent) / 100;
  return `rgb(${Math.max(0, r)}, ${Math.max(0, g)}, ${Math.max(0, b)})`;
}

function lightenColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + (255 * percent) / 100;
  let g = ((num >> 8) & 0x00ff) + (255 * percent) / 100;
  let b = (num & 0x0000ff) + (255 * percent) / 100;
  return `rgb(${Math.min(255, r)}, ${Math.min(255, g)}, ${Math.min(255, b)})`;
}

function isLight(hex) {
  const c = hex.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 200;
}
