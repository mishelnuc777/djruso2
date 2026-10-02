import { motion } from 'motion/react';
import { djData } from '../data/djData';
import { 
  ArrowRight, 
  Sparkles, 
  MessageCircle, 
  Disc3, 
  Zap, 
  Flame,
  MapPin 
} from 'lucide-react';

const WHATSAPP_URL = "https://wa.me/593992710709?text=Hola%20Bryan%2C%20vi%20tu%20p%C3%A1gina%20web%20y%20quisiera%20cotizar%20un%20evento.%20%C2%BFMe%20ayudas%20con%20disponibilidad%20y%20opciones%3F";

export default function Packages() {
  const getServiceBadge = (index: number) => {
    switch (index) {
      case 0:
        return {
          icon: <Disc3 size={12} className="text-blue-400" />,
          label: 'Show en Vivo'
        };
      case 1:
        return {
          icon: <Zap size={12} className="text-blue-400" />,
          label: 'Producción Técnica'
        };
      case 2:
        return {
          icon: <Flame size={12} className="text-blue-400" />,
          label: 'Efectos & Extras'
        };
      default:
        return {
          icon: <Sparkles size={12} className="text-blue-400" />,
          label: 'Servicio'
        };
    }
  };

  const getServiceImagePosition = (index: number) => {
    switch (index) {
      case 0:
        // Show DJ: encuadre superior para rostro, gafas y cabina de Bryan Acosta
        return 'object-[center_top]';
      case 1:
        // Producción Técnica: estructura, iluminación y sonido en escena
        return 'object-[center_top]';
      case 2:
        // Efectos Especiales: chispas frías y atmósfera
        return 'object-[center_top]';
      default:
        return 'object-[center_top]';
    }
  };

  return (
    <section id="packages" className="py-24 md:py-32 bg-black relative border-t border-zinc-900 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            SECTION HEADER
            ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-3"
          >
            <span className="w-6 h-[1px] bg-blue-500"></span>
            <span className="text-blue-400 font-semibold tracking-[0.25em] uppercase text-xs">
              Servicios & Producción
            </span>
            <span className="w-6 h-[1px] bg-blue-500"></span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-4"
          >
            Servicios para Eventos
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed"
          >
            Propuestas diseñadas para adaptarse al tamaño, atmósfera y requerimientos técnicos de tu celebración. Cada servicio se cotiza de forma personalizada.
          </motion.p>
        </div>

        {/* =========================================================================
            BALANCED 3-CARD VISUAL GRID
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {djData.packages.map((pkg, index) => {
            const isFeatured = Boolean(pkg.isPopular);
            const cardTitle = pkg.name || `Servicio ${index + 1}`;
            const includes = pkg.includes || [];
            const badge = getServiceBadge(index);

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-3xl bg-zinc-950 border transition-all duration-500 overflow-hidden flex flex-col group shadow-2xl hover:shadow-[0_0_40px_rgba(37,99,235,0.15)] ${
                  isFeatured 
                    ? 'border-blue-500/60 hover:border-blue-400' 
                    : 'border-zinc-800/90 hover:border-zinc-700'
                }`}
              >
                {/* Visual Image Header */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                  {pkg.image && (
                    <img
                      src={pkg.image}
                      alt={cardTitle}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  )}
                  
                  {/* Dark gradient overlay blending with card body */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-500"></div>

                  {/* Top Left Floating Category Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-black/80 backdrop-blur-md border border-white/10 text-white shadow-lg">
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>
                  </div>

                  {/* Top Right Floating Index */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 shadow-lg">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow -mt-6 sm:-mt-8 relative z-10 bg-gradient-to-b from-transparent via-zinc-950 to-zinc-950">
                  <div>
                    {/* Title */}
                    <h3 className="text-2xl font-black text-white tracking-tight uppercase mb-3 group-hover:text-blue-400 transition-colors">
                      {cardTitle}
                    </h3>

                    {/* Brief Description */}
                    {pkg.description && (
                      <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                        {pkg.description}
                      </p>
                    )}

                    {/* Concise Elements / "Puede incluir" Tag Pills */}
                    <div className="mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-3">
                        Puede incluir
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {includes.map((item, i) => (
                          <span 
                            key={i} 
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900/90 border border-zinc-800 text-zinc-300"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="pt-6 border-t border-zinc-900 mt-auto">
                    <a 
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Solicitar cotización para ${cardTitle}`}
                      className="w-full py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 group/btn cursor-pointer"
                    >
                      <MessageCircle size={15} />
                      <span>Solicitar cotización</span>
                    </a>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* =========================================================================
            NATIONWIDE AVAILABILITY FOOTER NOTE
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 rounded-2xl bg-zinc-950/70 border border-zinc-900 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h4 className="text-white text-base sm:text-lg font-bold tracking-tight uppercase mb-1">
                Disponibilidad en Todo el Ecuador
              </h4>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Bryan Acosta trabaja en diferentes ciudades del país (Quito, Ambato, Ibarra, Puyo, Esmeraldas, Lago Agrio, Putumayo, Manta y más) adaptándose a los requerimientos técnicos y presupuesto de cada evento.
              </p>
            </div>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 text-xs font-bold uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 group cursor-pointer"
          >
            <MessageCircle size={15} className="text-blue-400" />
            <span>Consultar Disponibilidad</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
