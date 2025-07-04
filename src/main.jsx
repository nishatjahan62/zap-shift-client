import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./Router/Routes.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <div className=" font-urbanist  ">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </StrictMode>
);
