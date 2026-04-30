import { useState, useRef, useEffect } from "react";

export function Dropdown({ label, items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const handleClick = (item) => {
    item.onClick?.();
    setOpen(false);
  };

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">

      {/* BOTÓN */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
          bg-slate-100 dark:bg-slate-800
          hover:bg-slate-200 dark:hover:bg-slate-700
          text-slate-700 dark:text-slate-300
          transition-all duration-200
        "
      >
        {label}
      </button>

      {/* MENÚ */}
      <div
        className={`
          absolute left-0 mt-2 w-52
          rounded-xl border
          bg-white/90 dark:bg-slate-900/90
          backdrop-blur-xl
          border-slate-200 dark:border-slate-700
          shadow-lg
          transition-all duration-200
          ${
            open
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
        `}
      >
        <div className="py-1">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => handleClick(item)}
              className={`
                w-full flex items-center justify-between px-4 py-2.5 text-sm
                transition-colors
                ${
                  item.active
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }
              `}
            >
              <span>{item.label}</span>
              {item.active && "✓"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}