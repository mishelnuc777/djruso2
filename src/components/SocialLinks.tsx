import { motion } from 'motion/react';
import { djData } from '../data/djData';
import { Instagram, Youtube, Radio, ArrowUpRight, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SocialLinks() {
  // Helper to detect if a URL is a real live external URL
  const isValidUrl = (url?: string): boolean => {
    if (!url) return false;
    const trimmed = url.trim();
    return (trimmed.startsWith('https://') || trimmed.startsWith('http://')) && !trimmed.includes('[');
  };

  // SVG for TikTok (not present in standard Lucide icons)
  const TikTokIcon = ({ size = 22 }: { size?: number }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.88-4.49V8.65a8.28 8.28 0 0 0 4.84 1.54V6.74a4.85 4.85 0 0 1-.95-.05z"/>
    </svg>
  );

  // Platform configuration and priority sorting
  // Priority 1: Instagram, TikTok, YouTube
  // Secondary: SoundCloud (if valid)
  // Excluded: Facebook (if not valid) & Spotify (deferred per instructions)
  const getPlatformMeta = (platformName: string) => {
    const p = platformName.toLowerCase();
    if (p.includes('instagram')) {
      return {
        priority: 1,
        name: 'Instagram',
        icon: <Instagram size={24} />,
        accentHover: 'group-hover:text-pink-400 group-hover:border-pink-500/40',
        description: 'Cobertura en directo de eventos, fechas de gira y momentos en cabina.',
        badge: 'Canal Principal'
      };
    }
    if (p.includes('tiktok')) {
      return {
        priority: 2,
        name: 'TikTok',
        icon: <TikTokIcon size={24} />,
        accentHover: 'group-hover:text-cyan-400 group-hover:border-cyan-500/40',
        description: 'Clips cortos, mezclas rápidas y energía de la pista de baile.',
        badge: 'Video Corto'
      };
    }
    if (p.includes('youtube')) {
      return {
        priority: 3,
        name: 'YouTube',
        icon: <Youtube size={24} />,
        accentHover: 'group-hover:text-red-400 group-hover:border-red-500/40',
        description: 'Grabaciones completas, resúmenes de festivales y sets visuales.',
        badge: 'Sets en Video'
      };
    }
    if (p.includes('soundcloud')) {
      return {
        priority: 4,
        name: 'SoundCloud',
        icon: <Radio size={24} />,
        accentHover: 'group-hover:text-orange-400 group-hover:border-orange-500/40',
        description: 'Sesiones de larga duración y mezclas continuas en alta fidelidad.',
        badge: 'Audio'
      };
    }
    return null;
  };

  // Filter existing social media in djData:
  // - Include Instagram, TikTok, YouTube (always as core channels)
  // - Include SoundCloud only if valid URL exists
  // - Exclude Facebook if invalid per rules ("Facebook puede mantenerse únicamente si existe una URL real y válida")
  // - Exclude Spotify per rules ("Spotify NO debe convertirse todavía en reproductor ni elemento principal")
  const rawPlatforms = djData.socialMedia || [];

  const processedList = rawPlatforms
    .map((item) => {
      const meta = getPlatformMeta(item.platform);
      if (!meta) return null;

      // Rule: Facebook only if valid (already filtered by meta being null for facebook)
      // Rule: SoundCloud only if valid URL
      if (item.platform.toLowerCase() === 'soundcloud' && !isValidUrl(item.url)) {
        return null;
      }

      return {
        ...item,
        ...meta,
        isValid: isValidUrl(item.url)
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => a.priority - b.priority);

  return (
    <section id="social" className="py-24 md:py-32 bg-black relative border-t border-zinc-900 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            SECTION HEADER
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-blue-500"></span>
              <span className="text-blue-400 font-bold tracking-[0.25em] uppercase text-xs">
                CANALES OFICIALES & COMUNIDAD
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
              Ecosistema<br />Digital
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg font-light max-w-xl mt-4 leading-relaxed">
              Sigue la actividad en cabina, próximos anuncios de eventos y producciones audiovisuales a través de los canales oficiales.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-widest font-mono pb-2">
            <ShieldCheck size={16} className="text-blue-500" />
            <span>Canales Verificados</span>
          </div>
        </div>

        {/* =========================================================================
            PLATFORMS GRID (Priority Editorial Layout)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {processedList.map((social, index) => {
            const isClickable = social.isValid;

            const CardContent = (
              <div className="h-full flex flex-col justify-between p-7 sm:p-8">
                <div>
                  {/* Top Bar: Icon & Status Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-zinc-300 flex items-center justify-center transition-colors duration-300 ${social.accentHover}`}>
                      {social.icon}
                    </div>

                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {isClickable ? social.badge : 'Próximamente'}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-black text-white tracking-tight uppercase mb-2 group-hover:text-blue-400 transition-colors">
                    {social.name}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                    {social.description}
                  </p>
                </div>

                {/* Bottom Action Indicator */}
                <div className="pt-6 mt-6 border-t border-zinc-900 flex items-center justify-between text-xs">
                  {isClickable ? (
                    <>
                      <span className="font-semibold text-zinc-300 group-hover:text-white transition-colors">
                        Visitar perfil oficial
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-zinc-700 flex items-center justify-center transition-all">
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </>
                  ) : (
                    <span className="text-zinc-600 font-medium">
                      Enlace oficial disponible próximamente
                    </span>
                  )}
                </div>
              </div>
            );

            return isClickable ? (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                aria-label={`Visitar canal oficial de ${social.name} de ${djData.artistName}`}
                className="group relative rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700/90 transition-all duration-300 hover:-translate-y-1 block shadow-xl"
              >
                {CardContent}
              </motion.a>
            ) : (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative rounded-2xl bg-zinc-950/50 border border-zinc-900 opacity-90 block"
              >
                {CardContent}
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================================
            COMMERCIAL CTA BANNER (Bridging Social Media to Direct Booking)
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-950 to-black border border-zinc-800 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block mb-1">
              Contrataciones & Fechas
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
              ¿Quieres a DJ Bryan Acosta en tu próximo evento?
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm font-light mt-1.5 max-w-lg">
              Consulta disponibilidad y agenda con anticipación para clubs, festivales y celebraciones exclusivas.
            </p>
          </div>

          <a
            href="#contact"
            className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_25px_rgba(37,99,235,0.35)] hover:shadow-[0_0_35px_rgba(37,99,235,0.55)] flex items-center gap-2 shrink-0 group"
          >
            <span>Solicitar Disponibilidad</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
