import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";

import PrivateRoute from "./routes/PrivateRoute";
import TenantRoute from "./routes/TenantRoute";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";

// PUBLIC
import HomePage from "./features/public/pages/HomePage";
import ServicesPage from "./features/public/pages/ServicesPage";
import AboutPage from "./features/public/pages/AboutPage";
import ContactPage from "./features/public/pages/ContactPage";

// SHARED
import DashboardPage from "./features/dashboard/pages/DashboardPage";

// ADMIN / MANAGER
import UsersPage from "./features/users/pages/UsersPage";
import BranchesPage from "./features/branch/pages/BranchesPage";
import CategoryPage from "./features/category/pages/CategoryPage";
import InventoryPage from "./features/inventory/pages/InventoryPage";

// TODOS
import ProductPage from "./features/product/pages/ProductPage";
import CompaniesPage from "./features/companies/pages/CompaniesPage";

export default function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* ================= PRIVATE ROOT ================= */}
      <Route path="/:slug/:role" element={<PrivateRoute />}>
        <Route element={<TenantRoute />}>

          {/* ================= ADMIN + MANAGER ================= */}
          <Route
            element={
              <RoleProtectedRoute allowedRoles={["ADMIN", "MANAGER"]} />
            }
          >
            <Route element={<AdminLayout />}>
              
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="settings/system" element={<CompaniesPage />} />

              {/* USERS */}
              <Route path="users" element={<UsersPage />} />
              <Route path="inventory" element={<InventoryPage />} />

              {/* BRANCHES */}
              <Route
                element={<RoleProtectedRoute allowedRoles={["ADMIN", "MANAGER"]} />}
              >
                <Route path="branches" element={<BranchesPage />} />
              </Route>

              {/* PRODUCTS (admin + manager) */}
              <Route path="products" element={<ProductPage />} />
              <Route path="categories" element={<CategoryPage />} />

            </Route>
          </Route>

          {/* ================= EMPLOYEE ================= */}
          <Route
            element={
              <RoleProtectedRoute allowedRoles={["EMPLOYEE"]} />
            }
          >
            <Route element={<EmployeeLayout />}>
              
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />

              {/* PRODUCTS */}
              <Route path="products" element={<ProductPage />} />

            </Route>
          </Route>

        </Route>
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}