import { Button } from "../../../../components/ui/Button";
import { ArrowRight, CheckCircle } from "lucide-react";
import HeroStats from "./HeroStats";
import HeroBadge from "./HeroBadge";

export default function HeroContent() {
  return (
    <div className="max-w-xl">
      
      {/* Badge */}
      <HeroBadge />

      {/* Título */}
      <h2 className="
        mt-6 text-4xl md:text-5xl 
        font-semibold tracking-tight leading-tight
        text-gray-900 dark:text-white
      ">
        Gestiona tu negocio con{" "}
        <span className="text-gray-900 dark:text-white">
          claridad y control
        </span>
      </h2>

      {/* Descripción */}
      <p className="
        mt-5 text-lg leading-relaxed
        text-gray-600 dark:text-gray-400
      ">
        Administra inventario, ventas y sucursales desde una sola plataforma.
        Optimiza tus procesos y toma decisiones con datos en tiempo real.
      </p>

      {/* Beneficios */}
      <ul className="mt-7 space-y-3">
        {[
          "Control de inventario en tiempo real",
          "Reportes inteligentes",
          "Gestión de múltiples sucursales",
        ].map((item, i) => (
          <li
            key={i}
            className="
              flex items-center gap-3
              text-gray-700 dark:text-gray-300
            "
          >
            <span className="
              flex items-center justify-center
              w-5 h-5 rounded-full
              bg-green-100 dark:bg-green-900/40
            ">
              <CheckCircle
                size={14}
                className="text-green-600 dark:text-green-400"
              />
            </span>

            <span className="text-sm md:text-base">
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* Botones */}
      <div className="mt-10 flex flex-wrap gap-4">
        <Button variant="primary" icon={ArrowRight}>
          Comenzar ahora
        </Button>

        <Button variant="ghost">
          Ver demo
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-12">
        <HeroStats />
      </div>
    </div>
  );
}