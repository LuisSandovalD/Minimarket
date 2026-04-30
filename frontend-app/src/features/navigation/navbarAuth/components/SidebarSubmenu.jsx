import { useNavigate, useLocation } from "react-router-dom";

export default function SidebarSubmenu({ items }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="ml-4 mt-2 flex flex-col gap-1">
      {items.map((item) => {
        const isActive =
          item.path && location.pathname.startsWith(item.path);

        return (
          <div
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`
              group relative flex items-center gap-2 px-3 py-2 rounded-lg
              text-sm font-medium cursor-pointer transition-all duration-200
              
              ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 dark:bg-slate-800 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }
            `}
          >
            {/* 🔹 Barra lateral activa */}
            <span
              className={`
                absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-r
                transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-600 opacity-100"
                    : "opacity-0 group-hover:opacity-50 bg-slate-400"
                }
              `}
            />

            {/* 🔹 Icono opcional */}
            {item.icon && (
              <span className="text-base opacity-80 group-hover:opacity-100">
                {item.icon}
              </span>
            )}

            {/* 🔹 Texto */}
            <span className="truncate">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}