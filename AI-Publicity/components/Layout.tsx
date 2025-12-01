import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bot, Instagram, Mail, Phone, MapPin, Tag, Calendar } from 'lucide-react';
import { useContent } from '../context/ContentContext';

// Custom TikTok Icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { content } = useContent();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services & Pricing' },
    { path: '/free-ads', label: 'Free Ads' },
    { path: '/contact', label: 'Book Strategy Call' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Black Friday Banner */}
      <div className="fixed top-0 left-0 w-full h-12 bg-gradient-to-r from-red-600 via-purple-600 to-red-600 z-[60] flex items-center justify-center px-4 shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="flex items-center space-x-2 animate-pulse relative z-10">
           <Tag className="w-4 h-4 text-yellow-300 fill-yellow-300" />
           <p className="text-white text-xs md:text-sm font-extrabold tracking-wide uppercase text-center">
             Black Friday: 20% OFF all packages for 1 year! <span className="hidden sm:inline text-yellow-300">— Ends Dec 9th</span>
           </p>
           <Tag className="w-4 h-4 text-yellow-300 fill-yellow-300" />
        </div>
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b border-white/10 top-12 ${scrolled ? 'bg-slate-950/95 backdrop-blur-xl shadow-2xl py-2' : 'bg-slate-950/80 backdrop-blur-md py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between h-16">
             <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              <Link to="/" className="flex items-center space-x-2">
                <span className="font-bold text-lg text-white">AI Publicity Media</span>
              </Link>
              
              {/* Placeholder for balance */}
              <div className="w-10" />
          </div>

          {/* Desktop Header - Centered Logo & Nav */}
          <div className="hidden md:flex flex-col items-center justify-center">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-4 group mb-4 relative">
               {/* Glow Effect */}
              <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-700"></div>
              
              {content.branding?.logoUrl ? (
                 <div className="h-16 w-16 relative gpu-optimized">
                   <img 
                     src={content.branding.logoUrl} 
                     alt="AI Publicity Media" 
                     className="h-full w-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                     style={{ imageRendering: 'auto' }} // Browser handles high-res downscaling better with auto
                   />
                 </div>
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.4)] group-hover:shadow-[0_0_50px_rgba(34,211,238,0.6)] transition-all duration-500 group-hover:rotate-3 gpu-optimized">
                  <Bot className="text-white h-8 w-8 group-hover:scale-110 transition-transform duration-500" />
                </div>
              )}
              <div className="flex flex-col items-center lg:items-start">
                  <span className="font-extrabold text-3xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300 antialiased">
                    AI Publicity Media
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium group-hover:text-cyan-200 transition-colors antialiased">
                    Future of Social Media
                  </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-2">
                {navLinks.map((link) => {
                  if (link.path === '/contact') {
                    // Distinct Call-To-Action Button Style
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="relative group overflow-hidden px-6 py-2.5 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-600 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all duration-300 flex items-center gap-2 antialiased"
                      >
                         {/* Diagonal Shimmer Effect */}
                         <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent z-0 skew-x-[-20deg]"></div>
                         
                         <Calendar className="w-4 h-4 relative z-10" />
                         <span className="relative z-10">{link.label}</span>
                      </Link>
                    );
                  }

                  // Standard Nav Link Style
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`${
                        isActive(link.path)
                          ? 'text-cyan-400 bg-white/5 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      } px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 antialiased`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-white/10 animate-in slide-in-from-top-5 duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${
                    isActive(link.path)
                      ? 'bg-slate-800 text-cyan-400'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  } px-3 py-2 rounded-md text-base font-medium antialiased flex items-center gap-2`}
                >
                  {link.path === '/contact' && <Calendar className="w-4 h-4" />}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content - Added more padding top to account for banner + header */}
      <main className="flex-grow pt-32 md:pt-56">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group cursor-default">
                {content.branding?.logoUrl ? (
                  <img src={content.branding.logoUrl} alt="Logo" className="h-10 w-10 rounded-full object-cover group-hover:scale-110 transition-transform duration-300 gpu-optimized" />
                ) : (
                  <Bot className="h-8 w-8 text-purple-500 group-hover:rotate-12 transition-transform duration-300 group-hover:text-cyan-400" />
                )}
                <span className="font-bold text-xl text-white group-hover:text-cyan-400 transition-colors antialiased">AI Publicity Media</span>
              </div>
              <p className="text-slate-400 text-sm max-w-xs leading-relaxed antialiased">
                {content.about.mission}
              </p>
              <div className="flex space-x-5 pt-4">
                <a 
                  href="https://instagram.com/ai.publicity" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-slate-400 hover:text-pink-500 transition-all flex items-center gap-2 group"
                >
                  <div className="p-2 bg-slate-900 rounded-full border border-white/5 group-hover:border-pink-500/50 group-hover:bg-pink-500/10 transition-all group-hover:-translate-y-1 gpu-optimized">
                    <Instagram className="h-5 w-5" />
                  </div>
                </a>
                <a 
                  href="https://tiktok.com/@ai.publicity" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-slate-400 hover:text-cyan-400 transition-all flex items-center gap-2 group"
                >
                  <div className="p-2 bg-slate-900 rounded-full border border-white/5 group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10 transition-all group-hover:-translate-y-1 gpu-optimized">
                    <TikTokIcon className="h-5 w-5" />
                  </div>
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-purple-500 inline-block"></span>
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-slate-400 group hover:text-white transition-colors">
                  <Mail className="h-5 w-5 text-purple-500 shrink-0 group-hover:animate-bounce" />
                  <span className="text-sm antialiased">{content.contact.email}</span>
                </li>
                <li className="flex items-start space-x-3 text-slate-400 group hover:text-white transition-colors">
                  <Phone className="h-5 w-5 text-purple-500 shrink-0 group-hover:animate-tada" />
                  <span className="text-sm antialiased">{content.contact.phone}</span>
                </li>
                <li className="flex items-start space-x-3 text-slate-400 group hover:text-white transition-colors">
                  <MapPin className="h-5 w-5 text-purple-500 shrink-0 group-hover:animate-bounce" />
                  <span className="text-sm antialiased">{content.contact.address}</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6 flex items-center gap-2">
                 <span className="w-8 h-0.5 bg-cyan-500 inline-block"></span>
                 Navigation
              </h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-slate-400 hover:text-cyan-400 text-sm transition-all hover:translate-x-2 inline-block flex items-center gap-2 group antialiased">
                      <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left antialiased">
              &copy; {new Date().getFullYear()} AI Publicity Media. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;