import { useState } from "react";
import SidebarItem from "./SidebarItem";
import { useSidebarMenu } from "../../hooks/useSidebarMenu";

export default function SidebarMenu() {
  const [expandedMenus, setExpandedMenus] = useState({});
  const menu = useSidebarMenu(); // 🔥 AQUÍ lo usas

  const toggleMenu = (menuName) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <nav className="flex-1 p-3 overflow-y-auto">
      <div className="flex flex-col gap-2">
        {menu.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            expanded={expandedMenus[item.id]}
            onToggle={() => toggleMenu(item.id)}
          />
        ))}
      </div>
    </nav>
  );
}