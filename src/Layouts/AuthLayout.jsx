import React from "react";
import { Outlet, useLocation } from "react-router";
import ProFastLogo from "../Pages/Shared/Project-Logo/ProFastLogo";
import authImage from "../assets/images/authImage.png";
import { motion, AnimatePresence } from "framer-motion";

const AuthLayout = () => {
  const location = useLocation(); // to detect route change

  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row">
      {/* Left side (Logo + Form) */}
      <div className="w-full lg:w-1/2 py-8 px-6 flex flex-col">
        <div className="mb-6">
          <ProFastLogo /> {/* Logo stays static */}
        </div>

        {/* AnimatePresence makes Outlet animate on route change */}
        <div className="flex-grow flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname} // re-mounts when route changes
              initial={{ x: -150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -150, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full flex justify-center"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right side (Image) */}
     
     <motion.div
  key={`authImage-${location.pathname}`}
  initial={{ x: 150, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: 150, opacity: 0 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} // 👈 add delay
  className="w-full lg:w-1/2 bg-[#FAFDF0] flex items-center justify-center p-4"
>
  <img
    src={authImage}
    alt="Authentication Visual"
    className="w-auto h-auto max-w-[90%] max-h-[90%] object-contain"
  />
</motion.div>


    </div>
  );
};

export default AuthLayout;
