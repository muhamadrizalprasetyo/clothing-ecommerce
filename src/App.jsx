import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Footer from './components/Footer';
import FloatingWA from './components/FloatingWA';
import CustomCursor from './components/CustomCursor';

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
import Gallery from './pages/Gallery';

// Routes configuration:
// - Public: /, /catalog (browse only), /login, /register
// - Protected: /product/:id, /cart, /checkout, /wishlist, /orders, /account, /receipt/:orderId, /about, /contact

function App() {
  return (
    <StoreProvider>
      <Router basename="/clothing-ecommerce/">
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
              <Route path="/gallery" element={<Gallery />} />

              {/* Protected Routes - Authentication Required */}
              <Route
                path="/product/:id"
                element={
                  <ProtectedRoute>
                    <ProductDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contact"
                element={
                  <ProtectedRoute>
                    <Contact />
                  </ProtectedRoute>
                }
              />

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
          <FloatingWA />
          <CustomCursor />
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
