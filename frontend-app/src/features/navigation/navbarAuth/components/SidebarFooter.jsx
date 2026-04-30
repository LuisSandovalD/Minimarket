import { Avatar } from "../../../../components/ui/Avatar";
import { useAuthStore } from "../../../auth/store/auth.store";
import { Button } from "../../../../components/ui/Button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SidebarFooter() {
  const { user } = useAuthStore();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="p-4">
      
      {/* Usuario */}
      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-300 dark:hover:border-slate-700">
        <Avatar name={user?.name} size="md" />

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
            {user?.name || "Usuario"}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {user?.email || "Sin correo"}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-3 h-px bg-slate-200 dark:bg-slate-800" />

      {/* Logout */}
      <Button
        onClick={handleLogout}
        variant="danger"
        size="md"
        full
        leftIcon={LogOut}
      >
        Cerrar sesión
      </Button>
    </div>
  );
}