import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { djData } from '../data/djData';
import { parseYouTube, youTubeEmbedUrl, youTubeThumbnail } from '../utils/media';

interface GalleryItem {
  id: string;
  url: string; // imagen (o miniatura si es video)
  alt: string;
  videoUrl?: string; // enlace de YouTube (solo para videos)
}

// Imágenes reales disponibles dentro de /public/assets/gallery/
const galleryPhotos: GalleryItem[] = [
  { id: 'gal-01', url: '/assets/gallery/gallery-01.jpg.jpeg', alt: 'DJ Bryan Acosta en cabina en vivo' },
  { id: 'gal-02', url: '/assets/gallery/gallery-02.jpg.jpeg', alt: 'Montaje de iluminación y producción escénica' },
  { id: 'gal-03', url: '/assets/gallery/gallery-03.jpg.jpeg', alt: 'Público y pista de baile en fiesta' },
  { id: 'gal-04', url: '/assets/gallery/gallery-04.jpg.jpeg', alt: 'Equipamiento profesional de sonido y controlador' },
  { id: 'gal-05', url: '/assets/gallery/gallery-05.jpg.jpeg', alt: 'Efectos especiales y máquinas de humo en vivo' },
  { id: 'gal-06', url: '/assets/gallery/gallery-06.jpg.jpeg', alt: 'Presentación en evento corporativo y social' },
  { id: 'gal-07', url: '/assets/gallery/gallery-07.jpg.jpeg', alt: 'Show de luces robotizadas y visuales' },
  { id: 'gal-08', url: '/assets/gallery/gallery-08.jpg.jpeg', alt: 'Ambiente nocturno y energía del público' },
  { id: 'gal-09', url: '/assets/gallery/gallery-09.jpg.jpeg', alt: 'Sesión de mezcla y tornamesas en vivo' },
  { id: 'gal-10', url: '/assets/gallery/gallery-10.jpg.jpeg', alt: 'Pantallas LED y estructura para eventos' },
  { id: 'gal-11', url: '/assets/gallery/gallery-11.jpg.jpeg', alt: 'Celebración y fiesta privada en Quito' },
  { id: 'gal-12', url: '/assets/gallery/gallery-12.jpg.jpeg', alt: 'Producción sonora y show completo de DJ' },
];

// Videos de YouTube configurados en src/data/djData.ts (galleryVideos): se agregan después de las fotos
const galleryVideoItems: GalleryItem[] = (djData.galleryVideos ?? []).flatMap((video) => {
  const yt = parseYouTube(video.url);
  if (!yt) return [];
  return [{ id: video.id, url: youTubeThumbnail(yt.id), alt: video.title, videoUrl: video.url }];
});

