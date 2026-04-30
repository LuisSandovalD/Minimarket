// Componente encargado de mostrar las métricas principales del dashboard.
// Se implementa una estructura responsive para adaptar las tarjetas
// estadísticas en distintos tamaños de pantalla.
// Actualmente utiliza skeleton loading para representar datos temporales
// mientras se obtienen datos reales desde el backend.

export default function DashboardStats() {
  return (

    // Contenedor principal de las tarjetas estadísticas
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 
        Se generan automáticamente 4 tarjetas de métricas.
        El método map permite reutilizar la misma estructura
        sin repetir código manualmente.
      */}
      {[1, 2, 3, 4].map((item) => (
        
        <div
          key={item}

          // Tarjeta individual con soporte para modo claro y oscuro
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-md transition-all duration-300"
        >

          {/* Texto descriptivo de la métrica */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Métrica
          </p>

          {/* 
            Placeholder principal de la estadística.
            animate-pulse genera un efecto de carga visual dinámica.
          */}
          <div className="mt-3 h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />

          {/* Placeholder secundario de información complementaria */}
          <div className="mt-2 h-4 w-28 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}