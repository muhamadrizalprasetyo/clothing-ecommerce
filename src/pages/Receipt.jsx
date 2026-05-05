import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Check, Download, Home, ShoppingBag, Printer } from 'lucide-react';
import { formatPrice } from '../data/mockData';
import { useEffect } from 'react';

const Receipt = () => {
  const printStyles = `
    @media print {
      @page {
        size: A4;
        margin: 10mm;
      }
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .receipt-container {
        padding: 0 !important;
        max-width: 100% !important;
      }
      .receipt-card {
        box-shadow: none !important;
        border: 1px solid #e5e7eb !important;
      }
      .receipt-header {
        padding: 12px 16px !important;
      }
      .receipt-section {
        padding: 10px 16px !important;
      }
      .receipt-item {
        gap: 12px !important;
        margin-bottom: 8px !important;
      }
      .receipt-item img {
        width: 48px !important;
        height: 48px !important;
      }
      .receipt-shipping p {
        margin-bottom: 2px !important;
        font-size: 12px !important;
      }
      .receipt-totals {
        padding: 10px 16px !important;
        background-color: #f9fafb !important;
      }
    }
  `;
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById, showToast } = useStore();
  const order = getOrderById(orderId);

  useEffect(() => {
    if (!order) {
      showToast('Order not found', 'error');
      navigate('/orders');
    }
  }, [order, navigate, showToast]);

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>{printStyles}</style>
      <div className="receipt-container min-h-screen bg-gray-50 py-8 print:py-0 print:bg-white">
        <div className="max-w-2xl mx-auto px-4 print:px-0 print:max-w-full">
          {/* Success Header */}
          <div className="text-center mb-8 print:hidden">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-500">Thank you for shopping with cozzy.co</p>
          </div>

          {/* Receipt Card */}
          <div className="receipt-card bg-white rounded-2xl shadow-sm overflow-hidden print:shadow-none print:rounded-none">
          {/* Header */}
          <div className="receipt-header p-6 border-b border-gray-100 flex items-center justify-between print:p-3">
            <div className="flex items-center gap-3">
              <img src="/logo1.jpg" alt="cozzy.co" className="h-10 w-auto" />
              <div>
                <p className="font-bold text-gray-900">cozzy.co</p>
                <p className="text-xs text-gray-500">wanna style cozzy with me?</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-mono font-medium text-gray-900">{order.id}</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="receipt-section p-6 border-b border-gray-100 print:p-3">
            <div className="grid grid-cols-3 gap-4 text-sm print:grid-cols-3">
              <div>
                <p className="text-gray-500 mb-1">Order Date</p>
                <p className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Payment Method</p>
                <p className="font-medium text-gray-900 capitalize">{order.paymentMethod === 'transfer' ? 'Bank Transfer' : 'Cash on Delivery'}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Status</p>
                <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-medium capitalize">{order.status}</span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="receipt-section p-6 border-b border-gray-100 print:p-3">
            <h3 className="font-semibold text-gray-900 mb-3 print:text-sm print:mb-2">Order Items</h3>
            <div className="space-y-3 print:space-y-2">
              {order.items.map((item) => (
                <div key={item.cartId} className="receipt-item flex gap-4 print:gap-3 print:items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg print:w-12 print:h-12" />
                  <div className="flex-1 print:leading-tight">
                    <p className="font-medium text-gray-900 print:text-sm">{item.name}</p>
                    <p className="text-sm text-gray-500 print:text-xs">{item.size} / {item.color} / Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping */}
          <div className="receipt-section receipt-shipping p-6 border-b border-gray-100 print:p-3">
            <h3 className="font-semibold text-gray-900 mb-2 print:text-sm print:mb-1">Shipping Address</h3>
            <p className="text-gray-600 print:text-xs">{order.shipping.fullName}</p>
            <p className="text-gray-600 print:text-xs">{order.shipping.phone}</p>
            <p className="text-gray-600 print:text-xs">{order.shipping.address}</p>
            <p className="text-gray-600 print:text-xs">{order.shipping.city}, {order.shipping.postalCode}</p>
          </div>

          {/* Totals */}
          <div className="receipt-totals p-6 bg-gray-50 print:p-3 print:bg-gray-50">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{order.shippingCost === 0 ? 'Free' : formatPrice(order.shippingCost)}</span></div>
              {order.discount > 0 && <div className="flex justify-between text-navy-600"><span>Cozzy Cash Used</span><span>-{formatPrice(order.discount)}</span></div>}
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200"><span>Total</span><span>{formatPrice(order.total)}</span></div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-8 print:hidden">
          <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 active:scale-95"><Printer className="w-4 h-4" />Print</button>
          <Link to="/orders" className="flex items-center gap-2 px-6 py-3 bg-navy-600 text-white rounded-xl font-medium hover:bg-navy-700 active:scale-95"><ShoppingBag className="w-4 h-4" />View Orders</Link>
          <Link to="/" className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 active:scale-95"><Home className="w-4 h-4" />Continue Shopping</Link>
        </div>
        </div>
      </div>
    </>
  );
};

export default Receipt;
