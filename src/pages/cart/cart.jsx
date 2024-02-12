// import React, { useContext, useState } from "react";
// import { ShopContext } from "../../context/shop-context";
// import { PRODUCTS } from "../../products";
// import { CartItem } from "./cart-item";
// import { useNavigate } from "react-router-dom";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "./CheckoutForm";

// import "./cart.css";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
// console.log(process.env.REACT_APP_STRIPE_KEY);
// export const Cart = () => {
//   const { cartItems, getTotalCartAmount } = useContext(ShopContext);
//   const totalAmount = getTotalCartAmount();
//   const [isCheckout, setIsCheckout] = useState(false);

//   const navigate = useNavigate();

//   // const handleCheckout = () => {
//   //   // Navigate to the checkout form
//   //   navigate("/checkout");
//   // };

//   return (
//     <div className="cart">
//       <div>
//         <h1>Your Cart Items</h1>
//       </div>
//       <div className="cart">
//         {PRODUCTS.map((product) => {
//           if (cartItems[product.id] !== 0) {
//             return <CartItem key={product.id} data={product} />;
//           }
//           return null; // Add this line
//         })}
//       </div>

//       {totalAmount > 0 ? (
//         <div className="checkout">
//           <p> Subtotal: ${totalAmount} </p>
//           <button onClick={() => navigate("/shop")}> Continue Shopping </button>

//           <button onClick={() => setIsCheckout(true)}>

//             Checkout
//           </button>
//         </div>
//       ) : (
//         <h1>Your Shopping Cart is Empty</h1>
//       )}

//       {isCheckout && (
//         <Elements stripe={stripePromise}>
//           <CheckoutForm
//             setIsCheckout={setIsCheckout}
//           />
//         </Elements>
//       )}
//     </div>
//   );
// };

// import React, { useContext, useState } from "react";
// import { ShopContext } from "../../context/shop-context";
// import { PRODUCTS } from "../../products";
// import { CartItem } from "./cart-item";
// import { useNavigate } from "react-router-dom";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "./CheckoutForm";

// import "./cart.css";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

// export const Cart = () => {
//   const { cartItems, getTotalCartAmount } = useContext(ShopContext);
//   const totalAmount = getTotalCartAmount();
//   const [isCheckout, setIsCheckout] = useState(false);

//   const navigate = useNavigate();

//   return (
//     <div className="cart">
//       <div>
//         <h1>Your Cart Items</h1>
//       </div>
//       <div className="cart">
//         {PRODUCTS.map((product) => {
//           if (cartItems[product.id] !== 0) {
//             return <CartItem key={product.id} data={product} />;
//           }
//           return null; // Add this line
//         })}
//       </div>

//       {totalAmount > 0 ? (
//         <div className="checkout">
//           <p> Subtotal: ${totalAmount} </p>
//           <button onClick={() => navigate("/shop")}> Continue Shopping </button>

//           <button onClick={() => setIsCheckout(true)}> Checkout </button>
//         </div>
//       ) : (
//         <h1>Your Shopping Cart is Empty</h1>
//       )}

//       {isCheckout && (
//         <Elements
//           stripe={stripePromise}
//           options={{ mode: "payment", currency: "usd", amount: totalAmount }}
//         >
//           <CheckoutForm setIsCheckout={setIsCheckout} />
//         </Elements>
//       )}
//     </div>
//   );
// };

import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios"; // Import axios

import "./cart.css";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
// console.log(process.env.REACT_APP_STRIPE_KEY);
// const options={
//             mode: "payment",
//             currency: "usd",
//             amount: totalAmount * 100,
//           }
export const Cart = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const [isCheckout, setIsCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState("");// State to store client secret
  const [stripePromise, setStripePromise] = useState(null);
  const navigate = useNavigate();

  // Load Stripe.js as soon as the component is mounted
  useEffect(() => {
    setStripePromise(loadStripe(process.env.REACT_APP_STRIPE_KEY));
  }, []);

     const appearance = {
       theme: "stripe",
     };
     const options = {
       clientSecret,
       appearance,
     };
  // setStripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  // console.log(process.env.REACT_APP_STRIPE_KEY);
  // const options = {
  //   mode: "payment",
  //   currency: "usd",
  //   amount: totalAmount * 100,
  // };
  // Fetch the client secret from the backend when component mounts
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/create-payment-intent", // Adjust URL as per your backend
          {
            amount: totalAmount * 100, // Convert amount to cents
            currency: "usd",
            // payment_method: "pm_card_visa",
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, [totalAmount]);



  const handleCheckout = () => {
    // Navigate to the checkout form
    setIsCheckout(true);
  };

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem key={product.id} data={product} />;
          }
          return null; // Add this line
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
          <button onClick={() => navigate("/shop")}> Continue Shopping </button>

          <button onClick={handleCheckout}> Checkout </button>
        </div>
      ) : (
        <h1>Your Shopping Cart is Empty</h1>
      )}

      
         {clientSecret &&  (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      
    </div>
  );
};
