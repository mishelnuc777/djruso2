import { DJData } from '../types/dj';

export const djData: DJData = {
  artistName: "DJ BRYAN ACOSTA",
  stageName: "Bryan Acosta",
  realName: "Bryan David Acosta Molina",
  tagline: "DJ de DJs",
  slogan: "Desde la última loma de Caspigasi",
  shortDescription: "Propuesta musical versátil para todo tipo de eventos: reguetón, música electrónica y diversos géneros, con sets dinámicos, mezclas y remixes respaldados por más de 18 años de trayectoria.",
  biography: "Bryan David Acosta Molina, conocido artísticamente como Bryan Acosta, es un DJ ecuatoriano con más de 18 años de trayectoria en la industria del entretenimiento. Su energía, técnica y conexión con el público lo han llevado a presentarse en eventos, festivales y escenarios de todo Ecuador.\n\nDurante su carrera ha participado en certámenes de DJs organizados por emisoras de Quito y ha sido DJ residente de discotecas de la capital. Con una propuesta musical amplia y versátil, trabaja con reguetón, música electrónica y diferentes géneros, creando sets, mezclas y remixes dinámicos pensados para mantener al público conectado y la pista activa durante todo el evento.\n\nAdemás de su carrera como DJ, dirige su propia empresa de producción de eventos, con servicios y equipamiento para celebraciones privadas, corporativas y producciones musicales.",
  yearsOfExperience: "Más de 18 años",
  heroImage: "https://images.unsplash.com/photo-1571266028243-cb40fce7573b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  // ---- VIDEO DE INICIO (HOME) ----
  // Opción A: enlace de YouTube (puede ser un Short vertical o un video normal).
  // Si lo llenas, reemplaza al video local. Ej: "https://youtube.com/shorts/XXXXXXXXXXX"
  heroYoutubeUrl: "",
  // Opción B: video local (ya optimizado desde tu IMG_3623.MP4).
  heroVideo: "/assets/videos/hero-vertical.mp4",
  heroVideoPoster: "/assets/videos/hero-poster.jpg",
  // "vertical" = grabado con el celular (9:16). "horizontal" = 16:9.
  heroVideoOrientation: "vertical",
  profileImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  genres: [
    "House",
    "Tech House",
    "Electrónica",
    "Reguetón",
    "Latino",
    "Comercial"
  ],
  socialMedia: [
    { platform: "Instagram", url: "https://www.instagram.com/djbryanacosta/", icon: "instagram" },
    { platform: "TikTok", url: "https://www.tiktok.com/@djbryanacosta", icon: "video" },
    { platform: "YouTube", url: "https://www.youtube.com/@djbryanacosta", icon: "youtube" },
    { platform: "Facebook", url: "[URL DE FACEBOOK]", icon: "facebook" },
    { platform: "SoundCloud", url: "[URL DE SOUNDCLOUD]", icon: "music" },
    { platform: "Spotify", url: "[URL DE SPOTIFY]", icon: "headphones" }
  ],
  contact: {
    email: "djdavidlacost@gmail.com",
    phone: "+593 99 271 0709",
    location: "Quito, Ecuador"
  },
  // ---- SETS ----
  // En cada set pega el enlace de YouTube en "url". La portada se toma sola de YouTube.
  musicSets: [
    {
      id: "set-1",
      title: "MIX REGGAETON NUEVO 2025: QLONA KAROL G & Peso Pluma (VIDEO OFICIAL), LALA",
      genre: "Reguetón",
      duration: "33:50",
      platform: "YouTube",
      url: "https://youtu.be/oL9gpJPqqWA",
      coverImage: "https://img.youtube.com/vi/oL9gpJPqqWA/maxresdefault.jpg"
    },
    {
      id: "set-2",
      title: "EURODANCE 2000´S MIX - DJ BRYAN ACOSTA",
      genre: "Eurodance",
      duration: "41:23",
      platform: "YouTube",
      url: "https://youtu.be/JCH2BvDN_Do",
      coverImage: "https://img.youtube.com/vi/JCH2BvDN_Do/maxresdefault.jpg"
    },
    {
      id: "set-3",
      title: "MIX AÑO NUEVO 2023 - UNA GATITA QUE LE GUSTA EL MAMBO y BABY SACA A ESA PE...... A PASEAR",
      genre: "Mambo / Fiesta",
      duration: "1:01:14",
      platform: "YouTube",
      url: "https://youtu.be/aHze_ZfYYz8",
      coverImage: "https://img.youtube.com/vi/aHze_ZfYYz8/maxresdefault.jpg"
    }
  ],
  // ---- VIDEOS EN LA GALERÍA ----
  // Agrega aquí enlaces de YouTube; aparecen junto a las fotos y se reproducen al hacer clic.
  galleryVideos: [
    // { id: "vid-1", title: "Aftermovie del evento", url: "https://www.youtube.com/watch?v=XXXXXXXXXXX" },
  ],
  gallery: [
    { id: "gal-1", url: "https://images.unsplash.com/photo-1571266028243-cb40fce7573b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", alt: "DJ tocando en vivo" },
    { id: "gal-2", url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", alt: "Público en festival" },
    { id: "gal-3", url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", alt: "Equipo de DJ de cerca" },
    { id: "gal-4", url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", alt: "Show de láser en discoteca" },
    { id: "gal-5", url: "https://images.unsplash.com/photo-1545128485-c400e7702796?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", alt: "Manos del DJ en el mezclador" },
    { id: "gal-6", url: "https://images.unsplash.com/photo-1520694119335-e1150c9f13e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", alt: "Escenario de evento al aire libre" }
  ],
  packages: [
    {
      id: "srv-1",
      name: "SHOW DJ",
      description: "Presentación de DJ para eventos, con sets adaptados al público y al tipo de celebración.",
      image: "/assets/gallery/gallery-01.jpg",
      includes: [
        "DJ",
        "Controlador",
        "Máquina de humo según montaje"
      ],
      isPopular: true
    },
    {
      id: "srv-2",
      name: "PRODUCCIÓN PARA EVENTOS",
      description: "Soluciones completas de sonido, iluminación y equipamiento técnico según las necesidades de cada evento.",
      image: "/assets/gallery/gallery-03.jpg",
      includes: [
        "Sonido profesional",
        "Iluminación",
        "Microfonía",
        "Parlantes",
        "Pedestales",
        "Monitores",
        "Pantallas LED",
        "Equipamiento para artistas"
      ]
    },
    {
      id: "srv-3",
      name: "EXTRAS Y EFECTOS ESPECIALES",
      description: "Complementos adicionales para elevar la experiencia visual y técnica del evento.",
      image: "/assets/gallery/gallery-04.jpg",
      includes: [
        "Máquina de humo",
        "Pirotecnia fría",
        "Otros efectos disponibles bajo cotización"
      ]
    }
  ],
  events: [
    {
      id: "evt-1",
      title: "[NOMBRE DEL EVENTO]",
      date: "[FECHA]",
      location: "[UBICACIÓN]",
      description: "[BREVE DESCRIPCIÓN DEL EVENTO]",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "evt-2",
      title: "[NOMBRE DEL EVENTO 2]",
      date: "[FECHA 2]",
      location: "[UBICACIÓN 2]",
      description: "[BREVE DESCRIPCIÓN DEL EVENTO 2]",
      image: "https://images.unsplash.com/photo-1545128485-c400e7702796?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ],
  testimonials: [
    {
      id: "test-1",
      clientName: "[NOMBRE DEL CLIENTE]",
      event: "[TIPO DE EVENTO / FECHA]",
      comment: "[TESTIMONIO DEL CLIENTE]",
      rating: 5
    },
    {
      id: "test-2",
      clientName: "[NOMBRE DEL CLIENTE 2]",
      event: "[TIPO DE EVENTO / FECHA 2]",
      comment: "[TESTIMONIO DEL CLIENTE 2]",
      rating: 5
    }
  ]
};
