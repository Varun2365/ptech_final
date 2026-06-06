import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getImagePath } from '../data/products';

export function HomeProductCard({ product, index = 0 }) {
  const imgSrc = getImagePath(product.image);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group"
    >
      <Link to={`/store/${product.slug}`} className="block h-full bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-lg">
        <div className="w-full h-52 bg-white flex items-center justify-center overflow-hidden px-4 pt-4">
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
        <div className="p-6">
          <h5 className="text-[#0a1425] font-bold text-lg group-hover:text-[#6366f1] transition-colors duration-300">
            {product.name}
          </h5>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed">{product.desc}</p>
          <div className="mt-5 pt-5 border-t border-gray-100">
            <button className="w-full py-4 bg-[#041023] text-white text-sm font-semibold rounded-xl border border-[#041023] transition-all duration-300 hover:bg-[#6366f1] hover:border-[#6366f1] flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              View Collection
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CategoryProductCard({ product, index = 0 }) {
  const imgSrc = getImagePath(product.image);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group"
    >
      <Link to={`/product/${product.slug}`} className="block h-full bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-lg">
        <div className="w-full h-56 bg-white flex items-center justify-center overflow-hidden px-4 pt-4">
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
        <div className="p-5">
          <h3 className="text-[#0a1425] font-bold text-base group-hover:text-[#6366f1] transition-colors duration-300">
            {product.name}
          </h3>
          {product.sub && (
            <p className="text-gray-500 text-sm mt-2">{product.sub}</p>
          )}
          <p className="text-gray-400 text-xs mt-2">Starting From:</p>
          <p className="text-[#474747] text-sm font-semibold mt-0.5">Quote For Pricing</p>
          <div className="mt-5 pt-4 border-t border-gray-100">
            <button className="w-full py-3.5 bg-[#041023] text-white text-sm font-semibold rounded-xl border border-[#041023] transition-all duration-300 hover:bg-[#6366f1] hover:border-[#6366f1] flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              Buy Now
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
