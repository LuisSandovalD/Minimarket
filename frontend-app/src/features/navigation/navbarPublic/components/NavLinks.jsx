import { NavLink } from "react-router-dom";

export const NavLinks = ({ isMobile = false, onLinkClick = () => {} }) => {
  const links = [
    { to: "/", label: "Inicio" },
    { to: "/about", label: "Nosotros" },
    { to: "/services", label: "Servicios" },
    { to: "/contact", label: "Contacto" },
  ];

  if (isMobile) {
    return (
      <div className="space-y-2">
        {links.map(({ to, label }, i) => (
          <NavLink
            key={to}
            to={to}
            onClick={onLinkClick}
            style={{ animationDelay: `${i * 60}ms` }}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-xl text-sm font-medium
              transition-all duration-200 transform
              active:scale-95
              animate-fade-in-up
              ${
                isActive
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-2">
      {links.map(({ to, label }) => (
        <NavLink key={to} to={to}>
          {({ isActive }) => (
            <div
              className={`
                relative px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-300
                cursor-pointer
                group
                ${
                  isActive
                    ? "text-slate-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                }
              `}
            >
              <span className="relative z-10">{label}</span>

              <span
                className="
                absolute inset-0 rounded-lg
                bg-gray-100 dark:bg-slate-800
                opacity-0 scale-90
                group-hover:opacity-100 group-hover:scale-100
                transition-all duration-300
              "
              />

              <span
                className={`
                absolute left-3 right-3 -bottom-1 h-[2px] rounded-full
                bg-slate-900 dark:bg-white
                transition-all duration-300 origin-left
                ${
                  isActive
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }
              `}
              />

              <span
                className="
                absolute inset-0 rounded-lg
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
                shadow-[0_0_15px_rgba(0,0,0,0.05)]
                dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]
              "
              />
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
};