import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles, ShoppingBag, Heart } from 'lucide-react';
import { formatPrice } from '../data/mockData';

const Home = () => {
  const { products, addToCart, toggleWishlist, isInWishlist } = useStore();

  const featuredProducts = products.slice(0, 4);

  const handleAddToCart = (product) => {
    addToCart(product, product.sizes[0], product.colors[0], 1);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[75vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/banner.jpg" 
            alt="cozzy hero" 
            className="w-full h-full object-cover object-center"
          />
          {/* Dark gradient from left for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 via-navy-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            {/* Glassmorphism Card */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>New Collection Available</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
                wanna style<br />
                <span className="text-navy-200">cozzy</span> with me?
              </h1>
              
              <p className="text-base md:text-lg text-white/80 mb-8 leading-relaxed">
                Minimalist streetwear for the Gen Z aesthetic. Clean lines, premium quality, effortless style.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/catalog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-navy-700 rounded-xl font-semibold transition-all duration-300 hover:bg-navy-50 hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-black/10"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Shop Now
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 text-white border border-white/30 rounded-xl font-medium transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5 active:scale-95"
                >
                  Our Story
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Drops</h2>
            <p className="text-gray-500">Handpicked cozzy essentials</p>
          </div>
          <Link to="/catalog" className="hidden sm:inline-flex items-center gap-2 text-navy-600 font-medium hover:text-navy-700">
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <button onClick={() => toggleWishlist(product)} className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-200 hover:bg-white hover:scale-110 active:scale-95">
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
                {product.isNew && <span className="absolute top-3 left-3 px-3 py-1 bg-navy-600 text-white text-xs font-medium rounded-full">New</span>}
              </div>
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-1 truncate group-hover:text-navy-600">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                  <button onClick={() => handleAddToCart(product)} className="p-2 rounded-full bg-navy-600 text-white transition-all duration-200 hover:bg-navy-700 hover:scale-110 active:scale-95">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
