export const Card = ({
  title,
  value,
  description,
  icon,
  badge,
  color = "blue",
  onClick,
}) => {
  const colors = {
    blue: "from-blue-500 to-blue-400 text-blue-600 dark:text-blue-300",
    emerald: "from-emerald-500 to-emerald-400 text-emerald-600 dark:text-emerald-300",
    purple: "from-purple-500 to-purple-400 text-purple-600 dark:text-purple-300",
    amber: "from-amber-500 to-amber-400 text-amber-600 dark:text-amber-300",
    red: "from-red-500 to-red-400 text-red-600 dark:text-red-300",
    cyan: "from-cyan-500 to-cyan-400 text-cyan-600 dark:text-cyan-300",
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl p-5 border
        dark:border-slate-800 border-slate-200
        dark:bg-slate-900 bg-white
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
        ${onClick ? "cursor-pointer" : ""}
      `}
    >
      {/* Glow decorativo */}
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${colors[color]} opacity-10`}
      />

      <div className="relative z-10 flex items-start justify-between">
        {/* Icono */}
        <div
          className={`
            p-3 rounded-xl bg-gradient-to-br ${colors[color]}
            text-white shadow-md
          `}
        >
          {icon}
        </div>

        {/* Badge */}
        {badge && (
          <span
            className="
              text-xs font-semibold px-2 py-1 rounded-full
              bg-slate-100 dark:bg-slate-800
              text-slate-700 dark:text-slate-300
            "
          >
            {badge}
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
          {title}
        </h3>

        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          {value}
        </p>

        {description && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};