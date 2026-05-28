import { useState, useEffect } from 'react';
import { Sparkles, ArrowUpRight, Camera } from 'lucide-react';

const Gallery = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const albumItems = [
        { id: 1, src: "/cozzy/album1-16_9.png", size: "16:9", title: "URBAN DAWN", category: "SESSIONS" },
        { id: 2, src: "/cozzy/album2.16_9.png", size: "16:9", title: "STREET RADIANCE", category: "COLLECTION" },
        { id: 3, src: "/cozzy/album3-4_3.png", size: "4:3", title: "IDENTITY", category: "PORTRAIT" },
        { id: 4, src: "/cozzy/album4.4_3.jpg", size: "4:3", title: "RAW TEXTURE", category: "PORTRAIT" },
        { id: 5, src: "/cozzy/album5-4_3.jpg", size: "4:3", title: "ECHOES", category: "SESSIONS" },
        { id: 6, src: "/cozzy/album6-4_3.jpg", size: "4:3", title: "SHADOW PLAY", category: "STREET" },
        { id: 7, src: "/cozzy/album7-4_3.jpg", size: "4:3", title: "MIDNIGHT CHESS", category: "VIBES" },
        { id: 8, src: "/cozzy/album8-4_3.png", size: "4:3", title: "COZZY SPIRIT", category: "CORE" },
    ];

    return (
        <div className="min-h-screen bg-black selection:bg-white selection:text-black pt-24 pb-20">
            {/* Editorial Header */}
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-20 md:mb-32">
                <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-2 bg-white/5 rounded-lg">
                            <Camera className="w-5 h-5 text-white/40" />
                        </div>
                        <span className="text-[10px] font-bold tracking-[0.5em] text-white/30 uppercase italic">Archive — Visual Diary</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-[120px] font-black text-white tracking-tighter leading-[0.8] uppercase italic mb-12">
                        STREET<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20 not-italic">CHRONICLES.</span>
                    </h1>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                        <p className="text-sm md:text-base text-white/50 max-w-lg font-light leading-relaxed tracking-wide italic">
                            "Sebuah fragmen tentang kota, manusia, dan kenyamanan yang menolak untuk diam. Kami tidak hanya memotret produk, kami menangkap jiwa di baliknya."
                        </p>
                        <div className="flex items-center gap-12 text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase border-t border-white/10 pt-8 w-full md:w-auto">
                            <div>COLLECTION — 01</div>
                            <div>YEAR — 2026</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Masonry-Style Bento Grid */}
            <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                    {/* Item 1 - 16:9 Large */}
                    <div className="col-span-2 row-span-1 group relative overflow-hidden bg-white/5 rounded-2xl md:rounded-3xl transition-transform duration-700 hover:scale-[0.98]">
                        <img src={albumItems[0].src} alt={albumItems[0].title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                        <GalleryItemInfo item={albumItems[0]} />
                    </div>

                    {/* Item 3 - 4:3 */}
                    <div className="col-span-1 row-span-1 group relative overflow-hidden bg-white/5 rounded-2xl md:rounded-3xl transition-transform duration-700 hover:scale-[0.98]">
                        <img src={albumItems[2].src} alt={albumItems[2].title} className="w-full h-full object-cover aspect-[4/3] md:aspect-auto transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-40" />
                        <GalleryItemInfo item={albumItems[2]} />
                    </div>

                    {/* Item 4 - 4:3 */}
                    <div className="col-span-1 row-span-1 group relative overflow-hidden bg-white/5 rounded-2xl md:rounded-3xl transition-transform duration-700 hover:scale-[0.98]">
                        <img src={albumItems[3].src} alt={albumItems[3].title} className="w-full h-full object-cover aspect-[4/3] md:aspect-auto transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-40" />
                        <GalleryItemInfo item={albumItems[3]} />
                    </div>

                    {/* Item 5 - 4:3 */}
                    <div className="col-span-1 row-span-1 group relative overflow-hidden bg-white/5 rounded-2xl md:rounded-3xl transition-transform duration-700 hover:scale-[0.98]">
                        <img src={albumItems[4].src} alt={albumItems[4].title} className="w-full h-full object-cover aspect-[4/3] md:aspect-auto transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-40" />
                        <GalleryItemInfo item={albumItems[4]} />
                    </div>

                    {/* Item 6 - 4:3 */}
                    <div className="col-span-1 row-span-1 group relative overflow-hidden bg-white/5 rounded-2xl md:rounded-3xl transition-transform duration-700 hover:scale-[0.98]">
                        <img src={albumItems[5].src} alt={albumItems[5].title} className="w-full h-full object-cover aspect-[4/3] md:aspect-auto transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-40" />
                        <GalleryItemInfo item={albumItems[5]} />
                    </div>

                    {/* Item 2 - 16:9 Large */}
                    <div className="col-span-2 row-span-1 group relative overflow-hidden bg-white/5 rounded-2xl md:rounded-3xl transition-transform duration-700 hover:scale-[0.98]">
                        <img src={albumItems[1].src} alt={albumItems[1].title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                        <GalleryItemInfo item={albumItems[1]} />
                    </div>

                    {/* Item 7 - 4:3 */}
                    <div className="col-span-1 row-span-1 group relative overflow-hidden bg-white/5 rounded-2xl md:rounded-3xl transition-transform duration-700 hover:scale-[0.98]">
                        <img src={albumItems[6].src} alt={albumItems[6].title} className="w-full h-full object-cover aspect-[4/3] transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-40" />
                        <GalleryItemInfo item={albumItems[6]} />
                    </div>

                    {/* Item 8 - 4:3 */}
                    <div className="col-span-1 row-span-1 group relative overflow-hidden bg-white/5 rounded-2xl md:rounded-3xl transition-transform duration-700 hover:scale-[0.98]">
                        <img src={albumItems[7].src} alt={albumItems[7].title} className="w-full h-full object-cover aspect-[4/3] transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-40" />
                        <GalleryItemInfo item={albumItems[7]} />
                    </div>
                </div>
            </div>

            {/* Extreme Bottom Bar Signature */}
            <div className="mt-32 text-center">
                <Sparkles className="w-6 h-6 text-white/10 mx-auto mb-6" />
                <p className="text-[10px] font-bold tracking-[0.8em] text-white/20 uppercase mb-2">COZZY — VISUAL ARCHIVE</p>
                <p className="text-[9px] font-bold tracking-[0.2em] text-white/10 uppercase">ESTABLISHED 2026</p>
            </div>

            <style>{`
        .aspect-video { aspect-ratio: 16 / 9; }
        .aspect-4\\/3 { aspect-ratio: 4 / 3; }
      `}</style>
        </div>
    );
};

const GalleryItemInfo = ({ item }) => (
    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 flex justify-between items-end transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <div className="space-y-1">
            <p className="text-[9px] font-bold tracking-[0.3em] text-white/50 uppercase italic">{item.category}</p>
            <h3 className="text-sm md:text-xl font-black text-white uppercase italic">{item.title}</h3>
        </div>
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md">
            <ArrowUpRight className="w-4 h-4 md:w-5 h-5 text-white" />
        </div>
    </div>
);

export default Gallery;
