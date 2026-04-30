import { ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarSubmenu from "./SidebarSubmenu";
import { Button } from "../../../../components/ui/Button";

export default function SidebarItem({ item, expanded, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();

  const hasSubmenu = !!item.submenu;
  const Icon = item.icon;

  // 🔥 active inteligente (soporta subrutas)
  const isActive =
    item.path && location.pathname.startsWith(item.path);

  const handleClick = () => {
    if (item.path) {
      navigate(item.path); // ✅ navega siempre
    }

    if (hasSubmenu) {
      onToggle(); // ✅ también expande
    }
  };

  return (
    <div className="flex flex-col">
      <Button
        onClick={handleClick}
        variant="ghost"
        full
        size="md"
        leftIcon={Icon}
        rightIcon={hasSubmenu ? ChevronRight : null}
        className={`justify-between ${
          isActive
            ? "bg-indigo-50 text-indigo-600 dark:bg-slate-800"
            : ""
        }`}
      >
        <span className="truncate">{item.label}</span>
      </Button>

      {hasSubmenu && expanded && (
        <SidebarSubmenu items={item.submenu} />
      )}
    </div>
  );
}