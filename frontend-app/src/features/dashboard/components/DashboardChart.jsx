export default function DashboardChart() {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Analítica
        </h3>
      </div>

      <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <span className="text-sm text-gray-400">
          Gráfico próximamente
        </span>
      </div>

    </div>
  );
}