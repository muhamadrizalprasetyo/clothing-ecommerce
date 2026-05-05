import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  Search,
  LogOut,
  Receipt,
  ChevronDown,
  Sparkles
} from 'lucide-react';

const Navbar = () => {
  const { 
    currentUser, 
    isLoggedIn, 
    cartCount, 
    wishlistCount, 
    logout,
    showToast
  } = useStore();
  
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle scroll for backdrop blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/catalog', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const formatCash = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-navy-700 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 group active:scale-95 transition-transform duration-150"
            >
              <img 
                src="/logo1.jpg" 
                alt="cozzy.co" 
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-lg font-bold tracking-tight text-white hidden sm-block">
                cozzy.co
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    relative text-sm font-medium
                    transition-all duration-200
                    active:scale-95
                    hover:-translate-y-0.5
                    ${isActive(link.path) 
                      ? 'text-white font-semibold' 
                      : 'text-navy-200 hover:text-white'
                    }
                  `}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-navy-600 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xs mx-8">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="Search cozzy..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="
                    w-full pl-10 pr-4 py-2 rounded-full
                    bg-navy-600/50 border border-navy-500
                    text-sm text-white placeholder-navy-300
                    transition-all duration-200
                    focus:bg-navy-600 focus:border-navy-400 focus:ring-2 focus:ring-navy-400
                    focus:outline-none
                    active:scale-[0.98]
                  "
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300 group-focus-within:text-white transition-colors duration-200" />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className={`
                  relative p-2 rounded-full
                  transition-all duration-200
                  hover:bg-navy-600
                  active:scale-90
                  ${isActive('/wishlist') ? 'bg-navy-600 text-red-400' : 'text-navy-200 hover:text-white'}
                `}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isActive('/wishlist') && 'fill-current'}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className={`
                  relative p-2 rounded-full
                  transition-all duration-200
                  hover:bg-navy-600
                  active:scale-90
                  ${isActive('/cart') ? 'bg-navy-600 text-white' : 'text-navy-200 hover:text-white'}
                `}
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-navy-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {/* Profile / Auth */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`
                      flex items-center gap-2 p-2 rounded-full
                      transition-all duration-200
                      hover:bg-navy-600
                      active:scale-95
                      ${isProfileOpen ? 'bg-navy-600' : ''}
                    `}
                    aria-label="Profile menu"
                    aria-expanded={isProfileOpen}
                  >
                    <div className="w-8 h-8 rounded-full bg-navy-600 text-white flex items-center justify-center text-sm font-medium">
                      {currentUser?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <ChevronDown className={`w-4 h-4 text-navy-200 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown */}
                  {isProfileOpen && (
                    <div 
                      className="
                        absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100
                        transform transition-all duration-200 origin-top-right
                        animate-dropdown
                      "
                      style={{ animation: 'dropdownIn 0.2s ease-out' }}
                    >
                      {/* User Info */}
                      <div className="p-4 border-b border-gray-100">
                        <p className="font-medium text-gray-900 truncate">{currentUser?.name}</p>
                        <p className="text-sm text-gray-500 truncate">{currentUser?.email}</p>
                        
                        {/* Cozzy Cash Display */}
                        <div className="mt-3 p-2 bg-navy-50 rounded-lg flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-navy-600" />
                          <div>
                            <p className="text-xs text-navy-600 font-medium">Cozzy Cash</p>
                            <p className="text-sm font-bold text-navy-700">
                              {formatCash(currentUser?.cozzyCash || 0)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <Link
                          to="/account"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 active:scale-[0.98]"
                        >
                          <User className="w-4 h-4" />
                          Edit Account
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 active:scale-[0.98]"
                        >
                          <Receipt className="w-4 h-4" />
                          My Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 active:scale-[0.98] text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 active:scale-95"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-navy-600 rounded-full hover:bg-navy-700 transition-all duration-200 active:scale-95 hover:shadow-md"
                  >
                    Join
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-navy-600 transition-all duration-200 active:scale-90"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-navy-200" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden bg-navy-700 border-t border-navy-500"
            style={{ animation: 'slideDown 0.3s ease-out' }}
          >
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-navy-600/50 border-transparent focus:bg-navy-600 focus:border-navy-400 focus:ring-2 focus:ring-navy-400 transition-all duration-200"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-300" />
                </div>
              </form>

              {/* Mobile Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    block py-3 px-4 rounded-xl text-base font-medium
                    transition-all duration-200
                    active:scale-[0.98]
                    ${isActive(link.path)
                      ? 'bg-navy-600 text-white'
                      : 'text-navy-200 hover:bg-navy-600 hover:text-white'
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Auth Links */}
              {!isLoggedIn && (
                <div className="pt-4 border-t border-navy-600 space-y-2">
                  <Link
                    to="/login"
                    className="block w-full py-3 px-4 text-center rounded-lg font-medium text-white border border-navy-500 hover:bg-navy-600 transition-all duration-200 active:scale-[0.98]"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full py-3 px-4 text-center rounded-lg font-medium text-navy-700 bg-white hover:bg-navy-100 transition-all duration-200 active:scale-[0.98]"
                  >
                    Create Account
                  </Link>
                </div>
              )}

              {/* Mobile Cozzy Cash for logged in users */}
              {isLoggedIn && (
                <div className="pt-4 border-t border-navy-600">
                  <div className="p-3 bg-navy-50 rounded-xl flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-navy-600" />
                    <div>
                      <p className="text-sm text-navy-600 font-medium">Your Cozzy Cash</p>
                      <p className="text-lg font-bold text-navy-700">
                        {formatCash(currentUser?.cozzyCash || 0)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="mt-2 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-red-400 font-medium hover:bg-navy-600 transition-all duration-200 active:scale-[0.98]"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-20 bg-navy-700" />

      {/* CSS Animations */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes dropdownIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
