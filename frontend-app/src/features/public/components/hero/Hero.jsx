import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroFeatures from "./HeroFeatures";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      
      {/* Fondo */}
      <div className="absolute inset-0 -z-10 bg-white dark:bg-slate-900" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        
        {/* BLOQUE PRINCIPAL */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Texto */}
          <div className="max-w-xl">
            <HeroContent />
          </div>

          {/* Imagen */}
          <div className="flex justify-center lg:justify-end">
            <HeroImage />
          </div>

        </div>

        {/* SEPARADOR */}
        <div className="mt-20 lg:mt-24">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700" />
        </div>

        {/* FEATURES */}
        <div className="mt-14 lg:mt-20">
          <HeroFeatures />
        </div>

      </div>
    </section>
  );
}