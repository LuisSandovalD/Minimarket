import { Button } from "../../../components/ui/Button";
import {
  Edit2,
  Trash2,
  MapPin,
  Phone,
  Building2,
  CheckCircle,
  XCircle,
} from "lucide-react";

export const ProductsTable = ({
  products = [],
  loading = false,
  onEdit,
  onDelete,
}) => {
  if (!products || products.length === 0) {
    return null;
  }

  const getStatusColor = (isActive) => {
    return isActive
      ? {
          bg: "dark:bg-green-900/30 bg-green-50",
          text: "dark:text-green-300 text-green-700",
          icon: "dark:text-green-400 text-green-600",
        }
      : {
          bg: "dark:bg-red-900/30 bg-red-50",
          text: "dark:text-red-300 text-red-700",
          icon: "dark:text-red-400 text-red-600",
        };
  };

  return (
    <div className="w-full">
      {/* Tabla */}
      <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700/50 border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            
            {/* HEADER */}
            <thead>
              <tr className="dark:bg-slate-900/50 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                
                <th className="px-6 py-4 text-left">
                  <span className="flex items-center gap-2 font-semibold dark:text-slate-300 text-slate-700">
                    <Building2 size={16} className="text-slate-500" />
                    Producto
                  </span>
                </th>

                <th className="px-6 py-4 text-left">
                  <span className="flex items-center gap-2 font-semibold dark:text-slate-300 text-slate-700">
                    <MapPin size={16} className="text-slate-500" />
                    Precio
                  </span>
                </th>

                <th className="px-6 py-4 text-left">
                  <span className="flex items-center gap-2 font-semibold dark:text-slate-300 text-slate-700">
                    <Phone size={16} className="text-slate-500" />
                    Descripción
                  </span>
                </th>
                 <th className="px-6 py-4 text-left">
                  <span className="font-semibold dark:text-slate-300 text-slate-700">Fecha de creación</span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="font-semibold dark:text-slate-300 text-slate-700">Actualizado</span>
                </th>
                <th className="px-6 py-4 text-center">
                  <span className="font-semibold dark:text-slate-300 text-slate-700">
                    Estado
                  </span>
                </th>

                <th className="px-6 py-4 text-right">
                  <span className="font-semibold dark:text-slate-300 text-slate-700">
                    Acciones
                  </span>
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y dark:divide-slate-700/50 divide-slate-200">
              {products.map((p, index) => {
                const statusColor = getStatusColor(p.isActive);

                return (
                  <tr
                    key={p.id}
                    className="dark:hover:bg-slate-700/50 hover:bg-slate-50 transition-colors duration-150 group"
                    style={{
                      animation: `slideIn 0.3s ease-out ${index * 30}ms both`,
                    }}
                  >
                    
                    {/* Nombre */}
                    <td className="px-6 py-4">
                      <div className="font-medium dark:text-white text-slate-900">
                        {p.name}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        ID: {p.id}
                      </p>
                    </td>

                    {/* Precio */}
                    <td className="px-6 py-4">
                      <span className="dark:text-slate-300 text-slate-600">
                        {p.price ? `S/ ${p.price}` : <span className="text-slate-400 italic">Sin precio</span>}
                      </span>
                    </td>

                    {/* Descripción */}
                    <td className="px-6 py-4">
                      {p.description ? (
                        <span className="dark:text-slate-300 text-slate-600">
                          {p.description}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">
                          Sin descripción
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="dark:text-slate-300 text-slate-600">
                        {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "Fecha desconocida"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="dark:text-slate-300 text-slate-600">
                        {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : "Fecha desconocida"}
                      </span>
                    </td>

                    {/* Estado */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <div
                          className={`
                            flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold
                            border transition-all duration-200
                            ${statusColor.bg} ${statusColor.text}
                            group-hover:shadow-sm
                          `}
                        >
                          {p.isActive ? (
                            <>
                              <CheckCircle size={14} className={statusColor.icon} />
                              Activo
                            </>
                          ) : (
                            <>
                              <XCircle size={14} className={statusColor.icon} />
                              Inactivo
                            </>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Acciones */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          onClick={() => onEdit(p)}
                          disabled={loading}
                          variant="warning"
                          title="Editar producto"
                        >
                          <Edit2 size={16} />
                        </Button>

                        <Button
                          onClick={() => onDelete(p.id)}
                          disabled={loading}
                          variant="danger"
                          title="Eliminar producto"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>

                  </tr>
                );
              })}
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