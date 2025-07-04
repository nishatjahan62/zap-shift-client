import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";

import AuthLayout from "../Layouts/AuthLayout";
import ErrorLayout from "../Layouts/ErrorLayout";
import ErrorPage from "../Pages/Error/ErrorPage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Home from "../Pages/Home/Home";
import AllFaq from "../components/FAQ/AllFaq";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import ForgetPassword from "../Pages/Authentication/ForgetPassword/ForgetPassword";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path:"all-faq",
        element:<AllFaq></AllFaq>
      }
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        element:<Login></Login>,
      },
      {
        path: "register",
        element:<Register></Register>,

      },
        {
        path: "forget-password",
        element:<ForgetPassword></ForgetPassword>,

      },
    ],
  },
  {
    path: "/",
    Component: ErrorLayout,
    children: [
      {
        path: "*",
        element: <ErrorPage></ErrorPage>,
      },
    ],
  },
]);
