import { BarChart3, Store, Boxes } from "lucide-react";

export default function HeroFeatures() {
  const features = [
    {
      icon: BarChart3,
      title: "Reportes inteligentes",
      desc: "Analiza tus ventas y toma decisiones basadas en datos reales",
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: Boxes,
      title: "Control de inventario",
      desc: "Mantén tu stock actualizado y evita pérdidas",
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      icon: Store,
      title: "Multi-sucursal",
      desc: "Gestiona todas tus tiendas desde un solo lugar",
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/30",
    },
  ];

  return (
    <div className="mt-24 flex justify-center">
      
      {/* CONTENEDOR CENTRADO */}
      <div className="w-full max-w-5xl">
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <div
                key={i}
                className="
                  p-6 rounded-2xl
                  border border-gray-200/60 dark:border-gray-800/60
                  bg-white/80 dark:bg-gray-900/80
                  shadow-sm

                  transition-all duration-300
                  hover:shadow-lg hover:-translate-y-1
                  text-center
                "
              >
                {/* Icono */}
                <div
                  className={`
                    w-12 h-12 mb-4 mx-auto
                    flex items-center justify-center
                    rounded-xl
                    ${f.bg}
                  `}
                >
                  <Icon className={`w-6 h-6 ${f.color}`} />
                </div>

                {/* Título */}
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {f.title}
                </h3>

                {/* Descripción */}
                <p className="text-sm mt-2 leading-relaxed text-gray-600 dark:text-gray-400">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}