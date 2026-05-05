import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, X } from 'lucide-react';
import { formatPrice, calculateTotal } from '../data/mockData';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, cartCount, updateCartQuantity, removeFromCart, currentUser } = useStore();

  const { subtotal, shipping, total } = calculateTotal(cart);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Looks like you haven&apos;t added anything yet.</p>
          <Link to="/catalog" className="inline-flex items-center gap-2 px-6 py-3 bg-navy-600 text-white rounded-xl font-medium hover:bg-navy-700 active:scale-95">Start Shopping<ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-500 mb-8">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.cartId} className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to={`/product/${item.id}`} className="font-semibold text-gray-900 hover:text-navy-600">{item.name}</Link>
                      <p className="text-sm text-gray-500">{item.size} / {item.color}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.cartId)} className="p-1 text-gray-400 hover:text-red-500 active:scale-90"><Trash2 className="w-5 h-5" /></button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)} className="p-2 rounded-lg bg-white border border-gray-200 hover:border-navy-600 active:scale-90"><Minus className="w-4 h-4" /></button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)} className="p-2 rounded-lg bg-white border border-gray-200 hover:border-navy-600 active:scale-90"><Plus className="w-4 h-4" /></button>
                    </div>
                    <p className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="p-6 bg-gray-50 rounded-2xl">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              {/* Cozzy Cash */}
              {currentUser && (
                <div className="mb-4 p-3 bg-navy-50 rounded-xl">
                  <p className="text-sm text-navy-600">Cozzy Cash Available</p>
                  <p className="font-bold text-navy-700">{formatPrice(currentUser.cozzyCash)}</p>
                </div>
              )}

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 mb-6">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <button onClick={() => navigate('/checkout')} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-navy-600 text-white rounded-xl font-medium hover:bg-navy-700 active:scale-[0.98]">
                Checkout<ArrowRight className="w-4 h-4" />
              </button>
              
              <Link to="/catalog" className="block text-center mt-4 text-sm text-gray-500 hover:text-gray-700">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
