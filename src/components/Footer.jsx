import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: 'All Products', href: '/catalog' },
      { label: 'Hoodies', href: '/catalog?category=Hoodie' },
      { label: 'T-Shirts', href: '/catalog?category=T-Shirt' },
      { label: 'New Arrivals', href: '/catalog?sort=newest' }
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' }
    ],
    support: [
      { label: 'FAQ', href: '#' },
      { label: 'Shipping', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Size Guide', href: '#' }
    ]
  };

  return (
    <footer className="bg-navy-800 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="/logo1.jpg" alt="cozzy.co" className="h-10 w-auto rounded-lg" />
              <div>
                <p className="text-xl font-bold">cozzy.co</p>
                <p className="text-sm text-navy-300">wanna style cozzy with me?</p>
              </div>
            </Link>
            <p className="text-navy-300 text-sm mb-6 max-w-xs">
              Minimalist streetwear for the Gen Z aesthetic. Clean lines, premium quality, effortless style.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-navy-700 rounded-lg text-navy-300 hover:bg-navy-600 hover:text-white transition-all duration-200 active:scale-90"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-navy-700 rounded-lg text-navy-300 hover:bg-navy-600 hover:text-white transition-all duration-200 active:scale-90"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="mailto:hello@cozzy.co"
                className="p-2 bg-navy-700 rounded-lg text-navy-300 hover:bg-navy-600 hover:text-white transition-all duration-200 active:scale-90"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-navy-300 text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-navy-300 text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-navy-300 text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="mt-12 pt-8 border-t border-navy-700">
          <div className="flex flex-wrap gap-6 text-sm text-navy-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Jl. Streetwear No. 99, Jakarta</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+62 812-3456-7890</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>hello@cozzy.co</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-navy-400">
            <p>© {currentYear} cozzy.co. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="#" className="hover:text-navy-300 transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-navy-300 transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-navy-300 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
