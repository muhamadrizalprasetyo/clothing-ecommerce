import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Heart } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist, isLoggedIn } = useStore();

  const handleShopCollection = () => {
    navigate('/catalog');
  };

  const handleProductClick = (id) => {
    if (!isLoggedIn) {
      navigate('/register');
      return;
    }
    navigate(`/product/${id}`);
  };

  const featuredLocalProducts = [
    {
      id: "prod-hd1",
      name: "COZZY CLASSIC HOODIE",
      price: 299000,
      image: "/hd-produk1.jpg",
      number: "01"
    },
    {
      id: "prod-ts1",
      name: "STREET VIBE TEE",
      price: 149000,
      image: "/ts-produk1.jpg",
      number: "02"
    },
    {
      id: "prod-ts2",
      name: "URBAN TEE",
      price: 159000,
      image: "/ts-produk2.jpg",
      number: "03"
    },
    {
      id: "prod-ts3",
      name: "VINTAGE TEE",
      price: 139000,
      image: "/ts-produk3.jpg",
      number: "04"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative w-full h-[100svh] min-h-[600px] bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/cozzy/hero.jpeg')" }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-12 pt-20">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white leading-[1.1] mb-4">
            wanna style<br />
            cozzy with me?
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-sm mb-8 leading-relaxed">
            Merayakan riuh yang paling sunyi dari sudut-sudut kota yang terlupa. Di antara kepulan asap, secangkir kopi, dan langkah catur yang bimbang, COZZY menenun identitas menjadi jubah bagi mereka yang menolak tunduk pada seragam zaman.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={handleShopCollection}
              className="px-8 py-3 bg-white text-navy-950 text-sm font-bold rounded-full hover:bg-gray-100 transition-colors"
            >
              Explore
            </button>
            <Link
              to="/about"
              className="px-8 py-3 bg-navy-950 border border-white/20 text-white text-sm font-bold rounded-full hover:bg-navy-900 transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="mb-12">
            <p className="text-[10px] font-bold tracking-[0.4em] text-gray-500 uppercase mb-4">
              ELITE CURATIONS
            </p>
            <h2 className="text-5xl md:text-6xl font-black text-black leading-none mb-6">
              LATEST<br />RELEASES.
            </h2>
            <Link to="/catalog" className="inline-flex items-center text-[10px] font-bold tracking-[0.3em] uppercase text-black hover:text-gray-600 transition-colors">
              EXAMINE ALL {'>'}
            </Link>
          </div>

          {/* Grid Products (2 columns on mobile) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12">
            {featuredLocalProducts.map((product) => (
              <div key={product.id} className="group relative">
                {/* Image Container with Blend Mode Trick */}
                <div
                  className="relative aspect-[4/5] bg-gray-50 hidden-overflow rounded-xl mb-4 flex items-center justify-center p-2 cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  {/* Huge Number Background */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[10rem] md:text-[14rem] font-black text-gray-200/50 leading-none">
                      {product.number}
                    </span>
                  </div>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="relative z-10 w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Heart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className="absolute top-3 right-3 z-20 p-2 bg-white rounded-full shadow-sm"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.id) ? 'fill-black text-black' : 'text-gray-400'}`} />
                  </button>
                </div>

                {/* Info */}
                <div className="px-1 cursor-pointer" onClick={() => handleProductClick(product.id)}>
                  <p className="text-[9px] font-bold text-gray-400 tracking-wider mb-1 uppercase">
                    {product.name.includes("HOODIE") ? "HOODIE" : "T-SHIRT"}
                  </p>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-bold leading-tight uppercase line-clamp-2">
                      {product.name}
                    </h3>
                    <span className="text-xs font-bold whitespace-nowrap">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/catalog" className="inline-block text-[11px] font-bold tracking-[0.3em] uppercase border-b-2 border-black pb-2 hover:text-gray-600 hover:border-gray-600 transition-all">
              SEE THE ARCHIVE
            </Link>
          </div>
        </div>
      </section>

      {/* MINI ABOUT & GALLERY */}
      <section className="bg-navy-900 border-t border-black/10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Mini About */}
          <div className="relative bg-[#0a1128] p-10 md:p-20 flex flex-col justify-center">
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-white/50 italic mb-8">ABOUT THE COMPANY</h4>
            <div className="w-4/5 max-w-sm mb-10">
              <img src="/cozzy/aboutbgnavy.png" alt="COZZY" className="w-full h-auto object-contain" />
            </div>
            <p className="text-[11px] md:text-sm text-white/90 font-light leading-relaxed max-w-md">
              Mengabadikan pecahan momentum jalanan ke dalam potongan kain yang kokoh. Kami tidak sekadar menjahit benang; kami membingkai cerita, menangkap esensi lokal, dan memaksa tren global untuk tunduk pada keaslian yang kita bawa.
            </p>
          </div>

          {/* About Image */}
          <div className="h-[50vh] md:h-auto relative bg-[#0a1128]">
            <img src="/cozzy/about us.jpeg" alt="About Cozzy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a1128] to-transparent opacity-90" />
          </div>
        </div>

        {/* Mini Gallery Map Grid */}
        <div className="bg-[#0a1128] p-2 md:p-6 pb-20">
          <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 flex-wrap">
            {/* Large header 16:9 image */}
            <div className="col-span-2 row-span-1 border border-white/5">
              <img src="/cozzy/album1-16_9.png" alt="Gallery 1" className="w-full h-full object-cover aspect-video" />
            </div>
            {/* 4:3 images */}
            <div className="col-span-1 row-span-1 border border-white/5">
              <img src="/cozzy/album3-4_3.png" alt="Gallery 2" className="w-full h-full object-cover aspect-[4/3]" />
            </div>
            <div className="col-span-1 row-span-1 border border-white/5">
              <img src="/cozzy/album4.4_3.jpg" alt="Gallery 3" className="w-full h-full object-cover aspect-[4/3]" />
            </div>
            {/* 4:3 images */}
            <div className="col-span-1 row-span-1 border border-white/5">
              <img src="/cozzy/album5-4_3.jpg" alt="Gallery 4" className="w-full h-full object-cover aspect-[4/3]" />
            </div>
            <div className="col-span-1 row-span-1 border border-white/5">
              <img src="/cozzy/album6-4_3.jpg" alt="Gallery 5" className="w-full h-full object-cover aspect-[4/3]" />
            </div>
            {/* Large header 16:9 image */}
            <div className="col-span-2 row-span-1 border border-white/5">
              <img src="/cozzy/album2.16_9.png" alt="Gallery 6" className="w-full h-full object-cover aspect-video" />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .bg-navy-950 { background-color: #030816; }
        .bg-navy-900 { background-color: #0a1128; }
      `}</style>
    </div>
  );
};

export default Home;
