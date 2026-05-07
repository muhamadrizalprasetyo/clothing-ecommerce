import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail, MapPin, Phone, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: 'ALL PRODUCTS', href: '/catalog' },
      { label: 'ESSENTIAL HOODIES', href: '/catalog?category=Hoodie' },
      { label: 'PREMIUM TEES', href: '/catalog?category=T-Shirt' },
      { label: 'NEW ARRIVALS', href: '/catalog?sort=newest' }
    ],
    company: [
      { label: 'OUR STORY', href: '/about' },
      { label: 'CONTACT', href: '/contact' },
      { label: 'CAREERS', href: '#' },
      { label: 'BRAND PRESS', href: '#' }
    ],
    support: [
      { label: 'FAQ', href: '#' },
      { label: 'SHIPPING INFO', href: '#' },
      { label: 'RETURNS & EXCHANGES', href: '#' },
      { label: 'SIZE GUIDE', href: '#' }
    ]
  };

  return (
    <footer className="bg-navy-950 text-white selection:bg-white selection:text-navy-950">

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Brand Vision */}
          <div className="lg:col-span-5 space-y-12">
            <Link to="/" className="inline-block group">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src="/logo1.jpg" alt="cozzy.co" className="h-12 w-12 rounded-full grayscale hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 rounded-full border border-white/20 scale-125 group-hover:scale-150 transition-transform duration-700" />
                </div>
                <h2 className="text-2xl font-bold tracking-[0.2em] uppercase">COZZY.CO</h2>
              </div>
            </Link>

            <div className="max-w-md space-y-6">
              <p className="text-xl font-light text-white/70 leading-relaxed tracking-wide">
                WE CREATE EXPERIENCES, NOT JUST CLOTHING. MINIMALIST STREETWEAR DEFINED BY QUALITY AND AUTHENTICITY.
              </p>

              <div className="flex items-center gap-6 pt-4">
                {[
                  { Icon: Instagram, href: '#' },
                  { Icon: Twitter, href: '#' },
                  { Icon: Github, href: '#' }
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="p-3 border border-white/10 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-all duration-500 active:scale-90"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6">
            <div>
              <h3 className="text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase mb-8">Navigation</h3>
              <ul className="space-y-4">
                {footerLinks.shop.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-[11px] font-medium tracking-widest text-white/50 hover:text-white transition-all duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase mb-8">Brand</h3>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-[11px] font-medium tracking-widest text-white/50 hover:text-white transition-all duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase mb-8">Support</h3>
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-[11px] font-medium tracking-widest text-white/50 hover:text-white transition-all duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact/Location Bar */}
        <div className="mt-32 pt-12 border-t border-white/5">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="flex flex-wrap justify-center lg:justify-start gap-12 text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">
              <div className="flex items-center gap-4">
                <MapPin className="w-4 h-4 text-white/20" />
                <span>JAKARTA — ID</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-4 h-4 text-white/20" />
                <span>+62 — 812 — 3456 — 7890</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-4 h-4 text-white/20" />
                <span>HELLO@COZZY.CO</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Extreme Bottom Bar */}
      <div className="bg-navy-1000 border-t border-white/5 py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-bold tracking-[0.5em] text-white/40 uppercase">
            © {currentYear} — COZZY.CO STUDIO — ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-12 text-[9px] font-bold tracking-[0.5em] text-white/20 uppercase">
            <Link to="#" className="hover:text-white transition-colors duration-500">Privacy</Link>
            <Link to="#" className="hover:text-white transition-colors duration-500">Terms</Link>
            <Link to="#" className="hover:text-white transition-colors duration-500">Cookies</Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee-slower {
          animation: marquee 60s linear infinite;
        }
        .bg-navy-950 { background-color: #030816; }
        .bg-navy-1000 { background-color: #000000; }
      `}</style>
    </footer>
  );
};

export default Footer;
