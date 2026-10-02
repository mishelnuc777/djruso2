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
    <section id="contact" className="scroll-mt-20 py-28 md:py-36 bg-black relative border-t border-zinc-900 overflow-hidden">
      
      {/* =========================================================================
          AMBIENT STAGE & LED GLOW LAYERS (Atmósfera de cabina / producción nocturna)
          ========================================================================= */}
      {/* Halo azul eléctrico superior izquierdo */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-blue-600/12 rounded-full blur-[170px] pointer-events-none" />

      {/* Halo verde neón suave inferior derecho */}
      <div className="absolute bottom-10 -right-16 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Halo violeta tenue en el centro para profundidad y contraste */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-violet-600/8 rounded-full blur-[190px] pointer-events-none" />

      {/* Cuadrícula técnica sutil para enriquecer el fondo oscuro estilo consola/cabina */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40" 
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            SECTION HEADER (ESPAÑOL CLARO & DIRECTO)
            ========================================================================= */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[2px] bg-blue-500"></span>
            <span className="text-blue-400 font-bold tracking-[0.28em] uppercase text-xs drop-shadow-sm">
              RESERVAS
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-4">
            RESERVA TU FECHA
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light max-w-xl">
            Cuéntanos sobre tu evento y consulta disponibilidad en cabina y producción sonora.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: Canales de Consulta Directa (Módulos Iluminados)
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

            {/* Valid Contact Information Modules con acentos hover suaves */}
            {(hasPhone || hasEmail || hasLocation) && (
              <div className="space-y-2.5">
                {hasPhone && (
                  <div className="p-4 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 hover:border-blue-500/40 hover:bg-zinc-900/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300 flex items-center gap-3.5 group">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 text-blue-400 group-hover:text-blue-300 group-hover:border-blue-500/30 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.3)] flex items-center justify-center shrink-0 transition-all">
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
                  <div className="p-4 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 hover:border-blue-500/40 hover:bg-zinc-900/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300 flex items-center gap-3.5 group">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 text-blue-400 group-hover:text-blue-300 group-hover:border-blue-500/30 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.3)] flex items-center justify-center shrink-0 transition-all">
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
                  <div className="p-4 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 hover:border-blue-500/40 hover:bg-zinc-900/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300 flex items-center gap-3.5 group">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 text-blue-400 group-hover:text-blue-300 group-hover:border-blue-500/30 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.3)] flex items-center justify-center shrink-0 transition-all">
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

            {/* Direct WhatsApp Action Block con halo esmeralda */}
            <div className="rounded-xl bg-gradient-to-b from-zinc-950/90 to-zinc-900/40 backdrop-blur-md border border-emerald-500/25 hover:border-emerald-500/45 p-6 space-y-4 shadow-[0_0_30px_rgba(16,185,129,0.06)] relative overflow-hidden transition-all duration-300">
              
              {/* Línea sutil superior esmeralda */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <MessageCircle size={19} />
                </div>
                <div>
                  <span className="text-sm font-semibold text-white uppercase tracking-wider block">
                    WhatsApp Directo
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse" />
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
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 group/btn cursor-pointer shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] border border-emerald-400/30"
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
              RIGHT COLUMN: Panel del Formulario (Glow Superior LED & Inputs Estilo Cabina)
              ========================================================================= */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-zinc-950/85 backdrop-blur-xl border border-zinc-800/80 p-6 sm:p-8 lg:p-9 shadow-[0_0_50px_rgba(0,0,0,0.6)] group/panel overflow-hidden">
              
              {/* Borde superior LED con degradado azul/esmeralda */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/80 to-emerald-400/60 shadow-[0_0_12px_rgba(59,130,246,0.6)]" />

              {/* Form Title & Indicator */}
              <div className="pb-5 mb-6 border-b border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.9)] animate-pulse" />
                  <h3 className="text-lg font-bold text-white tracking-tight uppercase">
                    Detalles del Evento
                  </h3>
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 hidden sm:inline-block">
                  Formulario Oficial
                </span>
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
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                        : formFeedback.type === 'error'
                        ? 'bg-red-950/40 border-red-500/40 text-red-200 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
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
                    className="w-full bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 focus:bg-zinc-900/90 text-sm transition-all duration-200 shadow-inner"
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
                    className="w-full bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 focus:bg-zinc-900/90 text-sm transition-all duration-200 appearance-none cursor-pointer shadow-inner"
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
                        className="w-full bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 focus:bg-zinc-900/90 text-sm transition-all duration-200 [color-scheme:dark] shadow-inner"
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
                        className="w-full bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 focus:bg-zinc-900/90 text-sm transition-all duration-200 [color-scheme:dark] shadow-inner"
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
                    className="w-full bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 focus:bg-zinc-900/90 text-sm transition-all duration-200 shadow-inner"
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
                    className="w-full bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 focus:bg-zinc-900/90 text-sm transition-all duration-200 resize-none shadow-inner"
                  ></textarea>
                </div>

                {/* Main Submit CTA con Glow Esmeralda y Borde Iluminado */}
                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-[0_0_25px_rgba(37,211,102,0.35)] hover:shadow-[0_0_35px_rgba(37,211,102,0.55)] hover:-translate-y-0.5 active:translate-y-0 border border-emerald-400/30"
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
