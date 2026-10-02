import { djData } from '../data/djData';
import { ArrowUp, Instagram, Youtube } from 'lucide-react';

// TikTok SVG Icon
function TikTokIcon({ size = 15 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.88-4.49V8.65a8.28 8.28 0 0 0 4.84 1.54V6.74a4.85 4.85 0 0 1-.95-.05z"/>
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const isPlaceholder = (val?: string): boolean => {
    if (!val) return true;
    const trimmed = val.trim();
    return trimmed.startsWith('[') && trimmed.endsWith(']');
  };

  const artistName = isPlaceholder(djData.artistName) ? 'DJ BRYAN ACOSTA' : djData.artistName;
  const hasPhone = !isPlaceholder(djData.contact.phone);
  const hasEmail = !isPlaceholder(djData.contact.email);
  const hasLocation = !isPlaceholder(djData.contact.location);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find social media
  const instagram = djData.socialMedia.find(s => s.platform.toLowerCase() === 'instagram');
  const tiktok = djData.socialMedia.find(s => s.platform.toLowerCase() === 'tiktok');
  const youtube = djData.socialMedia.find(s => s.platform.toLowerCase() === 'youtube');

  return (
    <footer className="bg-black text-zinc-500 py-12 md:py-16 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-zinc-900/80">
          
          {/* Brand */}
          <div>
            <a href="#home" className="inline-flex items-center gap-1.5 group mb-2">
              <span className="text-xl font-bold tracking-tight uppercase text-white group-hover:text-zinc-300 transition-colors">
                {artistName}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            </a>
            {hasLocation && (
              <p className="text-xs text-zinc-500 font-mono">
                {djData.contact.location}
              </p>
            )}
          </div>

          {/* Social Channels */}
          <div className="flex items-center gap-6">
            {instagram && (
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Bryan Acosta"
                className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                <Instagram size={15} />
                <span>Instagram</span>
              </a>
            )}

            {tiktok && (
              <a
                href={tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de Bryan Acosta"
                className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                <TikTokIcon size={15} />
                <span>TikTok</span>
              </a>
            )}

            {youtube && (
              <a
                href={youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube de Bryan Acosta"
                className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                <Youtube size={15} />
                <span>YouTube</span>
              </a>
            )}
          </div>

          {/* Direct Line / Contact info */}
          {(hasEmail || hasPhone) && (
            <div className="text-xs text-zinc-400 space-y-1">
              {hasPhone && (
                <p>
                  <span className="text-zinc-500">Tel:</span>{' '}
                  <a href="https://wa.me/593992710709" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {djData.contact.phone}
                  </a>
                </p>
              )}
              {hasEmail && (
                <p>
                  <span className="text-zinc-500">Email:</span>{' '}
                  <a href={`mailto:${djData.contact.email}`} className="hover:text-white transition-colors">
                    {djData.contact.email}
                  </a>
                </p>
              )}
            </div>
          )}

        </div>

        {/* Bottom Technical Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <p>© {currentYear} {artistName}. Todos los derechos reservados.</p>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            <span>Volver arriba</span>
            <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </footer>
  );
}
