import { motion } from 'motion/react';
import { djData } from '../data/djData';
import { ArrowRight, MessageCircle } from 'lucide-react';

const WHATSAPP_URL = "https://wa.me/593992710709?text=Hola%20Bryan%2C%20vi%20tu%20p%C3%A1gina%20web%20y%20quisiera%20cotizar%20un%20evento.%20%C2%BFMe%20ayudas%20con%20disponibilidad%20y%20opciones%3F";

export default function About() {
  const artistName = 'DJ BRYAN ACOSTA';

  return (
    <section id="about" className="py-24 md:py-32 bg-zinc-950 relative border-t border-zinc-900 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: Cinematic Editorial Photo Frame
              ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            {/* Architectural Frame */}
            <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/90 shadow-2xl group">
              <div className="aspect-[4/5] w-full overflow-hidden relative">
                {/* Fotografía oficial de biografía (Bryan Acosta) sin filtros agresivos */}
                <img 
                  src="/assets/images/bryan-bio.png.png" 
                  alt={`Fotografía oficial de ${artistName} - Detrás de la Música`} 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 relative z-0"
                  loading="eager"
                />
                
                {/* Overlay sutil restringido ÚNICAMENTE a la base inferior para la firma */}
                <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10"></div>

                {/* Corner signature tag */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none z-20">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-blue-400 font-bold block drop-shadow-md">
                      En Cabina • DJ de DJs
                    </span>
                    <span className="text-white text-base font-black tracking-tight uppercase drop-shadow-md">
                      {artistName}
                    </span>
                    <span className="text-zinc-300 text-xs tracking-wider block font-medium drop-shadow-md">
                      Desde la última loma de Caspigasi
                    </span>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                </div>
              </div>
            </div>

            {/* Subtle decorative glow */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>
          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN: Artist Presentation & Identity
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Section Tag */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4">
              <span className="w-6 h-[1px] bg-blue-500"></span>
              <span className="text-blue-400 font-semibold tracking-[0.25em] uppercase text-xs">
                Trayectoria & Experiencia
              </span>
              <span className="text-zinc-600 text-xs hidden sm:inline">•</span>
              <span className="text-zinc-400 font-medium tracking-wide text-xs">
                «Desde la última loma de Caspigasi»
              </span>
            </div>

            {/* Powerful Artist Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-6 leading-tight">
              Detrás de la Música
            </h2>
            
            {/* Lead Short Description */}
            <div className="border-l-2 border-blue-500/80 pl-4 sm:pl-5 mb-6">
              <p className="text-zinc-200 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-balance">
                Más de 18 años de experiencia llevando música, energía y producción a eventos y escenarios en distintas ciudades del Ecuador.
              </p>
            </div>

            {/* Full Biography */}
            <div className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed mb-6 space-y-4">
              <p>
                Bryan Acosta cuenta con más de 18 años de trayectoria dentro de la industria del entretenimiento. Su experiencia detrás de la cabina lo ha llevado a participar en eventos, clubes y escenarios en distintas ciudades del Ecuador.
              </p>
              <p>
                A lo largo de su carrera ha participado en competencias de DJs organizadas por emisoras de Quito y ha trabajado como DJ residente en espacios de la capital. Su propuesta se caracteriza por la versatilidad musical, creando sets, mezclas y remixes adaptados al público y al tipo de evento.
              </p>
              <p>
                Además de su trabajo como DJ, desarrolla soluciones para eventos que pueden incluir producción, sonido, iluminación y equipamiento técnico según los requerimientos de cada cliente.
              </p>
            </div>

            {/* Subtle Key Indicators */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 py-5 mb-6 border-y border-zinc-900/90">
              <div className="p-3 sm:p-4 rounded-xl bg-black/50 border border-zinc-900">
                <span className="text-lg sm:text-2xl font-black text-white block">18+</span>
                <span className="text-[10px] sm:text-xs text-blue-400 font-semibold uppercase tracking-wider block mt-0.5">
                  Años de Trayectoria
                </span>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-black/50 border border-zinc-900">
                <span className="text-lg sm:text-2xl font-black text-white block">Nacional</span>
                <span className="text-[10px] sm:text-xs text-blue-400 font-semibold uppercase tracking-wider block mt-0.5">
                  Eventos en Ecuador
                </span>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-black/50 border border-zinc-900">
                <span className="text-lg sm:text-2xl font-black text-white block">Integral</span>
                <span className="text-[10px] sm:text-xs text-blue-400 font-semibold uppercase tracking-wider block mt-0.5">
                  Sonido & Iluminación
                </span>
              </div>
            </div>

            {/* Discrete CTA to Contact via WhatsApp */}
            <div>
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white text-xs uppercase tracking-wider font-bold transition-all group cursor-pointer"
              >
                <MessageCircle size={15} className="text-blue-400" />
                <span>Consultar Fechas & Disponibilidad</span>
                <ArrowRight size={15} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
