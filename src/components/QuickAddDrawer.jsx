import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../data/mockData';

const QuickAddDrawer = ({ product, isOpen, onClose }) => {
    const { addToCart } = useStore();
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    if (!product) return null;

    const handleAdd = () => {
        if (!selectedSize || !selectedColor) return;
        addToCart(product, selectedSize, selectedColor, 1);
        onClose();
    };

    return (
        <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`}>
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-navy-950/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-expo ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-8 border-b border-gray-100">
                        <h3 className="text-xl font-bold tracking-tighter text-black uppercase">Instant Purchase</h3>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Product Summary */}
                    <div className="p-8 flex gap-6 border-b border-gray-50">
                        <div className="w-24 aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-[10px] font-bold tracking-widest text-navy-900/40 uppercase">{product.category}</p>
                            <h4 className="text-lg font-bold text-black uppercase">{product.name}</h4>
                            <p className="text-xl font-black text-navy-900">{formatPrice(product.price)}</p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-10">
                        {/* Size Select */}
                        <div className="space-y-4">
                            <p className="text-[10px] font-bold tracking-[0.3em] text-black uppercase flex justify-between">
                                Select Size <span className="text-navy-400">Required *</span>
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-3 rounded-xl border-2 font-bold transition-all duration-300 ${selectedSize === size
                                                ? 'border-navy-950 bg-navy-950 text-white'
                                                : 'border-gray-100 hover:border-gray-300'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Select */}
                        <div className="space-y-4">
                            <p className="text-[10px] font-bold tracking-[0.3em] text-black uppercase flex justify-between">
                                Select Color <span className="text-navy-400">Required *</span>
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {product.colors.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`px-6 py-3 rounded-xl border-2 font-bold transition-all duration-300 ${selectedColor === color
                                                ? 'border-navy-950 bg-navy-950 text-white'
                                                : 'border-gray-100 hover:border-gray-300'
                                            }`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-8 bg-gray-50 border-t border-gray-100">
                        <button
                            onClick={handleAdd}
                            disabled={!selectedSize || !selectedColor}
                            className="w-full group relative py-6 bg-navy-950 text-white font-bold tracking-[0.2em] uppercase overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-4">
                                Confirm & Add to Cart <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                            </span>
                            <div className="absolute inset-0 bg-navy-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        .ease-expo { transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1); }
      `}</style>
        </div>
    );
};

export default QuickAddDrawer;
