export const ROLE_ROUTES = {
  ADMIN: (slug) => `/${slug}/admin/dashboard`,
  MANAGER: (slug) => `/${slug}/manager/dashboard`,
  EMPLOYEE: (slug) => `/${slug}/employee/dashboard`,
};

export const getDashboardRoute = ({ slug, role }) => {
  const normalizedRole = String(role || "")
    .toUpperCase()
    .trim(); // 🔥 ESTA LÍNEA ES CLAVE

  const resolver = ROLE_ROUTES[normalizedRole];

  if (!resolver) {
    console.log("ROLE NO MATCH:", normalizedRole); // DEBUG
    return ROLE_ROUTES.EMPLOYEE(slug);
  }

  return resolver(slug);
};