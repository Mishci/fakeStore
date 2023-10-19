import React, { useState, ChangeEvent, useContext, useEffect } from "react";
import { Product } from "./App";
import "./productsOffer.css";
import { CheckoutContext } from "./App";
import { ToBuyContext } from "./App";

interface AccepterProps {
  el: Product;
  i: number;
}

export const InputAndPrice: React.FC<AccepterProps> = ({ el, i }) => {
  const checkoutContext = useContext(CheckoutContext);
  const toBuyCOntext = useContext(ToBuyContext);
  const [inputValue, setInputValue] = useState<string>("1");

  useEffect(() => {
    console.log(
      `updated total price = ${checkoutContext.totalPrice.map(
        (item) => item.price
      )}`
    );
  });

  //handler function to recalculate the single item price total and update its value in the chosen list or return item as it is
  const handlepriceCalc = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(`e.target.value: ${e.target.value}`);
    console.log(`totalPrice before change = ${checkoutContext.totalPrice}`);

    const newState = checkoutContext.totalPrice.map((item) => {
      if (item.id === el.id) {
        console.log("item identified");
        return { ...item, price: el.price * parseInt(e.target.value) };
      }
      return item;
    });

    checkoutContext.setTotalPrice(newState);
  };

  // Ccontroller of the onclick change of number of exemplars ot the same product
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  //cummulative function tracking the exemplars + recalculate the item total price
  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    handlepriceCalc(e);
  };

  const removeHandler = () => {
    toBuyCOntext.setChosenToBuyList((current) =>
      current.filter((item) => item.id !== el.id)
    );
    checkoutContext.setTotalPrice((current) =>
      current.filter((item) => item.id !== el.id)
    );
  };

  return (
    <tr className="product" key={i}>
      {/*rendering the image */}
      <td className="product-image" style={{ width: "10%" }}>
        <img
          src={el.image}
          style={{
            width: "100%",
            objectFit: "contain",
          }}
          alt="img not loaded"
        />
      </td>

      {/* rendering title and description */}
      <td
        className="product-details product-title"
        style={{
          width: "40%",
          marginLeft: "5%",
          paddingRight: "5%",
          textAlign: "justify",
          textJustify: "inter-word",
        }}
      >
        <span
          style={{
            marginLeft: "5%",
            paddingRight: "15%",
          }}
        >
          {el.title}
        </span>
      </td>
      {/* <p className="product-description">{el.description}</p> */}

      {/* rendering product price */}
      <td
        className="product-price"
        style={{ width: "10%", alignContent: "center" }}
      >
        {el.price}
      </td>
      <td className="product-quantity" style={{ width: "10%" }}>
        <input
          type="number"
          id={i.toString()}
          key={i}
          value={inputValue}
          min="1"
          style={{ width: "100%" }}
          onChange={(e) => onchangeHandler(e)}
        />
      </td>

      {/*rendering product removal button */}
      <td
        className="product-removal"
        style={{ width: "10%", marginLeft: "5%" }}
      >
        <button className="remove-product" onClick={removeHandler}>
          Remove
        </button>
      </td>
      {/*rendering total item price */}
      <td className="product-line-price" style={{ width: "10%" }}>
        {el.price * parseInt(inputValue)}
      </td>
    </tr>
  );
};
