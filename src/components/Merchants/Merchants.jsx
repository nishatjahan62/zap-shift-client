import React from "react";
import merchants from "../../assets/images/location-merchant.png";

const Merchants = () => {
  return (
    <section className="bg-[url('assets/images/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] rounded-2xl my-12 lg:my-18 py-10 px-8 lg:mx-20">
      <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl mx-auto px-4">
        {/* 🖼️ Illustration */}
        <img
          src={merchants}
          className="max-w-sm w-full"
          alt="Delivery Illustration"
        />

        {/* 📝 Text Block */}
        <div className="text-left lg:pr-10">
          <h1 className="lg:text-4xl sm:text-3xl text-2xl font-bold text-white mb-5">
            Merchant and Customer Satisfaction is Our First Priority.
          </h1>

          <p className="mb-8 text-gray-200 text-base max-w-xl">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao Courier delivers your
            parcels to every corner of Bangladesh, right on time.
          </p>

          {/* 🎯 Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="btn btn-secondary bg-primary text-black rounded-3xl px-5 ">
              Earn with Profast Courier
            </button>
            <button className="btn btn-outline btn-accent text-primary border-white hover:bg-primary hover:text-black  rounded-3xl px-5">
              Earn with Profast Courier
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Merchants;
