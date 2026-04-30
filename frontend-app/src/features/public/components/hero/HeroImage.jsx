import branchImg from "../../../../assets/branch.jpg";

export default function HeroImage() {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      
      {/* Glow decorativo (fondo) */}
      <div className="
        absolute -inset-6 -z-10
        bg-gradient-to-tr from-blue-500/20 via-indigo-500/10 to-transparent
        blur-2xl
        rounded-full
      " />

      {/* Contenedor principal */}
      <div className="
        relative rounded-3xl overflow-hidden
        border border-gray-200/60 dark:border-gray-800/60
        shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]
        bg-white/40 dark:bg-gray-900/40 backdrop-blur
      ">
        
        {/* Imagen */}
        <div className="aspect-[9/10] overflow-hidden">
          <img
            src={branchImg}
            alt="Vista del sistema de gestión"
            className="
              w-full h-full object-cover
              transition-transform duration-700 ease-out
              hover:scale-105
            "
          />
        </div>

        {/* Overlay degradado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent pointer-events-none" />

        {/* Badge flotante */}
        <div className="
          absolute bottom-4 left-4
          px-4 py-2 rounded-xl
          bg-white/80 dark:bg-gray-900/80
          backdrop-blur
          border border-gray-200 dark:border-gray-700
          text-xs font-medium text-gray-700 dark:text-gray-300
          shadow-lg
        ">
          Panel en tiempo real
        </div>

      </div>
    </div>
  );
}