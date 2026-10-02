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

  const getImageObjectPosition = (index: number) => {
    switch (index) {
      case 0:
        return 'object-cover object-[center_top]';
      case 1:
        return 'object-cover object-[center_20%]';
      case 2:
        return 'object-cover object-center';
      default:
        return 'object-cover object-center';
    }
  };

  return (
    <section id="packages" className="py-24 md:py-36 bg-black relative border-t border-zinc-900 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            EDITORIAL HEADER
            ========================================================================= */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[2px] bg-blue-500"></span>
            <span className="text-blue-400 font-bold tracking-[0.28em] uppercase text-xs">
              SHOW & PRODUCTION
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
            SERVICES
          </h2>
        </div>

        {/* =========================================================================
            EDITORIAL ALTERNATING ROWS (NO CARDS / NO PRICING / PURE PORTFOLIO)
            ========================================================================= */}
        <div className="divide-y divide-zinc-900 border-t border-b border-zinc-900">
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
                transition={{ duration: 0.7 }}
                className="py-16 lg:py-24"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  
                  {/* TEXT CONTENT COLUMN */}
                  <div className={`w-full lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    
                    {/* Editorial Number */}
                    <span className="text-3xl sm:text-4xl font-light font-mono text-zinc-600 block mb-2">
                      {serviceNum}
                    </span>

                    {/* Service Title */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight uppercase mb-4 leading-tight">
                      {getFormattedTitle(pkg.name)}
                    </h3>

                    {/* Mobile Image (Clean inline stack on mobile) */}
                    <div className="lg:hidden my-6">
                      <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-zinc-950">
                        {pkg.image && (
                          <img 
                            src={pkg.image} 
                            alt={pkg.name} 
                            className={`w-full h-full ${getImageObjectPosition(index)}`}
                            loading={index === 0 ? 'eager' : 'lazy'}
                          />
                        )}
                      </div>
                    </div>

                    {/* Light, Refined Description */}
                    <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed mb-6 max-w-xl">
                      {pkg.description}
                    </p>

                    {/* Specifications / Includes (Clean Editorial Bullets) */}
                    {includes.length > 0 && (
                      <div className="pt-5 border-t border-zinc-900/80">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 block mb-3">
                          Incluye / Especificaciones:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-300">
                          {includes.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80 shrink-0"></span>
                              <span className="font-light">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Editorial CTA */}
                    <div className="pt-6">
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-blue-400 transition-colors group/cta cursor-pointer"
                      >
                        <span>Solicitar Cotización</span>
                        <ArrowRight size={13} className="text-blue-500 group-hover/cta:translate-x-1.5 transition-transform" />
                      </a>
                    </div>

                  </div>

                  {/* DESKTOP DOMINANT PHOTOGRAPH COLUMN */}
                  <div className={`hidden lg:block lg:col-span-7 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 group">
                      {pkg.image && (
                        <img 
                          src={pkg.image} 
                          alt={pkg.name} 
                          className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02] ${getImageObjectPosition(index)}`}
                          loading={index === 0 ? 'eager' : 'lazy'}
                        />
                      )}
                      
                      {/* Very subtle bottom darkening for visual cohesion */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
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
