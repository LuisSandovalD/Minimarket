import {
  LayoutDashboard,
  Users,
  Building2,
  BarChart3,
  Settings,
  ClipboardList,
  ShoppingCart,
  Package,
  Boxes,
  Truck,            // Compras / proveedores
  CreditCard,       // Pagos
  Bell,             // Notificaciones
  Ticket,           // Soporte
} from "lucide-react";

export const adminMenu = (base) => [
  // =========================
  // 📊 DASHBOARD
  // =========================
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: `${base}/dashboard`,
    roles: ["ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE", "VIEWER"],
  },

  // =========================
  // 👤 USUARIOS
  // =========================
  {
    id: "usuarios",
    label: "Usuarios",
    icon: Users,
    path: `${base}/users`,
    roles: ["ADMIN", "MANAGER"],
  },

  // =========================
  // 🏢 EMPRESA / SUCURSALES
  // =========================
  {
    id: "empresa",
    label: "Empresa",
    icon: Building2,
    roles: ["ADMIN"],
    submenu: [
      {
        label: "Sucursales",
        path: `${base}/branches`,
        roles: ["ADMIN"],
      },
      {
        label: "Datos de Empresa",
        path: `${base}/settings/system`,
        roles: ["ADMIN"],
      },
    ],
  },

  // =========================
  // 📦 CATÁLOGO
  // =========================
  {
    id: "catalogo",
    label: "Catálogo",
    icon: Package,
    roles: ["ADMIN", "MANAGER", "SUPERVISOR"],
    submenu: [
      {
        label: "Productos",
        path: `${base}/products`,
        roles: ["ADMIN", "MANAGER", "SUPERVISOR"],
      },
      {
        label: "Categorías",
        path: `${base}/categories`,
        roles: ["ADMIN"],
      },
      {
        label: "Unidades de Medida",
        path: `${base}/units`,
        roles: ["ADMIN"],
      },
    ],
  },

  // =========================
  // 📦 INVENTARIO
  // =========================
  {
    id: "inventario",
    label: "Inventario",
    icon: Boxes,
    roles: ["ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE"],
    submenu: [
      {
        label: "Stock por sucursal",
        path: `${base}/inventory`,
        roles: ["ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE"],
      },
      {
        label: "Movimientos",
        path: `${base}/inventory/history`,
        roles: ["ADMIN", "MANAGER", "SUPERVISOR"],
      },
      {
        label: "Ajustes de inventario",
        path: `${base}/inventory/adjustments`,
        roles: ["ADMIN", "MANAGER"],
      },
    ],
  },

  // =========================
  // 💰 VENTAS
  // =========================
  {
    id: "ventas",
    label: "Ventas",
    icon: ShoppingCart,
    roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
    submenu: [
      {
        label: "Nueva venta",
        path: `${base}/sales/create`,
        roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
      },
      {
        label: "Historial",
        path: `${base}/sales`,
        roles: ["ADMIN", "MANAGER"],
      },
      {
        label: "Devoluciones",
        path: `${base}/sales/returns`,
        roles: ["ADMIN", "MANAGER"],
      },
    ],
  },

  // =========================
  // 🛒 COMPRAS
  // =========================
  {
    id: "compras",
    label: "Compras",
    icon: Truck,
    roles: ["ADMIN", "MANAGER", "SUPERVISOR"],
    submenu: [
      {
        label: "Nueva compra",
        path: `${base}/purchases/create`,
        roles: ["ADMIN", "MANAGER"],
      },
      {
        label: "Historial",
        path: `${base}/purchases`,
        roles: ["ADMIN", "MANAGER", "SUPERVISOR"],
      },
    ],
  },

  // =========================
  // 💳 PAGOS
  // =========================
  {
    id: "pagos",
    label: "Pagos",
    icon: CreditCard,
    roles: ["ADMIN", "MANAGER"],
    submenu: [
      {
        label: "Registro de pagos",
        path: `${base}/payments`,
        roles: ["ADMIN", "MANAGER"],
      },
      {
        label: "Métodos de pago",
        path: `${base}/payment-methods`,
        roles: ["ADMIN"],
      },
    ],
  },

  // =========================
  // 🔔 NOTIFICACIONES
  // =========================
  {
    id: "notificaciones",
    label: "Notificaciones",
    icon: Bell,
    path: `${base}/notifications`,
    roles: ["ADMIN", "MANAGER", "SUPERVISOR"],
  },

  // =========================
  // 🛠️ SOPORTE
  // =========================
  {
    id: "soporte",
    label: "Soporte",
    icon: Ticket,
    roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
    submenu: [
      {
        label: "Tickets",
        path: `${base}/tickets`,
        roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
      },
    ],
  },

  // =========================
  // 📊 REPORTES
  // =========================
  {
    id: "reportes",
    label: "Reportes",
    icon: BarChart3,
    path: `${base}/reports`,
    roles: ["ADMIN", "MANAGER"],
  },

  // =========================
  // 🔍 AUDITORÍA
  // =========================
  {
    id: "auditoria",
    label: "Auditoría",
    icon: ClipboardList,
    path: `${base}/audit`,
    roles: ["ADMIN"],
  },

  // =========================
  // ⚙️ CONFIGURACIÓN
  // =========================
  {
    id: "configuracion",
    label: "Configuración",
    icon: Settings,
    roles: ["ADMIN"],
    submenu: [
      {
        label: "Seguridad",
        path: `${base}/settings/security`,
        roles: ["ADMIN"],
      },
      {
        label: "Preferencias",
        path: `${base}/settings/preferences`,
        roles: ["ADMIN"],
      },
    ],
  },
];