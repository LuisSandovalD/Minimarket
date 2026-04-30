// Componente encargado del encabezado principal del dashboard.
// Muestra el título y una breve descripción general del sistema.
// También se implementó una estructura responsive para adaptar
// correctamente el contenido en diferentes tamaños de pantalla.

export default function DashboardHeader() {
  return (

    // Contenedor flexible y responsive del encabezado
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 transition-all duration-300">
      
      <div>

        {/* Título principal del panel administrativo */}
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        {/* Descripción general del dashboard */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Vista general del sistema
        </p>

      </div>
    </div>
  );
}