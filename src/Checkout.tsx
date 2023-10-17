import React, { useContext } from "react";
import { CheckoutContext } from "./App";

const Checkout = () => {
  const cxtTotalPrice = useContext(CheckoutContext);

  //   useEffect(() => {
  //     setsummedprice(cxtTotalPrice.totalPrice.reduce((x, y) => x + y));
  //     console.log(`summed price = ${summedPrice}`);
  //   }, [cxtTotalPrice.totalPrice]);

  return (
    <>
      <div className="totals">
        <div className="totals-item">
          <label>Subtotal</label>
          <div className="totals-value" id="cart-subtotal">
            {cxtTotalPrice.totalPrice.reduce((x, y) => x + y)}
          </div>
        </div>
        <div className="totals-item">
          <label>Tax</label>
          <div className="totals-value" id="cart-tax">
            {(
              (cxtTotalPrice.totalPrice.reduce((x, y) => x + y) / 100) *
              5
            ).toFixed(2)}
          </div>
        </div>
        <div className="totals-item">
          <label>Shipping</label>
          <div className="totals-value" id="cart-shipping">
            15.00
          </div>
        </div>
        <div className="totals-item totals-item-total">
          <label>Grand Total</label>
          <div className="totals-value" id="cart-total">
            {(
              cxtTotalPrice.totalPrice.reduce((x, y) => x + y) +
              (cxtTotalPrice.totalPrice.reduce((x, y) => x + y) / 100) * 5 +
              15.0
            ).toFixed(2)}
          </div>
        </div>
      </div>

      <button className="checkout">Checkout</button>
    </>
  );
};

export default Checkout;
