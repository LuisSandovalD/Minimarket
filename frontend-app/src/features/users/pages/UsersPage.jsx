import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { useUserActions } from "../hooks/useUserActions";
import { useUserFilters } from "../hooks/useUserFilters";

import { UserTable } from "../components/UserTable";
import { UserForm } from "../components/UserForm";
import { SearchFilters } from "../components/SearchFilters";
import { UsersHeader } from "../components/UsersHeader";
import { Button } from "../../../components/ui/Button";

export default function UsersPage() {
  const {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refetch,
  } = useUsers();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { setFilters, filteredUsers } = useUserFilters(users);

  const {
    handleCreate,
    handleEdit,
    handleSubmit,
    handleDelete,
  } = useUserActions({
    createUser,
    updateUser,
    deleteUser,
    setOpen,
    setSelected,
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">

      <div className="space-y-6">

        {/* HEADER */}
        <UsersHeader onCreate={handleCreate} />

        {/* FILTROS */}
        <div className="
          bg-white dark:bg-slate-800
          border border-slate-200 dark:border-slate-700
          rounded-2xl p-4 shadow-sm
        ">
          <SearchFilters
            onSearch={(q) =>
              setFilters((prev) => ({ ...prev, query: q }))
            }
            onFilterChange={(f) => setFilters(f)}
          />
        </div>

        {/* ERROR */}
        {error && (
          <div className="
            flex items-center justify-between
            p-4 rounded-xl
            bg-red-50 dark:bg-red-900/20
            border border-red-200 dark:border-red-800
            text-red-700 dark:text-red-300
          ">
            <span>{error}</span>
            <Button variant="ghost" onClick={refetch}>
              Reintentar
            </Button>
          </div>
        )}

        {/* CONTENIDO */}
        <div className="
          bg-white dark:bg-slate-800
          border border-slate-200 dark:border-slate-700
          rounded-2xl shadow-sm overflow-hidden
        ">

          {loading && users.length === 0 ? (
            <div className="p-10 text-center text-slate-500">
              Cargando usuarios...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-10 text-center text-slate-500">
              No se encontraron usuarios
            </div>
          ) : (
            <UserTable
              users={filteredUsers}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
            />
          )}

        </div>

      </div>

      {/* MODAL */}
      <UserForm
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