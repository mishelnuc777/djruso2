import { motion } from 'motion/react';
import { djData } from '../data/djData';
import { ArrowRight } from 'lucide-react';

export default function Packages() {
  const getFormattedTitle = (name: string) => {
    if (name.toUpperCase().includes('PRODUCCIÓN')) {
      return (
        <>
          PRODUCCIÓN<br className="hidden sm:inline" /> PARA EVENTOS
        </>
      );
    }
    if (name.toUpperCase().includes('EXTRAS')) {
      return (
        <>
          EXTRAS Y<br className="hidden sm:inline" /> EFECTOS ESPECIALES
        </>
      );
    }
    return name;
  };

  // Encuadre editorial individual en proporción 4:5 / 5:4 que muestra el sujeto con aire y contexto completo
  const getImageObjectPosition = (index: number) => {
    switch (index) {
      case 0:
        // Servicio 1 (Show DJ): Bryan en cabina con aire superior, torso, manos y consola bien visibles
        return 'object-cover object-[center_15%]';
      case 1:
        // Servicio 2 (Producción para Eventos): Vista panorámica del montaje escénico, truss, iluminación y audio
        return 'object-cover object-[center_28%]';
      case 2:
        // Servicio 3 (Extras y Efectos Especiales): Fuente de chispas frías y humo escénico sin cortes abruptos
        return 'object-cover object-[center_36%]';
      default:
        return 'object-cover object-center';
    }
  };

  return (
    <section id="packages" className="scroll-mt-20 py-28 md:py-40 bg-black relative border-t border-zinc-900 overflow-hidden">
      
      {/* =========================================================================
          ATMÓSFERA EDITORIAL SUTIL (Humo y luces difusas de alta gama, nunca estridentes)
          ========================================================================= */}
      
      {/* Foco azul profundo superior derecho (breathe sutil y difuminado) */}
      <motion.div 
        animate={{ 
          scale: [1, 1.06, 1], 
          opacity: [0.45, 0.7, 0.45],
          y: [-12, 10, -12]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/6 right-0 w-[650px] h-[550px] bg-[radial-gradient(circle,rgba(37,99,235,0.08),rgba(99,102,241,0.03)_50%,transparent_75%)] rounded-full blur-[170px] pointer-events-none select-none z-0" 
      />

      {/* Foco violeta oscuro y rojo tenue en zona media izquierda */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1], 
          opacity: [0.35, 0.6, 0.35],
          x: [10, -12, 10]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/2 -left-20 w-[600px] h-[550px] bg-[radial-gradient(circle,rgba(147,51,234,0.06),rgba(220,38,38,0.04)_45%,transparent_75%)] rounded-full blur-[180px] pointer-events-none select-none z-0" 
      />

      {/* Bruma baja ambiental central sutil */}
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[950px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_70%)] blur-[140px] pointer-events-none select-none z-0" />

      {/* Velo orgánico continuo de transición suave */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.04),transparent_60%)] pointer-events-none select-none z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            EDITORIAL HEADER
            ========================================================================= */}
        <div className="mb-24 md:mb-32">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
            <span className="text-blue-400 font-bold tracking-[0.28em] uppercase text-xs drop-shadow-sm">
              SHOW & PRODUCTION
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] drop-shadow-lg">
            SERVICES
          </h2>
        </div>

        {/* =========================================================================
            EDITORIAL SPREAD: REVISTA / PORTFOLIO DE ARTISTA (ALTERNANCIA LIMPIA)
            ========================================================================= */}
        <div className="divide-y divide-zinc-800/40 border-t border-b border-zinc-800/40">
          {djData.packages.map((pkg, index) => {
            const isReversed = index % 2 === 1;
            const serviceNum = String(index + 1).padStart(2, '0');
            const includes = pkg.includes || [];
            const whatsappLink = `https://wa.me/593992710709?text=Hola%20Bryan%2C%20quisiera%20cotizar%20el%20servicio%20de%20${encodeURIComponent(pkg.name)}%20para%20un%20evento.`;

            return (
              <motion.article
                key={pkg.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75 }}
                className="py-24 sm:py-32 lg:py-36 xl:py-40"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
                  
                  {/* =================================================================
                      COLUMNA DE TEXTO EDITORIAL
                      ================================================================= */}
                  <div className={`w-full lg:col-span-5 flex flex-col justify-center ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    
                    {/* 1. NÚMERO MONOESPACIADO EDITORIAL */}
                    <span className="text-xs sm:text-sm font-mono font-medium tracking-[0.25em] text-blue-400/90 block mb-3">
                      {serviceNum} — SERVICIO
                    </span>

                    {/* 2. TÍTULO EDITORIAL FUERTE Y LIMPIO */}
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight uppercase mb-6 leading-[1.05]">
                      {getFormattedTitle(pkg.name)}
                    </h3>

                    {/* 3. IMAGEN EN MÓVIL (Ubicada exactamente después del título, proporción 4:5 alta y limpia) */}
                    <div className="lg:hidden my-6">
                      <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/60 shadow-2xl">
                        {pkg.image && (
                          <img 
                            src={pkg.image} 
                            alt={pkg.name} 
                            className={`w-full h-full ${getImageObjectPosition(index)}`}
                            loading={index === 0 ? 'eager' : 'lazy'}
                          />
                        )}
                        {/* Gradiente sutil inferior */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>

                    {/* 4. DESCRIPCIÓN REFINADA */}
                    <p className="text-zinc-300 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl">
                      {pkg.description}
                    </p>

                    {/* 5. INCLUYE / ESPECIFICACIONES (Lista editorial limpia de 2 columnas) */}
                    {includes.length > 0 && (
                      <div className="pt-6 border-t border-zinc-900/90 mb-8">
                        <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-400 font-medium block mb-4">
                          Incluye / Especificaciones:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-zinc-300">
                          {includes.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/70 mt-1.5 shrink-0" />
                              <span className="font-light leading-snug">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 6. CTA EDITORIAL (SOLICITAR COTIZACIÓN →) */}
                    <div className="pt-2">
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300 hover:text-blue-400 transition-colors group/cta cursor-pointer"
                      >
                        <span>Solicitar Cotización</span>
                        <ArrowRight size={14} className="text-blue-500 group-hover/cta:translate-x-2 transition-transform duration-300" />
                      </a>
                    </div>

                  </div>

                  {/* =================================================================
                      COLUMNA DE FOTOGRAFÍA EDITORIAL (DESKTOP: PROPORCIÓN 4:5 / 5:4 ALTA)
                      ================================================================= */}
                  <div className={`hidden lg:block lg:col-span-7 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative aspect-[4/5] xl:aspect-[5/4] w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/60 group shadow-2xl transition-all duration-700 hover:border-zinc-700">
                      {pkg.image && (
                        <img 
                          src={pkg.image} 
                          alt={pkg.name} 
                          className={`w-full h-full transition-transform duration-1000 ease-out group-hover:scale-[1.015] ${getImageObjectPosition(index)}`}
                          loading={index === 0 ? 'eager' : 'lazy'}
                        />
                      )}
                      
                      {/* Velo cinemático tenue que enmarca la foto sin restar protagonismo */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/15 pointer-events-none" />
                    </div>
                  </div>

                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
