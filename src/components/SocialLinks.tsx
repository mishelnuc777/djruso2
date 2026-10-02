import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Instagram, Youtube, ArrowUpRight } from 'lucide-react';

// TikTok SVG Icon (vector nítido de alta precisión)
function TikTokIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.88-4.49V8.65a8.28 8.28 0 0 0 4.84 1.54V6.74a4.85 4.85 0 0 1-.95-.05z" />
    </svg>
  );
}

interface SocialTheme {
  borderHover: string;
  cardGlow: string;
  cardHoverShadow: string;
  topLine: string;
  iconBorderHover: string;
  iconShadow: string;
  iconAura: string;
  iconColorHover: string;
  titleColorHover: string;
  titleGlow: string;
  dotColor: string;
  dotGlow: string;
  arrowBorderHover: string;
  arrowBgHover: string;
  arrowShadow: string;
  arrowColorHover: string;
}

interface SocialChannel {
  id: string;
  name: string;
  handle: string;
  url: string;
  icon: (className?: string) => ReactNode;
  theme: SocialTheme;
}

const socialChannels: SocialChannel[] = [
  {
    id: 'instagram',
    name: 'INSTAGRAM',
    handle: '@djbryanacosta',
    url: 'https://www.instagram.com/djbryanacosta/',
    icon: (className = 'w-6 h-6') => <Instagram className={className} />,
    theme: {
      borderHover: 'group-hover:border-pink-500/50',
      cardGlow: 'bg-gradient-to-r from-purple-600/0 via-pink-600/12 to-orange-500/0',
      cardHoverShadow: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.18)]',
      topLine: 'bg-gradient-to-r from-transparent via-pink-500/90 to-transparent',
      iconBorderHover: 'group-hover:border-pink-500/70',
      iconShadow: 'group-hover:shadow-[0_0_28px_rgba(236,72,153,0.5)]',
      iconAura: 'bg-pink-500/20',
      iconColorHover: 'group-hover:text-pink-400',
      titleColorHover: 'group-hover:text-pink-400',
      titleGlow: 'group-hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]',
      dotColor: 'bg-pink-500',
      dotGlow: 'group-hover:shadow-[0_0_8px_rgba(236,72,153,0.9)]',
      arrowBorderHover: 'group-hover:border-pink-500/60',
      arrowBgHover: 'group-hover:bg-pink-600/10',
      arrowShadow: 'group-hover:shadow-[0_0_20px_rgba(236,72,153,0.35)]',
      arrowColorHover: 'group-hover:text-pink-400',
    },
  },
  {
    id: 'tiktok',
    name: 'TIKTOK',
    handle: '@djbryanacosta',
    url: 'https://www.tiktok.com/@djbryanacosta',
    icon: (className = 'w-6 h-6') => <TikTokIcon className={className} />,
    theme: {
      borderHover: 'group-hover:border-cyan-400/50',
      cardGlow: 'bg-gradient-to-r from-cyan-500/0 via-cyan-500/12 to-rose-500/0',
      cardHoverShadow: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.18)]',
      topLine: 'bg-gradient-to-r from-transparent via-cyan-400/90 to-transparent',
      iconBorderHover: 'group-hover:border-cyan-400/70',
      iconShadow: 'group-hover:shadow-[0_0_28px_rgba(6,182,212,0.5)]',
      iconAura: 'bg-cyan-500/20',
      iconColorHover: 'group-hover:text-cyan-300',
      titleColorHover: 'group-hover:text-cyan-300',
      titleGlow: 'group-hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]',
      dotColor: 'bg-cyan-400',
      dotGlow: 'group-hover:shadow-[0_0_8px_rgba(6,182,212,0.9)]',
      arrowBorderHover: 'group-hover:border-cyan-400/60',
      arrowBgHover: 'group-hover:bg-cyan-600/10',
      arrowShadow: 'group-hover:shadow-[0_0_20px_rgba(6,182,212,0.35)]',
      arrowColorHover: 'group-hover:text-cyan-300',
    },
  },
  {
    id: 'youtube',
    name: 'YOUTUBE',
    handle: '@djbryanacosta',
    url: 'https://www.youtube.com/@djbryanacosta',
    icon: (className = 'w-6 h-6') => <Youtube className={className} />,
    theme: {
      borderHover: 'group-hover:border-red-500/50',
      cardGlow: 'bg-gradient-to-r from-red-600/0 via-red-600/14 to-transparent',
      cardHoverShadow: 'hover:shadow-[0_0_40px_rgba(239,68,68,0.2)]',
      topLine: 'bg-gradient-to-r from-transparent via-red-500/90 to-transparent',
      iconBorderHover: 'group-hover:border-red-500/70',
      iconShadow: 'group-hover:shadow-[0_0_28px_rgba(239,68,68,0.5)]',
      iconAura: 'bg-red-500/20',
      iconColorHover: 'group-hover:text-red-400',
      titleColorHover: 'group-hover:text-red-400',
      titleGlow: 'group-hover:drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]',
      dotColor: 'bg-red-500',
      dotGlow: 'group-hover:shadow-[0_0_8px_rgba(239,68,68,0.9)]',
      arrowBorderHover: 'group-hover:border-red-500/60',
      arrowBgHover: 'group-hover:bg-red-600/10',
      arrowShadow: 'group-hover:shadow-[0_0_20px_rgba(239,68,68,0.35)]',
      arrowColorHover: 'group-hover:text-red-400',
    },
  },
];

