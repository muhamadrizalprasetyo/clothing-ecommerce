import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown, Sparkles, LogOut, Receipt } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const {
    currentUser,
    logout,
    cartCount,
    wishlistCount,
    isLoggedIn
  } = useStore();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
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
        className="fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-xl border-b border-white/5 transition-all duration-500"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <Link
              to="/"
              className="flex items-center group active:scale-95 transition-all duration-300"
            >
              <img
                src="/logo1.png"
                alt="COZZY"
                className="h-8 lg:h-9 w-auto object-contain opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              />
            </Link>

            {/* Desktop Navigation - Elite Minimalist */}
            <div className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    relative text-xs font-medium tracking-[0.15em] uppercase
                    transition-all duration-500 ease-out
                    hover:text-white/100
                    ${isActive(link.path)
                      ? 'text-white'
                      : 'text-white/50'
                    }
                  `}
                >
                  {link.label}
                  <span className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-white transition-all duration-500 ease-expo ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              ))}
            </div>

            {/* Search Bar - Modern Contrast */}
            <form onSubmit={handleSearch} className="hidden xl:flex items-center flex-1 max-w-sm mx-16">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="SEARCH COLLECTION..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="
                    w-full pl-12 pr-6 py-3 rounded-full
                    bg-white/5 border border-white/10
                    text-[11px] tracking-widest text-white placeholder-white/30
                    transition-all duration-500 ease-out
                    focus:bg-white/10 focus:border-white/30 focus:outline-none
                    focus:shadow-[0_0_40px_-15px_rgba(255,255,255,0.2)]
                  "
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-white transition-all duration-500" />
              </div>
            </form>

            {/* Elite Actions */}
            <div className="flex items-center gap-2 lg:gap-6">
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className={`
                  relative p-3 rounded-full border border-white/5
                  transition-all duration-500 ease-out
                  hover:bg-white/10 hover:-translate-y-1
                  ${isActive('/wishlist') ? 'text-white bg-white/10 border-white/20' : 'text-white/50 hover:text-white'}
                `}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 transition-all duration-500 ${isActive('/wishlist') && 'fill-white'}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-navy-900 text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className={`
                  relative p-3 rounded-full border border-white/5
                  transition-all duration-500 ease-out
                  hover:bg-white/10 hover:-translate-y-1
                  ${isActive('/cart') ? 'text-white bg-white/10 border-white/20' : 'text-white/50 hover:text-white'}
                `}
                aria-label="Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-navy-900 text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile / Auth - Signature Style */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`
                      flex items-center gap-3 p-1.5 pr-4 rounded-full
                      bg-white/5 border border-white/10
                      transition-all duration-500 ease-out
                      hover:bg-white/10 active:scale-95
                      ${isProfileOpen ? 'bg-white/10 border-white/20' : ''}
                    `}
                  >
                    <div className="w-8 h-8 rounded-full bg-white text-navy-900 flex items-center justify-center text-[10px] font-bold tracking-tighter">
                      {currentUser?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="hidden lg:block text-[10px] font-medium tracking-[0.2em] text-white/70 uppercase">
                      Account
                    </span>
                    <ChevronDown className={`w-3 h-3 text-white/30 transition-transform duration-500 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Signature Dropdown */}
                  {isProfileOpen && (
                    <div
                      className="
                        absolute right-0 mt-6 w-72 bg-navy-800/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10
                        transform transition-all duration-500 origin-top-right overflow-hidden
                      "
                    >
                      <div className="p-8 border-b border-white/5">
                        <p className="text-[10px] font-light tracking-[0.3em] text-white/50 uppercase mb-2">Member Profile</p>
                        <p className="font-medium text-white tracking-widest truncate">{currentUser?.name}</p>
                        <p className="text-[10px] text-white/30 truncate mt-1">{currentUser?.email}</p>

                        <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                          <div className="p-2 bg-white/10 rounded-xl">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">Cozzy Balance</p>
                            <p className="text-sm font-medium text-white tracking-wider">
                              {formatCash(currentUser?.cozzyCash || 0)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3">
                        <Link
                          to="/account"
                          className="flex items-center gap-4 px-5 py-4 rounded-xl text-[11px] font-light tracking-widest text-white/70 hover:text-white hover:bg-white/5 transition-all duration-500"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          EDIT ACCOUNT
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center gap-4 px-5 py-4 rounded-xl text-[11px] font-light tracking-widest text-white/70 hover:text-white hover:bg-white/5 transition-all duration-500"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Receipt className="w-4 h-4" />
                          MY ORDERS
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-[11px] font-bold tracking-widest text-red-400 hover:bg-red-400/10 transition-all duration-500 text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          LOGOUT
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-4">
                  <Link
                    to="/login"
                    className="px-6 py-3 text-[10px] font-bold tracking-[0.2em] text-white/50 hover:text-white transition-all duration-500 uppercase"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-8 py-3 text-[10px] font-bold tracking-[0.2em] text-navy-900 bg-white rounded-full hover:bg-white/90 hover:scale-105 transition-all duration-500 uppercase shadow-lg shadow-white/10"
                  >
                    Join
                  </Link>
                </div>
              )}

              {/* Mobile Trigger */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 text-white transition-all duration-500"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Elite Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-navy-900 fixed inset-0 z-40 pt-24 overflow-y-auto">
            <div className="px-8 py-12 space-y-12">
              <div className="space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      block text-5xl font-bold tracking-tighter transition-all duration-500
                      ${isActive(link.path) ? 'text-white' : 'text-white/20 hover:text-white/40'}
                    `}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {!isLoggedIn ? (
                <div className="pt-12 border-t border-white/5 space-y-6">
                  <Link
                    to="/login"
                    className="block text-2xl font-light text-white/50"
                  >
                    SIGN IN
                  </Link>
                  <Link
                    to="/register"
                    className="block text-2xl font-bold text-white"
                  >
                    CREATE ACCOUNT
                  </Link>
                </div>
              ) : (
                <div className="pt-12 border-t border-white/5 space-y-8">
                  <div className="p-6 bg-white/5 rounded-3xl">
                    <p className="text-white/50 text-[10px] tracking-widest uppercase mb-2">Member</p>
                    <p className="text-white text-2xl font-bold">{currentUser?.name}</p>
                    <p className="text-white/70 text-lg font-light mt-4">Balance: {formatCash(currentUser?.cozzyCash || 0)}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 text-xl font-bold tracking-widest"
                  >
                    DISCONNECT
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav >

      <div className="h-20 lg:h-24" />

      <style>{`
        .ease-expo { transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1); }
      `}</style>
    </>
  );
};

export default Navbar;
