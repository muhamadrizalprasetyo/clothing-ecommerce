import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { CreditCard, Truck, Wallet, Check, Sparkles } from 'lucide-react';
import { formatPrice, calculateTotal } from '../data/mockData';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, currentUser, createOrder } = useStore();
  const [useCozzyCash, setUseCozzyCash] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('transfer');

  const { subtotal, shipping, discount, total } = calculateTotal(cart, useCozzyCash, currentUser?.cozzyCash);

  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address?.street || '',
    city: currentUser?.address?.city || '',
    postalCode: currentUser?.address?.postalCode || ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const order = createOrder({
      items: cart,
      shipping: { ...formData },
      paymentMethod,
      subtotal,
      shippingCost: shipping,
      discount,
      total,
      usedCozzyCash: useCozzyCash ? Math.min(currentUser?.cozzyCash || 0, subtotal + shipping) : 0
    });
    
    setIsProcessing(false);
    navigate(`/receipt/${order.id}`);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping */}
              <div className="p-6 bg-gray-50 rounded-2xl">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Truck className="w-5 h-5" /> Shipping Information</h2>
                <div className="space-y-4">
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100" required />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100" required />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100" required />
                  </div>
                  <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Full Address" rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100 resize-none" required />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100" required />
                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100" required />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="p-6 bg-gray-50 rounded-2xl">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5" /> Payment Method</h2>
                <div className="space-y-3">
                  {['transfer', 'cod'].map((method) => (
                    <button key={method} type="button" onClick={() => setPaymentMethod(method)} className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 active:scale-[0.98] ${paymentMethod === method ? 'border-navy-600 bg-navy-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method ? 'border-navy-600' : 'border-gray-300'}`}>{paymentMethod === method && <div className="w-2.5 h-2.5 rounded-full bg-navy-600" />}</div>
                      <span className="font-medium capitalize">{method === 'transfer' ? 'Bank Transfer' : 'Cash on Delivery'}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={isProcessing} className="w-full py-4 bg-navy-600 text-white rounded-xl font-medium hover:bg-navy-700 active:scale-[0.98] disabled:opacity-50">{isProcessing ? 'Processing...' : `Pay ${formatPrice(total)}`}</button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="p-6 bg-gray-50 rounded-2xl">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.cartId} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.size} / {item.color} x {item.quantity}</p>
                      <p className="text-sm font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cozzy Cash */}
              {currentUser && (
                <div className="mb-4 p-4 bg-white rounded-xl">
                  <div className="flex items-center gap-2 mb-3"><Sparkles className="w-5 h-5 text-navy-600" /><span className="font-medium text-gray-900">Cozzy Cash</span></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Available</p>
                      <p className="font-bold text-navy-600">{formatPrice(currentUser.cozzyCash)}</p>
                    </div>
                    <button type="button" onClick={() => setUseCozzyCash(!useCozzyCash)} className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95 ${useCozzyCash ? 'bg-navy-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{useCozzyCash ? 'Applied' : 'Apply'}</button>
                  </div>
                </div>
              )}

              {/* Totals */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
                {discount > 0 && <div className="flex justify-between text-navy-600"><span>Cozzy Cash</span><span>-{formatPrice(discount)}</span></div>}
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2"><span>Total</span><span>{formatPrice(total)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
