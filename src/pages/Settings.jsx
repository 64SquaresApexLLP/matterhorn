import React, { useEffect, useState } from "react";

const themes = [
  {
    id: "tealgold",
    name: "Teal Gold (Default)",
    colors: ["#008080", "#FFD700", "#000000"],
  },
  {
    id: "dracula",
    name: "Dracula",
    colors: ["#282a36", "#bd93f9", "#f8f8f2"],
  },
  {
    id: "modern",
    name: "Modern (Blue)",
    colors: ["#e0f2ff", "#2563eb", "#0f172a"],
  },
  {
    id: "blossom",
    name: "Blossom",
    colors: ["#fff0f5", "#ff69b4", "#4b0c28"],
  },
];

const Settings = () => {
  const [activeTheme, setActiveTheme] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "tealgold"; // default to tealgold
    setActiveTheme(saved);
    document.body.className = `theme-${saved}`;
  }, []);

  const changeTheme = (id) => {
    document.body.className = `theme-${id}`;
    setActiveTheme(id);
    localStorage.setItem("theme", id);
  };

  return (
    <div className="min-h-screen p-10 bg-[var(--bg)] text-[var(--text)] transition-colors">
      <h1 className="text-3xl font-bold mb-8">Choose a Theme</h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {themes.map((theme) => (
          <div
            key={theme.id}
            onClick={() => changeTheme(theme.id)}
            className={`cursor-pointer border rounded-lg p-4 space-y-2 shadow-lg transition ${
              activeTheme === theme.id
                ? "ring-2 ring-[var(--primary)] scale-105"
                : "hover:ring-1 hover:ring-[var(--primary)]"
            }`}
          >
            <h2 className="font-semibold text-lg">{theme.name}</h2>
            <div className="flex gap-2">
              {theme.colors.map((color, idx) => (
                <span
                  key={idx}
                  className="w-8 h-8 rounded-full border"
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
