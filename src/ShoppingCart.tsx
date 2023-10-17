import React, { useContext } from "react";
import "./shoppingCart.css";
import "./productsOffer.css";
import "./App.css";
import { InputAndPrice } from "./InputAndprice";
import Checkout from "./Checkout";
// import { Product } from "./App";
import { ToBuyContext } from "./App";

const ShoppingCart = () => {
  const ctx = useContext(ToBuyContext);

  /* SHOPPING CART RENDER */
  return (
    <div className="cartGridPosition">
      <table
        className="shopping-cart"
        style={{ tableLayout: "fixed", width: "100%" }}
      >
        <tbody>
          <tr className="column-labels" style={{ height: "3rem" }}>
            <th className="product-image" style={{ width: "10%" }}>
              Image
            </th>
            <th
              className="product-details"
              style={{ width: "40%", marginLeft: "5%" }}
            >
              Product
            </th>
            <th className="product-price" style={{ width: "10%" }}>
              Price
            </th>
            <th className="product-quantity" style={{ width: "10%" }}>
              Quantity
            </th>
            <th
              className="product-removal"
              style={{ width: "10%", marginLeft: "5%" }}
            >
              Remove
            </th>
            <th className="product-line-price" style={{ width: "10%" }}>
              Total
            </th>
          </tr>

          {ctx.chosenToBuyList.map((el, i) => (
            <InputAndPrice el={el} i={i} key={i} />
          ))}
        </tbody>
      </table>
      <Checkout />
    </div>
  );
};

export default ShoppingCart;
