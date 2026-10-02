import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Packages from './components/Packages';
import MusicSets from './components/MusicSets';
import Gallery from './components/Gallery';
import SocialLinks from './components/SocialLinks';
import Genres from './components/Genres';
import About from './components/About';
import Contact from './components/Contact';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden relative">
      {/* Subtle cinematic analog film grain texture across viewport */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 grain-overlay" 
        aria-hidden="true" 
      />

      <Navbar />
      
      <main>
        {/* 1. HERO / HOME */}
        <Hero />
        
        {/* 2. SERVICES */}
        <Packages />
        
        {/* 3. SELECTED SETS / MUSIC SETS */}
        <MusicSets />
        
        {/* 4. LIVE / GALLERY */}
        <Gallery />
        
        {/* 5. SONIDO / GÉNEROS */}
        <Genres />

        {/* 6. SOCIAL LINKS */}
        <SocialLinks />
        
        {/* 7. ABOUT / 18 AÑOS EN ESCENA */}
        <About />
        
        {/* 8. CONTACT / BOOKING */}
        <Contact />
        
        {/* 9. FINAL CTA / DJ BRYAN ACOSTA */}
        <FinalCTA />
      </main>

      {/* 9. FOOTER */}
      <Footer />
    </div>
  );
}
