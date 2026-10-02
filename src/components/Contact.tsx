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
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    eventType: '',
    date: '',
    time: '',
    city: '',
    message: ''
  });

  const [formFeedback, setFormFeedback] = useState<{
    type: 'info' | 'success' | 'error';
    message: string;
  } | null>(null);

  // Accessible unique IDs for form fields
  const nameId = useId();
  const eventTypeId = useId();
  const dateId = useId();
  const timeId = useId();
  const cityId = useId();
  const messageId = useId();

  // Helper to get local date string (YYYY-MM-DD) safely accounting for local timezone offset
  const getLocalDateString = (): string => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    return new Date(now.getTime() - offset * 60 * 1000)
      .toISOString()
      .split('T')[0];
  };

  const minDate = getLocalDateString();

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
    'Hola Bryan, vi tu página web y quisiera cotizar un evento. ¿Me ayudas con disponibilidad y opciones?'
  );
  const whatsappUrl = `https://wa.me/593992710709?text=${defaultWhatsAppText}`;

  // Handle Form Submission (Does not fake backend transmission, connects directly to WhatsApp)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const todayStr = getLocalDateString();

    // Validation 1: Name is required
    if (!formData.name.trim()) {
      setFormFeedback({
        type: 'error',
        message: 'Por favor, introduce tu nombre o el de tu productora para iniciar la solicitud.'
      });
      return;
    }

    // Validation 2: Date cannot be in the past
    if (formData.date && formData.date < todayStr) {
      setFormFeedback({
        type: 'error',
        message: 'La fecha del evento no puede ser anterior a hoy.'
      });
      return;
    }

    // Validation 3: Time cannot be in the past if event date is today
    if (formData.date === todayStr && formData.time) {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;

      if (formData.time < currentTimeStr) {
        setFormFeedback({
          type: 'error',
          message: 'La hora seleccionada ya pasó. Elige una hora posterior.'
        });
        return;
      }
    }

    // Format formatted fields for WhatsApp message
    const nameVal = formData.name.trim();
    const eventVal = formData.eventType.trim() || 'Por definir';
    const dateVal = formData.date.trim() || 'Por definir';
    const timeVal = formData.time.trim() || 'Por definir';
    const cityVal = formData.city.trim() || 'Por definir';
    const msgVal = formData.message.trim() || 'Sin requerimientos adicionales';

    const composedMsg = `Hola Bryan, vi tu página web y quisiera cotizar un evento:%0A%0A• Nombre: ${encodeURIComponent(nameVal)}%0A• Tipo de evento: ${encodeURIComponent(eventVal)}%0A• Fecha: ${encodeURIComponent(dateVal)}%0A• Hora: ${encodeURIComponent(timeVal)}%0A• Ciudad: ${encodeURIComponent(cityVal)}%0A• Requerimientos: ${encodeURIComponent(msgVal)}`;

    window.open(`https://wa.me/593992710709?text=${composedMsg}`, '_blank', 'noopener,noreferrer');

    setFormFeedback({
      type: 'success',
      message: 'Conectando directamente con el canal oficial de WhatsApp...'
    });
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-zinc-950 relative border-t border-zinc-900 overflow-hidden">
      
      {/* Background ambient lighting & subtle technical grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/3 left-0 -translate-y-1/2 w-[600px] h-[500px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-[500px] h-[400px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none"></div>

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: Commercial Statement & Direct Booking Modules
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6 sm:space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/30 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-300">
                  Atención a Productoras & Particulares
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-4">
                Lleva la energía de Bryan Acosta a tu escenario
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                Cada evento cuenta con una selección musical personalizada, adaptación al formato del espacio y soporte técnico para garantizar una atmósfera de máximo impacto.
              </p>
            </div>

            {/* Valid Contact Information Modules (Icon | Label | Info) */}
            {(hasPhone || hasEmail || hasLocation) && (
              <div className="space-y-3">
                {hasPhone && (
                  <div className="p-4 sm:p-4.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)] transition-all duration-300 flex items-center gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-blue-500/40 text-blue-400 group-hover:text-blue-300 flex items-center justify-center shrink-0 transition-colors shadow-inner">
                      <Phone size={19} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-widest font-semibold block mb-0.5">
                        WhatsApp / Teléfono Directo
                      </span>
                      <a 
                        href={`https://wa.me/${rawPhoneDigits}?text=${defaultWhatsAppText}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white font-bold text-sm sm:text-base tracking-wide hover:text-emerald-400 transition-colors break-words block"
                      >
                        {djData.contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {hasEmail && (
                  <div className="p-4 sm:p-4.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)] transition-all duration-300 flex items-center gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-blue-500/40 text-blue-400 group-hover:text-blue-300 flex items-center justify-center shrink-0 transition-colors shadow-inner">
                      <Mail size={19} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-widest font-semibold block mb-0.5">
                        Correo de Booking
                      </span>
                      <a 
                        href={`mailto:${djData.contact.email}?subject=${encodeURIComponent('Consulta de Booking - DJ Bryan Acosta')}`}
                        className="text-white font-bold text-sm sm:text-base hover:text-blue-400 transition-colors break-words block"
                      >
                        {djData.contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {hasLocation && (
                  <div className="p-4 sm:p-4.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)] transition-all duration-300 flex items-center gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-blue-500/40 text-blue-400 group-hover:text-blue-300 flex items-center justify-center shrink-0 transition-colors shadow-inner">
                      <MapPin size={19} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-widest font-semibold block mb-0.5">
                        Base Operativa
                      </span>
                      <p className="text-white font-bold text-sm sm:text-base break-words">
                        {djData.contact.location}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Direct WhatsApp Action Block - Prominent & Dedicated */}
            <div className="relative rounded-2xl bg-gradient-to-b from-zinc-950/95 to-zinc-950/80 border border-emerald-500/30 hover:border-emerald-500/50 p-6 sm:p-7 space-y-4 shadow-[0_0_30px_rgba(37,211,102,0.08)] transition-all duration-300 group">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(37,211,102,0.2)]">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider block">
                      WhatsApp Directo
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase block">
                      Línea Oficial
                    </span>
                  </div>
                </div>
                
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[10px] font-mono font-bold tracking-widest text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>CANAL DIRECTO • ACTIVO</span>
                </div>
              </div>

              <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                {isWhatsAppReady 
                  ? 'Inicia una conversación directa para resolver consultas de disponibilidad, fechas y requerimientos técnicos en tiempo real.'
                  : 'El enlace directo a WhatsApp se activará tan pronto como esté asignada la línea oficial de booking.'
                }
              </p>

              {isWhatsAppReady ? (
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.35)] hover:shadow-[0_0_30px_rgba(37,211,102,0.55)] flex items-center justify-center gap-2 group/btn cursor-pointer border border-[#25D366]/40"
                  aria-label="Contactar a Bryan Acosta por WhatsApp"
                >
                  <MessageCircle size={16} className="transition-transform group-hover/btn:scale-110" />
                  <span>COTIZAR POR WHATSAPP</span>
                  <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              ) : (
                <div className="w-full py-3 px-4 rounded-xl bg-zinc-900/60 border border-zinc-800/60 text-zinc-500 text-xs font-medium text-center">
                  Línea de WhatsApp en proceso de habilitación
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="space-y-2 pt-2 border-t border-zinc-900 text-xs text-zinc-500 font-light">
              <div className="flex items-center gap-2.5">
                <Clock size={14} className="text-blue-500 shrink-0" />
                <span>Respuesta prioritaria en solicitudes de contratación</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles size={14} className="text-blue-500 shrink-0" />
                <span>Asesoría directa en rider técnico y montaje</span>
              </div>
            </div>

          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN: Futuristic Booking Control Panel Form
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 relative"
          >
            {/* Panel Glow & Outer Frame */}
            <div className="relative rounded-3xl bg-black/85 backdrop-blur-xl border border-zinc-800/90 p-6 sm:p-9 lg:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_40px_rgba(37,99,235,0.06)] overflow-hidden">
              
              {/* Subtle architectural top glow line */}
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent pointer-events-none"></div>
              <div className="absolute -top-12 right-12 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

              {/* Panel Header */}
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-zinc-900/90">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-blue-400 uppercase">
                      FORMULARIO DE CONSULTA
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                    DETALLES DEL EVENTO
                  </h3>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                  <Sparkles size={11} className="text-blue-400" />
                  <span>BOOKING PANEL</span>
                </div>
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
                        : formFeedback.type === 'error'
                        ? 'bg-red-950/40 border-red-500/40 text-red-200'
                        : 'bg-zinc-900 border-blue-500/40 text-zinc-300'
                    }`}
                  >
                    {formFeedback.type === 'success' ? (
                      <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    ) : formFeedback.type === 'error' ? (
                      <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                    ) : (
                      <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-grow">
                      <p className="leading-relaxed font-medium">{formFeedback.message}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                
                {/* Field 1: Nombre */}
                <div className="space-y-1.5">
                  <label htmlFor={nameId} className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                    <span>Nombre Completo o Productora</span>
                    <span className="text-[11px] text-blue-400 font-mono">* Requerido</span>
                  </label>
                  <input 
                    type="text" 
                    id={nameId}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre o empresa organizadora"
                    required
                    className="w-full bg-zinc-950 border border-zinc-800/90 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/30 text-sm transition-all"
                  />
                </div>

                {/* Field 2: Tipo de Evento */}
                <div className="space-y-1.5">
                  <label htmlFor={eventTypeId} className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Tipo de Evento
                  </label>
                  <select 
                    id={eventTypeId}
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800/90 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/30 text-sm transition-all appearance-none cursor-pointer"
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

                {/* Field 3 & 4: Fecha Prevista & Hora Prevista (Grid 2 cols) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor={dateId} className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                      <span>Fecha Prevista</span>
                      <span className="text-[10px] text-zinc-500 font-mono">(Hoy en adelante)</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="date" 
                        id={dateId}
                        min={minDate}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800/90 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/30 text-sm transition-all [color-scheme:dark]"
                      />
                      <Calendar size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor={timeId} className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                      <span>Hora Prevista</span>
                      <span className="text-[10px] text-zinc-500 font-mono">(Opcional)</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="time" 
                        id={timeId}
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800/90 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/30 text-sm transition-all [color-scheme:dark]"
                      />
                      <Clock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Field 5: Ciudad / Ubicación */}
                <div className="space-y-1.5">
                  <label htmlFor={cityId} className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Ciudad / Ubicación del Evento
                  </label>
                  <input 
                    type="text" 
                    id={cityId}
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Ej. Quito, Ambato, Manta o ubicación del evento"
                    className="w-full bg-zinc-950 border border-zinc-800/90 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/30 text-sm transition-all"
                  />
                </div>

                {/* Field 6: Mensaje / Requerimientos */}
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
                    className="w-full bg-zinc-950 border border-zinc-800/90 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/30 text-sm transition-all resize-none"
                  ></textarea>
                </div>

                {/* Main Submit CTA - WhatsApp Green */}
                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_25px_rgba(37,211,102,0.35)] hover:shadow-[0_0_35px_rgba(37,211,102,0.55)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer border border-[#25D366]/40"
                  >
                    <MessageCircle size={17} className="transition-transform group-hover:scale-110" />
                    <span>COTIZAR POR WHATSAPP</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>

                <p className="text-[11px] text-zinc-500 text-center pt-1 font-light">
                  Solicitud sin compromiso comercial inmediato. Se confirmará disponibilidad antes de cerrar la fecha.
                </p>

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
