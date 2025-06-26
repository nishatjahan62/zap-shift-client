
import React from "react";
import { motion } from "framer-motion";

const WorkCards = ({ card, index }) => {
  const { image, title, description } = card;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.3, duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-start bg-amber-50 shadow-md p-6 rounded-xl h-full min-h-[300px] w-full transition-transform duration-300 hover:-translate-y-1 hover:bg-[#CAEB66]"
    >
      <img src={image} alt={title} className="w-20 h-20 object-contain mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
};

export default WorkCards;
