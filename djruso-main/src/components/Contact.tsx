import { useState, useId, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { djData } from '../data/djData';
import { 
  MapPin, 
  Mail, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  Calendar, 
  Info,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    eventType: '',
    date: '',
    city: '',
    message: ''
  });

  const [formFeedback, setFormFeedback] = useState<{
    type: 'info' | 'success';
    message: string;
  } | null>(null);

  // Accessible unique IDs for form fields
  const nameId = useId();
  const eventTypeId = useId();
  const dateId = useId();
  const cityId = useId();
  const messageId = useId();

  // Helper to validate whether a contact value is real data (not a bracketed placeholder)
  const isValidContactValue = (val?: string): boolean => {
    if (!val) return false;
    const trimmed = val.trim();
    return !trimmed.startsWith('[') && !trimmed.endsWith(']') && trimmed.length > 2;
  };

  const hasPhone = isValidContactValue(djData.contact.phone);
  const hasEmail = isValidContactValue(djData.contact.email);
  const hasLocation = isValidContactValue(djData.contact.location);

  // Clean phone string for WhatsApp link
  const rawPhoneDigits = djData.contact.phone?.replace(/[^0-9]/g, '') || '';
  const isWhatsAppReady = hasPhone && rawPhoneDigits.length >= 7;

  // Build pre-filled WhatsApp message
  const defaultWhatsAppText = encodeURIComponent(
    'Hola DJ Ruso, me gustaría consultar disponibilidad para contratar tus servicios.'
  );
  const whatsappUrl = isWhatsAppReady 
    ? `https://wa.me/${rawPhoneDigits}?text=${defaultWhatsAppText}` 
    : null;

  // Handle Form Submission (Does not fake backend transmission)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setFormFeedback({
        type: 'info',
        message: 'Por favor, introduce tu nombre o el de tu productora para iniciar la solicitud.'
      });
      return;
    }

    if (isWhatsAppReady) {
      // If WhatsApp number is confirmed, build structured booking message
      const composedMsg = `Hola DJ Ruso, me gustaría solicitar una reserva:%0A- Nombre: ${encodeURIComponent(formData.name)}%0A- Evento: ${encodeURIComponent(formData.eventType || 'No especificado')}%0A- Fecha: ${encodeURIComponent(formData.date || 'Por definir')}%0A- Ciudad: ${encodeURIComponent(formData.city || 'No especificada')}%0A- Mensaje: ${encodeURIComponent(formData.message || 'Sin detalles adicionales')}`;
      window.open(`https://wa.me/${rawPhoneDigits}?text=${composedMsg}`, '_blank', 'noopener,noreferrer');
      setFormFeedback({
        type: 'success',
        message: 'Conectando directamente con el canal oficial de WhatsApp...'
      });
    } else {
      // Honest, transparent feedback: No backend or WhatsApp configured yet
      setFormFeedback({
        type: 'info',
        message: 'Canal de recepción en configuración: La recepción automatizada y línea directa de DJ Ruso se habilitarán próximamente. Mientras tanto, puedes conectar a través de los canales oficiales.'
      });
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-zinc-950 relative border-t border-zinc-900 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none"></div>

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
              Contrataciones & Booking
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
            Reserva tu Próxima Fecha
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed"
          >
            Inicia la conversación para asegurar la fecha de tu evento, club o festival. Coordinamos requerimientos técnicos y formato sonoro a medida.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: Commercial Statement & Direct Booking Channels
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block mb-2">
                Atención a Productoras & Particulares
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-4">
                Lleva la energía de DJ Ruso a tu escenario
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                Cada evento cuenta con una selección musical personalizada, adaptación al formato del espacio y soporte técnico para garantizar una atmósfera de máximo impacto.
              </p>
            </div>

            {/* Valid Contact Information (Only rendered if real data is present) */}
            {(hasPhone || hasEmail || hasLocation) && (
              <div className="space-y-3 pt-2">
                {hasPhone && (
                  <div className="p-4 rounded-xl bg-black/60 border border-zinc-900 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 text-blue-400 flex items-center justify-center shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-semibold block mb-0.5">
                        WhatsApp / Teléfono Directo
                      </span>
                      <a 
                        href={`https://wa.me/${rawPhoneDigits}?text=${defaultWhatsAppText}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white font-bold text-sm sm:text-base tracking-wide hover:text-emerald-400 transition-colors"
                      >
                        {djData.contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {hasEmail && (
                  <div className="p-4 rounded-xl bg-black/60 border border-zinc-900 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 text-blue-400 flex items-center justify-center shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-semibold block mb-0.5">
                        Correo de Booking
                      </span>
                      <a 
                        href={`mailto:${djData.contact.email}?subject=${encodeURIComponent('Consulta de Booking - DJ Ruso')}`}
                        className="text-white font-bold text-sm sm:text-base hover:text-blue-400 transition-colors"
                      >
                        {djData.contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {hasLocation && (
                  <div className="p-4 rounded-xl bg-black/60 border border-zinc-900 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 text-blue-400 flex items-center justify-center shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-semibold block mb-0.5">
                        Base Operativa
                      </span>
                      <p className="text-white font-bold text-sm sm:text-base">{djData.contact.location}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Direct WhatsApp Action Block */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                    <MessageCircle size={18} />
                  </div>
                  <span className="text-sm font-bold text-white uppercase tracking-wider">
                    WhatsApp Directo
                  </span>
                </div>
                
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                  {isWhatsAppReady ? 'Canal Activo' : 'Próximamente'}
                </span>
              </div>

              <p className="text-zinc-400 text-xs font-light leading-relaxed">
                {isWhatsAppReady 
                  ? 'Inicia una conversación instantánea para resolver consultas de disponibilidad y fechas en tiempo real.'
                  : 'El enlace directo a WhatsApp se activará tan pronto como esté asignada la línea oficial de booking.'
                }
              </p>

              {isWhatsAppReady ? (
                <a 
                  href={whatsappUrl!} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 cursor-pointer"
                  aria-label="Contactar a DJ Ruso por WhatsApp"
                >
                  <MessageCircle size={16} />
                  <span>Chatear en WhatsApp</span>
                </a>
              ) : (
                <div className="w-full py-3 px-4 rounded-xl bg-zinc-900/60 border border-zinc-800/60 text-zinc-500 text-xs font-medium text-center">
                  Línea de WhatsApp en proceso de habilitación
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="space-y-2 pt-2 border-t border-zinc-900 text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-blue-500 shrink-0" />
                <span>Respuesta prioritaria en solicitudes de contratación</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-blue-500 shrink-0" />
                <span>Asesoría directa en rider técnico y montaje</span>
              </div>
            </div>

          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN: Professional Booking Form (Clean, Accessible & Realistic)
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 bg-black p-7 sm:p-9 lg:p-10 rounded-2xl border border-zinc-800/90 shadow-2xl relative"
          >
            <div className="mb-6">
              <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase block mb-1">
                Formulario de Consulta
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                Detalles del Evento
              </h3>
            </div>

            {/* Feedback notification banner */}
            <AnimatePresence>
              {formFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mb-6 p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3 ${
                    formFeedback.type === 'success' 
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
                      : 'bg-zinc-900 border-blue-500/40 text-zinc-300'
                  }`}
                >
                  {formFeedback.type === 'success' ? (
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-grow">
                    <p className="leading-relaxed">{formFeedback.message}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              
              {/* Field 1: Nombre */}
              <div className="space-y-1.5">
                <label htmlFor={nameId} className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Nombre Completo o Productora <span className="text-blue-400">*</span>
                </label>
                <input 
                  type="text" 
                  id={nameId}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Tu nombre o empresa organizadora"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-blue-500 text-sm transition-all"
                />
              </div>

              {/* Field 2 & 3: Tipo de Evento & Fecha */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor={eventTypeId} className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Tipo de Evento
                  </label>
                  <select 
                    id={eventTypeId}
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-blue-500 text-sm transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Club / Discoteca">Club / Discoteca</option>
                    <option value="Festival / Open Air">Festival / Open Air</option>
                    <option value="Evento Privado / VIP">Evento Privado / VIP</option>
                    <option value="Boda Exclusiva">Boda Exclusiva</option>
                    <option value="Corporativo / Marca">Corporativo / Marca</option>
                    <option value="Otro">Otro Formato</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor={dateId} className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Fecha Prevista
                  </label>
                  <div className="relative">
                    <input 
                      type="date" 
                      id={dateId}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-blue-500 text-sm transition-all [color-scheme:dark]"
                    />
                    <Calendar size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Field 4: Ciudad / Ubicación */}
              <div className="space-y-1.5">
                <label htmlFor={cityId} className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Ciudad / Ubicación del Evento
                </label>
                <input 
                  type="text" 
                  id={cityId}
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Ej. Madrid, Barcelona o recinto del evento"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-blue-500 text-sm transition-all"
                />
              </div>

              {/* Field 5: Mensaje / Requerimientos */}
              <div className="space-y-1.5">
                <label htmlFor={messageId} className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Requerimientos Técnicos y Horarios
                </label>
                <textarea 
                  id={messageId}
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Horario previsto de la sesión, equipo disponible en sala o necesidades especiales..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-blue-500 text-sm transition-all resize-none"
                ></textarea>
              </div>

              {/* Main Submit CTA */}
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Reservar Ahora</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <p className="text-[11px] text-zinc-500 text-center pt-1 font-light">
                Solicitud sin compromiso comercial inmediato. Se confirmará disponibilidad antes de cerrar la fecha.
              </p>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
