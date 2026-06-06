import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getImagePath } from '../data/products';
import { useToast } from '../components/Toast';
import Hero from '../components/Hero';

const aboutCards = [
  {
    title: 'Quality Assurance',
    desc: 'Our products meet the highest industry standards, ensuring unmatched precision and reliability.',
    color: 'from-orange-500 to-amber-500',
    icon: 'quality',
  },
  {
    title: 'Industry Expertise',
    desc: 'With 21 Years of experience, we offer tailored solutions to meet diverse business needs.',
    color: 'from-purple-500 to-violet-500',
    icon: 'experience',
  },
  {
    title: 'Customization',
    desc: 'Tailor our weighing solutions to seamlessly integrate into your operations.',
    color: 'from-emerald-500 to-teal-500',
    icon: 'custom',
  },
  {
    title: 'Customer Support',
    desc: 'Receive timely guidance and maintenance from our responsive support team.',
    color: 'from-rose-500 to-pink-500',
    icon: 'customer',
  },
  {
    title: 'Innovation',
    desc: 'We continuously innovate to incorporate the latest technological advancements.',
    color: 'from-blue-500 to-indigo-500',
    icon: 'tech',
  },
  {
    title: 'Long-Term Partnership',
    desc: "You're entering into a partnership focused on your success, not just purchasing a product.",
    color: 'from-pink-400 to-rose-400',
    icon: 'partner',
  },
];

const testimonials = [
  {
    name: 'Deepak S',
    role: 'Business Owner',
    text: 'Great product range for different users, Quality products, great after sales service. I must say I am a satisfied customer of p-tech scales.',
  },
  {
    name: 'Mayur N',
    role: 'Industrial Client',
    text: 'P-Tech Scales is a team of thorough service oriented professionals with products par excellence. Definitely a recommended company.',
  },
  {
    name: 'Really F',
    role: 'Regular Customer',
    text: 'P-Tech Scales is very good company in weighing scale. Its products are affordable, reliable and accurate in weighing.',
  },
];

