import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Navbar  from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";
import CheckoutForm from "./pages/cart/CheckoutForm";
import Login from "./Login";
import SignUp from "./SignUp";
import 'bootstrap/dist/css/bootstrap.min.css';
import Success from "./pages/cart/success";



function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
          <Route path = '/' element = {<SignUp/>} />
          <Route path = '/login' element = {<Login/>} />
          <Route path="/shop" element={<Shop />} />          
          <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path='/success' element = {<Success/>} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
