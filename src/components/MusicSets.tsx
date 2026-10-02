import { motion } from 'motion/react';
import { djData } from '../data/djData';
import { MusicSet } from '../types/dj';
import { parseYouTube, youTubeThumbnail } from '../utils/media';
import { 
  Play, 
  Clock, 
  ArrowUpRight, 
  Youtube, 
  Disc3, 
  Radio, 
  Headphones 
} from 'lucide-react';

export default function MusicSets() {
  const youtubeSocial = djData.socialMedia.find(
    s => s.platform.toLowerCase() === 'youtube'
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

  // Portada: miniatura configurada o calculada de YouTube
  const getCover = (set: MusicSet): string => {
    if (set.coverImage) return set.coverImage;
    const yt = parseYouTube(set.url);
    if (yt) return youTubeThumbnail(yt.id);
    return '';
  };

  // Plataforma: se detecta sola si el enlace es de YouTube
  const getPlatform = (set: MusicSet): string =>
    parseYouTube(set.url) ? 'YouTube' : set.platform;

  // Platform icon helper
  const renderPlatformBadge = (platform: string) => {
    const p = platform.toLowerCase();
    let icon = <Headphones size={13} />;
    if (p.includes('youtube')) icon = <Youtube size={13} className="text-red-500" />;
    else if (p.includes('soundcloud')) icon = <Radio size={13} className="text-orange-400" />;
    else if (p.includes('mixcloud')) icon = <Disc3 size={13} className="text-blue-400" />;

    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md border border-white/10 text-zinc-200 shadow-md">
        {icon}
        <span>{platform}</span>
      </span>
    );
  };

  return (
    <section id="music" className="py-24 md:py-32 bg-zinc-950 relative border-t border-zinc-900">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            SECTION HEADER
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-red-500"></span>
              <span className="text-red-400 font-semibold tracking-[0.25em] uppercase text-xs">
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

          {youtubeSocial && isValidUrl(youtubeSocial.url) && (
            <a
              href={youtubeSocial.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group self-start md:self-end pb-1"
            >
              <span>Ver canal en YouTube</span>
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>

        {/* =========================================================================
            BALANCED 3-CARD VIDEO GRID (PREVIEW DIRECTA A YOUTUBE)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {djData.musicSets.map((set, index) => {
            const displayTitle = getDisplayTitle(set.title, index);
            const targetUrl = isValidUrl(set.url) ? set.url : 'https://www.youtube.com/@djbryanacosta';

            return (
              <motion.div
                key={set.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="rounded-2xl bg-black border border-zinc-800/90 hover:border-zinc-700 transition-all duration-300 overflow-hidden flex flex-col group shadow-xl"
              >
                {/* 16:9 Thumbnail Header - Enlace directo a YouTube */}
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-[16/9] overflow-hidden bg-zinc-900 block cursor-pointer"
                  aria-label={`Ver en YouTube: ${displayTitle}`}
                >
                  <img 
                    src={getCover(set)} 
                    alt={displayTitle}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      const yt = parseYouTube(set.url);
                      if (yt && !e.currentTarget.src.includes('hqdefault')) {
                        e.currentTarget.src = youTubeThumbnail(yt.id);
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-colors"></div>

                  {/* Play Trigger Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="w-14 h-14 rounded-full bg-red-600/90 group-hover:bg-red-500 text-white flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.5)] transform group-hover:scale-110 transition-all duration-300"
                    >
                      <Play size={22} className="translate-x-0.5" fill="currentColor" />
                    </span>
                  </div>

                  {/* Platform Badge (Top Left) */}
                  <div className="absolute top-3.5 left-3.5 pointer-events-none">
                    {renderPlatformBadge(getPlatform(set))}
                  </div>

                  {/* Duration Pill (Bottom Right) */}
                  {set.duration && (
                    <div className="absolute bottom-3 right-3 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-black/80 backdrop-blur-md text-zinc-300 border border-white/10 shadow-lg">
                        <Clock size={12} className="text-red-400" />
                        <span>{set.duration}</span>
                      </span>
                    </div>
                  )}
                </a>

                {/* Card Information */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Genre & Meta Indicator */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 mb-3">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span className="text-red-400 uppercase tracking-wider text-[11px] font-bold">
                        {set.genre}
                      </span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-500 text-[11px] font-medium">Dj Bryan Acosta</span>
                    </div>

                    {/* Verified YouTube Title */}
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group/title"
                      title={displayTitle}
                    >
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight uppercase leading-snug line-clamp-2 group-hover/title:text-red-400 group-hover:text-red-400 transition-colors mb-4">
                        {displayTitle}
                      </h3>
                    </a>
                  </div>

                  {/* Elegant "Ver en YouTube" Action Button */}
                  <div className="pt-4 border-t border-zinc-900 flex items-center justify-between gap-3 mt-auto">
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-5 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.25)] flex items-center justify-center gap-2.5 group/btn cursor-pointer"
                    >
                      <Youtube size={17} className="transition-transform group-hover/btn:scale-110" />
                      <span>Ver en YouTube</span>
                      <ArrowUpRight size={14} className="opacity-80 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
