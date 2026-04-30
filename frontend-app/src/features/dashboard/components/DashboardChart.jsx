// Componente encargado de mostrar la sección de analítica del dashboard.
// Aquí se visualizarán gráficos estadísticos relacionados al sistema,
// como ventas, ingresos, productos o movimientos registrados.

export default function DashboardChart() {
  return (

    // Contenedor principal del panel de analítica
    <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-all duration-300">
      
      {/* Encabezado superior del panel */}
      <div className="flex items-center justify-between mb-4">

        {/* Título principal de la sección */}
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Analítica
        </h3>
      </div>

      {/* 
        Área reservada para futuros gráficos estadísticos.
        Actualmente funciona como placeholder visual mientras
        se implementa la integración con librerías de gráficas.
      */}
      <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:shadow-md transition-shadow duration-300">

        {/* Mensaje temporal mostrado al usuario */}
        <span className="text-sm text-gray-400">
          Gráfico próximamente
        </span>
      </div>

    </div>
  );
}