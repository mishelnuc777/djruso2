import { motion } from 'motion/react';
import { djData } from '../data/djData';
import { Disc3, Activity } from 'lucide-react';

export default function Genres() {
  return (
    <section className="py-24 bg-black relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-blue-500"></span>
              <span className="text-blue-400 font-semibold tracking-[0.25em] uppercase text-xs">
                Firma Sonora
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              Estilos & Selección Musical
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-widest font-semibold">
            <Activity size={14} className="text-blue-500" />
            <span>Versatilidad en pista de baile</span>
          </div>
        </div>

        {/* Minimalist Editorial Genres Display (Lines & Large Typography) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-zinc-900">
          {djData.genres.map((genre, index) => {
            const formattedIndex = String(index + 1).padStart(2, '0');

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="group relative border-b border-zinc-900 p-8 sm:p-10 flex flex-col justify-between hover:bg-zinc-950/60 transition-colors duration-300"
              >
                {/* Index & Micro-indicator */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold tracking-widest text-zinc-600 group-hover:text-blue-400 transition-colors">
                    {formattedIndex}
                  </span>
                  <Disc3 
                    size={18} 
                    className="text-zinc-700 group-hover:text-blue-400 group-hover:rotate-90 transition-all duration-500" 
                  />
                </div>

                {/* Genre Name in Large Bold Typography */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase group-hover:translate-x-1.5 transition-transform duration-300">
                    {genre}
                  </h3>
                  
                  {/* Subtle accent hairline on hover */}
                  <div className="w-0 group-hover:w-12 h-[2px] bg-blue-500 mt-4 transition-all duration-300"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
