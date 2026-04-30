import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/auth.store";
import { getDashboardRoute } from "../utils/roleRoutes";

export default function TenantRoute() {
  const { slug: urlSlug } = useParams();
  const user = useAuthStore((s) => s.user);
  const slug = useAuthStore((s) => s.slug);

  // ⏳ Esperar a que cargue el estado
  if (!user || !slug) {
    return <div>Cargando...</div>; // o spinner
  }

  // 🔐 Si el slug no coincide → redirigir al correcto según rol
  if (urlSlug !== slug) {
    return (
      <Navigate
        to={getDashboardRoute({
          slug,
          role: user.role,
        })}
        replace
      />
    );
  }

  return <Outlet />;
}