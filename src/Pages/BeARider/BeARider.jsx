import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";
import { useLoaderData } from "react-router";
import riderImg from "../../assets/images/agent-pending.png"; // <- your image
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const BeARider = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm();

  const [region, setRegion] = useState("");

  const serviceCenter = useLoaderData();
  const uniqueRegions = useMemo(() => {
    return Array.from(new Set(serviceCenter.map((loc) => loc.region)));
  }, [serviceCenter]);

  const getDistricts = (region) => {
    return serviceCenter
      .filter((loc) => loc.region === region)
      .map((loc) => loc.district);
  };

  const onSubmit = (data) => {
    const riderData = {
      ...data,
      appliedBy: user?.displayName || "Unknown",
      email: user?.email || "Unknown",
      status: "Pending",
      appliedOn: new Date().toISOString(),
    };

    axiosSecure.post("/riders", riderData).then((res) => {
      if (res.data.insertedId)
        console.log(res.data); {
        Swal.fire({
          title: "Application Submitted!",
          text: "Your application to be a rider has been received.",
          icon: "success",
          confirmButtonColor: "#03373d",
        });
        reset();
        
      }
    });
  };

  return (
    <div className="bg-gray-100 py-16 my-15 px-4">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary">Be a Rider</h1>
        <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
          Join our trusted rider network and earn by delivering parcels safely.
          Apply now with your basic details and vehicle information.
        </p>
      </div>

      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-4  flex items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Rider Application Form
            </h2>

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Your Name</label>
                <input
                  defaultValue={user?.displayName || ""}
                  {...register("name", { required: true })}
                  className="w-full border rounded p-2"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Your Email</label>
                <input
                  defaultValue={user?.email || ""}
                  {...register("email", { required: true })}
                  className="w-full border rounded p-2"
                  readOnly
                />
              </div>
            </div>

            {/* Contact + Region */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">
                  Your Contact Number
                </label>
                <input
                  {...register("contact", { required: true })}
                  placeholder="Enter contact number"
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Your Region</label>
                <select
                  {...register("region", { required: true })}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select Region</option>
                  {uniqueRegions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Age + NID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Your Age</label>
                <input
                  type="number"
                  {...register("age", { required: true })}
                  placeholder="Enter your age"
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Your NID Number
                </label>
                <input
                  {...register("nid", { required: true })}
                  placeholder="Enter NID number"
                  className="w-full border rounded p-2"
                />
              </div>
            </div>

            {/* Bike + License */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">
                  Your Bike Model
                </label>
                <input
                  {...register("bikeModel", { required: true })}
                  placeholder="Enter bike model"
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Your License Number
                </label>
                <input
                  {...register("license", { required: true })}
                  placeholder="Enter license number"
                  className="w-full border rounded p-2"
                />
              </div>
            </div>

            {/* Warehouse (District) - Last Row */}
            <div>
              <label className="block text-sm font-medium">
                Your Warehouse (District)
              </label>
              <select
                {...register("district", { required: true })}
                className="w-full border rounded p-2"
              >
                <option value="">Select District</option>
                {getDistricts(region).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-[#03373d] transition"
            >
              Apply Now
            </button>
          </form>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50">
          <img
            src={riderImg}
            alt="Rider"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default BeARider;
