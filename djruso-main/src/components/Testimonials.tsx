import { motion } from 'motion/react';
import { djData } from '../data/djData';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-500 font-medium tracking-[0.2em] uppercase text-sm mb-3"
          >
            Comentarios de Clientes
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white tracking-tight"
          >
            Testimonios
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {djData.testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 relative"
            >
              <Quote className="absolute top-8 right-8 text-zinc-800" size={48} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-blue-500 text-blue-500" />
                ))}
              </div>
              
              <p className="text-zinc-300 text-lg leading-relaxed mb-8 relative z-10">
                "{testimonial.comment}"
              </p>
              
              <div>
                <h4 className="text-white font-bold">{testimonial.clientName}</h4>
                <p className="text-zinc-500 text-sm">{testimonial.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
