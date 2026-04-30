/* eslint-disable react-hooks/static-components */
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../../../public/context/ThemeContext";

export const ThemeSwitcher = () => {
  const { theme, cambiarTema } = useTheme();

  const cycleTheme = () => {
    if (theme === "light") cambiarTema("dark");
    else if (theme === "dark") cambiarTema("system");
    else cambiarTema("light");
  };

  const getIcon = () => {
    if (theme === "dark") return Moon;
    if (theme === "light") return Sun;
    return Monitor;
  };

  const Icon = getIcon();

  return (
    <button
      onClick={cycleTheme}
      title="Cambiar tema"
      className="
        relative flex items-center justify-center
        w-10 h-10 rounded-xl
        bg-gray-200/70 dark:bg-slate-800/70
        hover:bg-gray-300 dark:hover:bg-slate-700
        text-gray-800 dark:text-gray-200
        backdrop-blur-md
        transition-all duration-300
        hover:scale-105 active:scale-95
        shadow-sm hover:shadow-md
      "
    >
      {/* 🔥 Icono animado */}
      <span className="transition-transform duration-300 group-hover:rotate-12">
        <Icon size={18} />
      </span>
    </button>
  );
};