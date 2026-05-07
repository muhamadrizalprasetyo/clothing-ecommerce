import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Check, Home, ShoppingBag, Printer, Copy, Upload, Building2, QrCode, Wallet, FileCheck } from 'lucide-react';
import { formatPrice } from '../data/mockData';
import { useEffect, useState, useCallback } from 'react';

// Payment method configurations
const PAYMENT_PREFIXES = {
  'bca_va': '88000',
  'mandiri_va': '89000',
  'bri_va': '87000'
};

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
      /* Hide navbar, footer, and other UI elements */
      nav,
      footer,
      .toast-container,
      [role="alert"],
      #toast,
      .fixed {
        display: none !important;
      }
      /* Remove spacing from main layout */
      main {
        padding: 0 !important;
        margin: 0 !important;
      }
      /* Ensure receipt is centered and full width */
      .receipt-container {
        padding: 0 !important;
        max-width: 100% !important;
        min-height: auto !important;
      }
      .receipt-card {
        box-shadow: none !important;
        border: 1px solid #e5e7eb !important;
        max-width: 100% !important;
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
      /* Hide payment instructions in print */
      .payment-instructions {
        display: none !important;
      }
    }
  `;

  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById, showToast, updateOrderStatus } = useStore();
  const [order, setOrder] = useState(getOrderById(orderId));
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Refresh order from store
  useEffect(() => {
    const refreshedOrder = getOrderById(orderId);
    setOrder(refreshedOrder);
  }, [orderId, getOrderById]);

  useEffect(() => {
    if (!order) {
      showToast('Order not found', 'error');
      navigate('/orders');
    }
  }, [order, navigate, showToast]);

  if (!order) return null;

  // Generate VA Number
  const generateVANumber = () => {
    const prefix = PAYMENT_PREFIXES[order.paymentMethodId] || '88000';
    const phoneLast8 = order.shipping.phone?.slice(-8) || '12345678';
    return `${prefix}${phoneLast8}`;
  };

  const vaNumber = generateVANumber();

  const handlePrint = () => {
    window.print();
  };

  const handleCopyVA = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(vaNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast('VA number copied!', 'success');
    } catch (err) {
      showToast('Failed to copy', 'error');
    }
  }, [vaNumber, showToast]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('File size must be less than 5MB', 'error');
        return;
      }
      if (!file.type.startsWith('image/')) {
        showToast('Only image files are allowed', 'error');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmitProof = async () => {
    if (!selectedFile) {
      showToast('Please select a file first', 'error');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update order status
    updateOrderStatus(order.id, 'paid / waiting for confirmation');
    
    // Refresh order
    setOrder({ ...order, status: 'paid / waiting for confirmation' });
    
    setIsSubmitting(false);
    setSelectedFile(null);
    showToast('Payment proof submitted! Waiting for confirmation.', 'success', 5000);
  };

  // Check payment method type
  const isVirtualAccount = ['bca_va', 'mandiri_va', 'bri_va'].includes(order.paymentMethodId);
  const isQRIS = order.paymentMethodId === 'qris';
  const isCozzyCash = order.paymentMethodId === 'cozzy_cash';
  const isPending = order.status === 'pending';

  // Get status badge style
  const getStatusStyle = (status) => {
    if (status.includes('paid')) return 'bg-blue-100 text-blue-700';
    if (status.includes('shipped')) return 'bg-purple-100 text-purple-700';
    if (status.includes('delivered')) return 'bg-green-100 text-green-700';
    return 'bg-amber-100 text-amber-700';
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isCozzyCash ? 'Order Confirmed!' : 'Order Placed Successfully!'}
            </h1>
            <p className="text-gray-500">
              {isCozzyCash 
                ? 'Thank you for shopping with cozzy.co' 
                : 'Please complete your payment to confirm the order'
              }
            </p>
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
                  <p className="font-medium text-gray-900">{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Status</p>
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium capitalize ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Instructions (Only for Pending Orders) */}
            {isPending && !isCozzyCash && (
              <div className="payment-instructions receipt-section p-6 border-b border-gray-100 print:hidden">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-navy-600" />
                  Payment Instructions
                </h3>

                {/* Virtual Account Payment */}
                {isVirtualAccount && (
                  <div className="bg-navy-50 border border-navy-100 rounded-xl p-4 mb-4">
                    <p className="text-sm text-navy-700 mb-3">
                      Please transfer to the following Virtual Account:
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-white rounded-lg p-3 border border-navy-200">
                        <p className="text-xs text-gray-500 mb-1">Virtual Account Number</p>
                        <p className="font-mono font-bold text-navy-600 text-lg tracking-wider">
                          {vaNumber}
                        </p>
                      </div>
                      <button
                        onClick={handleCopyVA}
                        className="flex items-center gap-2 px-4 py-3 bg-navy-600 text-white rounded-lg hover:bg-navy-700 active:scale-95 transition-all duration-200"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="mt-4 p-3 bg-white rounded-lg border border-navy-200">
                      <p className="text-sm text-gray-600 flex justify-between">
                        <span>Amount to Pay:</span>
                        <span className="font-bold text-navy-600">{formatPrice(order.total)}</span>
                      </p>
                    </div>
                    <p className="text-xs text-navy-600 mt-3">
                      * Transfer before the Virtual Account expires (24 hours)
                    </p>
                  </div>
                )}

                {/* QRIS Payment */}
                {isQRIS && (
                  <div className="bg-navy-50 border border-navy-100 rounded-xl p-4 mb-4">
                    <p className="text-sm text-navy-700 mb-4">
                      Scan the QR code below using Gopay, OVO, Dana, or ShopeePay:
                    </p>
                    <div className="flex flex-col items-center gap-4">
                      <div className="bg-white p-4 rounded-xl border-2 border-navy-200">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=CozzyOrder-${order.id}-${order.total}`}
                          alt="QRIS Payment"
                          className="w-48 h-48"
                        />
                      </div>
                      <div className="w-full p-3 bg-white rounded-lg border border-navy-200">
                        <p className="text-sm text-gray-600 flex justify-between">
                          <span>Amount to Pay:</span>
                          <span className="font-bold text-navy-600">{formatPrice(order.total)}</span>
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-navy-600 mt-3">
                      * Payment must be completed within 1 hour
                    </p>
                  </div>
                )}
              </div>
            )}

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

          {/* Upload Payment Proof Section (Only for Pending Orders with VA/QRIS) */}
          {isPending && (isVirtualAccount || isQRIS) && (
            <div className="payment-instructions mt-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 print:hidden">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-navy-600" />
                Upload Payment Proof
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-navy-400 transition-colors">
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {selectedFile ? selectedFile.name : 'Click to select file (Max 5MB, Image only)'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {selectedFile && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700">File selected: {selectedFile.name}</span>
                  </div>
                )}
                
                <button
                  onClick={handleSubmitProof}
                  disabled={!selectedFile || isSubmitting}
                  className="w-full py-3 bg-navy-600 text-white rounded-xl font-medium
                    hover:bg-navy-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Submit Payment Proof
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

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
