import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Products from "./pages/Products";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFoundPage from "./pages/NotFoundPage";

const PrivateRoutes = () => {
  const user = false;

  return user ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/sign-in" />
  );
};

const Routing = () => {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route element={<PrivateRoutes />}>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Products />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
      </Route>
    </Routes>
  );
};

export default Routing;
