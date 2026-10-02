import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { djData } from '../data/djData';

// Ruta configurada para el segundo video de la sección Sonido
const SECOND_VIDEO_SRC = djData.soundVideo || "/assets/videos/sonido-bryan.mp4";

export default function Genres() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const genresList = djData.genres || [
    "House",
    "Tech House",
    "Electrónica",
    "Reguetón",
    "Latino",
    "Comercial"
  ];

  // Control independiente de sonido para el segundo video
  const handleToggleSound = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isMuted) {
      videoEl.muted = false;
      videoEl.volume = 0.18; // 18% de volumen confortable
      if (videoEl.paused) {
        videoEl.play().catch(() => {});
      }
      setIsMuted(false);
    } else {
      videoEl.muted = true;
      setIsMuted(true);
    }
  };

  // Autoplay silenciado en montaje con tolerancia a políticas de navegador
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.defaultMuted = true;
    videoEl.muted = true;

    const attemptPlay = () => {
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setVideoLoaded(true))
          .catch(() => {
            // Autoplay bloqueado por el navegador; espera interacción
          });
      }
    };

    attemptPlay();

    const handleInteraction = () => {
      attemptPlay();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    window.addEventListener('click', handleInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true, once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  // Dividir los 6 géneros en 2 columnas equilibradas para desktop (3 y 3)
  const midpoint = Math.ceil(genresList.length / 2);
  const colLeft = genresList.slice(0, midpoint);
  const colRight = genresList.slice(midpoint);

  return (
    <section 
      id="genres" 
      className="scroll-mt-20 relative min-h-[75vh] lg:min-h-[85vh] w-full flex items-center justify-center bg-black overflow-hidden py-24 md:py-32"
    >
      {/* =======================================================================
          1. FONDO DE RESPALDO (Activo siempre y visible si no hay video cargado)
          ======================================================================= */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-zinc-950 to-black z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.08),transparent_65%)]" />
      </div>

      {/* =======================================================================
          2. SEGUNDO VIDEO DE FONDO COMPLETO (Autoplay + Loop + Muted + PlaysInline)
          ======================================================================= */}
      {!videoFailed && (
        <video
          ref={videoRef}
          src={SECOND_VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setVideoLoaded(true)}
          onPlaying={() => setVideoLoaded(true)}
          onError={() => {
            setVideoFailed(true);
            setVideoLoaded(false);
          }}
          className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0 transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
      )}

      {/* =======================================================================
          3. OVERLAYS CINEMATOGRÁFICOS (Video claramente visible + transición suave)
          ======================================================================= */}
      {/* Capa oscura base (35%) para contraste tipográfico sin oscurecer en exceso */}
      <div className="absolute inset-0 bg-black/35 pointer-events-none z-[1]" />

      {/* Gradientes superior e inferior para transición continua (negro -> video -> negro) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-[2]" />

      {/* Halo azul ambiental sutil centrado detrás de los géneros */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none z-[2]" />

      {/* =======================================================================
          4. CONTENIDO ENCIMA DEL VIDEO (z-10)
          ======================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        
        {/* Encabezado Editorial: MÚSICA / SONIDO */}
        <div className="mb-14 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-3"
          >
            <span className="w-6 h-[2px] bg-blue-500"></span>
            <span className="text-blue-400 font-bold tracking-[0.28em] uppercase text-xs drop-shadow-sm">
              MÚSICA
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] drop-shadow-lg"
          >
            SONIDO
          </motion.h2>
        </div>

        {/* =====================================================================
            DISTRIBUCIÓN EDITORIAL DE LOS GÉNEROS (2 COLUMNAS EN DESKTOP)
            ===================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20">
          
          {/* Columna Izquierda (01, 02, 03) */}
          <div className="divide-y divide-white/10 border-t border-b md:border-b-0 divide-y-white/10 border-white/10">
            {colLeft.map((genre, idx) => {
              const num = String(idx + 1).padStart(2, '0');

              return (
                <motion.div
                  key={genre}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06, duration: 0.5 }}
                  className="group py-5 sm:py-6 flex items-center justify-between cursor-default transition-all duration-300"
                >
                  <div className="flex items-center gap-5 sm:gap-6 group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-xs sm:text-sm font-mono font-semibold tracking-widest text-zinc-400 group-hover:text-blue-400 transition-colors drop-shadow-sm">
                      {num}
                    </span>
                    <span className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight uppercase text-zinc-100 group-hover:text-blue-400 transition-colors drop-shadow-md">
                      {genre}
                    </span>
                  </div>

                  {/* Línea de acento azul en hover */}
                  <div className="w-0 group-hover:w-6 h-[1.5px] bg-blue-500 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                </motion.div>
              );
            })}
          </div>

          {/* Columna Derecha (04, 05, 06) */}
          <div className="divide-y divide-white/10 border-b md:border-t md:border-b-0 divide-y-white/10 border-white/10">
            {colRight.map((genre, idx) => {
              const num = String(midpoint + idx + 1).padStart(2, '0');

              return (
                <motion.div
                  key={genre}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (midpoint + idx) * 0.06, duration: 0.5 }}
                  className="group py-5 sm:py-6 flex items-center justify-between cursor-default transition-all duration-300"
                >
                  <div className="flex items-center gap-5 sm:gap-6 group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-xs sm:text-sm font-mono font-semibold tracking-widest text-zinc-400 group-hover:text-blue-400 transition-colors drop-shadow-sm">
                      {num}
                    </span>
                    <span className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight uppercase text-zinc-100 group-hover:text-blue-400 transition-colors drop-shadow-md">
                      {genre}
                    </span>
                  </div>

                  {/* Línea de acento azul en hover */}
                  <div className="w-0 group-hover:w-6 h-[1.5px] bg-blue-500 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>

      {/* =======================================================================
          5. CONTROL INDEPENDIENTE DE AUDIO (Visible únicamente si el video carga)
          ======================================================================= */}
      {videoLoaded && !videoFailed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:right-12 z-20"
        >
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={isMuted ? "Activar sonido del video de sonido (18% de volumen)" : "Silenciar video de sonido"}
            className="group inline-flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/15 hover:border-blue-500/50 transition-all duration-300 text-white shadow-xl cursor-pointer select-none active:scale-95"
          >
            <span className="relative flex items-center justify-center">
              {isMuted ? (
                <VolumeX size={16} className="text-zinc-300 group-hover:text-white transition-colors" />
              ) : (
                <Volume2 size={16} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
              )}
              {/* Indicador LED azul pulsante al estar activo el audio */}
              <span 
                className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ${
                  isMuted 
                    ? 'bg-zinc-600' 
                    : 'bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.9)]'
                }`} 
              />
            </span>

            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-300 group-hover:text-white transition-colors">
              {isMuted ? 'Activar sonido' : 'Silenciar'}
            </span>
          </button>
        </motion.div>
      )}
    </section>
  );
}
