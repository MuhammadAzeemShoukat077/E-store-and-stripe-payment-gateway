// import React, { useState, useContext } from "react";
// import {
//   // CardElement,
//   PaymentElement, useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { ShopContext } from "../../context/shop-context";
// import { useNavigate } from "react-router-dom";
// import "./checkout.css";

// const CheckoutForm = ({ items, setIsCheckout, clientSecret }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);

//   // Get the total amount from the cart
//   const { getTotalCartAmount, checkout } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const handlePayment = async (event) => {
//     event.preventDefault();

//     const totalAmount = getTotalCartAmount();
//     const totalAmountInDollars = Math.round(totalAmount * 100);

//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/create-payment-intent",
//         {
//           amount: totalAmountInDollars,
//           currency: "usd",
//         }
//       );

//       const clientSecret = response.data.clientSecret;

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(PaymentElement),
//         },
//       });

//       if (result.error) {
//         console.error(result.error.message);
//         setError(result.error.message);
//         setSuccessMessage(null);
//       } else {
//         setIsCheckout(false);
//         setError(null);
//         checkout();
//         setSuccessMessage("Payment successful!");

//         setTimeout(() => {
//           navigate("/shop");
//         }, 3000);

//         alert("Payment successful!");
//       }
//     } catch (error) {
//       console.error("An error occurred while processing the payment:", error);
//       setError(
//         "An error occurred while processing the payment. Please try again."
//       );
//       setSuccessMessage(null);
//     }
//   };

//   return (
//     <div className="card-element">
//       <h1>Checkout</h1>
//       <form onSubmit={handlePayment}>
//         <PaymentElement />
//         {error && <div style={{ color: "red" }}>{error}</div>}
//         {successMessage && (
//           <div style={{ color: "green" }}>{successMessage}</div>
//         )}
//         <button type="submit">Pay Now</button>
//       </form>
//     </div>
//   );
// };

// export default CheckoutForm;

// import React, { useState, useContext } from "react";
// import {
//   PaymentElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { ShopContext } from "../../context/shop-context";
// import { useNavigate } from "react-router-dom";
// import "./checkout.css";

// const CheckoutForm = ({ cartItems, setIsCheckout }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const navigate = useNavigate();
//   const { getTotalCartAmount, checkout } = useContext(ShopContext);

//   const handlePayment = async (event) => {
//     event.preventDefault();

//     const totalAmount = getTotalCartAmount();
//     const totalAmountInDollars = Math.round(totalAmount * 100);

//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/create-payment-intent",
//         {
//           amount: totalAmountInDollars,
//           currency: "usd",
//         }
//       );

//       const clientSecret = response.data.clientSecret;

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(PaymentElement),
//         },
//       });

//       if (result.error) {
//         console.error(result.error.message);
//         setError(result.error.message);
//         setSuccessMessage(null);
//       } else {
//         setIsCheckout(false);
//         setError(null);
//         checkout();
//         setSuccessMessage("Payment successful!");

//         setTimeout(() => {
//           navigate("/shop");
//         }, 3000);

//         alert("Payment successful!");
//       }
//     } catch (error) {
//       console.error("An error occurred while processing the payment:", error);
//       setError(
//         "An error occurred while processing the payment. Please try again."
//       );
//       setSuccessMessage(null);
//     }
//   };

//   return (
//     <div className="card-element">
//       <h1>Checkout</h1>
//       <form onSubmit={handlePayment}>
//         <PaymentElement />
//         {error && <div style={{ color: "red" }}>{error}</div>}
//         {successMessage && (
//           <div style={{ color: "green" }}>{successMessage}</div>
//         )}
//         <button type="submit">Pay Now</button>
//       </form>
//     </div>
//   );
// };

// export default CheckoutForm;
// import React, { useState } from "react";
// import {
//   useStripe,
//   useElements,
//   PaymentElement,
 
 
// } from "@stripe/react-stripe-js";

// const CheckoutForm = ({ clientSecret, setIsCheckout }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);

//   const handlePayment = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     try {
//       console.log(clientSecret);
//       console.log(elements.getElement(PaymentElement));
//       const result = await stripe.confirmPayment(clientSecret, {
//         elements,
//         payment_method: {
//           card: elements.getElement(PaymentElement),
//         },
//       });

//       if (result.error) {
//         console.error(result.error.message);
//         setError(result.error.message);
//         setSuccessMessage(null);
//       } else {
//         setIsCheckout(false);
//         setError(null);
//         setSuccessMessage("Payment successful!");
//       }
//     } catch (error) {
//       console.error("An error occurred while processing the payment:", error);
//       setError(
//         "An error occurred while processing the payment. Please try again."
//       );
//       setSuccessMessage(null);
//     }
//   };

//   return (
//     <div className="card-element">
//       <h1>Checkout</h1>
//       <form onSubmit={handlePayment}>
//         <PaymentElement />
//         {error && <div style={{ color: "red" }}>{error}</div>}
//         {successMessage && (
//           <div style={{ color: "green" }}>{successMessage}</div>
//         )}
//         <button type="submit">Pay Now</button>
//       </form>
//     </div>
//   );
// };

// export default CheckoutForm;


import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm({ clientSecret, setIsCheckout }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/success",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}