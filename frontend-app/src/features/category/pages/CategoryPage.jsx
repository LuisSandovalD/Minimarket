import { useState } from "react";
import { useCategory } from "../hooks/useCategory";
import { useCategoryActions } from "../hooks/useCategoryActions";
import { useCategoryFilters } from "../hooks/useCategoryFilters";

import { CategoryTable } from "../components/CategoryTable";
import { CategoryForm } from "../components/CategoryForm";
import { CategoryHeader } from "../components/CategoryHeader";
import { CategorySearchFilters } from "../components/CategorySearchFilters";

export default function CategoryPage() {
  const {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refetch,
  } = useCategory();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // ✅ filtros (corregido nombre + fallback)
  const { setFilters, filteredCategories = [] } =
    useCategoryFilters(categories || []);

  // ✅ acciones
  const {
    handleCreate,
    handleEdit,
    handleSubmit,
    handleDelete,
  } = useCategoryActions({
    createCategory,
    updateCategory,
    deleteCategory,
    setOpen,
    setSelected,
  });

  return (
    <div className="p-6 space-y-6">
      
      {/* HEADER */}
      <CategoryHeader onCreate={handleCreate} />

      {/* FILTROS */}
      <CategorySearchFilters
        onSearch={(q) =>
          setFilters((prev) => ({ ...prev, query: q }))
        }
        onFilterChange={(f) =>
          setFilters((prev) => ({ ...prev, ...f }))
        }
      />

      {/* ERROR */}
      {error && (
        <div className="p-4 rounded-lg bg-red-100 text-red-700 flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={refetch}
            className="text-sm underline"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* CONTENIDO */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow">
        {loading ? (
          <div className="p-6 text-center text-slate-500">
            Cargando categorías...
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="p-6 text-center text-slate-500">
            No hay categorías registradas
          </div>
        ) : (
          <CategoryTable
            categories={filteredCategories} // ✅ nombre correcto
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* MODAL */}
      <CategoryForm
        open={open}
        onClose={() => {
          setOpen(false);
          setSelected(null);
        }}
        onSubmit={(data) => handleSubmit(selected, data)}
        initialData={selected}
      />
    </div>
  );
}