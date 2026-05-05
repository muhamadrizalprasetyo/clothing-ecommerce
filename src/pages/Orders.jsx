import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Package, ChevronRight, ShoppingBag, Clock, CheckCircle, Truck } from 'lucide-react';
import { formatPrice } from '../data/mockData';

const Orders = () => {
  const { orders } = useStore();
  const [filter, setFilter] = useState('all');

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5 text-amber-500" />;
      case 'processing': return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped': return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h1>
          <p className="text-gray-500 mb-6">Start shopping to see your orders here.</p>
          <Link to="/catalog" className="inline-flex items-center gap-2 px-6 py-3 bg-navy-600 text-white rounded-xl font-medium hover:bg-navy-700 active:scale-95">Start Shopping<ChevronRight className="w-4 h-4" /></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-500 mb-6">Track and manage your orders</p>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'pending', 'processing', 'shipped', 'delivered'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 active:scale-95 ${filter === f ? 'bg-navy-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Link key={order.id} to={`/receipt/${order.id}`} className="block p-6 bg-gray-50 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-semibold text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="capitalize">{order.status}</span>
                </div>
              </div>

              {/* Items Preview */}
              <div className="flex gap-4 mb-4">
                <div className="flex -space-x-3">
                  {order.items.slice(0, 3).map((item, i) => (
                    <img key={i} src={item.image} alt="" className="w-12 h-12 object-cover rounded-lg border-2 border-white" />
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 border-2 border-white">+{order.items.length - 3}</div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
                  <p className="font-semibold text-gray-900">{formatPrice(order.total)}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No {filter} orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
