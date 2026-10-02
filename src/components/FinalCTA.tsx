import { motion } from 'motion/react';

const WHATSAPP_URL = "https://wa.me/593992710709?text=Hola%20Bryan%2C%20vi%20tu%20p%C3%A1gina%20web%20y%20quisiera%20cotizar%20un%20evento.%20%C2%BFMe%20ayudas%20con%20disponibilidad%20y%20opciones%3F";

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

export default function FinalCTA() {
  return (
    <section className="relative py-24 md:py-36 bg-black border-t border-zinc-900 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Dominant Hero Portrait of Bryan Acosta (55% on desktop, integrated, open) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 order-1"
          >
            <div className="relative w-full h-[480px] sm:h-[600px] lg:h-[700px] overflow-hidden rounded-xl bg-zinc-950 group">
              <img 
                src="/assets/images/bryan-final.png.png" 
                alt="DJ Bryan Acosta"
                className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
              
              {/* Cinematic bottom gradient blend so photo feels natural */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Monumental Headline, Signature & WhatsApp Action (45% on desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col justify-center order-2 text-left"
          >
            {/* Monumental Title */}
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.88] mb-6">
              DJ BRYAN<br />ACOSTA
            </h2>

            {/* Signature Phrase */}
            <div className="flex items-center gap-3 mb-10">
              <span className="w-6 h-[1.5px] bg-blue-500"></span>
              <p className="text-zinc-400 text-sm sm:text-base font-light tracking-wide italic">
                «Desde la última loma de Caspigasi»
              </p>
            </div>

            {/* Primary CTA */}
            <div>
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hablar por WhatsApp con Bryan Acosta"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg transition-all shadow-[0_0_25px_rgba(37,211,102,0.35)] hover:shadow-[0_0_35px_rgba(37,211,102,0.5)] cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
                <span>HABLAR POR WHATSAPP</span>
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
