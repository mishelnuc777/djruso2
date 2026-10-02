import { motion } from 'motion/react';
import { djData } from '../data/djData';
import { MusicSet } from '../types/dj';
import { parseYouTube, youTubeThumbnail } from '../utils/media';
import { Play, ArrowUpRight, Youtube } from 'lucide-react';

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

  return (
    <section id="music" className="py-24 md:py-36 bg-black relative border-t border-zinc-900 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            EDITORIAL HEADER
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[2px] bg-red-500"></span>
              <span className="text-red-400 font-bold tracking-[0.28em] uppercase text-xs">
                DJ DE DJS
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
              SELECTED SETS
            </h2>
          </div>

          {youtubeSocial && isValidUrl(youtubeSocial.url) && (
            <a
              href={youtubeSocial.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group self-start md:self-end pb-2"
            >
              <Youtube size={15} className="text-red-500" />
              <span>Canal Oficial en YouTube</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>

        {/* =========================================================================
            SELECTED SETS SHOWCASE (EDITORIAL RELEASE FORMAT - NO CARDS)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 items-start">
          {djData.musicSets.map((set, index) => {
            const displayTitle = getDisplayTitle(set.title, index);
            const targetUrl = isValidUrl(set.url) ? set.url : 'https://www.youtube.com/@djbryanacosta';
            const releaseNumber = String(index + 1).padStart(2, '0');

            return (
              <motion.article
                key={set.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`group flex flex-col ${index === 1 ? 'md:translate-y-4' : ''}`}
              >
                {/* Artwork Thumbnail - Open Release Presentation */}
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 block cursor-pointer"
                  aria-label={`Ver en YouTube: ${displayTitle}`}
                >
                  <img 
                    src={getCover(set)} 
                    alt={displayTitle}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      const yt = parseYouTube(set.url);
                      if (yt && !e.currentTarget.src.includes('hqdefault')) {
                        e.currentTarget.src = youTubeThumbnail(yt.id);
                      }
                    }}
                  />

                  {/* Very subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

                  {/* Elegant Minimal Play Trigger */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-500 group-hover:scale-105 transition-all duration-300"
                    >
                      <Play size={18} className="translate-x-0.5" fill="currentColor" />
                    </span>
                  </div>

                  {/* Duration Tag if present */}
                  {set.duration && (
                    <div className="absolute bottom-3 right-3 pointer-events-none">
                      <span className="text-[10px] font-mono tracking-wider text-zinc-300 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
                        {set.duration}
                      </span>
                    </div>
                  )}
                </a>

                {/* Editorial Metadata & Release Details */}
                <div className="pt-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-2xl sm:text-3xl font-light font-mono text-zinc-700 group-hover:text-red-500/80 transition-colors">
                      {releaseNumber}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                      {set.genre || 'YouTube Set'}
                    </span>
                  </div>

                  {/* Refined Title: font-medium / font-semibold, line-clamp-2, no font-black */}
                  <h3 className="text-lg sm:text-xl font-semibold text-zinc-100 tracking-normal group-hover:text-white transition-colors leading-snug line-clamp-2 mb-3">
                    <a href={targetUrl} target="_blank" rel="noopener noreferrer">
                      {displayTitle}
                    </a>
                  </h3>

                  {/* Editorial Text Link */}
                  <div className="mt-auto pt-1">
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 group-hover:text-red-400 transition-colors"
                    >
                      <span>Ver en YouTube</span>
                      <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
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
