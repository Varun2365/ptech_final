import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastProvider } from './components/Toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingCart from './components/FloatingCart';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const { pathname } = useLocation();
  const isCart = pathname === '/cart';

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store/:category" element={<CategoryPage />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        {!isCart && <FloatingCart />}
      </div>
    </ToastProvider>
  );
}

export default App;
