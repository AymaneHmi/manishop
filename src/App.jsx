import { useState, useEffect } from "react";
import { BrowserRouter as Router , Route , Routes, Navigate } from "react-router-dom"

import { Toaster } from "react-hot-toast";
import { CartProvider } from "./providers/cart-provider";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from './pages/static/Home';
import About from './pages/static/About';
import Blogs from './pages/static/Blogs';
import CartPage from './pages/static/CartPage';
import Contact from './pages/static/Contact';

import Product from './pages/variable/Product';
import Products from './pages/variable/Products';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Favorites from './pages/private/Favorites';
import Orders from './pages/private/Orders';
import Profile from './pages/private/Profile';
import useCookie from "./hooks/useCookies";
import { ThemeProvider } from "./providers/theme-provider";
import Blog from "./pages/variable/Blog";

export default function App() {

  const [loading, setLoading] = useState(true)

  const token = useCookie('ms_user_token');

  useEffect(() => {
    setLoading(false);
  },[])

  if(loading) {
    return <h1>Loading ..</h1>
  }

  return (
    <>
      <CartProvider>
        <ThemeProvider>
            <Router>
              <Toaster />
              <Header />
              <Routes>

                {/* auth routes */}
                <Route path="/login" element={token ? <Navigate to={'/'} replace /> : <Login />} />
                <Route path="/register" element={token ? <Navigate to={'/'} replace /> :  <Register />} />

                {/* public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/:category" element={<Products />} />
                <Route path="/products/:productSlug" element={<Product />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:blogSlug" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />

                {/* private routes */}
                <Route path="/favorites" element={token ? <Favorites /> : <Navigate to={'/'} replace />} />
                <Route path="/profile" element={token ? <Profile /> : <Navigate to={'/'} replace />} />
                <Route path="/orders" element={token ? <Orders /> : <Navigate to={'/'} replace />} />

              </Routes>
              <Footer />
            </Router>
        </ThemeProvider>
      </CartProvider>
    </>
  )
}
