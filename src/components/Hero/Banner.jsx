import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import banner01 from "../../assets/banner/banner1.png";
import banner02 from "../../assets/banner/banner2.png";
import banner03 from "../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <div className="lg:my-18 my-12" >
      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
        <div>
          <img src={banner01} />
        </div>
        <div>
          <img src={banner02} />
        </div>
        <div>
          <img src={banner03} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
