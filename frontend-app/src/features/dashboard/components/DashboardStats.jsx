export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Métrica
          </p>

          <div className="mt-3 h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />

          <div className="mt-2 h-4 w-28 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}