import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useProductActions } from "../hooks/useProductsActions";
import { useProductFilters } from "../hooks/useProductsFilters";

import { ProductsTable } from "../components/ProductsTable";
import { ProductsForm } from "../components/ProductsForm";
import { ProductsHeader } from "../components/ProductsHeader";
import { ProductsSearchFilters } from "../components/ProductsSearchFilters";

export default function ProductPage() {
  const {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch,
  } = useProducts();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // 🔹 filtros
  const { setFilters, filteredProducts } = useProductFilters(products);

  // 🔹 acciones
  const {
    handleCreate,
    handleEdit,
    handleSubmit,
    handleDelete,
  } = useProductActions({
    createProduct,
    updateProduct,
    deleteProduct,
    setOpen,
    setSelected,
  });

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <ProductsHeader onCreate={handleCreate} />

      {/* FILTROS */}
      <ProductsSearchFilters
        onSearch={(q) =>
          setFilters((prev) => ({ ...prev, query: q }))
        }
        onFilterChange={(f) => setFilters(f)}
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
            Cargando productos...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-6 text-center text-slate-500">
            No hay productos registrados
          </div>
        ) : (
          <ProductsTable
            products={filteredProducts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

      </div>

      {/* MODAL */}
      <ProductsForm
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