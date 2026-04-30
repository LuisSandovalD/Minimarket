import { useState, useEffect, useRef } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";

export const BranchSearchFilters = ({
  onSearch,
  onFilterChange,
  placeholder = "Buscar sucursales...",
}) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [open, setOpen] = useState(false);

  const ref = useRef();

  const STATUS_OPTIONS = [
    { value: true, label: "Activo" },
    { value: false, label: "Inactivo" },
  ];

  // 🔹 debounce
  useEffect(() => {
    const t = setTimeout(() => {
      onSearch(query);
      onFilterChange({ ...filters, query });
    }, 300);

    return () => clearTimeout(t);
  }, [query, filters, onSearch, onFilterChange]);

  // 🔹 click outside
  useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const toggle = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? undefined : value,
    }));
  };

  const clear = () => {
    setQuery("");
    setFilters({});
  };

  const hasFilters = Object.values(filters).some((v) => v !== undefined);

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3">

      {/* SEARCH */}
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-10 !w-full"
        />

        {query && (
          <Button
            variant="ghost"
            onClick={() => setQuery("")}
            className="absolute right-1 top-1/2 -translate-y-1/2 p-2"
          >
            <X size={16} />
          </Button>
        )}
      </div>

      {/* FILTER BUTTON */}
      <div className="relative" ref={ref}>
        <Button
          onClick={() => setOpen(!open)}
          variant={hasFilters ? "primary" : "outline"}
          rightIcon={ChevronDown}
        >
          Filtros
        </Button>

        {/* PANEL */}
        <div
          className={`
            absolute right-0 mt-2 w-72
            rounded-xl border
            bg-white dark:bg-slate-900
            border-slate-200 dark:border-slate-700
            shadow-lg
            z-50
            transition-all duration-200
            ${
              open
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
            }
          `}
        >
          <div className="p-4 space-y-4">

            {/* ESTADO */}
            <div>
              <p className="text-xs text-slate-500 mb-2">Estado</p>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((s) => (
                  <Button
                    key={s.label}
                    onClick={() => toggle("isActive", s.value)}
                    className={`
                      px-3 py-1 rounded-full text-xs font-medium transition
                      ${
                        filters.isActive === s.value
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }
                    `}
                  >
                    {s.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* LIMPIAR */}
            {hasFilters && (
              <button
                onClick={clear}
                className="text-xs text-red-500 hover:underline"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};