const galleryItems: GalleryItem[] = [...galleryPhotos, ...galleryVideoItems];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Helper to sanitize placeholder alt text
  const getSanitizedAlt = (altText: string, index: number): string => {
    if (!altText || (altText.startsWith('[') && altText.endsWith(']'))) {
      return `Registro visual de escenario ${String(index + 1).padStart(2, '0')}`;
    }
    return altText;
  };

  const hasItems = galleryItems && galleryItems.length > 0;

  // Navigation handlers for Lightbox
  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1));
  }, [selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0));
  }, [selectedIndex]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard accessibility and body scroll lock
  useEffect(() => {
    if (selectedIndex === null) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-zinc-950 relative border-t border-zinc-900 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            EDITORIAL HEADER
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-blue-500"></span>
              <span className="text-blue-400 font-semibold tracking-[0.25em] uppercase text-xs">
                Portafolio Escénico
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              Atmósfera en Pista
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-light max-w-xl mt-3 leading-relaxed">
              Registro visual de producción, puesta en escena, cabina e iluminación en vivo para eventos y festivales.
            </p>
          </div>

          <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold pb-1">
            <span>
              {hasItems ? (
                <>
                  {galleryPhotos.length} Fotografías
                  {galleryVideoItems.length > 0 && ` · ${galleryVideoItems.length} ${galleryVideoItems.length === 1 ? 'Video' : 'Videos'}`}
                </>
              ) : (
                'Próximamente'
              )}
            </span>
          </div>
        </div>

        {/* =========================================================================
            ASYMMETRIC EDITORIAL GRID (12 ITEMS)
            ========================================================================= */}
        {hasItems ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
            {galleryItems.map((image, index) => {
              const altText = getSanitizedAlt(image.alt, index);

              // Asymmetric grid layout sizing:
              // Row 1: Item 0 (7 cols) + Item 1 (5 cols) = 12 cols
              // Row 2: Item 2, 3, 4 (4 cols each) = 12 cols
              // Row 3: Item 5 (5 cols) + Item 6 (7 cols) = 12 cols
              // Row 4: Item 7, 8, 9 (4 cols each) = 12 cols
              // Row 5: Item 10, 11 (6 cols each) = 12 cols
              let colSpan = 'lg:col-span-4 sm:col-span-1';
              let aspectClass = 'aspect-[4/3] sm:aspect-square lg:aspect-[4/3]';

              if (index === 0) {
                colSpan = 'lg:col-span-7 sm:col-span-2';
                aspectClass = 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] min-h-[320px]';
              } else if (index === 1) {
                colSpan = 'lg:col-span-5 sm:col-span-1';
                aspectClass = 'aspect-[4/3] sm:aspect-square lg:aspect-auto lg:h-full';
              } else if (index === 5) {
                colSpan = 'lg:col-span-5 sm:col-span-1';
                aspectClass = 'aspect-[4/3] sm:aspect-square lg:aspect-auto lg:h-full';
              } else if (index === 6) {
                colSpan = 'lg:col-span-7 sm:col-span-2';
                aspectClass = 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] min-h-[320px]';
              } else if (index === 10 || index === 11) {
                colSpan = 'lg:col-span-6 sm:col-span-1';
                aspectClass = 'aspect-[16/10] sm:aspect-[4/3]';
              }

              return (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 6) * 0.08, duration: 0.5 }}
                  className={`relative group overflow-hidden rounded-2xl bg-black border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 cursor-pointer shadow-xl ${colSpan}`}
                  onClick={() => setSelectedIndex(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedIndex(index);
                    }
                  }}
                  aria-label={image.videoUrl ? `Reproducir video: ${altText}` : `Ver imagen ampliada: ${altText}`}
                >
                  <div className={`w-full h-full ${aspectClass} overflow-hidden`}>
                    <img 
                      src={image.url} 
                      alt={altText}
                      loading={index < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Icono de reproducción para videos */}
                  {image.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="w-14 h-14 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                        <Play size={22} className="translate-x-0.5" fill="currentColor" />
                      </span>
                    </div>
                  )}

                  {/* Dark subtle vignette on hover with zoom icon */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                    <div className="self-end">
                      <div className="bg-zinc-950/80 border border-white/10 text-white p-3 rounded-xl backdrop-blur-md transform scale-90 group-hover:scale-100 transition-transform">
                        <ZoomIn size={18} className="text-blue-400" />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase block mb-1">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                        {altText}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-12 text-center max-w-xl mx-auto backdrop-blur-sm">
            <p className="text-zinc-400 text-sm font-light">
              Próximamente nuevas fotografías y registro visual en vivo de festivales y eventos.
            </p>
          </div>
        )}

      </div>

      {/* =========================================================================
          ACCESSIBLE LIGHTBOX MODAL WITH FULL CONTROLS
          ========================================================================= */}
      <AnimatePresence>
        {selectedIndex !== null && galleryItems[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-8"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label="Visor de imagen en pantalla completa"
          >
            {/* Top Toolbar */}
            <div className="absolute top-5 left-6 right-6 flex items-center justify-between z-20 pointer-events-none">
              <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 pointer-events-auto bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
                {String(selectedIndex + 1).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')}
              </span>

              <button 
                className="text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 p-2.5 rounded-xl transition-colors cursor-pointer pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                aria-label="Cerrar visor"
              >
                <X size={20} />
              </button>
            </div>

            {/* Previous Image Button */}
            {galleryItems.length > 1 && (
              <button
                className="absolute left-4 sm:left-6 z-20 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 p-3 rounded-xl transition-all cursor-pointer hidden sm:flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Ver imagen anterior"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Center Image Container */}
            <motion.div 
              key={selectedIndex}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const current = galleryItems[selectedIndex];
                const yt = parseYouTube(current.videoUrl);
                if (yt) {
                  return (
                    <div
                      className={`rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black ${
                        yt.isShort
                          ? 'h-[75vh] max-h-[680px] aspect-[9/16]'
                          : 'w-[90vw] max-w-4xl aspect-video'
                      }`}
                    >
                      <iframe
                        key={current.id}
                        src={youTubeEmbedUrl(yt, { autoplay: true })}
                        title={current.alt}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  );
                }
                return (
                  <img 
                    src={current.url} 
                    alt={getSanitizedAlt(current.alt, selectedIndex)}
                    className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                  />
                );
              })()}
              
              <div className="mt-3 text-center">
                <p className="text-zinc-400 text-xs sm:text-sm font-medium">
                  {getSanitizedAlt(galleryItems[selectedIndex].alt, selectedIndex)}
                </p>
              </div>
            </motion.div>

            {/* Next Image Button */}
            {galleryItems.length > 1 && (
              <button
                className="absolute right-4 sm:right-6 z-20 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 p-3 rounded-xl transition-all cursor-pointer hidden sm:flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Ver imagen siguiente"
              >
                <ChevronRight size={22} />
              </button>
            )}

            {/* Mobile Bottom Navigation Bar */}
            {galleryItems.length > 1 && (
              <div className="sm:hidden absolute bottom-6 inset-x-0 flex items-center justify-center gap-4 z-20 pointer-events-auto">
                <button
                  className="text-zinc-400 hover:text-white bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className="text-zinc-400 hover:text-white bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
