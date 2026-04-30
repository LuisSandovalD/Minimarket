import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ThemeSwitcher } from "./ThemeSwitcher";
import { NavBrand } from "./NavBrand";
import { NavLinks } from "./NavLinks";
import { NavAuthButtons } from "./NavAuthButtons";

import LoginModal from "../../../auth/modals/LoginModal";
import RegisterModal from "../../../auth/modals/RegisterModal";

import { Button } from "../../../../components/ui/Button";
import { Avatar } from "../../../../components/ui/Avatar";
import { LogOut } from "lucide-react";

import { useAuthStore } from "../../../auth/store/auth.store";

const DesktopNavbar = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginData, setLoginData] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const slug = user?.company?.slug; // 🔥 CLAVE

  const role = user?.role || "user"; // 🔥 ROL DEL USUARIO

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
        <div className="px-6">
          <div className="flex items-center justify-between h-16">

            <NavBrand />

            <div className="flex-1 flex justify-center">
              <NavLinks isMobile={false} />
            </div>

            <div className="flex items-center gap-2">

              {!user ? (
                <NavAuthButtons
                  onLoginClick={() => {
                    setLoginData(null);
                    setShowLogin(true);
                  }}
                  onRegisterClick={() => setShowRegister(true)}
                />
              ) : (
                <>
                  {/* DASHBOARD */}
                  <Button
                    variant="ghost"
                    onClick={() => navigate(`/${slug}/${role.toLowerCase()}`)} // ✅ FIX
                    size="sm"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar name={user?.name} size="sm" />

                      <div className="flex flex-col items-start leading-tight">
                        <span className="text-[12px] font-semibold text-gray-800 dark:text-white">
                          {user?.name}
                        </span>

                        <span className="text-[10px] text-blue-600 dark:text-blue-400">
                          Ir al panel
                        </span>
                      </div>
                    </div>
                  </Button>

                  {/* LOGOUT */}
                  <Button
                    onClick={handleLogout}
                    variant="danger"
                    size="md"
                    leftIcon={LogOut}
                    rightIcon={null}
                  >
                    salir
                  </Button>
                </>
              )}

              <div className="h-5 w-px bg-gray-200 dark:bg-slate-700" />

              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* LOGIN */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          defaultValues={loginData}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {/* REGISTER */}
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          initialData={loginData}
          onSwitchToLogin={(data) => {
            setShowRegister(false);
            setLoginData(data);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
};

export default DesktopNavbar;