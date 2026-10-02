export interface Statistic {
  label: string;
  value: string;
}

export interface SocialMedia {
  platform: string;
  url: string;
  icon: string; // will map to a Lucide icon
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

export interface MusicSet {
  id: string;
  title: string;
  genre: string;
  duration: string;
  platform: string;
  url: string; // enlace de YouTube (watch, youtu.be o shorts), SoundCloud, etc.
  coverImage?: string; // opcional: si url es de YouTube se usa su miniatura automáticamente
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

export interface Package {
  id: string;
  name?: string;
  description?: string;
  price?: string;
  duration?: string;
  guests?: string;
  includes?: string[];
  isPopular?: boolean;
  image?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  event: string;
  comment: string;
  rating?: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

export interface GalleryVideo {
  id: string;
  title: string;
  url: string; // enlace de YouTube
}

export interface DJData {
  artistName: string;
  stageName?: string;
  realName?: string;
  tagline?: string;
  slogan: string;
  shortDescription: string;
  biography: string;
  yearsOfExperience?: string;
  numberOfEvents?: string;
  heroImage: string;
  heroVideo?: string; // video local (public/assets/videos/...)
  heroVideoPoster?: string; // imagen mientras carga el video local
  heroYoutubeUrl?: string; // si se llena, reemplaza al video local
  heroVideoOrientation?: 'vertical' | 'horizontal';
  soundVideo?: string; // segundo video local para sección Sonido (public/assets/videos/sonido-bryan.mp4)
  profileImage: string;
  genres: string[];
  statistics?: Statistic[];
  socialMedia: SocialMedia[];
  contact: ContactInfo;
  musicSets: MusicSet[];
  events: Event[];
  packages: Package[];
  testimonials: Testimonial[];
  gallery: GalleryImage[];
  galleryVideos?: GalleryVideo[];
}
