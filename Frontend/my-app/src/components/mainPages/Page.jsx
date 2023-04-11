import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "./page.sass";
import { GlobalState } from "../../GlobalState";
import Products from "./products/Products";

const Page = () => {
  // const state = useContext(GlobalState);
  // console.log(state)
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      axios
        .get("http://localhost:5000/api/products")
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getProducts();
  }, []);

  console.log(products);
  return (
    <>
      <Products />
    </>
  );
};

export default Page;
