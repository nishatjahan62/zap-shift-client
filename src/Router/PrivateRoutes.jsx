import React from "react";
import UseAuth from "../Hooks/UseAuth";
import Loading from "../Pages/Loading/Loading";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = UseAuth();

  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/auth/login"}></Navigate>;
};

export default PrivateRoutes;
