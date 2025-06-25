import React, { useEffect, useState } from "react";

const themes = [
  {
    id: "tealgold",
    name: "Teal Gold (Default)",
    colors: ["bg-teal-600", "bg-amber-400", "bg-gray-100"],
    vars: {
      bg: "white",
      text: "gray-100",
      primary: "amber-400",
      secondary: "teal-600",
    },
  },
  {
    id: "dracula",
    name: "Dracula",
    colors: ["bg-gray-900", "bg-purple-400", "bg-gray-100"],
    vars: {
      bg: "gray-900",
      text: "gray-100",
      primary: "purple-400",
      secondary: "gray-700",
    },
  },
  {
    id: "modern",
    name: "Modern (Blue)",
    colors: ["bg-blue-100", "bg-blue-600", "bg-slate-900"],
    vars: {
      bg: "blue-100",
      text: "slate-900",
      primary: "blue-600",
      secondary: "slate-100",
    },
  },
  {
    id: "dark",
    name: "Dark",
    colors: ["bg-pink-100", "bg-pink-500", "bg-pink-900"],
    vars: {
      bg: "pink-100",
      text: "pink-900",
      primary: "pink-500",
      secondary: "pink-200",
    },
  },
];

const Settings = () => {
  const [activeTheme, setActiveTheme] = useState("");

  useEffect(() => {
    // const saved = setActiveTheme("tealgold");
    const saved = localStorage.getItem("theme") || setActiveTheme('modern'); // default to tealgold
    // setActiveTheme(saved);
    document.body.className = `theme-${saved}`;
  }, []);

  const changeTheme = (id) => {
    document.body.className = `theme-${id}`;
    setActiveTheme(id);
    localStorage.setItem("theme", id);
  };

  return (
    <div className="min-h-screen p-10 bg-[var(--secondary-600)]/20 transition-colors">
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
                  className={`w-8 h-8 rounded-full border ${color}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
