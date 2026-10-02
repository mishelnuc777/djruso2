import { motion } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';

const WHATSAPP_URL = "https://wa.me/593992710709?text=Hola%20Bryan%2C%20vi%20tu%20p%C3%A1gina%20web%20y%20quisiera%20cotizar%20un%20evento.%20%C2%BFMe%20ayudas%20con%20disponibilidad%20y%20opciones%3F";

export default function About() {
  const artistName = 'DJ BRYAN ACOSTA';

  return (
    <section id="about" className="py-28 md:py-36 bg-black relative border-t border-zinc-900 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            EDITORIAL SPREAD: Dominant Artist Portrait & Editorial Narrative
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Dominant Editorial Photograph (~45% Presence) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-zinc-950 shadow-2xl group">
              <div className="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden relative">
                <img 
                  src="/assets/images/bryan-bio.png.png" 
                  alt={`Fotografía oficial de ${artistName} - Trayectoria`} 
                  className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="eager"
                />
                
                {/* Seamless lower gradient blend */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none"></div>

                {/* Simplified & Clean Editorial Signature */}
                <div className="absolute bottom-6 left-6 pointer-events-none z-10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-400 font-semibold block mb-0.5">
                    EN CABINA
                  </span>
                  <h3 className="text-white text-lg sm:text-xl font-black tracking-tight uppercase drop-shadow-md">
                    {artistName}
                  </h3>
                </div>
              </div>
            </div>

            {/* Back ambient halo */}
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
          </motion.div>

          {/* RIGHT COLUMN: Editorial Narrative (~55% Presence) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Section Tag */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[2px] bg-blue-500"></span>
              <span className="text-blue-400 font-bold tracking-[0.28em] uppercase text-xs">
                TRAYECTORIA
              </span>
            </div>

            {/* Monumental Headline: 18 AÑOS EN ESCENA */}
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase mb-8 leading-[0.9]">
              18 AÑOS<br />EN ESCENA
            </h2>
            
            {/* Lead Short Description */}
            <div className="border-l-2 border-blue-500 pl-5 mb-8">
              <p className="text-zinc-200 text-lg sm:text-xl font-normal leading-relaxed text-balance">
                Más de 18 años de experiencia llevando música, energía y producción a eventos y escenarios en distintas ciudades del Ecuador.
              </p>
            </div>

            {/* Full Biography Prose */}
            <div className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed mb-10 space-y-5">
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

            {/* Clean Editorial Stats Band (Hairline Dividers, No Boxes) */}
            <div className="grid grid-cols-3 gap-6 py-6 mb-10 border-y border-zinc-900">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight block">
                  18+
                </span>
                <span className="text-[10px] sm:text-xs text-blue-400 font-bold uppercase tracking-widest block mt-1">
                  Años en Escena
                </span>
              </div>
              <div className="border-l border-zinc-800/80 pl-6">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight block">
                  Ecuador
                </span>
                <span className="text-[10px] sm:text-xs text-blue-400 font-bold uppercase tracking-widest block mt-1">
                  Cobertura
                </span>
              </div>
              <div className="border-l border-zinc-800/80 pl-6">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight block">
                  Integral
                </span>
                <span className="text-[10px] sm:text-xs text-blue-400 font-bold uppercase tracking-widest block mt-1">
                  Producción
                </span>
              </div>
            </div>

            {/* Discrete CTA to Contact via WhatsApp */}
            <div>
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800/70 hover:border-zinc-600 text-zinc-200 hover:text-white text-xs uppercase tracking-wider font-semibold transition-all group cursor-pointer"
              >
                <MessageCircle size={15} className="text-blue-400" />
                <span>Consultar Fechas & Disponibilidad</span>
                <ArrowRight size={14} className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
