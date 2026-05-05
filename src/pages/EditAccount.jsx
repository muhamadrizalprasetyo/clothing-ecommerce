import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { User, Mail, Phone, MapPin, Camera, Check, Sparkles } from 'lucide-react';

const EditAccount = () => {
  const { currentUser, updateProfile } = useStore();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address?.street || '',
    city: currentUser?.address?.city || '',
    postalCode: currentUser?.address?.postalCode || ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    updateProfile({
      name: formData.name,
      phone: formData.phone,
      address: {
        street: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: 'Indonesia'
      }
    });
    
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
        <p className="text-gray-500 mb-8">Manage your profile and preferences</p>

        {/* Cozzy Cash Card */}
        <div className="mb-8 p-6 bg-gradient-to-r from-navy-600 to-navy-700 rounded-2xl text-white">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Cozzy Cash Balance</span>
          </div>
          <p className="text-3xl font-bold">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(currentUser?.cozzyCash || 0)}
          </p>
          <p className="text-navy-200 text-sm mt-1">Use your Cozzy Cash on checkout for instant savings</p>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-navy-600 text-white flex items-center justify-center text-2xl font-bold">
                {currentUser?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-100 text-gray-600 hover:text-navy-600 active:scale-90">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{currentUser?.name}</p>
              <p className="text-sm text-gray-500">Member since {new Date(currentUser?.memberSince).toLocaleDateString()}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"><User className="w-4 h-4 inline mr-1" /> Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100 transition-all duration-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"><Mail className="w-4 h-4 inline mr-1" /> Email</label>
                <input type="email" name="email" value={formData.email} disabled className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"><Phone className="w-4 h-4 inline mr-1" /> Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100 transition-all duration-200" placeholder="+62 ..." />
            </div>

            <div className="border-t border-gray-100 pt-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><MapPin className="w-5 h-5" /> Shipping Address</h3>
              <div className="space-y-4">
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100 transition-all duration-200" placeholder="Full Address" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100 transition-all duration-200" placeholder="City" />
                  <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100 transition-all duration-200" placeholder="Postal Code" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={isSaving} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-navy-600 text-white rounded-xl font-medium hover:bg-navy-700 active:scale-[0.98] disabled:opacity-50 transition-all duration-200">
              {isSaving ? 'Saving...' : saved ? (<><Check className="w-5 h-5" /> Saved</>) : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
