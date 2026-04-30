import { useMemo } from "react";
import { useAuthStore } from "../../auth/store/auth.store";
import { adminMenu } from "../config/adminMenu";

export function useSidebarMenu() {
  const slug = useAuthStore((s) => s.slug);
  const user = useAuthStore((s) => s.user);

  const role = user?.role?.toUpperCase().trim();
  const base = `/${slug}/${user?.role?.toLowerCase()}`;

  const menu = useMemo(() => {
  if (!base || !role) return [];

    const items = adminMenu(base);

    return items
      .filter((item) => !item.roles || item.roles.includes(role))
      .map((item) => {
        if (item.submenu) {
          const filteredSubmenu = item.submenu.filter(
            (sub) => !sub.roles || sub.roles.includes(role)
          );

          return {
            ...item,
            submenu: filteredSubmenu,
          };
        }

        return item;
      });
}, [base, role]);

  return menu;
}