import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./Router/Routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="max-w-7xl lg:mx-auto font-urbanist min-w-sm mx-7 ">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
