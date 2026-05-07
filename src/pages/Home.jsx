import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles, ShoppingBag, Heart, Shirt, Wind } from 'lucide-react';
import { formatPrice } from '../data/mockData';

const Home = () => {
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist, isLoggedIn } = useStore();

  const featuredProducts = products.slice(0, 4);

  // Check auth before allowing cart actions - redirect to login if guest
  const requireAuth = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return false;
    }
    return true;
  };

  const handleAddToCart = (product) => {
    if (!requireAuth()) return;
    addToCart(product, product.sizes[0], product.colors[0], 1);
  };

  const handleProductClick = (e, productId) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login');
    }
  };

  const handleShopCollection = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/catalog');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Mobile-First */}
      <section className="w-full bg-white">
        <div className="flex flex-col md:flex-row md:min-h-[85vh]">
          {/* Text Content - Mobile: Top, Desktop: Left */}
          <div className="flex-1 flex flex-col justify-center px-5 py-8 md:px-8 lg:px-12 md:py-12 lg:order-1">
            <div className="max-w-lg mx-auto md:mx-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-navy-50 text-navy-600 text-xs font-medium mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>New Collection Available</span>
              </div>
              
              {/* Headline */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                wanna style<br />
                <span className="text-navy-600">cozzy</span> with me?
              </h1>
              
              {/* Subheadline */}
              <p className="text-base md:text-lg text-gray-500 mb-6 md:mb-8 leading-relaxed">
                Minimalist streetwear for the Gen Z aesthetic. Clean lines, premium quality, effortless style.
              </p>
              
              {/* CTA Button - Full width on mobile */}
              <button
                onClick={handleShopCollection}
                className="w-full md:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-navy-600 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-navy-700 hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-navy-600/20"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop the Collection
              </button>
            </div>
          </div>
          
          {/* Hero Image - Mobile: Bottom, Desktop: Right */}
          <div className="flex-1 relative md:min-h-[85vh] lg:order-2">
            <img 
              src="/IMG_1965.jpg" 
              alt="cozzy streetwear collection" 
              className="w-full h-[50vh] md:h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Marquee - Infinite Text Scroll */}
      <section className="w-full bg-navy-900 py-3 overflow-hidden">
        <div className="marquee-container relative">
          <div className="marquee-content flex whitespace-nowrap animate-marquee">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-sm md:text-base text-white/90 font-medium tracking-wide mx-8 flex items-center gap-2">
                Premium Quality <span className="text-navy-400">•</span>
                Minimalist Streetwear <span className="text-navy-400">•</span>
                Gen-Z Aesthetic <span className="text-navy-400">•</span>
                Anti-gravity Comfort <span className="text-navy-400">•</span>
              </span>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
        `}</style>
      </section>

      {/* Category Teaser */}
      <section className="w-full py-10 md:py-16 px-4 md:px-5 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Hoodie Collection Card */}
          <Link 
            to="/catalog?category=Hoodie"
            onClick={(e) => handleProductClick(e, 'hoodie')}
            className="group relative flex-1 min-h-[180px] md:min-h-[240px] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-navy-600 to-navy-800" />
            <div className="relative z-10 h-full flex flex-col justify-between p-5 md:p-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Hoodie Collection</h3>
                <p className="text-sm text-white/70 flex items-center gap-2">
                  Explore Now <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </div>
          </Link>

          {/* T-Shirt Essentials Card */}
          <Link 
            to="/catalog?category=T-Shirt"
            onClick={(e) => handleProductClick(e, 'tshirt')}
            className="group relative flex-1 min-h-[180px] md:min-h-[240px] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
            <div className="relative z-10 h-full flex flex-col justify-between p-5 md:p-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Shirt className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">T-Shirt Essentials</h3>
                <p className="text-sm text-white/70 flex items-center gap-2">
                  Explore Now <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products - Best Sellers */}
      <section className="w-full py-10 md:py-16 px-4 md:px-5 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Best Sellers</h2>
            <p className="text-sm md:text-base text-gray-500">Handpicked cozzy essentials</p>
          </div>
          <Link 
            to="/catalog" 
            onClick={(e) => handleProductClick(e, 'catalog')}
            className="hidden md:inline-flex items-center gap-2 text-navy-600 font-medium hover:text-navy-700 transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Grid - Mobile: 2 cols, Desktop: 4 cols */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                {/* Wishlist Button */}
                <button 
                  onClick={() => { if (requireAuth()) toggleWishlist(product); }} 
                  className="absolute top-2 right-2 md:top-3 md:right-3 p-2 min-h-[36px] min-w-[36px] rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-200 hover:bg-white hover:scale-110 active:scale-95"
                >
                  <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
                {/* New Badge */}
                {product.isNew && (
                  <span className="absolute top-2 left-2 md:top-3 md:left-3 px-2 py-1 md:px-3 bg-navy-600 text-white text-[10px] md:text-xs font-medium rounded-full">
                    New
                  </span>
                )}
              </div>
              
              {/* Product Info */}
              <div className="p-3 md:p-4">
                <Link 
                  to={`/product/${product.id}`} 
                  onClick={(e) => handleProductClick(e, product.id)}
                  className="block"
                >
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-0.5 md:mb-1 truncate group-hover:text-navy-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-3">{product.category}</p>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-sm md:text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                  <button 
                    onClick={() => handleAddToCart(product)} 
                    className="p-2 min-h-[36px] min-w-[36px] rounded-full bg-navy-600 text-white transition-all duration-200 hover:bg-navy-700 hover:scale-110 active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-6 text-center md:hidden">
          <Link 
            to="/catalog" 
            onClick={(e) => handleProductClick(e, 'catalog')}
            className="inline-flex items-center gap-2 text-navy-600 font-medium hover:text-navy-700 transition-colors"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Brand Vibe Section */}
      <section className="w-full bg-navy-900 py-12 md:py-20 px-5 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Anti-Gravity.<br className="md:hidden" /> Effortless.<br className="hidden md:block" /> Gen-Z.
          </h2>
          <p className="text-sm md:text-lg text-white/70 max-w-lg mx-auto mb-6 md:mb-8 leading-relaxed">
            We craft streetwear that moves with you. Premium fabrics, minimalist designs, 
            and that unmistakable cozzy comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/about"
              onClick={(e) => handleProductClick(e, 'about')}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-navy-900 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-100 hover:-translate-y-0.5 active:scale-95"
            >
              Our Story
            </Link>
            <Link
              to="/catalog"
              onClick={(e) => handleProductClick(e, 'catalog')}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/30 rounded-xl font-medium transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5 active:scale-95"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
