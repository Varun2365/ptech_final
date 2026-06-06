import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, productsByCategory, getImagePath } from '../data/products';
import { useToast } from '../components/Toast';

const CATEGORY_META = {
  'industrial-scales': {
    title: 'Industrial Scales',
    desc: 'Heavy-duty weighing solutions built for factories, warehouses, and industrial environments.',
    image: 'industry',
  },
  'weighing-bridge': {
    title: 'Weighing Bridges & Items',
    desc: 'Complete weighbridge systems, indicators, junction boxes and accessories.',
    image: 'weigh',
  },
  'loadcells': {
    title: 'Loadcells',
    desc: 'Precision loadcells for bridges, cranes, and industrial applications.',
    image: 'load',
  },
  'personal-scales': {
    title: 'Personal Scales',
    desc: 'Everyday weighing scales for home, kitchen, and personal use.',
    image: 'ps',
  },
  'lab-scales': {
    title: 'Lab Scales',
    desc: 'High-precision instruments for laboratories and jewellery assessment.',
    image: 'lab',
  },
  'weighing-automation': {
    title: 'Weighing Automation',
    desc: 'Automated weighing systems and PLC integrated solutions for industries.',
    image: 'spz2',
  },
};

function Reveal({ children, className = '', delay = 0, direction = 'up' }) {
  const dirs = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: -40 },
    right: { y: 0, x: 40 },
  };
  const d = dirs[direction] || dirs.up;
  return (
    <motion.div
      initial={{ opacity: 0, ...d }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProductCard({ product, index = 0 }) {
  const imgSrc = getImagePath(product.image);
  return (
    <Reveal delay={index * 0.05}>
      <Link
        to={`/product/${product.slug}`}
        className="group flex flex-col h-full bg-white border-r border-b border-gray-200 last:border-r-0"
      >
        {/* Image */}
        <div className="w-full h-56 bg-white flex items-center justify-center overflow-hidden rounded-t-xl mx-auto px-4 pt-4">
          <img
            src={imgSrc}
            alt={product.name}
            className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/industry.jpg';
            }}
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-[#0a1425] font-bold text-base leading-snug group-hover:text-[#6366f1] transition-colors duration-300">
            {product.name}
          </h3>

          {product.sub && (
            <p className="text-gray-500 text-xs mt-2">{product.sub}</p>
          )}

          <p className="text-gray-400 text-xs mt-1">Starting From:</p>
          <p className="text-[#474747] text-sm font-semibold mt-0.5">Quote For Pricing</p>

          {/* Single Buy Now button with icon */}
          <div className="mt-auto pt-5">
            <button className="w-full py-3.5 bg-[#041023] text-white text-sm font-semibold rounded-[5px] border border-[#041023] transition-all duration-300 hover:bg-[#6366f1] hover:border-[#6366f1] flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              Buy Now
            </button>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export default function CategoryPage() {
  const { category } = useParams();
  const toast = useToast();
  const products = productsByCategory[category] || [];
  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const meta = CATEGORY_META[category] || {
    title: 'Products',
    desc: 'Browse our range of premium weighing solutions.',
    image: 'industry',
  };

  return (
    <div className="min-h-screen bg-[#f7f8f9] pt-16">
      <Helmet>
        <title>{meta.title} | P-Tech Scales</title>
        <meta name="description" content={`Browse our ${meta.title} collection. ${meta.desc}`} />
      </Helmet>

      {/* Category Hero */}
      <section className="relative overflow-hidden bg-[#041023]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${getImagePath(meta.image)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041023] via-[#041023]/80 to-[#041023]/60" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-[80rem] mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6366f1]/30 bg-[#6366f1]/10 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" />
                <span className="text-[#818cf8] text-xs font-medium tracking-wider uppercase">Store</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white text-4xl md:text-5xl font-extrabold leading-tight"
            >
              {meta.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg mt-4 max-w-lg"
            >
              {meta.desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-2 mt-6 text-sm"
            >
              <Link to="/" className="text-gray-500 hover:text-white transition-colors">Home</Link>
              <span className="text-gray-600">/</span>
              <span className="text-[#818cf8]">Store</span>
              <span className="text-gray-600">/</span>
              <span className="text-white">{meta.title}</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-8"
          >
            <div className="text-center">
              <span className="text-white text-3xl font-extrabold block">{products.length}</span>
              <span className="text-gray-500 text-xs tracking-wider uppercase mt-1 block">Products</span>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <span className="text-white text-3xl font-extrabold block">21+</span>
              <span className="text-gray-500 text-xs tracking-wider uppercase mt-1 block">Years Exp</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[80rem] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          {/* Mobile: Dropdown */}
          <div className="lg:hidden mb-6">
            <div className="relative">
              <button
                onClick={() => setCatDropdownOpen(!catDropdownOpen)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3.5 bg-[#071a3b] text-white text-sm font-medium rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={getImagePath(CATEGORY_META[category]?.image || 'industry')}
                    alt=""
                    className="w-8 h-8 object-cover rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/industry.jpg';
                    }}
                  />
                  <span>{CATEGORY_META[category]?.title || 'Select Category'}</span>
                </div>
                <svg
                  className={`w-4 h-4 text-white/60 transition-transform duration-200 ${catDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {catDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 w-full mt-2 bg-[#071a3b] rounded-xl shadow-xl overflow-hidden border border-white/10"
                  >
                    {categories.map((cat) => {
                      const isActive = cat.slug === category;
                      const catMeta = CATEGORY_META[cat.slug];
                      const imgSrc = getImagePath(catMeta?.image || 'industry');
                      return (
                        <Link
                          key={cat.slug}
                          to={cat.path}
                          onClick={() => setCatDropdownOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-[#040e1f] text-white'
                              : 'text-white/70 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <img
                            src={imgSrc}
                            alt=""
                            className="w-8 h-8 object-cover flex-shrink-0 rounded-full"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/images/industry.jpg';
                            }}
                          />
                          <span className="flex-1">{cat.name}</span>
                          {isActive && (
                            <svg className="w-4 h-4 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop: Full sidebar */}
          <div className="hidden lg:block lg:sticky lg:top-[calc(4rem+1.5rem)]">
            <div className="bg-[#071a3b] rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/10">
                <h3 className="text-white font-bold text-sm tracking-wider uppercase">Categories</h3>
              </div>
              <nav className="py-2">
                {categories.map((cat) => {
                  const isActive = cat.slug === category;
                  const catMeta = CATEGORY_META[cat.slug];
                  const imgSrc = getImagePath(catMeta?.image || 'industry');
                  return (
                    <Link
                      key={cat.slug}
                      to={cat.path}
                      className={`flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-[#040e1f] text-white'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <img
                        src={imgSrc}
                        alt=""
                        className="w-9 h-9 object-cover flex-shrink-0 rounded-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/industry.jpg';
                        }}
                      />
                      <span className="flex-1">{cat.name}</span>
                      {isActive && (
                        <svg className="w-4 h-4 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Quick Contact - Desktop only */}
            <div className="bg-[#6366f1] rounded-2xl p-6 text-white mt-6">
              <h4 className="font-bold text-sm mb-2">Need Help?</h4>
              <p className="text-white/70 text-xs leading-relaxed mb-4">
                Contact us for pricing and product inquiries.
              </p>
              <button
                onClick={() => setContactOpen(true)}
                className="w-full py-3.5 bg-white text-[#6366f1] text-sm font-semibold rounded-[5px] transition-all duration-300 hover:bg-gray-100"
              >
                Contact Us
              </button>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-[#0a1425] text-2xl font-bold">{meta.title}</h2>
              <p className="text-gray-400 text-sm mt-1">{products.length} products available</p>
            </div>

            {category === 'weighing-bridge' ? (
              <>
                <div>
                  <h3 className="text-[#0a1425] text-sm font-bold px-6 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
                    <span className="w-1 h-5 bg-[#6366f1] rounded-full" />
                    Weighing Bridge Accessories
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                    {products.slice(0, 5).map((p, i) => (
                      <ProductCard key={p.slug} product={p} index={i} />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-[#0a1425] text-sm font-bold px-6 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
                    <span className="w-1 h-5 bg-[#6366f1] rounded-full" />
                    Weighing Bridges
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                    {products.slice(5).map((p, i) => (
                      <ProductCard key={p.slug} product={p} index={i} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((p, i) => (
                  <ProductCard key={p.slug} product={p} index={i} />
                ))}
              </div>
            )}

            {products.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No products in this category.</p>
              </div>
            )}
          </div>

          {/* Quick Contact - Mobile only */}
          <div className="lg:hidden bg-[#6366f1] rounded-2xl p-6 text-white mt-6">
            <h4 className="font-bold text-sm mb-2">Need Help?</h4>
            <p className="text-white/70 text-xs leading-relaxed mb-4">
              Contact us for pricing and product inquiries.
            </p>
            <button
              onClick={() => setContactOpen(true)}
              className="w-full py-3.5 bg-white text-[#6366f1] text-sm font-semibold rounded-[5px] transition-all duration-300 hover:bg-gray-100"
            >
              Contact Us
            </button>
          </div>
        </main>
      </div>

      {/* Contact Dialog */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[300] flex items-center justify-center px-4"
            onClick={() => setContactOpen(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-md bg-white shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-[#041023] px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg">Contact Us</h3>
                    <p className="text-gray-400 text-sm mt-0.5">We'll get back to you shortly</p>
                  </div>
                  <button
                    onClick={() => setContactOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-[5px] hover:bg-white/10 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                      <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0a1425] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-[5px] outline-none focus:border-[#6366f1] transition-all placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0a1425] mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="10-digit phone number"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-[5px] outline-none focus:border-[#6366f1] transition-all placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0a1425] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-[5px] outline-none focus:border-[#6366f1] transition-all placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0a1425] mb-1.5">Message</label>
                  <textarea
                    rows={3}
                    placeholder="Your message..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-[5px] outline-none focus:border-[#6366f1] transition-all resize-none placeholder:text-gray-400"
                  />
                </div>

                {/* Submit + Cancel Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={async () => {
                      if (!contactForm.name || !contactForm.phone || !contactForm.email) {
                        toast('Please fill in all required fields', 'error');
                        return;
                      }
                      setSending(true);
                      toast("We've received your message and will contact you soon!");
                      setContactForm({ name: '', phone: '', email: '', message: '' });
                      setSending(false);
                      setContactOpen(false);
                    }}
                    disabled={sending}
                    className="flex-1 py-3.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-bold rounded-[5px] transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {sending ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                  <button
                    onClick={() => setContactOpen(false)}
                    className="px-6 py-3.5 text-sm font-semibold text-gray-500 hover:bg-gray-100 rounded-[5px] transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
