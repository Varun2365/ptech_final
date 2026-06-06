import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { products, categories, getImagePath } from '../data/products';

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ImageZoom({ src, alt }) {
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square bg-white rounded-[5px] border border-gray-200 overflow-hidden cursor-crosshair"
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain p-6 transition-transform duration-200"
        style={{
          transform: zoom ? 'scale(2)' : 'scale(1)',
          transformOrigin: `${pos.x}% ${pos.y}%`,
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/industry.jpg';
        }}
      />
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products[slug];

  const [variant, setVariant] = useState(product?.variants?.[0] || '');
  const [qty, setQty] = useState(1);
  const [currentImage, setCurrentImage] = useState(product?.image || '');
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setVariant(product.variants?.[0] || '');
      setCurrentImage(product.image);
      setSelectedThumb(0);
      setQty(1);
      setAdded(false);
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f7f8f9] pt-16 flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-[#0a1425] mb-4">Product not found</h1>
        <button
          onClick={() => navigate('/store/industrial-scales')}
          className="px-8 py-4 bg-[#6366f1] text-white font-semibold rounded-[5px] hover:bg-[#4f46e5] transition-all duration-300"
        >
          Back to Store
        </button>
      </div>
    );
  }

  const categoryData = categories.find((c) => c.slug === product.category);

  // Build thumbnail list: main image + variant images
  const thumbnails = [];
  thumbnails.push({ key: product.image, label: 'Main' });
  if (product.variantImageMap) {
    Object.entries(product.variantImageMap).forEach(([vName, imgKey]) => {
      if (!thumbnails.find((t) => t.key === imgKey)) {
        thumbnails.push({ key: imgKey, label: vName });
      }
    });
  }

  const handleVariantChange = (v) => {
    setVariant(v);
    if (product.variantImageMap && product.variantImageMap[v]) {
      const imgKey = product.variantImageMap[v];
      setCurrentImage(imgKey);
      const idx = thumbnails.findIndex((t) => t.key === imgKey);
      if (idx >= 0) setSelectedThumb(idx);
    }
  };

  const handleThumbClick = (idx) => {
    setSelectedThumb(idx);
    setCurrentImage(thumbnails[idx].key);
  };

  const handleAddToCart = () => {
    setAdding(true);
    try {
      const itemData = { q: String(qty), model: variant };
      localStorage.setItem(product.cartKey, JSON.stringify(itemData));
      const allItems = JSON.parse(localStorage.getItem('items') || '{}');
      allItems[product.cartKey] = 'yes';
      localStorage.setItem('items', JSON.stringify(allItems));
      setAdded(true);
    } catch (err) {
      console.error('Cart error', err);
    } finally {
      setAdding(false);
    }
  };

  const imgSrc = getImagePath(currentImage);

  return (
    <div className="min-h-screen bg-[#f7f8f9] pt-16">
      <Helmet>
        <title>{product.name} | P-Tech Scales</title>
        <meta name="description" content={`${product.name} - Premium quality weighing solution from P-Tech Scales. ${product.description || ''}`} />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[80rem] mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link to="/" className="hover:text-[#6366f1] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/store/industrial-scales" className="hover:text-[#6366f1] transition-colors">Store</Link>
            <span>/</span>
            {categoryData && (
              <>
                <Link to={categoryData.path} className="hover:text-[#6366f1] transition-colors">{categoryData.name}</Link>
                <span>/</span>
              </>
            )}
            <span className="text-[#0a1425] font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Section — Amazon-style layout */}
      <div className="max-w-[80rem] mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left — Thumbnail strip */}
          <Reveal delay={0.1} className="w-full lg:w-[72px] flex-shrink-0 order-2 lg:order-none">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={thumb.key}
                  onClick={() => handleThumbClick(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-[5px] border-2 overflow-hidden flex items-center justify-center bg-white transition-all duration-200 ${
                    selectedThumb === idx
                      ? 'border-[#6366f1]'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={getImagePath(thumb.key)}
                    alt={thumb.label}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/industry.jpg';
                    }}
                  />
                </button>
              ))}
            </div>
          </Reveal>

          {/* Center — Main image with hover zoom */}
          <Reveal delay={0.15} className="w-full lg:w-[420px] flex-shrink-0 order-1 lg:order-none">
            <ImageZoom src={imgSrc} alt={product.name} />
          </Reveal>

          {/* Right — Product details */}
          <div className="flex-1 min-w-0 order-3 lg:order-none">
            <Reveal delay={0.2}>
              <span className="inline-block px-3 py-1 rounded-full bg-[#6366f1]/10 text-[#6366f1] text-xs font-semibold tracking-wider uppercase mb-3">
                {product.subHeading || 'P-Tech Scales'}
              </span>
            </Reveal>

            <Reveal delay={0.25}>
              <h1 className="text-[#0a1425] text-2xl md:text-3xl font-extrabold leading-tight">
                {product.name}
              </h1>
            </Reveal>

            {product.description && (
              <Reveal delay={0.3}>
                <p className="text-gray-500 text-sm leading-relaxed mt-3">{product.description}</p>
              </Reveal>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200 my-5" />

            {/* Price */}
            <Reveal delay={0.35}>
              <div className="bg-gray-50 rounded-[5px] border border-gray-100 p-4">
                <p className="text-gray-400 text-xs uppercase tracking-wider font-medium">Price</p>
                <p className="text-[#0a1425] text-xl font-extrabold mt-1">Quote For Pricing</p>
                <p className="text-gray-400 text-xs mt-1">Contact us for the best price</p>
              </div>
            </Reveal>

            {/* Specs */}
            {product.specs && product.specs.length > 0 && (
              <Reveal delay={0.4}>
                <div className="mt-5">
                  <h3 className="text-[#0a1425] font-bold text-xs uppercase tracking-wider mb-3">Specifications</h3>
                  <div className="bg-white rounded-[5px] border border-gray-200 overflow-hidden">
                    {product.specs.map((spec, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-3 px-4 py-3 text-sm ${
                          i !== product.specs.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        <svg className="w-3.5 h-3.5 text-[#6366f1] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600 text-sm">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <Reveal delay={0.45}>
                <div className="mt-5 w-full">
                  <h3 className="text-[#0a1425] font-bold text-xs uppercase tracking-wider mb-3">Select Variant</h3>
                  <div className="grid grid-cols-3 gap-2 w-full">
                    {product.variants.map((v) => (
                      <button
                        key={v}
                        onClick={() => handleVariantChange(v)}
                        className={`px-3 py-2.5 rounded-[5px] text-xs sm:text-sm font-medium border transition-all duration-200 text-center ${
                          variant === v
                            ? 'bg-[#041023] text-white border-[#041023]'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Quantity + Add to Cart */}
            <Reveal delay={0.5}>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                <div className="flex-shrink-0">
                  <p className="text-[#0a1425] font-bold text-xs uppercase tracking-wider mb-2">Quantity</p>
                  <div className="inline-flex items-center border border-gray-200 rounded-[5px] overflow-hidden bg-white">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-11 h-11 flex items-center justify-center text-lg font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      -
                    </button>
                    <div className="w-12 h-11 flex items-center justify-center text-sm font-semibold border-x border-gray-200">
                      {qty}
                    </div>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="w-11 h-11 flex items-center justify-center text-lg font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <p className="text-[#0a1425] font-bold text-xs uppercase tracking-wider mb-2">Action</p>
                  <button
                    onClick={handleAddToCart}
                    disabled={adding}
                    className={`w-full h-11 font-bold text-sm rounded-[5px] transition-all duration-300 flex items-center justify-center gap-2 ${
                      added
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#6366f1] text-white hover:bg-[#4f46e5]'
                    }`}
                  >
                    {added ? (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Added For Quotation
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                        </svg>
                        Add For Quotation
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Trust badges */}
            <Reveal delay={0.55}>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Quality Assured' },
                  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: '21+ Years' },
                  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', label: '1000+ Clients' },
                ].map((badge) => (
                  <div key={badge.label} className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-[5px] border border-gray-100">
                    <svg className="w-5 h-5 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={badge.icon} />
                    </svg>
                    <span className="text-[#0a1425] text-[10px] font-semibold text-center leading-tight">{badge.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Back to store */}
            <Reveal delay={0.6}>
              <div className="mt-6 pt-5 border-t border-gray-200">
                <Link
                  to={categoryData?.path || '/store/industrial-scales'}
                  className="inline-flex items-center gap-2 text-[#6366f1] text-sm font-semibold hover:gap-3 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to {categoryData?.name || 'Store'}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
