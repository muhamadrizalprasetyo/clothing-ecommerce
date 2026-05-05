import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { products, initialUser } from '../data/mockData';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

// Toast notification system
const createToastSystem = () => {
  let listeners = [];
  let toasts = [];

  const subscribe = (callback) => {
    listeners.push(callback);
    return () => {
      listeners = listeners.filter(l => l !== callback);
    };
  };

  const notify = (message, type = 'success', duration = 3000) => {
    const id = Date.now().toString();
    const toast = { id, message, type, duration };
    toasts = [...toasts, toast];
    listeners.forEach(callback => callback(toasts));
    
    setTimeout(() => {
      toasts = toasts.filter(t => t.id !== id);
      listeners.forEach(callback => callback(toasts));
    }, duration);
  };

  return { subscribe, notify };
};

export const toastSystem = createToastSystem();

export const StoreProvider = ({ children }) => {
  // User state with LocalStorage sync
  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cozzy_user');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  // Cart state with LocalStorage sync
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cozzy_cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Wishlist state with LocalStorage sync
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cozzy_wishlist');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Orders state with LocalStorage sync
  const [orders, setOrders] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cozzy_orders');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Toast state
  const [toasts, setToasts] = useState([]);

  // Subscribe to toast system
  useEffect(() => {
    return toastSystem.subscribe(setToasts);
  }, []);

  // Persist to LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('cozzy_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('cozzy_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('cozzy_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cozzy_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('cozzy_orders', JSON.stringify(orders));
  }, [orders]);

  // Auth actions
  const login = useCallback((email, password) => {
    // Mock login - in real app, verify with backend
    const user = { ...initialUser, email, id: `user_${Date.now()}` };
    setCurrentUser(user);
    toastSystem.notify('Welcome back! wanna style cozzy with me?', 'success');
    return user;
  }, []);

  const register = useCallback((name, email, password) => {
    // Mock register - in real app, create in backend
    const user = { 
      ...initialUser, 
      name, 
      email, 
      id: `user_${Date.now()}` 
    };
    setCurrentUser(user);
    toastSystem.notify('Account created! Let\'s get cozzy!', 'success');
    return user;
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    toastSystem.notify('See you soon, stay cozzy!', 'info');
  }, []);

  const updateProfile = useCallback((updates) => {
    setCurrentUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      toastSystem.notify('Profile updated successfully!', 'success');
      return updated;
    });
  }, []);

  // Cart actions
  const addToCart = useCallback((product, size, color, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.size === size && item.color === color
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        toastSystem.notify(`Added another ${product.name} to cart!`, 'success');
        return updated;
      }

      toastSystem.notify(`${product.name} added to cart!`, 'success');
      return [...prev, {
        cartId: `${product.id}_${size}_${color}_${Date.now()}`,
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size,
        color,
        quantity
      }];
    });
  }, []);

  const removeFromCart = useCallback((cartId) => {
    setCart(prev => {
      const item = prev.find(i => i.cartId === cartId);
      if (item) {
        toastSystem.notify(`${item.name} removed from cart`, 'info');
      }
      return prev.filter(item => item.cartId !== cartId);
    });
  }, []);

  const updateCartQuantity = useCallback((cartId, quantity) => {
    if (quantity < 1) {
      removeFromCart(cartId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.cartId === cartId ? { ...item, quantity } : item
    ));
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    toastSystem.notify('Cart cleared', 'info');
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const getCartCount = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Wishlist actions
  const addToWishlist = useCallback((product) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) {
        toastSystem.notify(`${product.name} is already in your wishlist!`, 'info');
        return prev;
      }
      toastSystem.notify(`${product.name} added to wishlist!`, 'success');
      return [...prev, { ...product, addedAt: Date.now() }];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlist(prev => {
      const item = prev.find(i => i.id === productId);
      if (item) {
        toastSystem.notify(`${item.name} removed from wishlist`, 'info');
      }
      return prev.filter(item => item.id !== productId);
    });
  }, []);

  const isInWishlist = useCallback((productId) => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);

  const toggleWishlist = useCallback((product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }, [isInWishlist, addToWishlist, removeFromWishlist]);

  // Order actions
  const createOrder = useCallback((orderData) => {
    const order = {
      id: `ORD_${Date.now()}`,
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    setOrders(prev => [order, ...prev]);
    
    // Deduct Cozzy Cash if used
    if (orderData.usedCozzyCash > 0 && currentUser) {
      setCurrentUser(prev => ({
        ...prev,
        cozzyCash: prev.cozzyCash - orderData.usedCozzyCash
      }));
    }
    
    clearCart();
    toastSystem.notify('Order placed successfully! Stay cozzy!', 'success', 5000);
    return order;
  }, [currentUser, clearCart]);

  const getOrderById = useCallback((orderId) => {
    return orders.find(order => order.id === orderId);
  }, [orders]);

  // Cozzy Cash actions
  const addCozzyCash = useCallback((amount) => {
    setCurrentUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        cozzyCash: prev.cozzyCash + amount
      };
    });
  }, []);

  const value = {
    // Data
    products,
    
    // User state
    currentUser,
    isLoggedIn: !!currentUser,
    
    // Cart state
    cart,
    cartTotal: getCartTotal(),
    cartCount: getCartCount(),
    
    // Wishlist state
    wishlist,
    wishlistCount: wishlist.length,
    
    // Orders state
    orders,
    
    // Toast state
    toasts,
    
    // Auth actions
    login,
    register,
    logout,
    updateProfile,
    
    // Cart actions
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    
    // Wishlist actions
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    
    // Order actions
    createOrder,
    getOrderById,
    
    // Cozzy Cash
    addCozzyCash,
    
    // Toast helper
    showToast: toastSystem.notify
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
