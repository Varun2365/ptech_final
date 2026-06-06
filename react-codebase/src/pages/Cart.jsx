import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { imageMap } from '../data/products';
import { useToast } from '../components/Toast';

function getImagePath(key) {
  const filename = imageMap[key] || 'industry.jpg';
  return `/images/${filename}`;
}

function CartItem({ item, index, onRemove }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white border border-gray-200 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="sm:w-48 h-44 sm:h-auto bg-white flex items-center justify-center p-5 border-b sm:border-b-0 sm:border-r border-gray-100 shrink-0">
          <img
            src={getImagePath(item.key)}
            alt={item.model}
            className="max-h-32 max-w-full object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/industry.jpg';
            }}
          />
        </div>

        {/* Details */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-gray-400 text-xs uppercase tracking-wider font-medium">Product</p>
            <h3 className="text-[#0a1425] font-bold text-lg mt-1 truncate">{item.model}</h3>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">Qty:</span>
                <span className="text-[#0a1425] font-semibold text-sm bg-gray-100 px-3 py-1 rounded-[5px]">{item.q}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">Status:</span>
                <span className="text-emerald-600 text-xs font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">In Stock</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:flex-col sm:items-end">
            <button
              onClick={() => onRemove(item.key)}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-red-500 border border-red-200 rounded-[5px] hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Cart() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [finalList, setFinalList] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const stored = localStorage.getItem('items');
    const allItems = stored ? JSON.parse(stored) : {};
    const keys = Object.keys(allItems);
    const detailed = keys
      .map((key) => {
        const data = localStorage.getItem(key);
        if (!data) return null;
        try {
          const parsed = JSON.parse(data);
          return { key, ...parsed };
        } catch {
          return null;
        }
      })
      .filter(Boolean);
    setItems(detailed);
  };

  const handleRemove = (key) => {
    const stored = localStorage.getItem('items');
    const allItems = stored ? JSON.parse(stored) : {};
    if (allItems[key]) {
      delete allItems[key];
      localStorage.setItem('items', JSON.stringify(allItems));
    }
    localStorage.removeItem(key);
    loadCart();
  };

  const handlePlaceOrder = () => {
    let list = '';
    items.forEach((item, i) => {
      list += `ITEM ${i + 1}\n${item.model}\nQuantity: ${item.q}\n\n\n\n`;
    });
    setFinalList(list);
    setFormOpen(true);
  };

  const validate = () => {
    if (!form.name || !form.name.trim()) {
      toast('Please enter a name', 'error');
      return false;
    }
    if (form.phone.length !== 10) {
      toast('Please enter 10 Digit Phone Number', 'error');
      return false;
    }
    if (!form.email.includes('@')) {
      toast('Please enter valid email address', 'error');
      return false;
    }
    return true;
  };

  const sendMail = async () => {
    if (!validate()) return;
    setSending(true);
    const body = `NAME:${form.name} \n<br> PHONE NUMBER:${form.phone}\n<br> EMAIL:${form.email}\n<br><br> ${finalList}`;
    try {
      const smtpScript = document.createElement('script');
      smtpScript.src = 'https://smtpjs.com/v3/smtp.js';
      document.head.appendChild(smtpScript);
      await new Promise((resolve) => {
        smtpScript.onload = resolve;
        setTimeout(resolve, 1500);
      });
      if (window.Email) {
        await window.Email.send({
          SecureToken: '537ec5e7-04f1-4116-83e2-f6616f482587',
          To: 'smtp.ptech@gmail.com',
          From: 'smtp.ptech@gmail.com',
          Subject: 'PTECH QUOTATION',
          Body: body,
        });
      }
      toast("We've received your query and will contact you soon!");
      setFormOpen(false);
      setForm({ name: '', phone: '', email: '' });
    } catch (err) {
      toast('Failed to send. Please try again.', 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8f9] flex flex-col pt-16">
      <Helmet>
        <title>Your Cart | P-Tech Scales</title>
        <meta name="description" content="Review your selected weighing products and request a quote from P-Tech Scales." />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[80rem] mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link to="/" className="hover:text-[#6366f1] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0a1425] font-medium">Cart</span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-[80rem] w-full mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[5px] bg-[#6366f1]/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-[#0a1425] text-2xl font-extrabold">Your Cart</h1>
              <p className="text-gray-400 text-sm mt-0.5">
                {items.length > 0 ? `${items.length} item${items.length > 1 ? 's' : ''} in your cart` : 'No items yet'}
              </p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-200 py-20 flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#0a1425] mb-2">Your cart is empty</h2>
            <p className="text-gray-400 text-sm mb-8 max-w-sm text-center">
              Browse our products and add items to get started with your quote request.
            </p>
            <Link
              to="/store/industrial-scales"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-semibold rounded-[5px] transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Browse Store
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <AnimatePresence>
                <div className="space-y-4">
                  {items.map((item, i) => (
                    <CartItem key={item.key} item={item} index={i} onRemove={handleRemove} />
                  ))}
                </div>
              </AnimatePresence>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link
                  to="/store/industrial-scales"
                  className="inline-flex items-center gap-2 text-[#6366f1] text-sm font-semibold hover:gap-3 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white border border-gray-200 sticky top-[calc(4rem+1.5rem)]">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100">
                  <h3 className="text-[#0a1425] font-bold text-sm uppercase tracking-wider">Order Summary</h3>
                </div>

                {/* Items List */}
                <div className="px-6 py-4 space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.key} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-50 rounded-[5px] flex items-center justify-center shrink-0 border border-gray-100">
                        <img
                          src={getImagePath(item.key)}
                          alt={item.model}
                          className="w-9 h-9 object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/industry.jpg';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#0a1425] text-sm font-semibold truncate">{item.model}</p>
                        <p className="text-gray-400 text-xs mt-0.5">Qty: {item.q}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 mx-6" />

                {/* Total */}
                <div className="px-6 py-4 flex items-center justify-between">
                  <span className="text-gray-500 text-sm">Total Items</span>
                  <span className="text-[#0a1425] font-bold text-lg">{items.length}</span>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full py-4 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-bold rounded-[5px] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Request Quote
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <p className="text-gray-400 text-[10px] text-center mt-3 leading-relaxed">
                    We'll review your request and get back to you with the best pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating CTA — mobile only */}
      {items.length > 0 && (
        <button
          onClick={handlePlaceOrder}
          className="md:hidden fixed bottom-6 right-6 z-[150] w-14 h-14 rounded-full bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-lg shadow-indigo-300/40 flex items-center justify-center transition-all duration-200 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      )}

      {/* Quote Form Modal */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[300] flex items-center justify-center px-4"
            onClick={() => setFormOpen(false)}
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
                    <h3 className="text-white font-bold text-lg">Request a Quote</h3>
                    <p className="text-gray-400 text-sm mt-0.5">Fill in your details and we'll get back to you</p>
                  </div>
                  <button
                    onClick={() => setFormOpen(false)}
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
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-[5px] outline-none focus:border-[#6366f1] transition-all placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0a1425] mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="10-digit phone number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-[5px] outline-none focus:border-[#6366f1] transition-all placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0a1425] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-[5px] outline-none focus:border-[#6366f1] transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Item summary */}
                <div className="bg-gray-50 border border-gray-100 rounded-[5px] p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Your Items</p>
                  {items.map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-1.5">
                      <span className="text-sm text-[#0a1425] truncate flex-1">{item.model}</span>
                      <span className="text-xs text-gray-400 ml-3">x{item.q}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={sendMail}
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
                      'Submit Quote'
                    )}
                  </button>
                  <button
                    onClick={() => setFormOpen(false)}
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
