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

// 12 fotografías reales dentro de /public/assets/gallery/
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

// Videos de YouTube configurados en src/data/djData.ts (galleryVideos)
const galleryVideoItems: GalleryItem[] = (djData.galleryVideos ?? []).flatMap((video) => {
  const yt = parseYouTube(video.url);
  if (!yt) return [];
  return [{ id: video.id, url: youTubeThumbnail(yt.id), alt: video.title, videoUrl: video.url }];
});

const galleryItems: GalleryItem[] = [...galleryPhotos, ...galleryVideoItems];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const getSanitizedAlt = (altText: string, index: number): string => {
    if (!altText || (altText.startsWith('[') && altText.endsWith(']'))) {
      return `Registro visual ${String(index + 1).padStart(2, '0')}`;
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
    <section id="gallery" className="py-20 md:py-28 bg-black relative border-t border-zinc-900 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            EDITORIAL HEADER
            ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-14 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="w-6 h-[2px] bg-blue-500"></span>
              <span className="text-blue-400 font-bold tracking-[0.28em] uppercase text-xs">
                ARCHIVO
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
              LIVE
            </h2>
          </div>

          <div className="text-xs text-zinc-500 uppercase tracking-widest font-mono pb-1 self-start sm:self-end">
            <span>
              {hasItems && (
                <>
                  {galleryPhotos.length} Fotografías
                  {galleryVideoItems.length > 0 && ` · ${galleryVideoItems.length} Videos`}
                </>
              )}
            </span>
          </div>
        </div>

        {/* =========================================================================
            EDITORIAL ASYMMETRIC MASONRY SPREAD (NO CARDS / NO HEAVY BORDERS)
            ========================================================================= */}
        {hasItems && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5">
            {galleryItems.map((image, index) => {
              const altText = getSanitizedAlt(image.alt, index);

              // Editorial Magazine Pacing (Controlled Asymmetric Hierarchy)
              // Row 1: 0 (Hero Wide 8 cols) + 1 (Vertical 4 cols) = 12
              // Row 2: 2, 3, 4 (Triad 4 cols each) = 12
              // Row 3: 5 (Vertical 5 cols) + 6 (Hero Wide 7 cols) = 12
              // Row 4: 7, 8, 9 (Triad 4 cols each) = 12
              // Row 5: 10, 11 (Expansive Panoramas 6 cols each) = 12
              let colSpan = 'lg:col-span-4 sm:col-span-1';
              let aspectClass = 'aspect-[4/3]';

              if (index === 0) {
                colSpan = 'lg:col-span-8 sm:col-span-2';
                aspectClass = 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] min-h-[300px] sm:min-h-[420px]';
              } else if (index === 1) {
                colSpan = 'lg:col-span-4 sm:col-span-1';
                aspectClass = 'aspect-[4/5] sm:aspect-square lg:aspect-[4/5]';
              } else if (index === 2 || index === 3 || index === 4) {
                colSpan = 'lg:col-span-4 sm:col-span-1';
                aspectClass = 'aspect-[4/3]';
              } else if (index === 5) {
                colSpan = 'lg:col-span-5 sm:col-span-1';
                aspectClass = 'aspect-[4/5] sm:aspect-square lg:aspect-[4/5]';
              } else if (index === 6) {
                colSpan = 'lg:col-span-7 sm:col-span-2';
                aspectClass = 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] min-h-[300px] sm:min-h-[420px]';
              } else if (index === 7 || index === 8 || index === 9) {
                colSpan = 'lg:col-span-4 sm:col-span-1';
                aspectClass = 'aspect-[1/1] sm:aspect-[4/3]';
              } else if (index === 10 || index === 11) {
                colSpan = 'lg:col-span-6 sm:col-span-1';
                aspectClass = 'aspect-[16/10]';
              }

              return (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 6) * 0.06, duration: 0.5 }}
                  className={`relative group overflow-hidden rounded-lg bg-zinc-950 cursor-pointer ${colSpan}`}
                  onClick={() => setSelectedIndex(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedIndex(index);
                    }
                  }}
                  aria-label={image.videoUrl ? `Reproducir video: ${altText}` : `Ver imagen en pantalla completa`}
                >
                  <div className={`w-full h-full ${aspectClass} overflow-hidden`}>
                    <img 
                      src={image.url} 
                      alt={altText}
                      loading={index < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Play Trigger for Video Items */}
                  {image.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg">
                        <Play size={20} className="translate-x-0.5" fill="currentColor" />
                      </span>
                    </div>
                  )}

                  {/* Subtle hover overlay & minimal zoom indicator */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-start justify-end p-3">
                    <span className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white/90 transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn size={14} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* =========================================================================
          LIGHTBOX MODAL (PURE FULLSCREEN PHOTO PROTAGONISM)
          ========================================================================= */}
      <AnimatePresence>
        {selectedIndex !== null && galleryItems[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label="Visor de imagen"
          >
            {/* Top Bar with Counter and Close Button */}
            <div className="absolute top-5 left-6 right-6 flex items-center justify-between z-20 pointer-events-none">
              <span className="text-xs font-mono font-semibold tracking-widest text-zinc-400 pointer-events-auto bg-zinc-900/80 px-3 py-1.5 rounded border border-zinc-800">
                {String(selectedIndex + 1).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')}
              </span>

              <button 
                className="text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 p-2.5 rounded-lg transition-colors cursor-pointer pointer-events-auto"
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
                className="absolute left-4 sm:left-6 z-20 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 p-3 rounded-lg transition-all cursor-pointer hidden sm:flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Center Image Container */}
            <motion.div 
              key={selectedIndex}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-6xl max-h-[88vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const current = galleryItems[selectedIndex];
                const yt = parseYouTube(current.videoUrl);
                if (yt) {
                  return (
                    <div
                      className={`rounded-lg overflow-hidden bg-black ${
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
                    className="max-w-[92vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
                  />
                );
              })()}
            </motion.div>

            {/* Next Image Button */}
            {galleryItems.length > 1 && (
              <button
                className="absolute right-4 sm:right-6 z-20 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 p-3 rounded-lg transition-all cursor-pointer hidden sm:flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Imagen siguiente"
              >
                <ChevronRight size={22} />
              </button>
            )}

            {/* Mobile Bottom Navigation Bar */}
            {galleryItems.length > 1 && (
              <div className="sm:hidden absolute bottom-6 inset-x-0 flex items-center justify-center gap-4 z-20 pointer-events-auto">
                <button
                  className="text-zinc-400 hover:text-white bg-zinc-900/90 border border-zinc-800 p-3 rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className="text-zinc-400 hover:text-white bg-zinc-900/90 border border-zinc-800 p-3 rounded-lg"
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
