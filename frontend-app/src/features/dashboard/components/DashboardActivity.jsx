export default function DashboardActivity() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
      
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        Actividad reciente
      </h3>

      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-10 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"
          />
        ))}
      </div>

    </div>
  );
}