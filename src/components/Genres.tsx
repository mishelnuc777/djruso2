import { motion } from 'motion/react';
import { djData } from '../data/djData';

// Ruta para el segundo video real de Bryan Acosta.
// NOTA: Actualmente no existe un segundo archivo .mp4 en /public/assets/videos/.
// Para activarlo, coloca el archivo en /public/assets/videos/ (ej: /assets/videos/bryan-live-session.mp4)
// y asígnalo aquí o en djData.secondaryVideo sin modificar hero-bryan-final.mp4.
const SECONDARY_VIDEO_SRC = ""; 

export default function Genres() {
  const genresList = djData.genres;
  const videoSrc = (djData as { secondaryVideo?: string }).secondaryVideo || SECONDARY_VIDEO_SRC;
  const hasVideo = Boolean(videoSrc && videoSrc.trim().length > 0);

  const renderVideoElement = () => (
    <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[560px] xl:h-[620px] rounded-lg overflow-hidden bg-zinc-950">
      {hasVideo ? (
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-zinc-950 via-zinc-900/60 to-black p-8 text-center relative overflow-hidden">
          {/* Ambient stage glow */}
          <div className="absolute inset-0 bg-blue-600/5 blur-3xl pointer-events-none"></div>

          {/* Minimalist stage waveform representation */}
          <div className="flex items-center gap-1.5 mb-4 text-blue-500/70">
            <span className="w-1 h-6 bg-current rounded-full animate-pulse"></span>
            <span className="w-1 h-14 bg-current rounded-full animate-pulse [animation-delay:150ms]"></span>
            <span className="w-1 h-8 bg-current rounded-full animate-pulse [animation-delay:300ms]"></span>
            <span className="w-1 h-16 bg-current rounded-full animate-pulse [animation-delay:75ms]"></span>
            <span className="w-1 h-10 bg-current rounded-full animate-pulse [animation-delay:220ms]"></span>
            <span className="w-1 h-5 bg-current rounded-full animate-pulse [animation-delay:380ms]"></span>
          </div>

          <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase max-w-xs">
            Estructura audiovisual preparada para segundo video en vivo
          </p>
        </div>
      )}

      {/* Subtle bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

      {/* Discrete live badge */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold tracking-widest text-white uppercase shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          <span>EN VIVO</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 md:py-32 bg-black relative border-t border-zinc-900 overflow-hidden">
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            EDITORIAL ASYMMETRIC GRID:
            Desktop: ~42% Content (Title + 6 Genres) | ~58% Dominant Video
            Mobile: Title -> Video -> 6 Genres
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          
          {/* CONTENT COLUMN (Title + Genres) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-6 h-[2px] bg-blue-500"></span>
                <span className="text-blue-400 font-bold tracking-[0.28em] uppercase text-xs">
                  MÚSICA
                </span>
              </div>
              
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                SONIDO
              </h2>
            </div>

            {/* Mobile Video Position (inline between Title and Genres) */}
            <div className="block lg:hidden mb-8">
              {renderVideoElement()}
            </div>

            {/* Genres List (01 to 06, clean editorial rows) */}
            <div className="divide-y divide-zinc-900 border-t border-b border-zinc-900">
              {genresList.map((genre, idx) => {
                const num = String(idx + 1).padStart(2, '0');

                return (
                  <motion.div
                    key={genre}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    className="group py-4 sm:py-5 flex items-center justify-between cursor-default transition-all duration-300"
                  >
                    <div className="flex items-center gap-5 sm:gap-6 group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-xs sm:text-sm font-mono font-semibold tracking-widest text-zinc-600 group-hover:text-blue-400 transition-colors">
                        {num}
                      </span>
                      <span className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight uppercase text-zinc-200 group-hover:text-white transition-colors">
                        {genre}
                      </span>
                    </div>

                    {/* Subtle accent line on hover */}
                    <div className="w-0 group-hover:w-6 h-[1px] bg-blue-500 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* DESKTOP DOMINANT VIDEO COLUMN (~58% on Desktop) */}
          <div className="hidden lg:block lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {renderVideoElement()}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
