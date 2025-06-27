import React from "react";
import { Outlet } from "react-router";
import ProFastLogo from "../Pages/Shared/Project-Logo/ProFastLogo";
import authImage from "../assets/images/authImage.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row">
      <div className="w-full lg:w-1/2 py-8 px-6 flex flex-col">
        <div className="mb-6">
          <ProFastLogo />
        </div>

        <div className="flex-grow flex items-center justify-center">
          <Outlet />
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-[#FAFDF0] flex items-center justify-center p-4">
        <img
          src={authImage}
          alt="Authentication Visual"
          className="w-auto h-auto max-w-[90%] max-h-[90%] object-contain"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
