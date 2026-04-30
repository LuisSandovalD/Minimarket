import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/auth.store";
import { getDashboardRoute } from "../utils/roleRoutes";

export default function RoleProtectedRoute({ allowedRoles }) {
  const user = useAuthStore((s) => s.user);
  const { slug } = useParams();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const userRole = String(user.role || "").toUpperCase();

  const isAllowed = allowedRoles.includes(userRole);

  if (!isAllowed) {
    return (
      <Navigate
        to={getDashboardRoute({ slug, role: userRole })}
        replace
      />
    );
  }

  return <Outlet />;
}