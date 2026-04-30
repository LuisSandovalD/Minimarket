import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/auth.store";

export default function PrivateRoute() {
  const { user, token, loading } = useAuthStore();
  const location = useLocation();
  const { role, slug } = useParams();

  // ⏳ Esperar carga inicial (importante en refresh)
  if (loading) {
    return <div>Cargando...</div>; // o spinner
  }

  // 🚫 No autenticado
  if (!user || !token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // 🔐 Validar rol en URL
  if (role) {
    const userRole = user.role?.toLowerCase();

    if (role !== userRole) {
      return (
        <Navigate
          to={`/${slug}/${userRole}/dashboard`}
          replace
        />
      );
    }
  }

  return <Outlet />;
}