import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../data/mockData';
import { ArrowUpRight, Heart, Plus, Sparkles, ChevronRight, Play, ArrowRight, Instagram } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist, isLoggedIn } = useStore();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Parallax Effect Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePos({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const featuredProducts = products.slice(0, 4);

  const handleShopCollection = () => {
    navigate(isLoggedIn ? '/catalog' : '/login');
  };

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white pb-0">
      {/* 01. EDITORIAL HERO SECTION */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center bg-[#050505]"
      >
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 z-0 transition-transform duration-700 ease-out scale-110"
          style={{
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px) scale(1.1)`,
            backgroundImage: "url('/banner.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Subtle vignette/overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Hero Content - Left Aligned, Editorial Style */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-20">
          <div className="max-w-3xl space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.4em] text-white uppercase">Archive 01 — Live</span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-[100px] font-black tracking-tighter text-white leading-[0.9] uppercase drop-shadow-2xl">
              FUTURE<br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50">CLASSICS.</span>
            </h1>

            <p className="text-lg text-white/80 max-w-lg font-light leading-relaxed tracking-wide drop-shadow-md">
              Redefining streetwear for the bold. Premium heavyweight cotton, oversized fits, uncompromising aesthetic.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-6">
              <button
                onClick={handleShopCollection}
                className="group relative px-10 py-5 bg-white text-black font-bold tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Shop The Drop <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
                <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-center gap-4 animate-fade-in-up delay-[1000ms]">
          <span className="text-[10px] font-bold tracking-[0.4em] text-white/50 uppercase vertical-lr mb-4">Discover</span>
          <div className="w-[1px] h-20 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[50%] bg-white animate-scroll-down" />
          </div>
        </div>
      </section>

      {/* 02. CLEAN GRID GALLERY */}
      <section className="py-24 lg:py-40 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-20">
            <div className="space-y-4">
              <p className="text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase">Season 1</p>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-black uppercase">
                ESSENTIALS.
              </h2>
            </div>
            <Link
              to="/catalog"
              className="group flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-black uppercase pb-2 border-b-2 border-black/10 hover:border-black transition-all"
            >
              View Full Archive <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>

          {/* Minimalist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative">
                {/* Product Image */}
                <div className="relative aspect-[3/4] bg-[#F7F7F7] overflow-hidden mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Heart Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 right-4 p-3 bg-white shadow-sm rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:scale-110 active:scale-95"
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>

                  {/* Add to Cart Quick Action */}
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="absolute bottom-0 left-0 right-0 py-5 bg-black text-white text-[10px] font-bold tracking-[0.2em] uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center gap-2"
                  >
                    View Details
                  </button>

                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-black text-white text-[9px] font-bold tracking-widest px-3 py-1.5 uppercase">
                      New
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="font-bold text-lg leading-tight uppercase hover:text-gray-500 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <span className="font-medium text-black whitespace-nowrap">{formatPrice(product.price)}</span>
                  </div>
                  <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">{product.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. FULL WIDTH STATEMENT */}
      <section className="relative h-[60vh] bg-black overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-40">
          <img src="/banner.jpg" alt="" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="relative z-10 text-center px-6">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white uppercase italic">
            NOT JUST CLOTHING.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 text-4xl md:text-6xl lg:text-8xl block mt-2 not-italic font-black">A MOVEMENT.</span>
          </h2>
        </div>
      </section>

      {/* 04. VIBE / CATEGORY PANELS */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <Link to="/catalog?category=Hoodie" className="group relative h-[40vh] md:h-[50vh] block overflow-hidden bg-black/10">
          <img src="/kataloghoodie.png" alt="Hoodies" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold tracking-[0.4em] text-white/60 uppercase mb-3">Collection 01</p>
              <h3 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter italic">Hoodies.</h3>
            </div>
            <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-500 text-white shadow-xl">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </div>
        </Link>
        <Link to="/catalog?category=T-Shirt" className="group relative h-[40vh] md:h-[50vh] block overflow-hidden bg-black/10">
          <img src="/katalogts.png" alt="T-Shirts" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold tracking-[0.4em] text-white/60 uppercase mb-3">Collection 02</p>
              <h3 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter italic">T-Shirts.</h3>
            </div>
            <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-500 text-white shadow-xl">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </div>
        </Link>
      </section>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes scroll-down {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
        .animate-scroll-down {
          animation: scroll-down 2s ease-in-out infinite;
        }
        .vertical-lr { writing-mode: vertical-lr; }
      `}</style>
    </div>
  );
};

export default Home;
