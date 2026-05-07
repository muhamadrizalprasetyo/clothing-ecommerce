import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail, MapPin, Phone, Github, Sparkles } from 'lucide-react';

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
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Brand Vision */}
          <div className="lg:col-span-5 space-y-12">
            <Link to="/" className="inline-block group">
              <img
                src="/logo1.png"
                alt="Cozzy"
                className="h-9 lg:h-11 w-auto opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              />
            </Link>

            <div className="max-w-sm space-y-10">
              <p className="text-xl font-light text-white/50 leading-relaxed tracking-wide italic leading-snug">
                “Minimalist streetwear defined by quality, designed for the bold. We create experiences, not just clothing.”
              </p>

              <div className="space-y-4">
                <p className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">Stay Connected</p>
                <div className="flex items-center gap-4">
                  {[
                    { Icon: Instagram, href: '#' },
                    { Icon: Twitter, href: '#' },
                    { Icon: Github, href: '#' }
                  ].map(({ Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
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

            <div className="col-span-2 md:col-span-1">
              <h3 className="text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase mb-8">Newsletter</h3>
              <div className="space-y-4">
                <p className="text-[11px] text-white/30 tracking-widest leading-relaxed">Join the circle for early access and drops.</p>
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="E-MAIL ADDRESS"
                    className="w-full bg-transparent border-b border-white/10 py-2 text-[10px] tracking-[0.2em] text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-all duration-500"
                  />
                  <button className="absolute right-0 bottom-2 text-white/20 hover:text-white transition-colors duration-500">
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact/Location Bar */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="flex flex-wrap justify-center lg:justify-start gap-12 text-[9px] font-bold tracking-[0.4em] text-white/20 uppercase">
              <div className="flex items-center gap-3 group cursor-default">
                <MapPin className="w-3.5 h-3.5 group-hover:text-white transition-colors duration-500" />
                <span className="group-hover:text-white/60 transition-colors duration-500">Jakarta — ID</span>
              </div>
              <div className="flex items-center gap-3 group cursor-default">
                <Phone className="w-3.5 h-3.5 group-hover:text-white transition-colors duration-500" />
                <span className="group-hover:text-white/60 transition-colors duration-500">+62 812 3456 7890</span>
              </div>
              <a href="mailto:hello@cozzy.store" className="flex items-center gap-3 group transition-all duration-500">
                <Mail className="w-3.5 h-3.5 group-hover:text-white" />
                <span className="group-hover:text-white transition-colors duration-500">Hello@Cozzy.Store</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Extreme Bottom Bar */}
      <div className="bg-navy-1000 border-t border-white/5 py-8">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-bold tracking-[0.5em] text-white/40 uppercase">
            © {currentYear} — COZZY STUDIO — ALL RIGHTS RESERVED.
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
