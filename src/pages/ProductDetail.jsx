import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Star, ArrowLeft, Check, Plus, Minus, Truck, Shield, RefreshCcw, Ruler, X } from 'lucide-react';
import { formatPrice } from '../data/mockData';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist, isLoggedIn, showToast } = useStore();
  
  const product = products.find(p => p.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Size chart data
  const sizeChart = [
    { size: 'XS', chest: '42-44', length: '66', sleeve: '20' },
    { size: 'S', chest: '46-48', length: '68', sleeve: '21' },
    { size: 'M', chest: '50-52', length: '70', sleeve: '22' },
    { size: 'L', chest: '54-56', length: '72', sleeve: '23' },
    { size: 'XL', chest: '58-60', length: '74', sleeve: '24' },
    { size: 'XXL', chest: '62-64', length: '76', sleeve: '25' }
  ];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Product not found</p>
          <Link to="/catalog" className="text-navy-600 font-medium hover:underline">Back to catalog</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      showToast('Please select size and color', 'error');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    if (!selectedSize || !selectedColor) {
      showToast('Please select size and color', 'error');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 px-4 py-1.5 bg-navy-600 text-white text-sm font-medium rounded-full">
                  New Arrival
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{product.category}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
              </div>

              <p className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</p>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Size <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(true)}
                  className="flex items-center gap-1 text-sm text-navy-600 hover:text-navy-700 font-medium transition-colors active:scale-95"
                >
                  <Ruler className="w-4 h-4" />
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 active:scale-95 ${
                      selectedSize === size
                        ? 'border-navy-600 bg-navy-600 text-white'
                        : 'border-gray-200 hover:border-navy-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Color <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 active:scale-95 ${
                      selectedColor === color
                        ? 'border-navy-600 bg-navy-600 text-white'
                        : 'border-gray-200 hover:border-navy-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-lg border border-gray-200 hover:border-navy-600 hover:text-navy-600 transition-all duration-200 active:scale-90"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-lg border border-gray-200 hover:border-navy-600 hover:text-navy-600 transition-all duration-200 active:scale-90"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-500 ml-2">{product.stock} available</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-navy-600 text-white rounded-xl font-medium transition-all duration-200 hover:bg-navy-700 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={() => { if (isLoggedIn) toggleWishlist(product); }}
                className="p-4 rounded-xl border-2 border-gray-200 transition-all duration-200 hover:border-red-300 hover:bg-red-50 active:scale-95"
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-medium transition-all duration-200 hover:bg-gray-800 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Buy Now
            </button>

            {/* Size Guide Modal */}
            {showSizeGuide && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowSizeGuide(false)}>
                <div 
                  className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-navy-100 rounded-lg">
                        <Ruler className="w-5 h-5 text-navy-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Size Guide</h3>
                        <p className="text-sm text-gray-500">All measurements in cm</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowSizeGuide(false)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors active:scale-90"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="p-6">
                    {/* How to Measure */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-medium text-gray-900 mb-2">How to Measure</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>Chest:</strong> Measure around the fullest part of your chest</li>
                        <li>• <strong>Length:</strong> From shoulder to hem</li>
                        <li>• <strong>Sleeve:</strong> From shoulder seam to cuff</li>
                      </ul>
                    </div>

                    {/* Size Chart Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-2 font-semibold text-gray-900">Size</th>
                            <th className="text-center py-3 px-2 font-semibold text-gray-900">Chest</th>
                            <th className="text-center py-3 px-2 font-semibold text-gray-900">Length</th>
                            <th className="text-center py-3 px-2 font-semibold text-gray-900">Sleeve</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sizeChart.map((row, index) => (
                            <tr 
                              key={row.size} 
                              className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''} ${product.sizes.includes(row.size) ? '' : 'opacity-40'}`}
                            >
                              <td className="py-3 px-2 font-medium text-gray-900">{row.size}</td>
                              <td className="text-center py-3 px-2 text-gray-600">{row.chest}</td>
                              <td className="text-center py-3 px-2 text-gray-600">{row.length}</td>
                              <td className="text-center py-3 px-2 text-gray-600">{row.sleeve}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Note */}
                    <p className="mt-4 text-xs text-gray-500">
                      * Grayed out sizes are not available for this product.
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      * Measurements may vary slightly due to manufacturing.
                    </p>
                  </div>

                  {/* Modal Footer */}
                  <div className="p-6 border-t border-gray-100">
                    <button
                      onClick={() => setShowSizeGuide(false)}
                      className="w-full py-3 bg-navy-600 text-white rounded-xl font-medium hover:bg-navy-700 active:scale-[0.98] transition-all duration-200"
                    >
                      Got it
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Orders over 500k' },
                { icon: Shield, label: 'Secure Payment', sub: '100% protected' },
                { icon: RefreshCcw, label: 'Easy Returns', sub: '30 days policy' }
              ].map((feat, i) => (
                <div key={i} className="text-center">
                  <feat.icon className="w-6 h-6 text-navy-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">{feat.label}</p>
                  <p className="text-xs text-gray-500">{feat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
