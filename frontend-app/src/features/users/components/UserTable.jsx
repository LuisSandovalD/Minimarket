import { Button } from "../../../components/ui/Button";
import { Edit2, Trash2, User, Mail, Shield, CheckCircle, XCircle } from "lucide-react";
import { useBranches } from "../../branch/hooks/useBranches";
import { useAuthStore } from "../../auth/store/auth.store";

export const UserTable = ({ users, onEdit, onDelete, loading }) => {

  const { branches } = useBranches();
  const currentUser = useAuthStore((s) => s.user);

  const currentRole = currentUser?.role?.toUpperCase().trim();

  // 🔥 Jerarquía clara y escalable
  const ROLE_HIERARCHY = {
    ADMIN: ["MANAGER"],
    MANAGER: ["EMPLOYEE"],
  };

  const visibleRoles = ROLE_HIERARCHY[currentRole] || [];

  if (!users || users.length === 0) {
    return null;
  }

  const filteredUsers = users.filter(
    (u) => visibleRoles.includes(u.role?.toUpperCase().trim())
  );

  const getRoleColor = (role) => {
    const roleColors = {
      MANAGER: {
        bg: "dark:bg-blue-900/40 bg-blue-50",
        text: "dark:text-blue-300 text-blue-700",
        border: "dark:border-blue-800 border-blue-200",
      },
      EMPLOYEE: {
        bg: "dark:bg-emerald-900/40 bg-emerald-50",
        text: "dark:text-emerald-300 text-emerald-700",
        border: "dark:border-emerald-800 border-emerald-200",
      },
    };
    return roleColors[role] || roleColors.EMPLOYEE;
  };

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
            {/* Header */}
            <thead>
              <tr className="dark:bg-slate-900/50 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <th className="px-6 py-4 text-left">
                  <span className="flex items-center gap-2 font-semibold dark:text-slate-300 text-slate-700">
                    <User size={16} className="dark:text-slate-400 text-slate-500" />
                    Nombre
                  </span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="flex items-center gap-2 font-semibold dark:text-slate-300 text-slate-700">
                    <Mail size={16} className="dark:text-slate-400 text-slate-500" />
                    Email
                  </span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="flex items-center gap-2 font-semibold dark:text-slate-300 text-slate-700">
                    <Shield size={16} className="dark:text-slate-400 text-slate-500" />
                    Rol
                  </span>
                </th>

                <th className="px-6 py-4 text-left">
                  <span className="flex items-center gap-2 font-semibold dark:text-slate-300 text-slate-700">
                    <Shield size={16} className="dark:text-slate-400 text-slate-500" />
                    Sucursales
                  </span>
                </th>

                <th className="px-6 py-4 text-left">
                  <span className="font-semibold dark:text-slate-300 text-slate-700">Fecha de creación</span>
                </th>

                <th className="px-6 py-4 text-left">
                  <span className="font-semibold dark:text-slate-300 text-slate-700">Actualizado</span>
                </th>

                <th className="px-6 py-4 text-center">
                  <span className="font-semibold dark:text-slate-300 text-slate-700">Estado</span>
                </th>

                <th className="px-6 py-4 text-right">
                  <span className="font-semibold dark:text-slate-300 text-slate-700">Acciones</span>
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y dark:divide-slate-700/50 divide-slate-200">
              {filteredUsers.map((u, index) => {
                const roleColor = getRoleColor(u.role);
                const statusColor = getStatusColor(u.isActive);

                return (
                  <tr
                    key={u.id}
                    className="dark:hover:bg-slate-700/50 hover:bg-slate-50 transition-colors duration-150 group"
                    style={{
                      animation: `slideIn 0.3s ease-out ${index * 30}ms both`,
                    }}
                  >
                    {/* Nombre */}
                    <td className="px-6 py-4">
                      <div className="font-medium dark:text-white text-slate-900">
                        {u.name}
                      </div>
                      <p className="text-xs dark:text-slate-500 text-slate-500 mt-1">
                        ID: {u.id}
                      </p>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <span className="dark:text-slate-300 text-slate-600">
                        {u.email}
                      </span>
                    </td>

                    {/* Rol */}
                    <td className="px-6 py-4">
                      <span
                        className={`
                          inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold 
                          border transition-all duration-200
                          ${roleColor.bg} ${roleColor.text} ${roleColor.border}
                          group-hover:shadow-sm
                        `}
                      >
                        <div className={`w-2 h-2 rounded-full ${roleColor.text.replace("text-", "bg-")}`}></div>
                        {u.role}
                      </span>
                    </td>

                    {/* Sucursal */}
                    <td className="px-6 py-4">
                      <span className="dark:text-slate-300 text-slate-600">
                        {branches.find(b => b.id === u.branchId)?.name || "Sin asignar"}
                      </span>
                    </td>

                    {/* Fechas */}
                    <td className="px-6 py-4">
                      <span className="dark:text-slate-300 text-slate-600">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "Fecha desconocida"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="dark:text-slate-300 text-slate-600">
                        {u.updatedAt ? new Date(u.updatedAt).toLocaleDateString() : "Fecha desconocida"}
                      </span>
                    </td>

                    {/* Estado */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <div
                          className={`
                            flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold
                            border transition-all duration-200
                            ${statusColor.bg} ${statusColor.text}
                            group-hover:shadow-sm
                          `}
                        >
                          {u.isActive ? (
                            <>
                              <CheckCircle size={14} className={statusColor.icon} />
                              <span>Activo</span>
                            </>
                          ) : (
                            <>
                              <XCircle size={14} className={statusColor.icon} />
                              <span>Inactivo</span>
                            </>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Acciones */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          onClick={() => onEdit(u)}
                          disabled={loading}
                          variant="warning"
                          title="Editar usuario"
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          onClick={() => onDelete(u.id)}
                          disabled={loading}
                          variant="danger"
                          title="Eliminar usuario"
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