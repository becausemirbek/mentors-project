import React, { createContext, useReducer, useState } from "react";
import axios from "axios";
import { ActionI } from "./helper";
import { ProductI } from "../pages/CreateProduct";
import { toast } from "react-toastify";

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
      const { data } = await axios(`${API}/category/list/`, config);
      dispatch({
        type: "GET_CATEGORIES",
        payload: data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async (search: string, category: string) => {
    try {
      const { data } = await axios(`${API}/products?page=3`);
      console.log(data, "data");
      dispatch({
        type: "GET_PRODUCTS",
        payload: data,
      });
    } catch (error) {
      console.log(error, "err");
    }
  };

  const createProduct = async (
    product: ProductI,
    navigate: (val: string) => void
  ) => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens") as string);

      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const {
        data: { title },
      } = await axios.post(`${API}/products/`, product, config);
      toast.success(`Product ${title} created`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <productsContext.Provider
      value={{
        products: state.products,
        categories: state.categories,
        productDetails: state.productDetails,
        getCategories,
        getProducts,
        createProduct,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContextProvider;
