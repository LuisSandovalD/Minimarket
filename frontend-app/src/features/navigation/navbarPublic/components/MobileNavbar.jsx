import { useState, useEffect } from "react";
import { Menu, X, LogOut} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { NavBrand } from "./NavBrand";
import { NavLinks } from "./NavLinks";
import { NavAuthButtons } from "./NavAuthButtons";

import { useAuthStore } from "../../../auth/store/auth.store";
import { Button } from "../../../../components/ui/Button";
import { Avatar } from "../../../../components/ui/Avatar";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const slug = user?.company?.slug;

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  const handleNavigateToDashboard = () => {
    navigate(`/${slug}/dashboard`);
    closeMenu();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      {/* TOP BAR */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 backdrop-blur-sm">
        <div className="flex items-center justify-between h-16 px-4">
          <NavBrand />

          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <Menu className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </nav>

      {/* SIDEBAR OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR */}
      {isOpen && (
        <div className="fixed top-0 left-0 h-full w-80 bg-white dark:bg-slate-900 z-50 shadow-2xl flex flex-col overflow-y-auto">

          {/* HEADER CON CLOSE */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900">
            <NavBrand />
            <button
              onClick={closeMenu}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex flex-col flex-1 p-4">

            {/* NAVIGATION LINKS */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2 mb-2">
                Menú Principal
              </p>
              <NavLinks isMobile={true} onLinkClick={closeMenu} />
            </div>

          </div>

          {/* FOOTER SECTION */}
          <div className="border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">

            {/* AUTH SECTION */}
            {!user ? (
              <div className="p-4">
                <NavAuthButtons isMobile={true} />
              </div>
            ) : (
              <>
                {/* USER INFO CARD */}
                <div className="p-4 border-b border-gray-200 dark:border-slate-800">
                  <Button
                    onClick={handleNavigateToDashboard}
                    variant="outline"
                    size="lg"
                    full
                  >
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} size="md" />
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {user.name || "Usuario"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user.email || "Sin email"}
                        </p>
                      </div>
                    </div>
                  </Button>
                </div>

                {/* LOGOUT BUTTON */}
                <div className="p-4">
                  <Button
                    onClick={handleLogout}
                    variant="danger"
                    size="sm"
                    leftIcon={LogOut}
                  >
                    Cerrar sesión
                  </Button>
                </div>
              </>
            )}

          </div>

        </div>
      )}
    </>
  );
};

export default MobileNavbar;