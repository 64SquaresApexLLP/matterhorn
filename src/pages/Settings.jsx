import React, { useEffect, useState } from "react";

const themes = [
  {
    id: "corporate",
    name: "Corporate Blue",
    colors: ["#062e69", "#ffffff", "#e0f2fe"],
    vars: {
      bg: "blue-50",
      text: "gray-800",
      primary: "#062e69",
      secondary: "white",
    },
    navbarClass: "navbar-corporate"
  },
  {
    id: "dracula",
    name: "Dracula",
    colors: ["#2e2e3a", "#bd93f9", "#44475a"],
    vars: {
      bg: "blue-50",
      text: "gray-800",
      primary: "purple-500",
      secondary: "gray-800",
    },
    navbarClass: "navbar-dracula"
  },
];

const Settings = () => {
  const [activeTheme, setActiveTheme] = useState("corporate");

  useEffect(() => {
    // Get saved theme from localStorage or default to "corporate"
    const savedTheme = localStorage.getItem("theme") || "corporate";
    
    // If saved theme is 'dark', reset to 'corporate' since we removed dark mode
    const validTheme = savedTheme === "dark" ? "corporate" : savedTheme;
    
    setActiveTheme(validTheme);
    document.body.className = `theme-${validTheme}`;
    
    // Update localStorage if we had to change the theme
    if (savedTheme === "dark") {
      localStorage.setItem("theme", "corporate");
    }
    
    // Update navbar class if needed
    const navbar = document.querySelector('[data-navbar]');
    if (navbar) {
      const theme = themes.find(t => t.id === validTheme);
      if (theme) {
        navbar.className = navbar.className.replace(/navbar-\w+/g, '') + ` ${theme.navbarClass}`;
      }
    }
  }, []);

  const changeTheme = (id) => {
    document.body.className = `theme-${id}`;
    setActiveTheme(id);
    localStorage.setItem("theme", id);
    
    // Update navbar styling
    const navbar = document.querySelector('[data-navbar]');
    if (navbar) {
      const theme = themes.find(t => t.id === id);
      if (theme) {
        // Remove existing navbar theme classes
        navbar.className = navbar.className.replace(/navbar-\w+/g, '') + ` ${theme.navbarClass}`;
      }
    }
    
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { themeId: id } }));
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your application theme and preferences</p>
        </div>

        {/* Theme Selection Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Theme Selection</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`relative cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                  activeTheme === theme.id
                    ? "border-blue-500 shadow-lg ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => changeTheme(theme.id)}
              >
                {/* Theme Preview */}
                <div className="p-4">
                  <div className="flex space-x-2 mb-3">
                    {theme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  
                  <h3 className="font-semibold text-gray-800 mb-1">{theme.name}</h3>
                  <p className="text-sm text-gray-600">
                    {theme.id === 'corporate' && 'Professional corporate design with blue accents'}
                    {theme.id === 'dracula' && 'Dark purple theme inspired by Dracula'}
                  </p>
                </div>

                {/* Active Indicator */}
                {activeTheme === theme.id && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Current Theme Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">
              Current Theme: {themes.find(t => t.id === activeTheme)?.name}
            </h3>
            <p className="text-blue-700 text-sm">
              Click on any theme above to change your application's appearance. The navbar and other components will update automatically.
            </p>
          </div>
        </div>

        {/* Additional Settings Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Additional Settings</h2>
          
          <div className="space-y-6">
            {/* General Preferences */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">General Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Enable Notifications</label>
                    <p className="text-sm text-gray-500">Receive notifications about important updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Auto-save Changes</label>
                    <p className="text-sm text-gray-500">Automatically save your work as you type</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Data & Privacy */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Data & Privacy</h3>
              <div className="space-y-4">
                <button className="w-full md:w-auto px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                  Clear All Data
                </button>
                <button className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 md:ml-4">
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;