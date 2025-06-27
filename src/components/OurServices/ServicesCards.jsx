import React from "react";

const ServicesCards = ({ service }) => {
  const { icon, title, description } = service;

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 text-center shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-[#CAEB66] z-10">
      <div className="text-primary text-4xl mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default ServicesCards;
