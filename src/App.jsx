import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Receipt from './pages/Receipt';
import EditAccount from './pages/EditAccount';
import Orders from './pages/Orders';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useStore();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Route wrapper (redirects logged-in users)
const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useStore();
  
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <Navbar />
          <Toast />
          
          <main className="flex-1 transition-all duration-300">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } 
              />
              
              <Route 
                path="/register" 
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                } 
              />
              
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Protected Routes */}
              <Route 
                path="/wishlist" 
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/cart" 
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/receipt/:orderId" 
                element={
                  <ProtectedRoute>
                    <Receipt />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/account" 
                element={
                  <ProtectedRoute>
                    <EditAccount />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/orders" 
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } 
              />
              
              {/* 404 Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
