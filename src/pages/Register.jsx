import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, MapPin, Hash, Phone, Building2 } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Extract search/redirect info
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = location.state?.from || searchParams.get('redirect') || '/';
  const pendingSearch = searchParams.get('search') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    postalCode: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({});

  const validatePassword = (pw) => {
    const hasUpperCase = /[A-Z]/.test(pw);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(pw);
    if (!hasUpperCase || !hasSymbol) {
      return "Password must contain at least one UPPERCASE letter and one symbol.";
    }
    return null;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Required fields validation
    const requiredFields = ['name', 'email', 'address', 'city', 'postalCode', 'phoneNumber', 'password', 'confirmPassword'];
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = 'This field is required';
      }
    });

    const pwError = validatePassword(formData.password);
    if (pwError) newErrors.password = pwError;

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Notify user about missing fields
      const missingTotal = Object.keys(newErrors).length;
      if (missingTotal > 0) {
        setErrors(prev => ({ ...prev, general: `Please fix ${missingTotal} error(s) before proceeding.` }));
      }
      return;
    }

    setIsLoading(true);

    try {
      await register(formData.name, formData.email, formData.password, {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        phoneNumber: formData.phoneNumber
      });

      // Construct final redirect with search if applicable
      let finalPath = redirectPath;
      if (pendingSearch && (finalPath === '/' || finalPath === '/catalog')) {
        finalPath = `/catalog?search=${encodeURIComponent(pendingSearch)}`;
      }

      navigate(finalPath);
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 shadow-inner">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img src="/cozzy/cozzyabout-black.png" alt="Cozzy Store" className="h-12 w-auto mx-auto mb-2" />
          </Link>
          <h1 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter">Join Cozzy Store</h1>
          <p className="text-gray-500 mt-2 text-sm tracking-widest uppercase">Start your archive journey today</p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 md:p-12">
          <div className="mb-10 p-5 rounded-2xl bg-gray-900 flex items-center gap-4 border border-white/10">
            <div className="p-2 bg-white rounded-lg">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Welcome Bonus!</p>
              <p className="text-xs text-white/50 uppercase">Get Rp 500,000 Cozzy Cash</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border ${errors.name ? 'border-red-400' : 'border-gray-100'} bg-gray-50/50 focus:bg-white focus:border-black focus:ring-0 transition-all text-sm`}
                    placeholder="Your name"
                    required
                  />
                </div>
                {errors.name && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border ${errors.email ? 'border-red-400' : 'border-gray-100'} bg-gray-50/50 focus:bg-white focus:border-black focus:ring-0 transition-all text-sm`}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                {errors.email && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border ${errors.address ? 'border-red-400' : 'border-gray-100'} bg-gray-50/50 focus:bg-white focus:border-black focus:ring-0 transition-all text-sm min-h-[100px]`}
                    placeholder="Street Address"
                    required
                  />
                  {errors.address && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.address}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">City</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border ${errors.city ? 'border-red-400' : 'border-gray-100'} bg-gray-50/50 focus:bg-white focus:border-black focus:ring-0 transition-all text-sm`}
                    placeholder="City Name"
                    required
                  />
                  {errors.city && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.city}</p>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Postal Code</label>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border ${errors.postalCode ? 'border-red-400' : 'border-gray-100'} bg-gray-50/50 focus:bg-white focus:border-black focus:ring-0 transition-all text-sm`}
                    placeholder="12345"
                    required
                  />
                </div>
                {errors.postalCode && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.postalCode}</p>}
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border ${errors.phoneNumber ? 'border-red-400' : 'border-gray-100'} bg-gray-50/50 focus:bg-white focus:border-black focus:ring-0 transition-all text-sm`}
                    placeholder="+62"
                    required
                  />
                </div>
                {errors.phoneNumber && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.phoneNumber}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-12 py-3.5 rounded-2xl border ${errors.password ? 'border-red-400' : 'border-gray-100'} bg-gray-50/50 focus:bg-white focus:border-black focus:ring-0 transition-all text-sm`}
                    placeholder="Capital + Symbol"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border ${errors.confirmPassword ? 'border-red-400' : 'border-gray-100'} bg-gray-50/50 focus:bg-white focus:border-black focus:ring-0 transition-all text-sm`}
                    placeholder="Confirm password"
                    required
                  />
                </div>
                {errors.confirmPassword && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {errors.general && (
              <div className="p-4 rounded-2xl bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest border border-red-100">{errors.general}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:bg-black hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl"
            >
              {isLoading ? 'Creating Identity...' : 'Register to Archive'}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              Already a member?{' '}
              <Link to="/login" className="text-black hover:underline transition-all">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
