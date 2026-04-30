import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";

export const CategorySearchFilters = ({
  onSearch,
  placeholder = "Buscar categorías...",
}) => {
  const [query, setQuery] = useState("");

  // 🔹 debounce
  useEffect(() => {
    const t = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(t);
  }, [query, onSearch]);

  const clear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="flex items-center gap-3">

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
            onClick={clear}
            className="absolute right-1 top-1/2 -translate-y-1/2 p-2"
          >
            <X size={16} />
          </Button>
        )}
      </div>

    </div>
  );
};