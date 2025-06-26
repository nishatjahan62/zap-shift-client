import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

import logo1 from "../../assets/brands/amazon.png";
import logo2 from "../../assets/brands/start-people 1.png";
import logo3 from "../../assets/brands/casio.png";
import logo4 from "../../assets/brands/moonstar.png";
import logo5 from "../../assets/brands/randstad.png";
import logo6 from "../../assets/brands/start.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6];

const TrustedCompanies = () => {
  return (
    <section className="lg:my-18 bg-amber-50  rounded-2xl  py-8">
      {/* Heading */}
      <div className="max-w-6xl  mx-auto text-center mb-10 px-4">
        <h2 className="text-3xl font-bold text-blue-600">
          We’ve helped thousands of sales teams.
        </h2>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        modules={[Autoplay, FreeMode]}
        className="flex justify-center items-center " 
      >
        {logos.map((logo, index) => (
          <SwiperSlide key={index} className="flex justify-center px-15">
            <img
              src={logo}
              alt={`Logo ${index + 1}`}
              className="w-[100px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TrustedCompanies;
