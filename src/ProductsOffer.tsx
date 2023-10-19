import "./productsOffer.css";
import { Product } from "./App";
import { useContext } from "react";
import { ToBuyContext } from "./App";
import { CheckoutContext } from "./App";
import { useEffect } from "react";

const ProductsOffer = (props: { productsList: Product[] }) => {
  const ctx = useContext(ToBuyContext);
  const ctx_checkout = useContext(CheckoutContext);

  function displayStars(rating: number) {
    const fullStars = Math.floor(rating);
    const starArr = [];

    for (let i = 1; i <= fullStars; i++) {
      starArr.push(1);
    }

    if (rating < 5) {
      const partialStar = rating - fullStars;
      starArr.push(partialStar);
      const emptyStars = 5 - starArr.length;

      for (let i = 1; i <= emptyStars; i++) {
        starArr.push(0);
      }
    }
    return starArr;
  }

  const handleOnclickHandler = (el: Product) => {
    //check whether the item is alreadz in the added list
    const addedcheck = ctx.chosenToBuyList.some((item) => item.id === el.id)
      ? true
      : false;

    if (addedcheck == false) {
      ctx.setChosenToBuyList([...ctx.chosenToBuyList, el]);
      ctx_checkout.setTotalPrice((prevState) => [
        ...prevState,
        { id: el.id, price: el.price },
      ]);
    }
  };

  useEffect(() => {
    console.log(ctx.chosenToBuyList);
    console.log(ctx_checkout.totalPrice);
  });

  return (
    <div className="productsPanel">
      {/*RENDERING PRODUCT CARDS BY ITERATION OF ALL THE JSON FIELDS IN THE LIST OF FETCHED DATA */}
      {props.productsList.map((el, i) => (
        <span
          key={i}
          className="card"
          style={{ width: "95%", backgroundColor: "black", margin: "1%, 1%" }}
        >
          <div className="imgBox" style={{ margin: "auto" }}>
            {/*PRODUCT IMAGE */}
            <img
              src={el.image}
              style={{ width: "100%", height: "8rem", objectFit: "contain" }}
              alt="img not loaded"
              className="product"
            />
          </div>
          <div className="contentBox">
            {/*PRODUCT TITLE */}
            <h3>{el.title}</h3>

            {/*PROCESSING THE PRUDUCTS PRICE TO THE FORMAT X.Y€ */}
            {el.price.toString().includes(".") ? (
              <h2 className="price">
                {el.price.toString().split(".")[0]},
                <small>{el.price.toString().split(".")[1]}</small> €
              </h2>
            ) : (
              <h2 className="price">{el.price.toString()} € </h2>
            )}

            {/*BUY BUTTON (DISPLAY: NONE) */}
            <button className="buy" onClick={() => handleOnclickHandler(el)}>
              Buy Now
            </button>
            <br />

            {/*DISPLAYING THE PRODUCT RATING CONVERTED INTO STARS WITH COLORED BACKGROUND */}
            <span style={{ display: "inline-block" }}>
              {displayStars(el.rating.rate).map((val, i) => {
                return (
                  <span
                    key={i}
                    style={{
                      background: `linear-gradient(90deg, #ff643d ${
                        val * 100
                      }%, #bbbac0 ${val * 100}%)`,
                    }}
                  >
                    ★
                  </span>
                );
              })}
              {/*RENDERING RATING NUMBER */}
              <h3>{el.rating.rate} </h3>
            </span>
          </div>
        </span>
      ))}
    </div>
  );
};

export default ProductsOffer;
