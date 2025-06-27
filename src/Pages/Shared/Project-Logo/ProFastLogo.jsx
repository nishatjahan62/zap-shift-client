import React from 'react';
import logo from "../../../assets/images/logo.png";

const ProFastLogo = () => {
  return (
    <div className="flex items-center ">
      <img src={logo} alt="Profast Logo" className="" />
      <span className="text-3xl font-bold text-neutral-800 pt-7 -ml-3">Profast</span>
    </div>
  );
};

export default ProFastLogo;
