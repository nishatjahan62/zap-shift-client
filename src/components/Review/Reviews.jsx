import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteLeft } from "react-icons/fa";
import Slider from "react-slick";

const reviews = [
  {
    id: 1,
    name: "Awlad Hossin",
    position: "Senior Product Designer",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine. Encouraging you to maintain proper posture throughout the day.",
  },
  {
    id: 2,
    name: "Rasel Ahamed",
    position: "CTO",
    text: "Delivery was on time, and the support team handled my issue quickly. Excellent customer care!",
  },
  {
    id: 3,
    name: "Nasir Uddin",
    position: "CEO",
    text: "Highly impressed with the smooth tracking system and transparent updates. 5 stars!",
  },
  {
    id: 4,
    name: "Tamanna Rahman",
    position: "Merchant Partner",
    text: "Working with this platform has made logistics seamless and fast. My customers are satisfied too!",
  },
  {
    id: 5,
    name: "Zahidul Islam",
    position: "Startup Owner",
    text: "They are trustworthy and provide great value. The tracking and delivery system is top-notch.",
  },
  {
    id: 6,
    name: "Farzana Ahmed",
    position: "Online Seller",
    text: "Prompt delivery and professional service. It helped me grow my online business significantly.",
  },
  {
    id: 7,
    name: "Naeem Chowdhury",
    position: "Fashion Retailer",
    text: "Loved how transparent the service is. My packages always arrive safely and on time.",
  },
];

const CustomerReviews = () => {
  const [centerIndex, setCenterIndex] = useState(0);

  const settings = {
    dots: true,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    beforeChange: (current, next) => {
      setCenterIndex(next);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-base-200 py-16 lg:my-20 sm:my-12 rounded-3xl">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-neutral mb-4">
          What our customers are saying
        </h2>
        <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>

        <Slider {...settings}>
          {reviews.map((review, index) => {
            const isActive = index === centerIndex;
            return (
              <div key={review.id} className="px-4">
                <div
                  className={`rounded-2xl shadow-md p-6 text-left relative min-h-[300px] transition-all duration-500 mx-2 ${
                    isActive
                      ? "bg-white opacity-100 scale-105 z-10"
                      : "bg-white opacity-40 scale-95"
                  }`}
                >
                  {/* Quote Icon */}
                  <FaQuoteLeft className="text-4xl text-primary mb-4" />

                  {/* Review */}
                  <p className="text-gray-700 text-sm mb-6">{review.text}</p>

                  {/* Dotted Line */}
                  <hr className="border-dotted border-t-2 border-gray-300 mb-4" />

                  {/* Reviewer Info */}
                  <div className="flex items-center gap-4">
                    {/* Circle Placeholder */}
                    <div className="w-12 h-12 rounded-full bg-primary"></div>
                    <div>
                      <h4 className="font-bold text-neutral">{review.name}</h4>
                      <p className="text-sm text-gray-500">
                        {review.position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default CustomerReviews;

