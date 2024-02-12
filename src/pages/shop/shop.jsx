import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";
import Footer from "./footer";
import AboutUs from "./aboutUs";
//import { ShopContext } from "../../context/shop-context";

export const Shop = () => {

  
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Let's do some Shopping!</h1>
      </div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>    
      <div>
        <AboutUs />
      </div>
      <div>
        <Footer />
        </div>
    </div>
  );
};
