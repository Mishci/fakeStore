import React, { useEffect, useState, createContext } from "react";
import "./index.css";
import "./app.css";
import ProductsOffer from "./ProductsOffer";
import ShoppingCart from "./ShoppingCart";

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: { rate: number; count: number };
}

//MAIN CONETX //
interface Context {
  chosenToBuyList: Product[];
  setChosenToBuyList: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const ToBuyContext = createContext<Context>({
  chosenToBuyList: [],
  setChosenToBuyList: () => {},
});

//CHECKOUT CONTEXT
interface CheckoutContext {
  totalPrice: number[];
  setTotalPrice: React.Dispatch<React.SetStateAction<number[]>>;
}

export const CheckoutContext = createContext<CheckoutContext>({
  totalPrice: [],
  setTotalPrice: () => {},
});

function App() {
  const [chosenToBuyList, setChosenToBuyList] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number[]>([0]);
  const [productsList, setProductsList] = useState<Product[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const getProducts = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=20",
          { signal: controller.signal }
        );
        if (!response.ok)
          throw new Error("Something went wront with our server!");

        const products: Product[] = await response.json();

        setProductsList([...productsList, ...products]);
        console.log(productsList);
        console.log("break");
        console.log(products);
      } catch (error) {
        console.error("Request failed because of error: \n");
        console.error(error);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="grid">
      <ToBuyContext.Provider value={{ chosenToBuyList, setChosenToBuyList }}>
        <CheckoutContext.Provider value={{ totalPrice, setTotalPrice }}>
          <ProductsOffer productsList={productsList} />
          <ShoppingCart />
        </CheckoutContext.Provider>
      </ToBuyContext.Provider>
    </div>
  );
}

export default App;
