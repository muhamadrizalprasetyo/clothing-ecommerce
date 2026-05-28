import { MessageCircle } from 'lucide-react';

const FloatingWA = () => {
    const phoneNumber = "6281234567890"; // Replace with real admin number
    const message = "Hi Cozzy Team! I'm interested in the latest collection. Can you help me with some questions?";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-[60] group flex items-center gap-3 active:scale-95 transition-all duration-300"
        >
            {/* Label Tooltip */}
            <div className="bg-white px-4 py-2 rounded-full shadow-2xl border border-gray-100 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 hidden md:block">
                <p className="text-[10px] font-bold tracking-widest text-navy-950 uppercase whitespace-nowrap">Chat with Admin</p>
            </div>

            {/* Button */}
            <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
                <div className="relative w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(34,197,94,0.5)] hover:bg-green-600 transition-colors duration-300">
                    <MessageCircle className="w-6 h-6 fill-white" />
                </div>
            </div>
        </a>
    );
};

export default FloatingWA;
