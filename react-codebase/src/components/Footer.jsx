import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#040e1f] w-full">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 py-14 lg:py-16">
          {/* Brand */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <span className="text-white font-semibold text-base tracking-tight">
                P-TECH SCALES
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-[280px]">
              Precision weighing solutions for every industry.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Store', href: '/store', isLink: true },
                { label: 'Services', href: '/#services' },
                { label: 'Contact', href: '/#contact' },
                { label: 'About', href: '/#about' },
              ].map((item) => (
                <li key={item.label}>
                  {item.isLink ? (
                    <Link
                      to={item.href}
                      className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-5">
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="tel:+919899810002" className="text-gray-300 text-sm hover:text-white transition-colors duration-200">
                  +91 98998 10002
                </a>
              </li>
              <li>
                <a href="tel:+918178770706" className="text-gray-300 text-sm hover:text-white transition-colors duration-200">
                  +91 81787 70706
                </a>
              </li>
              <li>
                <a
                  href="mailto:ptechscale@gmail.com"
                  className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
                >
                  ptechscale@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-5">
              Address
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              E-98, Welcome Industrial Complex,<br />
              Sanjay Colony, Sec-23,<br />
              N.I.T Faridabad,<br />
              Haryana &ndash; 121001
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-xs">
            &copy; {currentYear} P-TECH SCALES. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs">
            Designed &amp; Developed by{' '}
            <a
              href="https://synactics.in"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Synactics
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
