import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail, MapPin, Phone, Github, Sparkles, Linkedin } from 'lucide-react';

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
    <footer className="bg-black text-white selection:bg-white selection:text-black">
      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Brand Vision */}
          <div className="lg:col-span-5 space-y-12">
            <Link to="/" className="inline-block group">
              <img
                src="/cozzy/logobghitam.png"
                alt="Cozzy"
                className="h-9 lg:h-11 w-auto transition-all duration-700 group-hover:scale-105"
              />
            </Link>

            <div className="max-w-sm space-y-10">
              <p className="text-xl font-light text-white/50 leading-relaxed tracking-wide italic leading-snug">
                “Minimalist streetwear defined by quality, designed for the bold. We create experiences, not just clothing.”
              </p>

              <div className="space-y-4">
                <p className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">Connect with Creator</p>
                <div className="flex items-center gap-4">
                  {[
                    { Icon: Github, href: 'https://github.com/muhamadrizalprasetyo' },
                    { Icon: Linkedin, href: 'https://linkedin.com/in/muhamadrizalprasetyo' },
                    { Icon: Phone, href: 'https://wa.me/6288211178673' }
                  ].map(({ Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/icon relative p-3 border border-white/5 rounded-full text-white/40 hover:text-white transition-all duration-500"
                    >
                      <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover/icon:scale-100 transition-transform duration-500" />
                      <Icon className="relative w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8">
            <div>
              <h3 className="text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase mb-8">Navigation</h3>
              <ul className="space-y-4">
                {footerLinks.shop.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="group/link flex items-center gap-2 text-[11px] font-medium tracking-widest text-white/40 hover:text-white transition-all duration-300">
                      <span className="w-0 group-hover/link:w-2 h-px bg-white/30 transition-all duration-500" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase mb-8">Brand</h3>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="group/link flex items-center gap-2 text-[11px] font-medium tracking-widest text-white/40 hover:text-white transition-all duration-300">
                      <span className="w-0 group-hover/link:w-2 h-px bg-white/30 transition-all duration-500" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase mb-8">Support</h3>
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="group/link flex items-center gap-2 text-[11px] font-medium tracking-widest text-white/40 hover:text-white transition-all duration-300">
                      <span className="w-0 group-hover/link:w-2 h-px bg-white/30 transition-all duration-500" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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
