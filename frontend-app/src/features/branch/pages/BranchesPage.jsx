import { useState } from "react";
import { useBranches } from "../hooks/useBranches";
import { useBranchActions } from "../hooks/useBranchActions";
import { useBranchFilters } from "../hooks/useBranchFilters";

import { BranchTable } from "../components/BranchTable";
import { BranchForm } from "../components/BranchForm";
import { BranchesHeader } from "../components/BranchesHeader";
import { BranchSearchFilters } from "../components/BranchSearchFilters";

export default function BranchesPage() {
  const {
    branches,
    loading,
    error,
    createBranch,
    updateBranch,
    deleteBranch,
    refetch,
  } = useBranches();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // 🔹 filtros
  const { setFilters, filteredBranches } = useBranchFilters(branches);

  // 🔹 acciones
  const {
    handleCreate,
    handleEdit,
    handleSubmit,
    handleDelete,
  } = useBranchActions({
    createBranch,
    updateBranch,
    deleteBranch,
    setOpen,
    setSelected,
  });

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <BranchesHeader onCreate={handleCreate} />

      {/* FILTROS */}
      <BranchSearchFilters
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
            Cargando sucursales...
          </div>
        ) : filteredBranches.length === 0 ? (
          <div className="p-6 text-center text-slate-500">
            No hay sucursales registradas
          </div>
        ) : (
          <BranchTable
            branches={filteredBranches}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

      </div>

      {/* MODAL */}
      <BranchForm
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