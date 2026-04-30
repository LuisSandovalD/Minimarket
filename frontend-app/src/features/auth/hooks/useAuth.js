import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { authService } from "../services/auth.service";

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, token, slug, role, setAuth, logout } = useAuthStore();

  // =========================
  // 🔐 LOGIN
  // =========================
  const login = async (credentials) => {
    try {
      const res = await authService.login(credentials);

      const { user: userData, token: userToken, slug: companySlug } = res.data;

      const fullName = userData?.name || "";
      const [firstName, ...rest] = fullName.split(" ");

      const normalizedUser = {
        ...userData,
        firstName,
        lastName: rest.join(" "),
      };

      setAuth({
        user: normalizedUser,
        token: userToken,
        slug: companySlug,
        role: userData?.role,
      });

      return { success: true };

    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // =========================
  // 🆕 REGISTER (🔥 ARREGLADO)
  // =========================
  const register = async (formData) => {
    try {
      const res = await authService.register(formData);

      const { user: userData, token: userToken, slug: companySlug } = res.data;

      const fullName = userData?.name || "";
      const [firstName, ...rest] = fullName.split(" ");

      const normalizedUser = {
        ...userData,
        firstName,
        lastName: rest.join(" "),
      };

      // 🔥 CLAVE: guardar sesión igual que login
      setAuth({
        user: normalizedUser,
        token: userToken,
        slug: companySlug,
        role: userData?.role,
      });

      return { success: true };

    } catch (err) {
      return {
        success: false,
        message: err.message,
        errors: err.errors,
      };
    }
  };

  // =========================
  // 🚪 LOGOUT
  // =========================
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return {
    user,
    token,
    slug,
    role,
    login,
    register,
    handleLogout,
  };
};