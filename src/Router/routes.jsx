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
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoutes from "./PrivateRoutes";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";

import ViewParcelsDetails from "../Pages/ViewParcelsDetails/ViewParcelsDetails";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHIstory/PaymentHistory";
import TrackAPackage from "../Pages/Dashboard/trackAPackage/TrackAPackage";
import Userprofile from "../Pages/Dashboard/UserProfile/Userprofile";

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
        path: "all-faq",
        element: <AllFaq></AllFaq>,
      },
      {
        path: "coverage",
        element: <Coverage></Coverage>,
        loader: () => fetch("../../public/district.json"),
      },
      {
        path: "My-parcel",
        element: (
          <PrivateRoutes>
            <MyParcels></MyParcels>
          </PrivateRoutes>
        ),
      },

      {
        path: "send-parcel",
        element: (
          <PrivateRoutes>
            <SendParcel></SendParcel>
          </PrivateRoutes>
        ),
        loader: () => fetch("../../public/district.json"),
      },
      {
        path: "view-parcels-details/:id",
        element: (
          <PrivateRoutes>
            <ViewParcelsDetails></ViewParcelsDetails>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "forget-password",
        element: <ForgetPassword></ForgetPassword>,
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <h2>Welcome to your dashboard</h2>,
      },
      {
        path: "my-parcels",
        element: (
          <PrivateRoutes>
            <MyParcels />
          </PrivateRoutes>
        ),
      },
      {
        path: "payment/:parcelId",
        element: (
          <PrivateRoutes>
            <Payment />
          </PrivateRoutes>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoutes>
            <PaymentHistory />
          </PrivateRoutes>
        ),
      },
      {
        path: "track-a-package",
        element: (
          <PrivateRoutes>
            <TrackAPackage />
          </PrivateRoutes>
        ),
      },
      {
        path: "track-a-package/:trackingId",
        element: (
          <PrivateRoutes>
            <TrackAPackage />
          </PrivateRoutes>
        ),
      },
      {
        path: "user-profile",
        element: (
          <PrivateRoutes>
            <Userprofile />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
