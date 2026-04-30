import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import DashboardChart from "../components/DashboardChart";
import DashboardActivity from "../components/DashboardActivity";

// Página principal del dashboard.
// Aquí se organizan y renderizan los componentes principales
// como estadísticas, gráficos y actividad reciente del sistema.

export default function DashboardPage() {
  return (
    // Se agregó una transición suave para mejorar la experiencia visual
    // al cargar o actualizar elementos del dashboard.
    <div className="space-y-6 transition-all duration-300">

      {/* Componente que muestra el encabezado principal del dashboard */}
      <DashboardHeader />

      {/* Componente que muestra tarjetas de estadísticas generales */}
      <DashboardStats />

      {/* 
        Contenedor responsivo:
        - En pantallas pequeñas muestra 1 columna
        - En pantallas grandes divide el contenido en 3 columnas
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Componente encargado de mostrar gráficos estadísticos */}
        <DashboardChart />

        {/* Componente que muestra la actividad reciente del sistema */}
        <DashboardActivity />
      </div>
    </div>
  );
}