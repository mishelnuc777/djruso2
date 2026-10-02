import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { djData } from '../data/djData';

const WHATSAPP_URL = "https://wa.me/593992710709?text=Hola%20Bryan%2C%20vi%20tu%20p%C3%A1gina%20web%20y%20quisiera%20cotizar%20un%20evento.%20%C2%BFMe%20ayudas%20con%20disponibilidad%20y%20opciones%3F";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#packages' },
    { name: 'Sets', href: '#music' },
    { name: 'Live', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Reservas', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isPlaceholder = (val?: string): boolean => {
    if (!val) return true;
    const trimmed = val.trim();
    return trimmed.startsWith('[') && trimmed.endsWith(']');
  };

  const artistName = isPlaceholder(djData.artistName) ? 'DJ BRYAN ACOSTA' : djData.artistName;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl' 
          : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#home" 
          className="group flex items-center gap-1.5 focus:outline-none"
        >
          <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white group-hover:text-zinc-200 transition-colors">
            {artistName}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-9 lg:space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[13px] uppercase tracking-widest font-semibold text-zinc-300 hover:text-white transition-colors duration-200 py-1"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={WHATSAPP_URL} 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] cursor-pointer"
          >
            <MessageCircle size={15} />
            <span>COTIZAR POR WHATSAPP</span>
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden text-zinc-300 hover:text-white p-2 rounded-lg bg-zinc-900/60 border border-zinc-800 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menú de navegación"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-zinc-800/80 px-6 py-6 flex flex-col space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-semibold tracking-wider uppercase text-zinc-300 hover:text-white transition-colors py-2 border-b border-zinc-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href={WHATSAPP_URL} 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-3 px-5 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-600/30 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <MessageCircle size={16} />
            <span>COTIZAR POR WHATSAPP</span>
          </a>
        </div>
      )}
    </header>
  );
}
