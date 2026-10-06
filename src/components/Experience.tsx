import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, Disc3 } from 'lucide-react';

interface ExperienceVideoItem {
  id: string;
  label: string;
  title: string;
  videoSrc: string;
  posterSrc: string;
  playAriaLabel: string;
}

const experienceItems: ExperienceVideoItem[] = [
  {
    id: 'exp-01',
    label: 'VIDEO 01',
    title: 'ENERGÍA EN PISTA',
    videoSrc: '/assets/videos/experiencia-01.mp4',
    posterSrc: '/assets/videos/experiencia-01-poster.jpg',
    playAriaLabel: 'Reproducir experiencia en vivo 1',
  },
  {
    id: 'exp-02',
    label: 'VIDEO 02',
    title: 'EL SHOW EN VIVO',
    videoSrc: '/assets/videos/experiencia-02.mp4',
    posterSrc: '/assets/videos/experiencia-02-poster.jpg',
    playAriaLabel: 'Reproducir experiencia en vivo 2',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Manejador de Play: asegura que solo un video reproduzca a la vez y monta el MP4 solo tras el clic
  const handlePlay = (id: string) => {
    // Si otro video está activo, pausarlo inmediatamente
    if (activeVideoId && activeVideoId !== id) {
      const prev = videoRefs.current[activeVideoId];
      if (prev && !prev.paused) {
        prev.pause();
      }
    }
    setActiveVideoId(id);
  };

  // Observador de intersección: pausa el video activo si el usuario hace scroll fuera de la sección
  // NO reanuda automáticamente: el control permanece siempre en manos del usuario
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            if (activeVideoId && videoRefs.current[activeVideoId]) {
              const activeVid = videoRefs.current[activeVideoId];
              if (activeVid && !activeVid.paused) {
                activeVid.pause();
              }
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
    };
  }, [activeVideoId]);

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="scroll-mt-20 py-24 sm:py-28 md:py-36 bg-black relative border-t border-zinc-900 overflow-hidden"
    >
      {/* Luces escénicas ambientales sutiles de fondo (estáticas, sin loops pesados) */}
      <div className="absolute top-1/4 -left-24 w-[550px] h-[550px] bg-blue-600/8 rounded-full blur-[160px] pointer-events-none select-none z-0" />
      <div className="absolute bottom-10 -right-24 w-[500px] h-[500px] bg-red-600/6 rounded-full blur-[170px] pointer-events-none select-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.03),transparent_60%)] pointer-events-none select-none z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            ENCABEZADO EDITORIAL
            ========================================================================= */}
        <div className="mb-14 sm:mb-18 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-3"
          >
            <span className="w-6 h-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <span className="text-blue-400 font-bold tracking-[0.28em] uppercase text-xs drop-shadow-sm">
              EN VIVO
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] drop-shadow-lg mb-6"
          >
            VIVE LA EXPERIENCIA
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="text-zinc-400 text-sm sm:text-base font-light max-w-xl leading-relaxed"
          >
            Luces, música, energía y una pista que no se detiene. Mira cómo se vive una noche con DJ Bryan Acosta.
          </motion.p>
        </div>

        {/* =========================================================================
            SHOWCASE DE LOS 2 VIDEOS VERTICALES 9:16
            - Mobile: Carrusel horizontal con scroll-snap (82vw por tarjeta)
            - Desktop: 2 videos verticales centrados lado a lado con offset editorial
            ========================================================================= */}
        <div className="flex md:grid md:grid-cols-2 gap-5 sm:gap-8 lg:gap-12 max-w-4xl mx-auto overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory pb-6 md:pb-0 px-6 sm:px-0 -mx-6 sm:mx-auto">
          {experienceItems.map((item, index) => {
            const isPlaying = activeVideoId === item.id;
            const editorialOffset = index === 1 ? 'md:translate-y-8' : '';

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`w-[82vw] sm:w-[360px] md:w-auto shrink-0 md:shrink snap-center flex flex-col ${editorialOffset}`}
              >
                {/* Etiquetas superiores discretas */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-[11px] font-mono tracking-[0.25em] text-blue-400 font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                    {item.label}
                  </span>
                  <span className="text-xs font-mono tracking-wider uppercase text-zinc-400">
                    {item.title}
                  </span>
                </div>

                {/* Marco vertical 9:16 de alta definición */}
                <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-zinc-800/80 shadow-2xl group">
                  
                  {/* Borde sutil superior con acento LED azul */}
                  <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent pointer-events-none z-20" />

                  {/* CASO A: Video montado SOLO tras interacción (Play) */}
                  {isPlaying ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[item.id] = el;
                      }}
                      src={item.videoSrc}
                      poster={item.posterSrc}
                      playsInline
                      controls
                      autoPlay
                      preload="metadata"
                      className="w-full h-full object-cover bg-black relative z-10"
                      onEnded={() => {
                        // El video permanece pausado en el último cuadro o con controles listos
                      }}
                    />
                  ) : (
                    /* CASO B: Poster inicial con botón Play (NO descarga MP4) */
                    <div className="relative w-full h-full flex items-center justify-center">
                      
                      {/* Imagen Poster (lazy loading y decoding async) */}
                      <img 
                        src={item.posterSrc} 
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
                        onError={(e) => {
                          // Si el archivo del poster aún no está subido, oculta el tag roto de forma limpia
                          e.currentTarget.style.display = 'none';
                        }}
                      />

                      {/* Fondo de respaldo escénico en caso de ausencia temporal del poster */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none -z-0">
                        <div className="w-16 h-16 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-zinc-600 flex items-center justify-center mb-4">
                          <Disc3 size={28} className="opacity-40" />
                        </div>
                        <span className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-1">
                          DJ BRYAN ACOSTA
                        </span>
                        <span className="text-sm font-semibold tracking-tight uppercase text-zinc-300">
                          {item.title}
                        </span>
                      </div>

                      {/* Gradiente cinemático oscuro sobre el poster para asegurar contraste */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 pointer-events-none z-10" />

                      {/* Botón de Play interactivo grande y elegante */}
                      <button
                        type="button"
                        onClick={() => handlePlay(item.id)}
                        aria-label={item.playAriaLabel}
                        className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/75 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all duration-300 md:group-hover:scale-110 md:group-hover:border-blue-500 md:group-hover:bg-blue-600/90 md:group-hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] cursor-pointer select-none active:scale-95 shadow-2xl"
                      >
                        <Play size={24} className="translate-x-0.5 text-white" fill="currentColor" />
                      </button>

                      {/* Etiqueta flotante inferior informativa */}
                      <div className="absolute bottom-5 inset-x-5 z-20 pointer-events-none flex items-center justify-between text-xs text-zinc-300">
                        <span className="font-mono text-[11px] tracking-wider uppercase text-zinc-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                          {item.title}
                        </span>
                        <span className="font-mono text-[10px] tracking-widest uppercase text-blue-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                          9:16 HD
                        </span>
                      </div>

                    </div>
                  )}

                </div>
              </motion.article>
            );
          })}
        </div>

        {/* =========================================================================
            CTA FINAL DE LA SECCIÓN (EDITORIAL Y DISCRETO)
            ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 sm:mt-20 md:mt-24 pt-10 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center"
        >
          {/* Acción principal: Lleva a Reserva / Contacto */}
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-blue-500/60 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(37,99,235,0.15)] hover:shadow-[0_0_30px_rgba(37,99,235,0.35)] group/btn cursor-pointer"
          >
            <span>QUIERO UNA EXPERIENCIA ASÍ</span>
            <ArrowRight size={15} className="text-blue-400 group-hover/btn:translate-x-1 transition-transform" />
          </a>

          {/* Enlace secundario discreto: Lleva a Servicios */}
          <a
            href="#packages"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors py-2 px-3"
          >
            <span>VER SERVICIOS</span>
            <ArrowRight size={13} className="text-zinc-500" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
