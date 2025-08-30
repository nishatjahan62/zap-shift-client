import React from "react";
import WorkCards from "./WorkCards";
import step1 from "../../assets/Works/BookingPick.png";
import step2 from "../../assets/Works/payment.png";
import step3 from "../../assets/Works/deliveryHub.png";
import step4 from "../../assets/Works/bookingSME.png";
import { HiArrowNarrowRight } from "react-icons/hi";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Booking Pick & Drop",
    image: step1,
    description:
      "Customers book pickup from home or business. Our riders collect packages quickly and efficiently.",
  },
  {
    title: "Cash On Delivery",
    image: step2,
    description:
      "We collect payment at the customer's doorstep and ensure secure transactions back to you.",
  },
  {
    title: "Delivery Hub",
    image: step3,
    description:
      "Packages are routed via our delivery hubs for faster and optimized shipping.",
  },
  {
    title: "Booking SME & Corporate",
    image: step4,
    description:
      "Special accounts for SMEs and corporations with dashboard access and fulfillment tools.",
  },
];

const HowItWorks = () => {
  return (
    <section className="my-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-left text-primary mb-12">
          How it works
        </h2>

        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row sm:items-center sm:justify-between gap-6 relative">
          {cards.map((card, index) => (
            <React.Fragment key={index}>
              {/* Arrows between cards */}
              {index !== 0 && (
                <>
                  {/* Horizontal Arrow (Right) for sm+ screens */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.2 }}
                    className="hidden sm:flex items-center justify-center"
                  >
                    <HiArrowNarrowRight className="text-4xl text-teal-600" />
                  </motion.div>

                  {/* Vertical Arrow (Down) for xs screens */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.2 }}
                    className="flex sm:hidden items-center justify-center my-2"
                  >
                    <HiArrowNarrowRight className="text-4xl text-teal-600 transform rotate-90" />
                  </motion.div>
                </>
              )}

              {/* Card itself */}
              <div className="flex justify-center sm:justify-start flex-1 min-w-[230px]">
                <WorkCards card={card} index={index} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
