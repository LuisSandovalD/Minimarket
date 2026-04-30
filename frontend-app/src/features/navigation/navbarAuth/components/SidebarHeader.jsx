import { Avatar } from "../../../../components/ui/Avatar";
import { useAuthStore } from "../../../auth/store/auth.store";

export default function SidebarHeader() {
  const user = useAuthStore((s) => s.user);
  const slug = useAuthStore((s) => s.slug);

  const formatSlug = (slug) =>
    slug?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  // 🔥 Formateo de rol (bonito para UI)
  const formatRole = (role) => {
    const rolesMap = {
      ADMIN: "Administrador",
      MANAGER: "Gerente",
      EMPLOYEE: "Empleado",
    };

    return rolesMap[role?.toUpperCase()] || "Usuario";
  };

  // 📅 Fecha actual formateada
  const today = new Date().toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="p-5 border-b border-slate-200 dark:border-slate-800">
      
      <div className="flex items-center gap-4">
        
        {/* Avatar */}
        <Avatar name={user?.name} size="lg" />

        {/* Info */}
        <div className="flex flex-col min-w-0">

          {/* Empresa */}
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
            {formatSlug(slug) || "Mi Empresa"}
          </h2>

          {/* Rol + Fecha */}
          <div className="flex items-center gap-2 mt-1">

            {/* Rol dinámico */}
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {formatRole(user?.role)}
            </span>

            {/* Separador */}
            <span className="text-xs text-slate-300 dark:text-slate-600">•</span>

            {/* Fecha */}
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {today}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}