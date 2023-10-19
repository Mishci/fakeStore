import React, { useContext } from "react";
import { CheckoutContext } from "./App";

const Checkout = () => {
  const cxtTotalPrice = useContext(CheckoutContext);

  const calculate = () => {
    if (cxtTotalPrice.totalPrice.length > 0) {
      const tocount = cxtTotalPrice.totalPrice.map((item) => item.price);
      return tocount.reduce((x, y) => x + y);
    } else return 0;
  };

  const tax = () => {
    let count: number = calculate();
    count = (count / 100) * 5;
    return count;
  };

  const grandtotal = () => {
    const count = calculate() + tax() + 15;
    return count;
  };

  return (
    <>
      <div className="totals">
        <div className="totals-item">
          <label>Subtotal</label>
          <div className="totals-value" id="cart-subtotal">
            {calculate().toFixed(2)}
          </div>
        </div>
        <div className="totals-item">
          <label>Tax</label>
          <div className="totals-value" id="cart-tax">
            {tax().toFixed(2)}
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
            {grandtotal().toFixed(2)}
          </div>
        </div>
      </div>

      <button className="checkout">Checkout</button>
    </>
  );
};

export default Checkout;
