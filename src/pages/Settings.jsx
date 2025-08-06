import { div } from "framer-motion/client";
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
    colors: ["bg-gray-900", "bg-gray-700", "bg-gray-500"],
    vars: {
      bg: "gray-900", // Dark background
      text: "gray-100", // Light text for better contrast on dark background
      primary: "purple-500", // You can choose a color that pops on dark mode
      secondary: "gray-400", // Lighter gray for secondary elements
    },
  },
];

const Settings = () => {
  const [activeTheme, setActiveTheme] = useState("");

  useEffect(() => {
    // const saved = setActiveTheme("tealgold");
    const saved = localStorage.getItem("theme") || setActiveTheme("modern"); // default to tealgold
    // setActiveTheme(saved);
    document.body.className = `theme-${saved}`;
  }, []);

  const changeTheme = (id) => {
    document.body.className = `theme-${id}`;
    setActiveTheme(id);
    localStorage.setItem("theme", id);
  };

  return {
  };
};

export default Settings;
