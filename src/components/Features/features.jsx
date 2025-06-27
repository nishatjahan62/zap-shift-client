import React from "react";
import image1 from "../../assets/features/packageTracking.png";
import image2 from "../../assets/features/safeDelivery.png";
import image3 from "../../assets/features/CallCenter.png";

const featureData = [
  {
    id: "tracking",
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: image1,
  },
  {
    id: "safe-delivery",
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: image2,
  },
  {
    id: "support",
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: image3,
  },
];

const Features = () => {
  return (
    <section className="lg:my-18 my-15">
      <div className="max-w-6xl mx-auto px-4 grid gap-8">
        <div className="text-4xl font-bold text-center text-primary mb-8">
          Why Choses us
        </div>
        {featureData.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col sm:flex-row items-center bg-white hover:bg-[#CAEB66] shadow-md hover:shadow-xl transition-all duration-300 rounded-xl p-6 transform hover:-translate-y-2"
          >
            {/* Illustration */}
            <div className="w-32 h-32 flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Vertical Dotted Line */}
            <div className="hidden sm:flex h-full border-1 border-dotted border-primary mx-6 mr-10"></div>

            {/* Content */}
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
