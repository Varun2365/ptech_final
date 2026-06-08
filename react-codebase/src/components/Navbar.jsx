import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

function useScrollLock(isLocked) {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLocked]);
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useScrollLock(menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href.startsWith('/#')) {
      const id = href.split('#')[1];
      if (location.pathname === '/') {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    } else {
      navigate(href);
    }
    setMenuOpen(false);
  };

  const handleStoreClick = (e) => {
    e.preventDefault();
    navigate('/store');
    setMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-[#040e1f]/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.05)]'
            : 'bg-[#040e1f]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center" aria-label="P-TECH SCALES Home">
              <span className="text-white font-semibold text-base tracking-tight">
                P-TECH SCALES
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative px-4 py-2 text-sm text-gray-300 font-medium hover:text-white transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#6366f1] transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <a
              href="/store"
              onClick={handleStoreClick}
              className="hidden md:flex items-center gap-2 px-5 py-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-medium rounded-lg transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Store
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors duration-200"
              aria-label="Open menu"
            >
              <div className="flex flex-col gap-[5px]">
                <span className="block w-5 h-[1.5px] bg-gray-300" />
                <span className="block w-5 h-[1.5px] bg-gray-300" />
                <span className="block w-3.5 h-[1.5px] bg-gray-300" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
              onClick={() => setMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed right-0 top-0 h-screen w-[85%] max-w-sm bg-[#060f1e] z-[201] flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">
                <Link to="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
                  <span className="text-white font-semibold text-sm tracking-tight">
                    P-TECH SCALES
                  </span>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <path d="M18 6L6 18M6 6l12 12" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Sidebar Links */}
              <div className="flex-1 overflow-y-auto py-4 px-3">
                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map((link, i) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="flex items-center gap-3 px-4 py-3.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 text-sm font-medium"
                    >
                      <span className="text-[#6366f1] text-xs font-mono opacity-50">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {link.label}
                    </a>
                  ))}
                </div>

                <div className="my-6 mx-4 border-t border-white/5" />

                {/* Store Link */}
                <a
                  href="/store"
                  onClick={handleStoreClick}
                  className="flex items-center gap-3 px-4 py-3.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  <svg className="w-4 h-4 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Store
                </a>
              </div>

              {/* Sidebar Footer */}
              <div className="px-6 py-5 border-t border-white/5">
                <a
                  href="tel:+919899810002"
                  className="flex items-center gap-3 text-gray-300 text-xs"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 98998 10002
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
