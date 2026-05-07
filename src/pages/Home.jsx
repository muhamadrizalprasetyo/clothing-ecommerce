import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../data/mockData';
import { ArrowUpRight, ShoppingBag, Heart, Plus, Sparkles, ChevronRight, Play } from 'lucide-react';

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
    <div className="min-h-screen bg-white selection:bg-navy-900 selection:text-white">
      {/* 01. CINEMATIC HERO SECTION */}
      <section
        ref={heroRef}
        className="relative h-[110vh] w-full overflow-hidden flex items-center justify-center bg-black"
      >
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 z-0 transition-transform duration-700 ease-out scale-110"
          style={{
            transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px) scale(1.1)`,
            backgroundImage: "url('/banner.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Creative Overlay Grid */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1440px] px-6 lg:px-12 text-center mt-[-10vh]">
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-12 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-white uppercase">New Drop — Collection '24</span>
          </div>

          <h1 className="text-[12vw] lg:text-[10vw] font-black leading-[0.85] tracking-tighter text-white uppercase italic mix-blend-overlay opacity-50 absolute inset-0 flex items-center justify-center whitespace-nowrap select-none">
            STYLE COZZY
          </h1>

          <div className="relative space-y-8 max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-9xl font-black tracking-tighter text-white leading-none uppercase">
              REDEFINE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/10 italic">MINIMALISM.</span>
            </h2>

            <p className="text-lg lg:text-xl text-white/70 max-w-xl mx-auto font-light leading-relaxed tracking-wide">
              Crafted for the modern aesthetic. Low-impact materials, high-impact style.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
              <button
                onClick={handleShopCollection}
                className="group relative px-12 py-5 bg-white text-navy-950 font-bold tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Shop Gallery <ArrowUpRight className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-navy-950/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>

              <button className="flex items-center gap-4 text-white hover:text-white/70 transition-all font-bold tracking-[0.2em] uppercase text-xs">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-white" />
                </div>
                View Film
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce">
          <div className="w-[1px] h-24 bg-gradient-to-b from-white/50 to-transparent" />
          <span className="text-[10px] font-bold tracking-[0.4em] text-white/50 uppercase vertical-lr">Scroll</span>
        </div>
      </section>

      {/* 02. CURATED GALLERY SECTION */}
      <section className="py-32 lg:py-56 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-24 lg:mb-32">
            <div className="max-w-2xl space-y-6">
              <span className="text-[11px] font-bold tracking-[.8em] text-navy-900/40 uppercase">Elite Curations</span>
              <h3 className="text-6xl lg:text-8xl font-black tracking-tighter text-black uppercase leading-none">
                LATEST<br />RELEASES.
              </h3>
            </div>
            <Link
              to="/catalog"
              className="group flex items-center gap-4 text-[10px] font-bold tracking-[0.4em] text-black uppercase pb-4 border-b border-black/10 hover:border-black transition-all"
            >
              Examine All <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>

          {/* Staggered Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`group relative ${index % 2 !== 0 ? 'lg:mt-32' : ''}`}
              >
                {/* Product Card */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 border border-black/5 hover:border-black/10 transition-all duration-700">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Floating Rank Background */}
                  <span className="absolute top-12 -left-4 text-[12vw] font-black text-black/5 select-none leading-none">
                    0{index + 1}
                  </span>

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-expo">
                    <button
                      onClick={() => addToCart(product, product.sizes[0], product.colors[0], 1)}
                      className="w-full py-5 bg-white text-navy-950 font-bold text-[10px] tracking-[0.4em] uppercase shadow-2xl hover:bg-navy-950 hover:text-white transition-all duration-300"
                    >
                      Instant Purchase
                    </button>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-8 right-8 p-4 bg-white/90 backdrop-blur-md rounded-full shadow-xl transition-all duration-500 hover:scale-110 active:scale-90"
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-navy-950'}`} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="pt-10 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="text-[10px] font-bold tracking-[.3em] text-black/30 uppercase">{product.category}</h4>
                      <Link to={`/product/${product.id}`} className="block">
                        <h3 className="text-xl font-bold tracking-tight text-black group-hover:text-black/60 transition-colors uppercase">
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                    <span className="text-lg font-bold tracking-tighter text-black">{formatPrice(product.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. BRAND ESSENCE (INTERACTIVE STORY) */}
      <section className="relative h-[80vh] flex items-center bg-navy-950 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 grayscale">
          <img src="/banner.jpg" alt="" className="w-full h-full object-cover" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full relative z-10">
          <div className="max-w-3xl space-y-12">
            <span className="text-[11px] font-bold tracking-[1em] text-white/30 uppercase">The DNA</span>
            <h3 className="text-5xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9] uppercase">
              WE STYLE<br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">FOR THE BOLD.</span>
            </h3>
            <p className="text-xl text-white/50 leading-relaxed font-light max-w-xl">
              Cozzy.co is more than a label. It's a statement of minimalist defiance. No filler, only pure essence.
            </p>
            <div className="pt-8">
              <Link to="/about" className="inline-flex items-center gap-6 group">
                <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white transition-all duration-700">
                  <Plus className="w-6 h-6 text-white group-hover:text-navy-950" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.4em] text-white uppercase">Discover Our Story</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 04. CATEGORY INTERACTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <Link
          to="/catalog?category=Hoodie"
          className="group relative h-[70vh] bg-gray-100 overflow-hidden border-r border-black/5"
        >
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700 z-10" />
          <img src="/kataloghoodie.png" alt="Hoodies" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
          <div className="relative z-20 h-full flex flex-col justify-end p-12 lg:p-24 space-y-6">
            <span className="text-[10px] font-bold tracking-[1em] text-white/60 uppercase">Collection — 01</span>
            <h4 className="text-6xl lg:text-8xl font-black text-white tracking-tighter uppercase italic translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-expo">Hoodies.</h4>
          </div>
        </Link>

        <Link
          to="/catalog?category=T-Shirt"
          className="group relative h-[70vh] bg-gray-200 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700 z-10" />
          <img src="/katalogts.png" alt="T-Shirts" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
          <div className="relative z-20 h-full flex flex-col justify-end p-12 lg:p-24 space-y-6">
            <span className="text-[10px] font-bold tracking-[1em] text-white/60 uppercase">Collection — 02</span>
            <h4 className="text-6xl lg:text-8xl font-black text-white tracking-tighter uppercase italic translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-expo">T-Shirts.</h4>
          </div>
        </Link>
      </section>


      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ease-expo { transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1); }
        .vertical-lr { writing-mode: vertical-lr; }
        .bg-navy-950 { background-color: #030816; }
      `}</style>
    </div>
  );
};

export default Home;
