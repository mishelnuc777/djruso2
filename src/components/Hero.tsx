import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { djData } from '../data/djData';
import { Disc3 } from 'lucide-react';
import { parseYouTube, youTubeEmbedUrl } from '../utils/media';

const WHATSAPP_HERO_URL = "https://wa.me/593992710709?text=Hola%20Bryan%2C%20vi%20tu%20p%C3%A1gina%20web%20y%20quisiera%20informaci%C3%B3n%20para%20contratar%20tus%20servicios.";

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  // YouTube video support (has priority if a URL is explicitly defined in djData)
  const youtube = parseYouTube(djData.heroYoutubeUrl);
  const hasYoutube = youtube !== null;

  // Local MP4 video
  const localVideoSrc = djData.heroVideo || '/assets/videos/hero-vertical.mp4';
  const hasLocalVideo = Boolean(localVideoSrc) && !videoFailed && !hasYoutube;
  const posterSrc = djData.heroVideoPoster || '/assets/videos/hero-poster.jpg';

  // Video autoplay handling (muted, looped, safe fallback)
  useEffect(() => {
    if (!hasLocalVideo) return;

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
            // Autoplay constrained by browser policy; poster image remains visible
          });
      }
    };

    attemptPlay();

    // Fallback: trigger playback on first user touch/click if browser blocked autoplay
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
  }, [hasLocalVideo]);

  const artistName = 'DJ BRYAN ACOSTA';
  const displaySlogan = 'Desde la última loma de Caspigasi';
  const displayDescription = djData.shortDescription || 
    'Propuesta musical versátil para todo tipo de eventos: reguetón, música electrónica y diversos géneros, con sets dinámicos, mezclas y remixes.';

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-black"
    >
      {/* =========================================================================
          BACKGROUND MEDIA LAYER (Full Background Cover)
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        
        {/* Poster / Fallback Image (prevents empty background and shows during load) */}
        <img 
          src={posterSrc} 
          alt={`Presentación oficial de ${artistName}`} 
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          loading="eager"
          decoding="async"
        />

        {/* Local Video Element (Autoplay, Muted, Loop, playsInline, object-cover) */}
        {hasLocalVideo && (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              ref={videoRef}
              src={localVideoSrc}
              poster={posterSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onLoadedData={() => setVideoLoaded(true)}
              onPlaying={() => setVideoLoaded(true)}
              onError={() => setVideoFailed(true)}
              className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden="true"
            />
          </div>
        )}

        {/* YouTube Video Embed (if configured) */}
        {hasYoutube && youtube && (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <iframe
              src={youTubeEmbedUrl(youtube, { autoplay: true, muted: true, loop: true, controls: false })}
              title={`Video de presentación de ${artistName}`}
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              tabIndex={-1}
              onLoad={() => setVideoLoaded(true)}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full border-0 transition-opacity duration-1000 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        )}

        {/* =========================================================================
            CINEMATIC OVERLAYS (Guarantees legibility while letting video shine)
            ========================================================================= */}
        <div className="absolute inset-0 z-[1]">
          {/* Base dark tint */}
          <div className="absolute inset-0 bg-black/55 pointer-events-none"></div>

          {/* Directional horizontal gradient: stronger on left to anchor typography */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 md:via-black/70 to-black/35 pointer-events-none"></div>

          {/* Vertical gradient: blends navbar and transition to next section */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black pointer-events-none"></div>

          {/* Peripheral vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000000_90%)] pointer-events-none"></div>

          {/* Ambient stage blue glow behind text */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] sm:w-[600px] h-[400px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none"></div>
        </div>
      </div>

      {/* =========================================================================
          HERO CONTENT (Left-biased Cinematic Editorial Layout)
          ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-28 pb-20 md:py-24">
        <div className="max-w-3xl">
          
          {/* Slogan Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-950/80 border border-zinc-800/90 backdrop-blur-md mb-6 w-fit shadow-lg shadow-black/50"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-zinc-300">
              «{displaySlogan}»
            </span>
          </motion.div>

          {/* Monumental Brand Title: DJ BRYAN ACOSTA */}
          <motion.h1 
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter uppercase leading-[0.88] mb-4 select-none drop-shadow-2xl break-words"
          >
            {artistName}
          </motion.h1>

          {/* Subtitle Line: DJ */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-6 h-[2px] bg-blue-500"></span>
            <span className="text-blue-400 font-extrabold tracking-[0.3em] uppercase text-sm sm:text-base">
              DJ
            </span>
            <span className="text-zinc-600 text-xs">•</span>
            <span className="text-zinc-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              Música & Producción para Eventos
            </span>
          </motion.div>
          
          {/* Versatile Music Short Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-zinc-300 text-base sm:text-lg md:text-xl max-w-xl mb-9 font-normal leading-relaxed text-balance"
          >
            {displayDescription}
          </motion.p>

          {/* CTA Action Cluster */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            {/* Primary Dominant CTA: Hablar por WhatsApp */}
            <a 
              href={WHATSAPP_HERO_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hablar por WhatsApp con Bryan Acosta"
              className="px-7 sm:px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(37,211,102,0.35)] hover:shadow-[0_0_35px_rgba(37,211,102,0.55)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 group cursor-pointer border border-[#25D366]/40"
            >
              <WhatsAppIcon className="w-5 h-5 text-white shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <span>Hablar por WhatsApp</span>
            </a>

            {/* Secondary CTA: Escuchar Sesiones */}
            <a 
              href="#music"
              className="px-7 py-4 bg-zinc-950/70 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all backdrop-blur-md flex items-center justify-center gap-2.5 group"
            >
              <Disc3 size={17} className="text-blue-400 group-hover:rotate-45 transition-transform duration-300" />
              <span>Escuchar Sesiones</span>
            </a>
          </motion.div>

        </div>
      </div>

      {/* =========================================================================
          DISCREET SCROLL INDICATOR
          ========================================================================= */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-6 sm:left-8 lg:left-12 flex items-center gap-3 pointer-events-none"
      >
        <div className="w-8 h-[1px] bg-gradient-to-r from-blue-500 to-transparent"></div>
        <span className="text-zinc-500 text-[10px] font-semibold uppercase tracking-[0.25em]">
          Deslizar para explorar
        </span>
      </motion.div>
    </section>
  );
}
