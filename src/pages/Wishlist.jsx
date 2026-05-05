import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { formatPrice } from '../data/mockData';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const handleMoveToCart = (item) => {
    addToCart(item, item.sizes[0], item.colors[0], 1);
    removeFromWishlist(item.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h1>
          <p className="text-gray-500 mb-6">Save items you love to your wishlist and find them here anytime.</p>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy-600 text-white rounded-xl font-medium transition-all duration-200 hover:bg-navy-700 active:scale-95"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-500 mb-8">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-200 hover:bg-red-50 hover:text-red-500 active:scale-95"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Info */}
              <div className="p-4">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-navy-600 transition-colors">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{item.category}</p>
                </Link>
                
                <p className="text-lg font-bold text-gray-900 mb-4">{formatPrice(item.price)}</p>
                
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-navy-600 text-white rounded-xl font-medium transition-all duration-200 hover:bg-navy-700 active:scale-[0.98]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
