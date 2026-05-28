import { useState, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart, Filter, X, Search, Grid3X3, LayoutList, ChevronDown } from 'lucide-react';
import { products, categories, formatPrice } from '../data/mockData';

const Catalog = () => {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, showToast, isLoggedIn } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  // Check auth before allowing actions - redirect to login if guest
  const requireAuth = () => {
    if (!isLoggedIn) {
      navigate('/register');
      return false;
    }
    return true;
  };

  const handleAddToCart = (product) => {
    if (!requireAuth()) return;
    addToCart(product, product.sizes[0], product.colors[0], 1);
  };

  const handleProductClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/register');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shop All</h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setSearchParams({}); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 active:scale-90"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 active:scale-95 ${selectedCategory === cat.id
                    ? 'bg-navy-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort & View */}
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200 transition-all duration-200 active:scale-95">
                Sort by
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                {[
                  { value: 'featured', label: 'Featured' },
                  { value: 'newest', label: 'Newest' },
                  { value: 'price-low', label: 'Price: Low to High' },
                  { value: 'price-high', label: 'Price: High to Low' },
                  { value: 'rating', label: 'Highest Rated' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortBy(opt.value)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl ${sortBy === opt.value ? 'bg-navy-50 text-navy-600' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-200 active:scale-90 ${viewMode === 'grid' ? 'bg-white shadow-sm text-navy-600' : 'text-gray-400'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-200 active:scale-90 ${viewMode === 'list' ? 'bg-white shadow-sm text-navy-600' : 'text-gray-400'}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-all duration-200 active:scale-90"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-4">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
            }`}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${viewMode === 'list' ? 'flex' : ''
                  }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden bg-gray-100 ${viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <button
                    onClick={() => { if (requireAuth()) toggleWishlist(product); }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-200 hover:bg-white hover:scale-110 active:scale-95"
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                  {product.isNew && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-navy-600 text-white text-xs font-medium rounded-full">
                      New
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 flex-1 flex flex-col">
                  <Link to={`/product/${product.id}`} onClick={handleProductClick}>
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-navy-600 transition-colors">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  </Link>

                  {viewMode === 'list' && (
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                  )}

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-2 rounded-full bg-navy-600 text-white text-[10px] font-bold tracking-widest uppercase transition-all duration-200 hover:bg-navy-700 hover:scale-105 active:scale-95"
                    >
                      {isLoggedIn ? 'Add to Cart' : 'Join to Unlock'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">No products found</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setSearchParams({}); }}
              className="px-6 py-3 bg-navy-600 text-white rounded-xl font-medium transition-all duration-200 hover:bg-navy-700 active:scale-95"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
