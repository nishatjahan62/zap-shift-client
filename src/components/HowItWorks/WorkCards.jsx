import React from "react";

const WorkCards = ({ card, showArrow }) => {
  const { image, title, description } = card;

  return (
    <div className="flex flex-col items-start bg-amber-50 shadow-md p-6 rounded-xl min-h-[300px] w-full transition-transform duration-300 hover:-translate-y-1 min-w-[210px] hover:bg-[#CAEB66]">
      {/* Illustration */}
      <img src={image} alt={title} className="w-20 h-20 object-contain mb-4" />

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm">{description}</p>

      {/* Right Arrow */}
      {showArrow && (
        <div className="text-3xl text-blue-600 absolute -right-6 top-1/2 transform -translate-y-1/2 hidden sm:block">
          →
        </div>
      )}
    </div>
  );
};

export default WorkCards;
