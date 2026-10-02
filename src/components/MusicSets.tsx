import { motion } from 'motion/react';
import { djData } from '../data/djData';
import { MusicSet } from '../types/dj';
import { parseYouTube, youTubeThumbnail } from '../utils/media';
import { Play, ArrowUpRight, Youtube } from 'lucide-react';

export default function MusicSets() {
  const youtubeSocial = djData.socialMedia.find(
    s => s.platform.toLowerCase() === 'youtube'
  );

  // Helper para formatear títulos limpios sin corchetes
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

  // Helper para verificar URLs válidas
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
    <section id="music" className="scroll-mt-20 py-24 md:py-36 bg-black relative border-t border-zinc-900 overflow-hidden">
      
      {/* =========================================================================
          AMBIENTE VISUAL: LUCES LED ROJAS, BRUMA & HUMO DE CABINA / ESCENARIO
          ========================================================================= */}
      {/* Halo rojo escarlata superior derecho */}
      <div className="absolute top-1/4 right-0 w-[650px] h-[650px] bg-red-600/15 rounded-full blur-[170px] pointer-events-none" />

      {/* Halo rojo carmesí inferior izquierdo */}
      <div className="absolute bottom-10 -left-20 w-[600px] h-[600px] bg-red-700/12 rounded-full blur-[180px] pointer-events-none" />

      {/* Bruma / calor escénico central difuminado */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.12),rgba(153,27,27,0.06)_40%,transparent_75%)] blur-[120px] pointer-events-none" />

      {/* Capas sutiles de humo y neblina roja tipo show nocturno */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(220,38,38,0.1),transparent_45%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            EDITORIAL HEADER: SESIONES EN VIVO / SETS QUE ENCIENDEN LA NOCHE
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-3"
            >
              <span className="w-6 h-[2px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
              <span className="text-red-400 font-bold tracking-[0.28em] uppercase text-xs drop-shadow-sm">
                SESIONES EN VIVO
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] drop-shadow-lg"
            >
              SETS QUE ENCIENDEN LA NOCHE
            </motion.h2>
          </div>

          {youtubeSocial && isValidUrl(youtubeSocial.url) && (
            <motion.a
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              href={youtubeSocial.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group self-start md:self-end pb-2"
            >
              <Youtube size={15} className="text-red-500 group-hover:scale-110 transition-transform" />
              <span>Canal Oficial en YouTube</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          )}
        </div>

        {/* =========================================================================
            SHOWCASE DE LOS 3 SETS (TARJETAS REFINADAS CON IDENTIDAD ROJA LED)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {djData.musicSets.map((set, index) => {
            const displayTitle = getDisplayTitle(set.title, index);
            const targetUrl = isValidUrl(set.url) ? set.url : 'https://www.youtube.com/@djbryanacosta';
            const releaseNumber = String(index + 1).padStart(2, '0');

            return (
              <motion.article
                key={set.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.6 }}
                className={`group relative flex flex-col p-4 sm:p-5 rounded-2xl bg-zinc-950/60 hover:bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 hover:border-red-500/50 transition-all duration-500 shadow-xl hover:shadow-[0_0_35px_rgba(239,68,68,0.18)] hover:-translate-y-1 overflow-hidden ${
                  index === 1 ? 'md:translate-y-2' : ''
                }`}
              >
                {/* Línea luminosa LED roja superior en hover */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/0 to-transparent group-hover:via-red-500/80 transition-all duration-700" />

                {/* Resplandor sutil interno en hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/0 via-red-600/8 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Artwork Thumbnail con Play Trigger y Duración */}
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 block cursor-pointer border border-zinc-800/70 group-hover:border-red-500/40 transition-colors duration-300"
                  aria-label={`Ver set en YouTube: ${displayTitle}`}
                >
                  <img 
                    src={getCover(set)} 
                    alt={displayTitle}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      const yt = parseYouTube(set.url);
                      if (yt && !e.currentTarget.src.includes('hqdefault')) {
                        e.currentTarget.src = youTubeThumbnail(yt.id);
                      }
                    }}
                  />

                  {/* Gradiente cinemático oscuro sobre miniatura */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                  {/* Botón de Play interactivo con halo LED rojo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-500 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] group-hover:scale-110 transition-all duration-300"
                    >
                      <Play size={19} className="translate-x-0.5" fill="currentColor" />
                    </span>
                  </div>

                  {/* Etiqueta de duración en esquina inferior */}
                  {set.duration && (
                    <div className="absolute bottom-3 right-3 pointer-events-none">
                      <span className="text-[10px] font-mono tracking-wider text-zinc-200 bg-black/80 backdrop-blur-sm px-2.5 py-0.5 rounded-md border border-white/10 shadow-sm">
                        {set.duration}
                      </span>
                    </div>
                  )}
                </a>

                {/* Metadata y detalles del Set */}
                <div className="pt-5 flex flex-col flex-1 relative z-10">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-2xl sm:text-3xl font-light font-mono text-zinc-600 group-hover:text-red-500 transition-colors duration-300">
                      {releaseNumber}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500/70 group-hover:bg-red-400 group-hover:shadow-[0_0_6px_rgba(239,68,68,0.9)] transition-all duration-300" />
                      {set.genre || 'YouTube Set'}
                    </span>
                  </div>

                  {/* Título del Set */}
                  <h3 className="text-lg sm:text-xl font-semibold text-zinc-100 tracking-normal group-hover:text-white transition-colors leading-snug line-clamp-2 mb-4">
                    <a href={targetUrl} target="_blank" rel="noopener noreferrer">
                      {displayTitle}
                    </a>
                  </h3>

                  {/* Botón CTA: Reproducir Set */}
                  <div className="mt-auto pt-2">
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-zinc-900/80 hover:bg-red-950/60 border border-zinc-800 group-hover:border-red-500/40 text-xs font-semibold uppercase tracking-wider text-zinc-300 group-hover:text-white transition-all shadow-sm group-hover:shadow-[0_0_15px_rgba(239,68,68,0.25)] cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Play size={11} className="text-red-500" fill="currentColor" />
                        <span>Reproducir Set</span>
                      </span>
                      <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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
