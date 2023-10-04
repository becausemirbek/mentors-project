import React, { createContext, useReducer, useState } from "react";
import axios from "axios";
import { ActionI } from "./helper";

export const productsContext = createContext<any>(null);

const INIT_STATE = {
  products: [],
  pages: 0,
  categories: [],
  productDetails: null,
};

const API = "http://34.173.115.25/api/v1";

function reducer(state = INIT_STATE, action: ActionI) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload.results,
        //   pages: Math.ceil(action.payload.count / 5),
      };
    case "GET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "GET_ONE_PRODUCT":
      return { ...state, oneProduct: action.payload };
    default:
      return state;
  }
}

const ProductsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getCategories = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens") as any);
      const Auth = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization: Auth,
        },
      };
      const res = await axios(`${API}/category/list/`, config);
      console.log(res);
    } catch (error) {}
  };

  return (
    <productsContext.Provider
      value={{
        products: state.products,
        categories: state.categories,
        productDetails: state.productDetails,
        getCategories,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContextProvider;
