// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ShoppingCart } from "phosphor-react";
// import "./navbar.css";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = localStorage.getItem("token");

//   const handleLogout = () => {
//     try {
//       // Clear the user token from local storage
//       localStorage.removeItem("token");

//       // Redirect the user to the login screen
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout Error:", error);
//     }
//   };

//   return (
//     <div className="navbar">
//       <div className="right_div">
//         <div className="logo">
//           <h1>The Style Co.</h1>
//         </div>
//       </div>
//       <div className="left_div">
//         <div className="links">
//           {isLoggedIn ? (
//             <>
//               <Link to="/shop"> Shop </Link>
//               <Link to="/cart">
//                 <ShoppingCart size={32} />
//               </Link>
//               <Link to="/login" onClick={handleLogout}>
//                 Log out
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link to="/"> Sign Up </Link>
//               <Link to="/login"> Login </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";
import { ShopContext } from "../context/shop-context";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const context = useContext(ShopContext);
  const { cartCount } = context;
  console.log(cartCount);
  const handleLogout = () => {
    try {     
      localStorage.removeItem("token");      
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="navbar">
      <div className="right_div">
        <div className="logo">
          <h1>The Style Co.</h1>
        </div>
      </div>
      <div className="left_div">
        <div className="links">
          {isLoggedIn ? (
            <>
              <Link to="/shop"> Shop </Link>
              <Link to="/cart">
                <ShoppingCart size={32} />
                {/* <p>abcd</p> */}
                {cartCount > 0 && (
                  <span className="cart-count">{cartCount}</span>
                )}
                
              </Link>
              <Link to="/login" onClick={handleLogout}>
                Log out
              </Link>
            </>
          ) : (
            <>
              <Link to="/"> Sign Up </Link>
              <Link to="/login"> Login </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