export default function SocialLinks() {
  return (
    <section id="social" className="scroll-mt-20 py-24 md:py-32 lg:py-36 bg-black relative border-t border-zinc-900 overflow-hidden">
      
      {/* =========================================================================
          AMBIENTE DE ESCENARIO: LUCES SUTILES, BRUMA & HUMO FLOTANTE
          ========================================================================= */}
      {/* Foco de luz violeta/azul flotante (breathe sutil) */}
      <motion.div 
        animate={{ 
          scale: [1, 1.08, 1], 
          opacity: [0.65, 0.9, 0.65],
          x: [0, 20, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[650px] h-[450px] bg-indigo-600/10 rounded-full blur-[170px] pointer-events-none" 
      />

      {/* Foco de luz magenta/cian dinámico */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1], 
          opacity: [0.5, 0.75, 0.5],
          y: [0, -25, 0]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/2 right-10 -translate-y-1/2 w-[550px] h-[400px] bg-purple-600/8 rounded-full blur-[180px] pointer-events-none" 
      />

      {/* Bruma / humo escénico difuminado central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),rgba(168,85,247,0.04)_40%,transparent_75%)] blur-[120px] pointer-events-none" />

      {/* Capas sutiles de neblina de show en vivo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(236,72,153,0.06),transparent_40%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            EDITORIAL HEADER: REDES SOCIALES / CONECTA CON BRYAN
            ========================================================================= */}
        <div className="mb-14 md:mb-18">
          <motion.div 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-3"
          >
            <span className="w-6 h-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
            <span className="text-blue-400 font-bold tracking-[0.28em] uppercase text-xs drop-shadow-sm">
              REDES SOCIALES
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] drop-shadow-lg"
          >
            CONECTA CON BRYAN
          </motion.h2>
        </div>

        {/* =========================================================================
            FILAS HORIZONTALES CON IDENTIDAD CROMÁTICA PROPIA (INSTAGRAM, TIKTOK, YOUTUBE)
            ========================================================================= */}
        <div className="space-y-4 sm:space-y-5">
          {socialChannels.map((channel, index) => {
            const { theme } = channel;

            return (
              <motion.a
                key={channel.id}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                aria-label={`Visitar canal oficial de ${channel.name} de DJ Bryan Acosta`}
                className={`group relative w-full rounded-2xl bg-zinc-950/70 hover:bg-zinc-900/70 backdrop-blur-xl border border-zinc-800/80 ${theme.borderHover} p-6 sm:p-8 lg:p-9 transition-all duration-500 overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 cursor-pointer shadow-xl ${theme.cardHoverShadow} hover:-translate-y-1 block`}
              >
                {/* Línea luminosa LED superior con color de la plataforma que recorre la fila en hover */}
                <div className={`absolute top-0 inset-x-0 h-[1.5px] ${theme.topLine} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                {/* Resplandor suave interno temático en hover */}
                <div className={`absolute -inset-1 ${theme.cardGlow} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                {/* LADO IZQUIERDO: Icono Neón + Nombre + Usuario */}
                <div className="relative z-10 flex items-center gap-5 sm:gap-7 min-w-0">
                  
                  {/* Cápsula de icono con resplandor neón/LED personalizado */}
                  <div className="relative shrink-0">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 ${theme.iconBorderHover} text-zinc-300 ${theme.iconColorHover} flex items-center justify-center transition-all duration-500 ${theme.iconShadow} group-hover:scale-105`}>
                      {channel.icon(`w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 group-hover:scale-110 text-zinc-200 ${theme.iconColorHover}`)}
                    </div>
                    {/* Aura LED sutil alrededor del icono */}
                    <div className={`absolute inset-0 rounded-2xl ${theme.iconAura} blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  </div>

                  {/* Textos: Nombre de la Red + Usuario @djbryanacosta */}
                  <div className="min-w-0">
                    <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight uppercase text-white ${theme.titleColorHover} ${theme.titleGlow} transition-all duration-300 leading-tight`}>
                      {channel.name}
                    </h3>
                    
                    <div className="mt-1 flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${theme.dotColor} ${theme.dotGlow} transition-all duration-300`} />
                      <span className="text-xs sm:text-sm font-mono tracking-wider text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300">
                        {channel.handle}
                      </span>
                    </div>
                  </div>

                </div>

                {/* LADO DERECHO: Flecha externa en cápsula interactiva adaptada */}
                <div className="relative z-10 flex items-center justify-end sm:self-center shrink-0">
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-zinc-900/80 border border-zinc-800/90 ${theme.arrowBorderHover} ${theme.arrowBgHover} ${theme.arrowShadow} flex items-center justify-center transition-all duration-300`}>
                    <ArrowUpRight 
                      size={20} 
                      className={`text-zinc-500 ${theme.arrowColorHover} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300`} 
                    />
                  </div>
                </div>

              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
