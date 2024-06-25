import { BrowserRouter as Router , Route , Routes, Navigate } from "react-router-dom"

import { Toaster } from "react-hot-toast";

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

import Orders from './pages/private/Orders';
import Profile from './pages/private/Profile';
import Blog from "./pages/variable/Blog";

import useUser from "./hooks/use-user";
import Favorites from "./pages/static/Favorites";
import EmptyState from "./components/ui/empty-state";
import Loader from "./components/ui/loader";


export default function App() {

  const {user, isLoadingUser} = useUser();

  if(isLoadingUser) {
    return <div className="flex flex-col items-center mt-10">
      <Loader
        isLoading
        size={30}
      />
    </div>
  }

  return (
    <Router>
      <Toaster />
      <Header />
      <Routes>

        <Route path="/login" element={user?.id ? <Navigate to={'/'} replace /> : <Login />} />
        <Route path="/register" element={user?.id ? <Navigate to={'/'} replace /> :  <Register />} />

        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productSlug" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:blogSlug" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/favorites" element={<Favorites />} />

        <Route path="/profile" element={user?.id ? <Profile /> : <EmptyState title={'Unauthorized!'} subtitle={'Log in or Register To access to this page.'} />} />
        <Route path="/orders" element={user?.id ? <Orders /> : <EmptyState title={'Unauthorized!'} subtitle={'Log in or Register To access to this page.'} />} />

      </Routes>
      <Footer />
    </Router>
  )
}