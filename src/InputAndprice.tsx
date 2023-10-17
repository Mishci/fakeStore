import React, { useState, ChangeEvent, useContext } from "react";
import { Product } from "./App";
import "./productsOffer.css";
import { CheckoutContext } from "./App";

interface AccepterProps {
  el: Product;
  i: number;
}

export const InputAndPrice: React.FC<AccepterProps> = ({ el, i }) => {
  const checkoutContext = useContext(CheckoutContext);
  const [inputValue, setInputValue] = useState<string>("1");

  const handlepriceCalc = (i: number) => {
    const updatedTotalPrice: Array<number> = [...checkoutContext.totalPrice];
    // if (updatedTotalPrice.length > 0) {
    updatedTotalPrice[i] = el.price + el.price * parseInt(inputValue);
    // }

    console.log(updatedTotalPrice);
    checkoutContext.setTotalPrice(updatedTotalPrice);
    return updatedTotalPrice;
  };

  // Ccontroller of the onclick change of number of products
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 👇 Store the input value to local state
    setInputValue(e.target.value);
  };

  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    handleInputChange(e);
    handlepriceCalc(i);
    {
      console.log(`totalprice: ${checkoutContext.totalPrice}`);
    }
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
          onChange={(e) => onchangeHandler(e, i)}
        />
      </td>

      {/*rendering product removal button */}
      <td
        className="product-removal"
        style={{ width: "10%", marginLeft: "5%" }}
      >
        <button className="remove-product">Remove</button>
      </td>
      {/*rendering total item price */}
      <td className="product-line-price" style={{ width: "10%" }}>
        {el.price * parseInt(inputValue)}
      </td>
    </tr>
  );
};
