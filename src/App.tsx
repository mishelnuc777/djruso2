import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Genres from './components/Genres';
import MusicSets from './components/MusicSets';
import Packages from './components/Packages';
import Gallery from './components/Gallery';
import SocialLinks from './components/SocialLinks';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Genres />
        <MusicSets />
        <Packages />
        <Gallery />
        <SocialLinks />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
