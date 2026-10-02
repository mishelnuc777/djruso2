import { djData } from '../data/djData';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const isPlaceholder = (val?: string): boolean => {
    if (!val) return true;
    const trimmed = val.trim();
    return trimmed.startsWith('[') && trimmed.endsWith(']');
  };

  const artistName = isPlaceholder(djData.artistName) ? 'DJ BRYAN ACOSTA' : djData.artistName;
  const hasRealDescription = !isPlaceholder(djData.shortDescription);
  const hasPhone = !isPlaceholder(djData.contact.phone);
  const hasEmail = !isPlaceholder(djData.contact.email);
  const hasLocation = !isPlaceholder(djData.contact.location);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-zinc-400 py-16 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-900 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#home" className="inline-flex items-center gap-1.5 group">
              <span className="text-2xl font-black tracking-tighter uppercase text-white group-hover:text-zinc-200 transition-colors">
                {artistName}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            </a>
            {hasRealDescription && (
              <p className="text-zinc-500 text-sm max-w-sm font-normal leading-relaxed">
                {djData.shortDescription}
              </p>
            )}
            <p className="text-zinc-500 text-xs tracking-wide">
              Sesiones en directo, formatos exclusivos y producción musical para eventos y festivales.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
              Navegación
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs uppercase tracking-wider font-semibold">
              {[
                { name: 'Inicio', id: 'home' }, 
                { name: 'Música', id: 'music' }, 
                { name: 'Galería', id: 'gallery' }, 
                { name: 'Servicios', id: 'packages' },
                { name: 'Contacto', id: 'contact' }
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={`#${item.id}`} 
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Booking Contact Quick Info */}
          <div className="md:col-span-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
              Booking Directo
            </h4>
            {hasEmail || hasPhone || hasLocation ? (
              <div className="space-y-1.5 text-xs text-zinc-400">
                {hasEmail && (
                  <a 
                    href={`mailto:${djData.contact.email}`} 
                    className="text-white font-semibold hover:text-blue-400 transition-colors block"
                  >
                    {djData.contact.email}
                  </a>
                )}
                {hasPhone && (
                  <a 
                    href="https://wa.me/593992710709?text=Hola%20Bryan%2C%20vi%20tu%20p%C3%A1gina%20web%20y%20quisiera%20cotizar%20un%20evento.%20%C2%BFMe%20ayudas%20con%20disponibilidad%20y%20opciones%3F" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-400 transition-colors block"
                  >
                    {djData.contact.phone}
                  </a>
                )}
                {hasLocation && <p className="text-zinc-500 pt-1">{djData.contact.location}</p>}
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                <p className="text-zinc-500 leading-relaxed">
                  Líneas de contratación directa en proceso de confirmación.
                </p>
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold uppercase tracking-wider transition-colors pt-1"
                >
                  <span>Solicitar fecha</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <p>© {currentYear} {artistName}. Todos los derechos reservados.</p>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            <span>Volver arriba</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
