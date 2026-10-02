import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { djData } from '../data/djData';
import { MusicSet } from '../types/dj';
import { parseYouTube, youTubeEmbedUrl, youTubeThumbnail } from '../utils/media';
import { 
  Play, 
  Clock, 
  ArrowUpRight, 
  X, 
  Disc3, 
  Radio, 
  Youtube, 
  Headphones,
  Sparkles,
  Info
} from 'lucide-react';

export default function MusicSets() {
  const [activeSet, setActiveSet] = useState<MusicSet | null>(null);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const soundcloudSocial = djData.socialMedia.find(
    s => s.platform.toLowerCase() === 'soundcloud'
  );

  // Helper to format clean display title without raw brackets
  const getDisplayTitle = (title: string, index: number): string => {
    if (title.startsWith('[') && title.endsWith(']')) {
      const clean = title.slice(1, -1).trim();
      if (clean.toUpperCase().includes('NOMBRE DEL SET') || clean.toUpperCase().includes('TÍTULO')) {
        return `Sesión en Vivo ${String(index + 1).padStart(2, '0')}`;
      }
      return clean;
    }
    return title;
  };

  // Helper to determine if URL is a live external URL
  const isValidUrl = (url: string): boolean => {
    return Boolean(url && url.startsWith('http'));
  };

  // Helper to parse official embed URLs for SoundCloud & YouTube
  type EmbedData =
    | { type: 'youtube'; src: string; isShort: boolean }
    | { type: 'soundcloud' | 'generic'; src: string };

  const getEmbedData = (set: MusicSet): EmbedData | null => {
    const url = set.url;
    if (!isValidUrl(url)) return null;

    // YouTube (watch, youtu.be, shorts, embed, live)
    const yt = parseYouTube(url);
    if (yt) {
      return {
        type: 'youtube',
        isShort: yt.isShort,
        src: youTubeEmbedUrl(yt, { autoplay: true })
      };
    }

    // SoundCloud parser
    if (url.includes('soundcloud.com')) {
      return {
        type: 'soundcloud',
        src: `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%232563eb&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`
      };
    }

    return { type: 'generic', src: url };
  };

  // Portada: miniatura automática si el enlace es de YouTube; si no, la imagen configurada
  const getCover = (set: MusicSet): string => {
    const yt = parseYouTube(set.url);
    if (yt) return youTubeThumbnail(yt.id);
    return set.coverImage || '';
  };

  // Plataforma: se detecta sola si el enlace es de YouTube
  const getPlatform = (set: MusicSet): string =>
    parseYouTube(set.url) ? 'YouTube' : set.platform;

  // Handle Play Action
  const handlePlayClick = (set: MusicSet) => {
    if (isValidUrl(set.url)) {
      setActiveSet(set);
    } else {
      // Graceful feedback for placeholders
      setNoticeMessage(`La ${getDisplayTitle(set.title, djData.musicSets.indexOf(set))} estará disponible próximamente en las plataformas oficiales.`);
      setTimeout(() => setNoticeMessage(null), 4000);
    }
  };

  // Platform icon helper
  const renderPlatformBadge = (platform: string) => {
    const p = platform.toLowerCase();
    let icon = <Headphones size={13} />;
    if (p.includes('youtube')) icon = <Youtube size={13} className="text-red-400" />;
    else if (p.includes('soundcloud')) icon = <Radio size={13} className="text-orange-400" />;
    else if (p.includes('mixcloud')) icon = <Disc3 size={13} className="text-blue-400" />;

    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-zinc-900/90 border border-zinc-800 text-zinc-300">
        {icon}
        <span>{platform}</span>
      </span>
    );
  };

  const featuredSet = djData.musicSets[0];
  const secondarySets = djData.musicSets.slice(1);

  return (
    <section id="music" className="py-24 md:py-32 bg-zinc-950 relative border-t border-zinc-900">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            SECTION HEADER
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-blue-500"></span>
              <span className="text-blue-400 font-semibold tracking-[0.25em] uppercase text-xs">
                Cabina & Grabaciones
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              Sesiones & Mixes en Vivo
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-light max-w-xl mt-3 leading-relaxed">
              Muestras sonoras grabadas directamente desde el mezclador. Conoce el ritmo, la progresión y la selección musical para eventos y festivales.
            </p>
          </div>

          {soundcloudSocial && isValidUrl(soundcloudSocial.url) && (
            <a
              href={soundcloudSocial.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group self-start md:self-end pb-1"
            >
              <span>Ver perfil en SoundCloud</span>
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>

        {/* Temporary Notice Toast for placeholder sets */}
        <AnimatePresence>
          {noticeMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 rounded-xl bg-zinc-900 border border-blue-500/40 text-zinc-200 text-xs sm:text-sm flex items-center justify-between gap-4 shadow-xl"
            >
              <div className="flex items-center gap-2.5">
                <Info size={18} className="text-blue-400 shrink-0" />
                <span>{noticeMessage}</span>
              </div>
              <button 
                onClick={() => setNoticeMessage(null)}
                className="text-zinc-500 hover:text-white p-1"
                aria-label="Cerrar notificación"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            FEATURED SET (Set Destacado)
            ========================================================================= */}
        {featuredSet && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 rounded-2xl bg-black border border-zinc-800/90 hover:border-zinc-700/90 overflow-hidden shadow-2xl transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
              
              {/* Media Preview Column */}
              <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[420px] overflow-hidden group">
                <img 
                  src={getCover(featuredSet)} 
                  alt={getDisplayTitle(featuredSet.title, 0)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/20 lg:to-black"></div>

                {/* Big Play Trigger Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => handlePlayClick(featuredSet)}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.5)] transform group-hover:scale-110 transition-all duration-300 cursor-pointer"
                    aria-label={`Reproducir ${getDisplayTitle(featuredSet.title, 0)}`}
                  >
                    <Play size={28} className="translate-x-0.5" fill="currentColor" />
                  </button>
                </div>

                {/* Featured Badge */}
                <div className="absolute top-5 left-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                    <Sparkles size={11} className="text-blue-400" />
                    <span>Set Destacado</span>
                  </span>
                </div>
              </div>

              {/* Information Column */}
              <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    {renderPlatformBadge(getPlatform(featuredSet))}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-900 text-zinc-400 border border-zinc-800">
                      <Clock size={12} />
                      <span>{featuredSet.duration}</span>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-3">
                    {getDisplayTitle(featuredSet.title, 0)}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    Sesión principal orientada a pistas de club y festivales, mezclando transiciones precisas con la identidad acústica de {featuredSet.genre}.
                  </p>

                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300 mb-6">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>Género: {featuredSet.genre}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-zinc-900 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handlePlayClick(featuredSet)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center gap-2 cursor-pointer"
                  >
                    <Play size={14} fill="currentColor" />
                    <span>{isValidUrl(featuredSet.url) ? 'Reproducir Sesión' : 'Próximamente'}</span>
                  </button>

                  {isValidUrl(featuredSet.url) && (
                    <a
                      href={featuredSet.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                    >
                      <span>Abrir en {getPlatform(featuredSet)}</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* =========================================================================
            SECONDARY SETS GRID
            ========================================================================= */}
        {secondarySets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {secondarySets.map((set, idx) => {
              const actualIndex = idx + 1;
              const title = getDisplayTitle(set.title, actualIndex);
              const hasUrl = isValidUrl(set.url);

              return (
                <motion.div
                  key={set.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-2xl bg-black border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  {/* Cover Aspect */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-zinc-900">
                    <img 
                      src={getCover(set)} 
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors"></div>

                    {/* Play Button Trigger */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => handlePlayClick(set)}
                        className="w-13 h-13 rounded-full bg-zinc-950/80 hover:bg-blue-600 text-white flex items-center justify-center border border-white/20 hover:border-blue-500 backdrop-blur-md transition-all duration-300 cursor-pointer shadow-xl group/btn"
                        aria-label={`Reproducir ${title}`}
                      >
                        <Play size={20} className="translate-x-0.5 group-hover/btn:scale-110 transition-transform" fill="currentColor" />
                      </button>
                    </div>

                    <div className="absolute top-4 left-4">
                      {renderPlatformBadge(getPlatform(set))}
                    </div>
                  </div>

                  {/* Metadata & Actions */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                        <span className="font-semibold text-zinc-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          {set.genre}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {set.duration}
                        </span>
                      </div>

                      <h4 className="text-xl font-bold text-white tracking-tight uppercase mb-4 group-hover:text-blue-400 transition-colors">
                        {title}
                      </h4>
                    </div>

                    <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                      <button
                        onClick={() => handlePlayClick(set)}
                        className="text-xs uppercase tracking-wider font-bold text-white hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{hasUrl ? 'Escuchar sesión' : 'Próximamente'}</span>
                        <Play size={12} fill="currentColor" />
                      </button>

                      {hasUrl && (
                        <a
                          href={set.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] uppercase tracking-wider font-semibold text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
                        >
                          <span>{getPlatform(set)}</span>
                          <ArrowUpRight size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* =========================================================================
          LIGHTWEIGHT ON-DEMAND MODAL PLAYER
          (Zero initial page weight, only mounted when the user triggers playback)
          ========================================================================= */}
      <AnimatePresence>
        {activeSet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveSet(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block mb-0.5">
                    Reproduciendo Sesión
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {getDisplayTitle(activeSet.title, djData.musicSets.indexOf(activeSet))}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveSet(null)}
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Cerrar reproductor"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Dynamic Embed Container */}
              <div className="p-4 sm:p-6 bg-black flex items-center justify-center min-h-[300px]">
                {(() => {
                  const embed = getEmbedData(activeSet);
                  if (!embed) return null;

                  if (embed.type === 'youtube') {
                    return (
                      <div className={`rounded-xl overflow-hidden border border-zinc-800 ${
                        embed.isShort ? 'h-[70vh] max-h-[640px] aspect-[9/16]' : 'w-full aspect-video'
                      }`}>
                        <iframe
                          src={embed.src}
                          title={activeSet.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    );
                  }

                  if (embed.type === 'soundcloud') {
                    return (
                      <div className="w-full h-[180px] rounded-xl overflow-hidden border border-zinc-800">
                        <iframe
                          src={embed.src}
                          title={activeSet.title}
                          className="w-full h-full"
                          allow="autoplay"
                        ></iframe>
                      </div>
                    );
                  }

                  // Generic external link fallback
                  return (
                    <div className="text-center py-12 space-y-4">
                      <p className="text-zinc-400 text-sm">
                        Esta sesión está disponible en su plataforma nativa.
                      </p>
                      <a
                        href={activeSet.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                      >
                        <span>Abrir en {getPlatform(activeSet)}</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  );
                })()}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-zinc-900 bg-zinc-950/80 flex items-center justify-between text-xs text-zinc-500">
                <span>{activeSet.genre} • {activeSet.duration}</span>
                <a
                  href={activeSet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-300 transition-colors flex items-center gap-1"
                >
                  Abrir enlace directo <ArrowUpRight size={12} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
