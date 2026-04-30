export default function HeroStats() {
  const stats = [
    { value: "+500", label: "Negocios activos" },
    { value: "+10k", label: "Transacciones/día" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <div className="mt-12">
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="
              relative p-4 rounded-xl
              bg-gray-50 dark:bg-gray-900/50
              border border-gray-100 dark:border-gray-800
              text-center
              transition hover:scale-[1.03]
            "
          >
            {/* Número */}
            <p className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>

            {/* Label */}
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {stat.label}
            </p>

            {/* Línea decorativa */}
            <div className="mt-3 h-1 w-8 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
          </div>
        ))}
      </div>

    </div>
  );
}