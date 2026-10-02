import { motion } from 'motion/react';
import { djData } from '../data/djData';
import { Calendar, MapPin } from 'lucide-react';

export default function Events() {
  return (
    <section id="events" className="py-24 bg-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-500 font-medium tracking-[0.2em] uppercase text-sm mb-3"
          >
            Fechas de Tour
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white tracking-tight"
          >
            Próximos Eventos
          </motion.h3>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {djData.events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center transition-colors group"
            >
              {/* Event Image */}
              <div className="w-full md:w-48 h-48 md:h-32 rounded-xl overflow-hidden shrink-0">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Event Details */}
              <div className="flex-grow w-full">
                <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{event.title}</h4>
                <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 md:gap-8 text-sm text-zinc-300 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-500" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-blue-500" />
                    {event.location}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="w-full md:w-auto shrink-0 mt-4 md:mt-0">
                <a 
                  href="#contact"
                  className="block w-full md:w-auto px-6 py-3 bg-zinc-800 hover:bg-white hover:text-zinc-950 text-white font-semibold rounded-full text-center transition-all"
                >
                  Reservar Entradas
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
