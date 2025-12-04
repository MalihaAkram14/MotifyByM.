import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import CategoryPage from "./pages/CategoryPage";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Cart from "./pages/Cart";



function App() {


  return (
    
    <BrowserRouter>
      <CartProvider>
      <Navbar />
     <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/category/:categoryName" element={<CategoryPage />} />
  <Route path="/product/:id" element={<ProductDetails />} />
    <Route path="/cart" element={<Cart />} /> {/* ← Cart route */}
</Routes>
 
</CartProvider>
    </BrowserRouter>
   
  )
}
// /products?search=bc&category=ttt

export default App
