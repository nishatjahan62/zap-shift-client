import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import ErrorLayout from "../Layouts/ErrorLayout";
import ErrorPage from "../Pages/Error/ErrorPage";
import AboutUs from "../Pages/AboutUs/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
   Component:RootLayout,
   children:[
    {
        index:true,
        path:"/",
        element:<Home></Home>
    },
    {
        path:"about-us",
        element:<AboutUs></AboutUs>,
    }
   ]
  },
  {
    path:"auth",
    Component:AuthLayout,
    children:[
        {
            path:"auth/login",
          
        },
         {
            path:"auth/register",
          
        }
    ]
  },
  {
    path:"/",
    Component:ErrorLayout,
    children:[
        {
            path:"*",
            element:<ErrorPage></ErrorPage>
        }
    ]
  }
]);