import React, { createContext, useState, useEffect } from "react";

// Permite compartir el modo de tema (claro u oscuro) en toda la app
export const ThemeContext = createContext();

export const ThemeProviderCustom = ({ children }) => {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [themeMode, setThemeMode] = useState(storedTheme);

   // Función que alterna entre tema claro y oscuro
  const toggleTheme = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Asegura que el tema actual siempre se mantenga persistente en localStorage
  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