function Reveal({ children, className = '', delay = 0, direction = 'up' }) {
  const dirs = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: -50 },
    right: { y: 0, x: 50 },
  };
  const d = dirs[direction] || dirs.up;
  return (
    <motion.div
      initial={{ opacity: 0, ...d }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ContactForm() {
  const toast = useToast();
  const [form, setForm] = useState({ name: '', phone: '', mail: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!form.name?.trim()) { toast('Please enter a name', 'error'); return false; }
    if (form.phone.trim().length !== 10) { toast('Please enter 10 Digit Phone Number', 'error'); return false; }
    if (!form.mail.includes('@') || !form.mail.trim()) { toast('Please enter valid email', 'error'); return false; }
    if (!form.msg?.trim()) { toast('Message Cannot Be Empty', 'error'); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      emailjs.init('9F7anDbSfaxEvy9Tj');
      await emailjs.send('service_f7is47r', 'template_c5pskvc', {
        from_name: form.name,
        from_email: form.mail,
        phone_number: form.phone,
        message: form.msg,
      });
      toast("We've received your query and will contact you soon!");
      setForm({ name: '', phone: '', mail: '', msg: '' });
    } catch (err) {
      toast('Failed to send. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-transparent border-0 border-b border-[#6366f1]/40 focus:border-b-2 focus:border-[#6366f1] text-black py-3 pl-12 pr-4 outline-none placeholder:text-gray-500 transition-all duration-300"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-transparent border-0 border-b border-[#6366f1]/40 focus:border-b-2 focus:border-[#6366f1] text-black py-3 pl-12 pr-4 outline-none placeholder:text-gray-500 transition-all duration-300"
          />
        </div>
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <input
            type="email"
            placeholder="Email Address"
            value={form.mail}
            onChange={(e) => setForm({ ...form, mail: e.target.value })}
            className="w-full bg-transparent border-0 border-b border-[#6366f1]/40 focus:border-b-2 focus:border-[#6366f1] text-black py-3 pl-12 pr-4 outline-none placeholder:text-gray-500 transition-all duration-300"
          />
        </div>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-4 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </div>
        <textarea
          rows={4}
          placeholder="Tell us about your requirements..."
          value={form.msg}
          onChange={(e) => setForm({ ...form, msg: e.target.value })}
          className="w-full bg-transparent border-0 border-b border-[#6366f1]/40 focus:border-b-2 focus:border-[#6366f1] text-black py-3 pl-12 pr-4 outline-none resize-none placeholder:text-gray-500 transition-all duration-300"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-[#6366f1] text-white font-semibold rounded-xl transition-all duration-300 hover:bg-[#4f46e5] hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}

/* ── Marquee Logos ── */
function LogoMarquee() {
  const logos = [
    { src: '/images/pi.png', alt: 'Partner' },
    { src: '/images/prachi.png', alt: 'Partner' },
    { src: '/images/snf.png', alt: 'Partner' },
    { src: '/images/orient.png', alt: 'Orient Electric' },
    { src: '/images/vivo.png', alt: 'Vivo' },
  ];
  const tripled = [...logos, ...logos, ...logos];
  return (
    <section className="py-20 bg-[#fafbfc] overflow-hidden">
      <div className="max-w-[80rem] mx-auto px-6 text-center">
        <Reveal>
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#6366f1]/10 text-[#6366f1] text-xs font-semibold tracking-widest uppercase mb-6">
            Trusted Partners
          </span>
          <h2 className="text-[#0a1425] text-2xl md:text-3xl font-bold mb-4">
            Trusted By 1000+ Companies Across India
          </h2>
          <p className="text-gray-400 text-base max-w-lg mx-auto">
            We've earned the trust of leading businesses through consistent quality and service.
          </p>
        </Reveal>
      </div>
      <div className="relative mt-12">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#fafbfc] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#fafbfc] to-transparent z-10" />
        <div className="flex gap-6 md:gap-16 animate-marquee whitespace-nowrap">
          {tripled.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-24 h-16 md:w-40 md:h-28 flex items-center justify-center bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img src={logo.src} alt={logo.alt} className="h-12 w-20 md:h-20 md:w-32 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Bento Products ── */
function BentoProducts() {
  const bentoItems = [
    { slug: 'industrial-scales', name: 'Industrial Scales', desc: 'Heavy-duty scales built for factories, retail & industrial use', image: 'industry', cols: 'col-span-2', rows: 'row-span-2', tall: true },
    { slug: 'weighing-bridge', name: 'Weighing Bridges', desc: 'Complete bridge solutions and accessories', image: 'weigh', cols: 'col-span-1', rows: 'row-span-1', tall: false },
    { slug: 'loadcells', name: 'Loadcells', desc: 'Precision loadcells for all applications', image: 'load', cols: 'col-span-1', rows: 'row-span-1', tall: false },
    { slug: 'lab-scales', name: 'Lab Scales', desc: 'High-precision instruments for labs', image: 'lab', cols: 'col-span-1', rows: 'row-span-2', tall: true },
    { slug: 'personal-scales', name: 'Personal Scales', desc: 'Everyday weighing solutions', image: 'ps', cols: 'col-span-1', rows: 'row-span-1', tall: false },
    { slug: 'weighing-automation', name: 'Weighing Automation', desc: 'Automated systems for industries', image: 'spz2', cols: 'col-span-1', rows: 'row-span-1', tall: false },
  ];

  return (
    <section id="services" className="py-28 bg-white">
      <div className="max-w-[80rem] mx-auto px-6">
        <Reveal>
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#6366f1]/10 text-[#6366f1] text-xs font-semibold tracking-widest uppercase mb-6">
            Our Products
          </span>
          <h2 className="text-[#0a1425] text-4xl md:text-5xl font-extrabold leading-tight">
            Explore Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#818cf8]">
              Product Range
            </span>
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-xl">
            Precision-engineered weighing solutions for every industry, from lab benches to factory floors.
          </p>
        </Reveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
          {bentoItems.map((item, i) => (
            <Reveal
              key={item.slug}
              delay={i * 0.08}
              className={`col-span-1 md:${item.cols.replace('col-span-', 'col-span-')} ${item.rows} ${
                item.tall ? 'min-h-[28rem]' : 'min-h-[14rem]'
              }`}
            >
              <Link to={`/store/${item.slug}`} className="group block h-full">
                <div className="relative h-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/60">
                  <img
                    src={getImagePath(item.image)}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/industry.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041023]/90 via-[#041023]/30 to-transparent" />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-white text-2xl font-bold mb-1 group-hover:text-[#818cf8] transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-[#818cf8] text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span>View Collection</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="flex justify-center mt-12">
            <Link to="/store/industrial-scales" className="w-full md:w-auto">
              <button className="w-full md:w-auto px-8 py-4 border-2 border-[#6366f1] text-[#6366f1] font-semibold rounded-xl transition-all duration-300 hover:bg-[#6366f1] hover:text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]">
                Browse Full Store
              </button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Why Choose Us ── */
function WhyChooseUs() {
  return (
    <section className="py-28 bg-[#f8f9fb] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6366f1]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px]" />

      <div className="relative max-w-[80rem] mx-auto px-6">
        <Reveal>
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#6366f1]/10 text-[#6366f1] text-xs font-semibold tracking-widest uppercase mb-6">
            Why P-Tech Scales
          </span>
          <h2 className="text-[#0a1425] text-4xl md:text-5xl font-extrabold">
            Why Choose Us?
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-xl">
            Two decades of trust, precision, and relentless innovation.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {aboutCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <div className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundImage: `linear-gradient(135deg, rgba(99,102,241,0.03), rgba(99,102,241,0.01))` }}
                />
                <div className="relative">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <img src={`/images/${card.icon}.png`} alt={card.title} className="w-8 h-8 object-contain brightness-0 invert" />
                  </div>
                  <h3 className="text-[#0a1425] text-xl font-bold mb-3">{card.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── About ── */
function AboutSection() {
  return (
    <section id="about" className="py-28 bg-white overflow-hidden">
      <div className="max-w-[80rem] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image side */}
          <Reveal direction="left" className="w-full lg:w-5/12">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border-2 border-[#6366f1]/20" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/founder.jpeg"
                  alt="Mr. Ashok Kumar"
                  className="w-full h-[20rem] md:h-[28rem] object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#6366f1] text-white rounded-2xl p-6 shadow-xl">
                <span className="text-4xl font-extrabold block">21+</span>
                <span className="text-sm text-white/80">Years of Excellence</span>
              </div>
            </div>
          </Reveal>

          {/* Text side */}
          <Reveal direction="right" className="w-full lg:w-7/12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#6366f1]/10 text-[#6366f1] text-xs font-semibold tracking-widest uppercase mb-6">
              About P-Tech Scales
            </span>
            <h2 className="text-[#0a1425] text-4xl md:text-5xl font-extrabold leading-tight">
              Crafting Precision{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#818cf8]">
                Since 2003
              </span>
            </h2>
            <p className="text-gray-400 text-lg mt-6 leading-relaxed">
              P-Tech Scales is one of leading weighing scales manufacturing and weighing service
              industry since last 21 years. We have wide range of electronic weighing machines like
              table top scale, personal scale, baby scale, platform scale, crane scale, cattle scale,
              milk weighing, tank weighing, truck scale up to 200 ton.
            </p>
            <p className="text-gray-400 text-lg mt-4 leading-relaxed">
              We also develop customized requirements like weighing automation for different
              industrial applications. For this quality we are also known as service master.
            </p>

            {/* Founder */}
            <div className="mt-10 p-6 rounded-2xl bg-[#f8f9fb] border border-gray-100">
              <h4 className="text-[#0a1425] text-xl font-bold">Mr. Ashok Kumar</h4>
              <span className="text-[#6366f1] text-sm font-medium">Founder & Visionary Leader</span>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                With an unwavering passion for innovation and excellence, Mr. Kumar has been the driving
                force behind our commitment to delivering precision and quality in every aspect of our business.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ── */
function Testimonials() {
  return (
    <section className="py-28 bg-[#041023] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#6366f1]/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="relative max-w-[80rem] mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#6366f1]/20 text-[#818cf8] text-xs font-semibold tracking-widest uppercase mb-6">
              Testimonials
            </span>
            <h2 className="text-white text-4xl md:text-5xl font-extrabold">
              What Our Clients Say
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="relative group rounded-2xl p-8 border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-[#6366f1]/30 transition-all duration-500 h-full flex flex-col">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed flex-1">
                  "{t.text}"
                </p>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#818cf8] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="flex justify-center mt-12">
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJOW5MRvfbDDkRNp-m9mUgvCs"
              target="_blank"
              rel="noreferrer"
            >
              <button className="px-8 py-4 border border-white/20 text-white font-medium rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/40">
                Post a Review
              </button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Contact ── */
function ContactSection() {
  return (
    <section id="contact" className="py-28 bg-[#f8f9fb] overflow-hidden">
      <div className="max-w-[80rem] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <Reveal direction="left" className="w-full lg:w-5/12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#6366f1]/10 text-[#6366f1] text-xs font-semibold tracking-widest uppercase mb-6">
              Contact Us
            </span>
            <h2 className="text-[#0a1425] text-4xl md:text-5xl font-extrabold leading-tight">
              Let's Start a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#818cf8]">
                Conversation
              </span>
            </h2>
            <p className="text-gray-400 text-lg mt-6 leading-relaxed">
              Tell us about your requirements and we'll get back to you within 24 hours.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#6366f1]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Call Us</p>
                  <p className="text-[#0a1425] font-semibold">+91 9899810002 / +91 8178770706</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#6366f1]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Email Us</p>
                  <p className="text-[#0a1425] font-semibold">ptechscale@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#6366f1]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Visit Us</p>
                  <p className="text-[#0a1425] font-semibold text-sm">E-98, Welcome Industrial Complex, Sec-23, Faridabad</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" className="w-full lg:w-7/12">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100">
              <h3 className="text-[#0a1425] text-2xl font-bold mb-2">Send Us a Message</h3>
              <p className="text-gray-400 text-sm mb-8">Fill in the details below and we'll get back to you.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Main Home ── */
export default function Home() {
  return (
    <>
      <Helmet>
        <title>P-Tech Scales | Premium Weighing Solutions in India</title>
        <meta name="description" content="P-Tech Scales - Leading manufacturer of electronic weighing machines, industrial scales, loadcells, weighing bridges and weighing automation in India. Trusted by 1000+ companies. 21+ years of experience." />
        <link rel="canonical" href="https://www.ptechscales.in/" />
        <meta property="og:title" content="P-Tech Scales | Premium Weighing Solutions" />
        <meta property="og:description" content="India's leading weighing scales manufacturer. Industrial scales, loadcells, weighing bridges, lab scales and weighing automation solutions." />
      </Helmet>

      <Hero />

      {/* Trust Marquee */}
      <LogoMarquee />

      {/* Products */}
      <BentoProducts />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* About */}
      <AboutSection />

      {/* Testimonials */}
      <Testimonials />

      {/* Contact */}
      <ContactSection />
    </>
  );
}
