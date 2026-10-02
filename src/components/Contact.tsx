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
  Clock
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
    'Hola Bryan, vi tu página web y quisiera consultar disponibilidad para un evento.'
  );
  const whatsappUrl = `https://wa.me/593992710709?text=${defaultWhatsAppText}`;

  // Handle Form Submission (Connects directly to WhatsApp with structured event details)
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

    const composedMsg = `Hola Bryan, vi tu página web y quisiera consultar disponibilidad para un evento:%0A%0A• Nombre: ${encodeURIComponent(nameVal)}%0A• Tipo de evento: ${encodeURIComponent(eventVal)}%0A• Fecha: ${encodeURIComponent(dateVal)}%0A• Hora: ${encodeURIComponent(timeVal)}%0A• Ciudad: ${encodeURIComponent(cityVal)}%0A• Requerimientos: ${encodeURIComponent(msgVal)}`;

    window.open(`https://wa.me/593992710709?text=${composedMsg}`, '_blank', 'noopener,noreferrer');

    setFormFeedback({
      type: 'success',
      message: 'Conectando directamente con el canal oficial de WhatsApp...'
    });
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-black relative border-t border-zinc-900 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            SECTION HEADER (ESPAÑOL CLARO & DIRECTO)
            ========================================================================= */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[2px] bg-blue-500"></span>
            <span className="text-blue-400 font-bold tracking-[0.28em] uppercase text-xs">
              RESERVAS
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-4">
            RESERVA TU FECHA
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light">
            Cuéntanos sobre tu evento y consulta disponibilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: Canales de Consulta Directa
              ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight uppercase mb-3">
                Disponibilidad y Contratación Directa
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-light">
                Coordinación de fechas para clubes, festivales y eventos privados. Cada presentación se adapta a la acústica y requerimientos técnicos del espacio.
              </p>
            </div>

            {/* Valid Contact Information Modules */}
            {(hasPhone || hasEmail || hasLocation) && (
              <div className="space-y-2.5">
                {hasPhone && (
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-colors flex items-center gap-3.5 group">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 text-blue-400 flex items-center justify-center shrink-0">
                      <Phone size={17} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono block">
                        WhatsApp / Teléfono
                      </span>
                      <a 
                        href={`https://wa.me/${rawPhoneDigits}?text=${defaultWhatsAppText}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white font-medium text-sm hover:text-blue-400 transition-colors block"
                      >
                        {djData.contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {hasEmail && (
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-colors flex items-center gap-3.5 group">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 text-blue-400 flex items-center justify-center shrink-0">
                      <Mail size={17} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono block">
                        Correo de Contacto
                      </span>
                      <a 
                        href={`mailto:${djData.contact.email}?subject=${encodeURIComponent('Consulta de Reserva - DJ Bryan Acosta')}`}
                        className="text-white font-medium text-sm hover:text-blue-400 transition-colors block"
                      >
                        {djData.contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {hasLocation && (
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-colors flex items-center gap-3.5 group">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 text-blue-400 flex items-center justify-center shrink-0">
                      <MapPin size={17} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono block">
                        Ubicación
                      </span>
                      <p className="text-white font-medium text-sm">
                        {djData.contact.location}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Direct WhatsApp Action Block */}
            <div className="rounded-xl bg-zinc-950 border border-zinc-900 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <span className="text-sm font-semibold text-white uppercase tracking-wider block">
                    WhatsApp Directo
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase block">
                    Canal Principal
                  </span>
                </div>
              </div>

              <p className="text-zinc-400 text-xs font-light leading-relaxed">
                {isWhatsAppReady 
                  ? 'Consulta directa de fechas, disponibilidad y opciones de formato en tiempo real.'
                  : 'Línea de WhatsApp en proceso de habilitación.'
                }
              </p>

              {isWhatsAppReady && (
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 group/btn cursor-pointer shadow-md"
                  aria-label="Consultar disponibilidad por WhatsApp con Bryan Acosta"
                >
                  <MessageCircle size={15} />
                  <span>CONSULTAR DISPONIBILIDAD</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              )}
            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: Formulario Limpio de Reserva
              ========================================================================= */}
          <div className="lg:col-span-7">
            <div className="rounded-xl bg-zinc-950 border border-zinc-900 p-6 sm:p-8">
              
              {/* Form Title */}
              <div className="pb-5 mb-6 border-b border-zinc-900">
                <h3 className="text-lg font-bold text-white tracking-tight uppercase">
                  Detalles del Evento
                </h3>
              </div>

              {/* Feedback notification banner */}
              <AnimatePresence>
                {formFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`mb-6 p-3.5 rounded-lg border text-xs flex items-start gap-2.5 ${
                      formFeedback.type === 'success' 
                        ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200' 
                        : formFeedback.type === 'error'
                        ? 'bg-red-950/30 border-red-500/30 text-red-200'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                    }`}
                  >
                    {formFeedback.type === 'success' ? (
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    ) : formFeedback.type === 'error' ? (
                      <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                    ) : (
                      <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
                    )}
                    <p className="leading-relaxed font-medium">{formFeedback.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit} noValidate>
                
                {/* Field 1: Nombre */}
                <div className="space-y-1.5">
                  <label htmlFor={nameId} className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                    <span>Nombre Completo o Productora</span>
                    <span className="text-[10px] text-blue-400 font-mono">* Requerido</span>
                  </label>
                  <input 
                    type="text" 
                    id={nameId}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre o empresa organizadora"
                    required
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 text-sm transition-colors"
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
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm transition-colors appearance-none cursor-pointer"
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

                {/* Field 3 & 4: Fecha Prevista & Hora Prevista */}
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
                        className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm transition-colors [color-scheme:dark]"
                      />
                      <Calendar size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
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
                        className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm transition-colors [color-scheme:dark]"
                      />
                      <Clock size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
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
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 text-sm transition-colors"
                  />
                </div>

                {/* Field 6: Requerimientos */}
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
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 text-sm transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Main Submit CTA */}
                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-md"
                  >
                    <MessageCircle size={16} />
                    <span>CONSULTAR DISPONIBILIDAD</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>

                <p className="text-[11px] text-zinc-500 text-center pt-1 font-light">
                  Se confirmará disponibilidad antes de formalizar la fecha.
                </p>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
