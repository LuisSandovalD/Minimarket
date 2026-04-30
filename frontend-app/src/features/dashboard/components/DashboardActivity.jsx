// Componente encargado de mostrar la actividad reciente del sistema.
// Se utiliza un diseño tipo "skeleton loading" mientras la información
// real aún no ha sido cargada desde el backend o la base de datos.

export default function DashboardActivity() {
  return (
    // Contenedor principal de la tarjeta de actividad reciente
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-all duration-300">
      
      {/* Título principal de la sección */}
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        Actividad reciente
      </h3>

      {/* 
        Se generan 3 bloques simulando registros de actividad.
        Esto mejora la experiencia visual mientras se cargan datos reales.
      */}
      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}

            // Skeleton animado con efecto pulse para representar carga dinámica
            className="h-10 bg-gray-100 dark:bg-gray-800 rounded animate-pulse hover:scale-[1.01] transition-transform duration-300"
          />
        ))}
      </div>

    </div>
  );
}