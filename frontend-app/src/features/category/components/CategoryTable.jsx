import { Button } from "../../../components/ui/Button";
import { Edit2, Trash2, Tag, Package } from "lucide-react";

export const CategoryTable = ({
  categories = [],
  loading = false,
  onEdit,
  onDelete,
}) => {
  // 🔥 protección real
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="w-full">

      <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700/50 border-slate-200 overflow-hidden shadow-sm">

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            {/* HEADER */}
            <thead>
              <tr className="dark:bg-slate-900/50 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                
                <th className="px-6 py-4 text-left">
                  <span className="flex items-center gap-2 font-semibold dark:text-slate-300 text-slate-700">
                    <Tag size={16} className="text-slate-500" />
                    Categoría
                  </span>
                </th>

                <th className="px-6 py-4 text-left">
                  <span className="font-semibold dark:text-slate-300 text-slate-700">
                    Slug
                  </span>
                </th>

                <th className="px-6 py-4 text-center">
                  <span className="flex items-center justify-center gap-2 font-semibold dark:text-slate-300 text-slate-700">
                    <Package size={16} className="text-slate-500" />
                    Productos
                  </span>
                </th>

                <th className="px-6 py-4 text-right">
                  Acciones
                </th>

              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y dark:divide-slate-700/50 divide-slate-200">

              {/* 🔥 LOADING */}
              {loading && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-slate-500">
                    Cargando categorías...
                  </td>
                </tr>
              )}

              {/* 🔥 EMPTY */}
              {!loading && safeCategories.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-slate-500">
                    No hay categorías registradas
                  </td>
                </tr>
              )}

              {/* DATA */}
              {!loading &&
                safeCategories.map((c, index) => (
                  <tr
                    key={c.id}
                    className="dark:hover:bg-slate-700/50 hover:bg-slate-50 transition"
                    style={{
                      animation: `slideIn 0.3s ease-out ${index * 30}ms both`,
                    }}
                  >
                    
                    {/* Nombre */}
                    <td className="px-6 py-4">
                      <div className="font-medium dark:text-white text-slate-900">
                        {c.name}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        ID: {c.id}
                      </p>
                    </td>

                    {/* Slug */}
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {c.slug}
                    </td>

                    {/* Productos */}
                    <td className="px-6 py-4 text-center">
                      <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        {c._count?.products ?? 0}
                      </span>
                    </td>

                    {/* Acciones */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">

                        <Button
                          onClick={() => onEdit(c)}
                          disabled={loading}
                          variant="warning"
                        >
                          <Edit2 size={16} />
                        </Button>

                        <Button
                          onClick={() => onDelete(c.id)}
                          disabled={loading || (c._count?.products ?? 0) > 0}
                          variant="danger"
                          title={
                            (c._count?.products ?? 0) > 0
                              ? "No puedes eliminar una categoría con productos"
                              : "Eliminar categoría"
                          }
                        >
                          <Trash2 size={16} />
                        </Button>

                      </div>
                    </td>

                  </tr>
                ))}

            </tbody>
          </table>
        </div>
      </div>

      {/* Animación */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </div>
  );
};