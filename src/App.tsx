import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ProductList } from './pages/ProductList';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Prescription } from './pages/Prescription';
import { Wishlist } from './pages/Wishlist';
import { BMI } from './pages/BMI';
import { Reminders } from './pages/Reminders';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="medicines" element={<ProductList />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="prescription" element={<Prescription />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="bmi" element={<BMI />} />
          <Route path="reminders" element={<Reminders />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
