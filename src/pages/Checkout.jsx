import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { CreditCard, Truck, Wallet, Sparkles, Building2, QrCode, Banknote } from 'lucide-react';
import { formatPrice, calculateTotal } from '../data/mockData';

// Payment method configurations with local assets
const PAYMENT_METHODS = [
  { id: 'bca_va', name: 'BCA Virtual Account', icon: '/bank/bca.png', prefix: '88000', color: 'bg-blue-600' },
  { id: 'mandiri_va', name: 'Mandiri Virtual Account', icon: '/bank/mandiri.png', prefix: '89000', color: 'bg-yellow-600' },
  { id: 'bri_va', name: 'BRI Virtual Account', icon: '/bank/bri.png', prefix: '87000', color: 'bg-blue-700' },
  { id: 'qris', name: 'QRIS (Gopay, OVO, Dana, ShopeePay)', icon: '/bank/qris.png', color: 'bg-navy-600' },
  { id: 'cozzy_cash', name: 'Cozzy Cash (Wallet)', icon: Wallet, color: 'bg-navy-600', isLocalIcon: true },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, currentUser, createOrder } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('bca_va');

  // Calculate totals
  const { subtotal, shipping, discount, total } = calculateTotal(cart, false, 0);

  // Form state
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phoneNumber || '',
    address: currentUser?.address || '',
    city: currentUser?.city || '',
    postalCode: currentUser?.postalCode || ''
  });

  // Validation state
  const [touched, setTouched] = useState({});

  // Check if all shipping fields are filled
  const isFormValid = useMemo(() => {
    return formData.fullName && formData.email && formData.phone &&
      formData.address && formData.city && formData.postalCode;
  }, [formData]);

  // Check Cozzy Cash balance
  const cozzyCashBalance = currentUser?.cozzyCash || 0;
  const isCozzyCashSufficient = cozzyCashBalance >= total;
  const isCozzyCashSelected = paymentMethod === 'cozzy_cash';

  // Check if checkout can proceed
  const canCheckout = isFormValid && (!isCozzyCashSelected || isCozzyCashSufficient);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canCheckout) return;

    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const selectedMethod = PAYMENT_METHODS.find(m => m.id === paymentMethod);

    const order = createOrder({
      items: cart,
      shipping: { ...formData },
      paymentMethod: selectedMethod?.name || paymentMethod,
      paymentMethodId: paymentMethod,
      subtotal,
      shippingCost: shipping,
      discount: isCozzyCashSelected ? total : 0,
      total: isCozzyCashSelected ? 0 : total,
      usedCozzyCash: isCozzyCashSelected ? total : 0
    });

    setIsProcessing(false);
    navigate(`/receipt/${order.id}`);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const getInputClass = (field) => {
    const baseClass = "w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-navy-100";
    if (touched[field] && !formData[field]) {
      return `${baseClass} border-red-300 focus:border-red-500 focus:ring-red-100`;
    }
    return `${baseClass} border-gray-200 focus:border-navy-600`;
  };

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
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-navy-600" />
                  Shipping Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name *"
                      className={getInputClass('fullName')}
                      required
                    />
                    {touched.fullName && !formData.fullName && (
                      <p className="text-red-500 text-sm mt-1">Full name is required</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email *"
                        className={getInputClass('email')}
                        required
                      />
                      {touched.email && !formData.email && (
                        <p className="text-red-500 text-sm mt-1">Email is required</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number *"
                        className={getInputClass('phone')}
                        required
                      />
                      {touched.phone && !formData.phone && (
                        <p className="text-red-500 text-sm mt-1">Phone is required</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Full Address *"
                      rows={3}
                      className={`${getInputClass('address')} resize-none`}
                      required
                    />
                    {touched.address && !formData.address && (
                      <p className="text-red-500 text-sm mt-1">Address is required</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City *"
                        className={getInputClass('city')}
                        required
                      />
                      {touched.city && !formData.city && (
                        <p className="text-red-500 text-sm mt-1">City is required</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="Postal Code *"
                        className={getInputClass('postalCode')}
                        required
                      />
                      {touched.postalCode && !formData.postalCode && (
                        <p className="text-red-500 text-sm mt-1">Postal code is required</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="p-6 bg-gray-50 rounded-2xl">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-navy-600" />
                  Payment Method
                </h2>

                {/* Cozzy Cash Balance Display */}
                {currentUser && (
                  <div className="mb-4 p-3 bg-navy-50 rounded-xl border border-navy-100">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-navy-600" />
                      <span className="text-sm text-navy-700">Your Cozzy Cash Balance: <strong>{formatPrice(cozzyCashBalance)}</strong></span>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {PAYMENT_METHODS.map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    const isDisabled = method.id === 'cozzy_cash' && !isCozzyCashSufficient;

                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => !isDisabled && setPaymentMethod(method.id)}
                        disabled={isDisabled}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 
                          ${isSelected
                            ? 'border-navy-600 bg-navy-50'
                            : 'border-gray-200 hover:border-gray-300'
                          }
                          ${isDisabled
                            ? 'opacity-50 cursor-not-allowed bg-gray-100'
                            : 'active:scale-[0.98]'
                          }`
                        }
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center 
                          ${isSelected ? 'border-navy-600' : 'border-gray-300'}`
                        }>
                          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-navy-600" />}
                        </div>

                        {method.isLocalIcon ? (
                          <Icon className={`w-5 h-5 ${isDisabled ? 'text-gray-400' : 'text-navy-600'}`} />
                        ) : (
                          <div className="w-12 h-6 flex items-center justify-center">
                            <img src={method.icon} alt={method.name} className="max-w-full max-h-full object-contain" />
                          </div>
                        )}

                        <span className={`font-bold flex-1 text-left tracking-tight ${isDisabled ? 'text-gray-400' : 'text-gray-900'}`}>
                          {method.name}
                        </span>
                        {method.id === 'cozzy_cash' && (
                          <span className="text-[10px] font-bold tracking-widest text-white bg-black px-3 py-1.5 rounded-full">
                            BALANCE: {formatPrice(cozzyCashBalance)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Insufficient Balance Warning */}
                {isCozzyCashSelected && !isCozzyCashSufficient && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm font-medium">
                      Insufficient Cozzy Cash balance.
                    </p>
                    <p className="text-red-500 text-xs mt-1">
                      Required: {formatPrice(total)} | Available: {formatPrice(cozzyCashBalance)}
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!canCheckout || isProcessing}
                className="w-full py-4 bg-navy-600 text-white rounded-xl font-medium 
                  hover:bg-navy-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200"
              >
                {isProcessing
                  ? 'Processing...'
                  : isCozzyCashSelected
                    ? 'Pay with Cozzy Cash'
                    : `Pay ${formatPrice(total)}`
                }
              </button>

              {!isFormValid && (
                <p className="text-red-500 text-sm text-center">
                  Please fill in all shipping information to proceed.
                </p>
              )}
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

              {/* Payment Method Info */}
              <div className="mb-4 p-3 bg-white rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Payment Method</p>
                <p className="font-medium text-gray-900">
                  {PAYMENT_METHODS.find(m => m.id === paymentMethod)?.name}
                </p>
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                {isCozzyCashSelected && (
                  <div className="flex justify-between text-navy-600">
                    <span>Cozzy Cash Used</span>
                    <span>-{formatPrice(total)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2">
                  <span>Total</span>
                  <span>{isCozzyCashSelected ? 'Rp 0' : formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
