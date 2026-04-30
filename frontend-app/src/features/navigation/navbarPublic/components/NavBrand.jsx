export const NavBrand = () => {
  return (
    <div className="flex items-center gap-3 flex-shrink-0 group cursor-pointer">

      {/* 🔷 Logo */}
      <div className="
        flex items-center justify-center
        w-10 h-10 rounded-xl
        bg-gradient-to-br from-slate-900 to-slate-700 
        dark:from-white dark:to-slate-300
        shadow-md
        transition-all duration-300
        group-hover:scale-105
      ">
        <span className="text-sm font-bold text-white dark:text-slate-900 tracking-wide">
          N
        </span>
      </div>

      {/* 🔤 Texto */}
      <div className="hidden sm:flex flex-col leading-tight">
        <h1 className="
          text-lg font-semibold tracking-tight
          text-gray-900 dark:text-white
          transition-colors duration-300
        ">
          Nexora
        </h1>

        <p className="
          text-xs font-medium
          text-gray-500 dark:text-gray-400
          transition-colors duration-300
        ">
          Gestión moderna de negocios
        </p>
      </div>

    </div>
  );
};