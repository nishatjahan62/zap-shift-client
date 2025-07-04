import React from "react";
import logo from "../../../assets/images/logo.png";
import { Link } from "react-router";

const ProFastLogo = () => {
  return (
    <Link to={"/"}>
      <div className="flex items-center ">
        <img src={logo} alt="Profast Logo" className="" />
        <span className="text-3xl font-bold text-neutral-800 pt-7 -ml-3">
          Profast
        </span>
      </div>
    </Link>
  );
};

export default ProFastLogo;
