import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const HERO_IMAGES = ['sl1.jpeg', 'sl2.jpeg', 'sl3.jpeg', 'sl4.jpeg', 'sl5.jpeg'];

const CAROUSEL_ITEMS = [
  { src: '/images/sl1.jpeg', label: 'Industrial Weighing' },
  { src: '/images/sl2.jpeg', label: 'Precision Solutions' },
  { src: '/images/sl3.jpeg', label: 'Weighing Bridges' },
  { src: '/images/sl4.jpeg', label: 'Lab Instruments' },
  { src: '/images/sl5.jpeg', label: 'Load Cells' },
];

const STATS = [
  { value: '21+', label: 'Years Experience' },
  { value: '1000+', label: 'Happy Clients' },
  { value: '50+', label: 'Product Range' },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (carouselPaused) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [carouselPaused]);

  const goToSlide = useCallback((i) => {
    setCarouselIndex(i);
    setCarouselPaused(true);
    setTimeout(() => setCarouselPaused(false), 6000);
  }, []);

  const touchStartX = useRef(0);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 50) return;
    setCarouselIndex((prev) => (prev + (dx < 0 ? 1 : -1) + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
    setCarouselPaused(true);
    setTimeout(() => setCarouselPaused(false), 6000);
  };

  return (
    <section className="relative w-full min-h-[100vh] bg-[#041023] overflow-hidden flex items-center">
      {/* Animated background images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/images/${HERO_IMAGES[index]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-[#041023] via-[#041023]/90 to-[#041023]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041023] via-transparent to-[#041023]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[80rem] mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Text */}
        <div className="flex-1 w-full text-center flex flex-col items-center lg:text-left lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#6366f1]/30 bg-[#6366f1]/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#6366f1] animate-pulse" />
              <span className="text-[#818cf8] text-sm font-medium tracking-wide">
                India's Trusted Weighing Partner
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight"
          >
            P-Tech{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818cf8] to-[#6366f1]">
              Scales
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-400 text-lg md:text-xl mt-8 max-w-lg leading-relaxed"
          >
            Precision weighing solutions trusted by 1000+ companies across India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 mt-10"
          >
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <button className="px-8 py-4 bg-[#6366f1] text-white font-semibold rounded-lg transition-all duration-300 hover:bg-[#4f46e5] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:-translate-y-0.5">
                Explore Products
              </button>
            </a>
            <Link to="/store/industrial-scales">
              <button className="px-8 py-4 border border-white/20 text-white font-medium rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white/40">
                Visit Store
              </button>
            </Link>
          </motion.div>

          {/* Mobile carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-full lg:hidden mt-10"
            onMouseEnter={() => setCarouselPaused(true)}
            onMouseLeave={() => setCarouselPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ aspectRatio: '16 / 9' }}>
              <AnimatePresence>
                <motion.img
                  key={carouselIndex}
                  src={CAROUSEL_ITEMS[carouselIndex].src}
                  alt={CAROUSEL_ITEMS[carouselIndex].label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
                <AnimatePresence>
                  <motion.span
                    key={carouselIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="text-white text-base font-semibold"
                  >
                    {CAROUSEL_ITEMS[carouselIndex].label}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              {CAROUSEL_ITEMS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === carouselIndex
                      ? 'w-6 h-1.5 bg-[#6366f1]'
                      : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center gap-10 mt-14"
          >
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-white text-3xl md:text-4xl font-extrabold">
                  {stat.value}
                </span>
                <span className="text-gray-500 text-sm mt-1 tracking-wide">
                  {stat.label}
                </span>
                {i < STATS.length - 1 && (
                  <div className="hidden" />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Image carousel */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex-1 w-full hidden lg:flex items-center justify-center relative h-[600px]"
          onMouseEnter={() => setCarouselPaused(true)}
          onMouseLeave={() => setCarouselPaused(false)}
        >
          <div className="relative w-full max-w-2xl">
            {/* Main carousel image */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ aspectRatio: '16 / 9' }}>
              <AnimatePresence>
                <motion.img
                  key={carouselIndex}
                  src={CAROUSEL_ITEMS[carouselIndex].src}
                  alt={CAROUSEL_ITEMS[carouselIndex].label}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                <AnimatePresence>
                  <motion.span
                    key={carouselIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="text-white text-xl font-semibold"
                  >
                    {CAROUSEL_ITEMS[carouselIndex].label}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {CAROUSEL_ITEMS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === carouselIndex
                      ? 'w-7 h-2 bg-[#6366f1]'
                      : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#6366f1]/10 rounded-full blur-[100px] -z-10" />
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-500 text-xs tracking-[3px] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border-2 border-gray-600 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-[#6366f1] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
