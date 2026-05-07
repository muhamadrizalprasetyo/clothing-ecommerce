// cozzy.co - Mock Data
// Brand: Minimalist, Clean, Gen Z
// Colors: White BG, Navy accent, Black font

export const products = [
  {
    id: 1,
    name: "Cozzy Classic Hoodie",
    category: "Hoodie",
    price: 299000,
    image: "/hd-produk1.jpg",
    description: "Stay cozy with our signature oversized hoodie. Perfect for that laid-back Gen Z vibe. Premium cotton blend for all-day comfort.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Black", "Cream"],
    stock: 25,
    isNew: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Street Vibe Tee",
    category: "T-Shirt",
    price: 149000,
    image: "/ts-produk1.jpg",
    description: "Essential streetwear tee with minimalist design. Soft, breathable fabric that keeps you fresh all day.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Navy"],
    stock: 50,
    isNew: false,
    rating: 4.6,
    reviews: 89
  },
  {
    id: 3,
    name: "Urban Nomad Tee",
    category: "T-Shirt",
    price: 159000,
    image: "/ts-produk2.jpg",
    description: "For the city wanderers. This tee combines style with functionality. Features a modern cut that sits just right.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal", "Olive", "Sand"],
    stock: 35,
    isNew: true,
    rating: 4.7,
    reviews: 67
  },
  {
    id: 4,
    name: "Essential Core Tee",
    category: "T-Shirt",
    price: 139000,
    image: "/ts-produk3.jpg",
    description: "Your everyday essential. Clean lines, premium feel, unbeatable price. The foundation of any cozzy wardrobe.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Gray", "Navy"],
    stock: 100,
    isNew: false,
    rating: 4.5,
    reviews: 203
  },
  {
    id: 5,
    name: "Cozzy Oversized Hoodie",
    category: "Hoodie",
    price: 329000,
    image: "/hd-produk1.jpg",
    description: "Maximum comfort, maximum style. This oversized hoodie is your go-to for chill days and late-night hangs.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Heather Gray", "Navy"],
    stock: 18,
    isNew: true,
    rating: 4.9,
    reviews: 56
  },
  {
    id: 6,
    name: "Featured Cozzy Drop",
    category: "Featured",
    price: 259000,
    image: "/IMG_1965.jpg",
    description: "Limited edition featured piece. Exclusive design for those who wanna style cozzy. Get it while it lasts.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Black"],
    stock: 12,
    isNew: true,
    rating: 5.0,
    reviews: 34,
    isLimited: true
  }
];

export const categories = [
  { id: "all", name: "All Items", icon: "LayoutGrid" },
  { id: "Hoodie", name: "Hoodies", icon: "Shirt" },
  { id: "T-Shirt", name: "T-Shirts", icon: "TShirt" },
  { id: "Featured", name: "Featured", icon: "Star" }
];

export const initialUser = {
  id: "user_001",
  name: "Cozzy Member",
  email: "member@cozzy.co",
  avatar: null,
  phone: "",
  address: {
    street: "",
    city: "",
    postalCode: "",
    country: "Indonesia"
  },
  cozzyCash: 500000, // Initial 500k Cozzy Cash balance
  points: 0,
  memberSince: new Date().toISOString()
};

// Format price to Indonesian Rupiah
export const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

// Calculate total with Cozzy Cash discount
export const calculateTotal = (cartItems, useCozzyCash = false, cozzyCashBalance = 0) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500000 ? 0 : 25000; // Free shipping over 500k
  
  let discount = 0;
  if (useCozzyCash && cozzyCashBalance > 0) {
    discount = Math.min(cozzyCashBalance, subtotal + shipping);
  }
  
  return {
    subtotal,
    shipping,
    discount,
    total: subtotal + shipping - discount
  };
};

// Indonesian payment methods
export const paymentMethods = [
  { 
    id: 'bca', 
    name: 'BCA Virtual Account', 
    type: 'va', 
    bank: 'BCA',
    description: 'Transfer ke nomor Virtual Account BCA',
    icon: 'Building'
  },
  { 
    id: 'mandiri', 
    name: 'Mandiri Virtual Account', 
    type: 'va', 
    bank: 'Mandiri',
    description: 'Transfer ke nomor Virtual Account Mandiri',
    icon: 'Building'
  },
  { 
    id: 'bri', 
    name: 'BRI Virtual Account', 
    type: 'va', 
    bank: 'BRI',
    description: 'Transfer ke nomor Virtual Account BRI',
    icon: 'Building'
  },
  { 
    id: 'qris', 
    name: 'QRIS', 
    type: 'qris',
    description: 'Scan QR code untuk pembayaran',
    icon: 'QrCode'
  },
  { 
    id: 'cozzy_cash', 
    name: 'Cozzy Cash', 
    type: 'wallet',
    description: 'Gunakan saldo Cozzy Cash kamu',
    icon: 'Wallet'
  }
];

// Generate Virtual Account number
export const generateVANumber = (bank, orderId) => {
  const bankCodes = {
    'BCA': '880',
    'Mandiri': '890',
    'BRI': '870'
  };
  
  const code = bankCodes[bank] || '880';
  return `${code}${orderId.toString().padStart(10, '0')}`;
};
