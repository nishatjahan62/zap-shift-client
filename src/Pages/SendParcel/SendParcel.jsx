import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SendParcel = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [senderRegion, setSenderRegion] = useState("");
  const [receiverRegion, setReceiverRegion] = useState("");

  const parcelType = watch("type");

  const serviceCenter = useLoaderData();
  const uniqueRegions = useMemo(() => {
    return Array.from(new Set(serviceCenter.map((loc) => loc.region)));
  }, []);

  const getDistricts = (region) => {
    return serviceCenter
      .filter((loc) => loc.region === region)
      .map((loc) => loc.district);
  };

  const generateTrackingId = () => {
    const date = new Date();
    const yyyymmdd = date.toISOString().slice(0, 10).replace(/-/g, ""); // 20250816
    const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `PC-${yyyymmdd}-${random}`;
  };

  const calculateCost = (type, weight, senderDistrict, receiverDistrict) => {
    let withinDistrict = senderDistrict === receiverDistrict;
    let baseCost = type === "document" ? 60 : 110;
    let extraCost = 0;

    if (type === "non-document") {
      const w = Number(weight) || 0;
      if (w > 3) {
        extraCost = (w - 3) * 40;
        if (!withinDistrict) extraCost += 40; // extra outside district
      }
    } else {
      if (!withinDistrict) baseCost = 80; // document outside district
    }

    const total = baseCost + extraCost;
    return { baseCost, extraCost, total, withinDistrict };
  };

  const onSubmit = (data) => {
    const { total, baseCost, extraCost, withinDistrict } = calculateCost(
      data.type,
      data.weight,
      data.senderDistrict,
      data.receiverDistrict
    );

    Swal.fire({
      title: "Parcel Delivery Cost",
      html: `
      <p><strong>Parcel Type:</strong> ${data.type}</p>
      <p><strong>Weight:</strong> ${data.weight || "N/A"} kg</p>
      <p><strong>Route:</strong> ${
        withinDistrict ? "Within District" : "Outside District"
      }</p>
      <p><strong>Base Cost:</strong> ৳${baseCost}</p>
      <p><strong>Extra Charges:</strong> ৳${extraCost}</p>
      <hr>
      <p style="font-size:24px; font-weight:extrabold; color:#03373d;">
        Total Estimated Cost: ৳${total}
      </p>
    `,
      showCancelButton: true,
      confirmButtonText: "Confirm & Proceed to Payment",
      cancelButtonText: "Edit Parcel",
      confirmButtonColor: "#03373d",
      cancelButtonColor: "#caeb66",
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          creation_date: new Date().toISOString(), // standard timestamp
          createdBy: user?.displayName || "Unknown",
          createdByEmail: user?.email || "Unknown",
          totalCost: total,
          status: "Pending",
          paymentStatus: "Unpaid",
          trackingId: generateTrackingId(),
        };
        console.log("Saved Parcel:", parcelData);
        axiosSecure.post("/parcels", parcelData).then((res) => {
          console.log(res.data);
        });

        Swal.fire({
          title: "Success!",
          html: `
          <p>Your parcel has been saved.</p>
          <p style="font-size:18px; font-weight:bold; color:#03373d;">
            Total Paid: ৳${total}
          </p>
        `,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        reset({ senderName: user?.displayName || "" });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-10 rounded-2xl m-10 border border-white shadow-2xl">
      <h1 className="text-3xl font-bold text-primary text-center">
        Send Your Parcel
      </h1>
      <p className="text-center text-secondary mb-6">
        Fast, Secure & Door-to-Door Delivery
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section 1 - Parcel Info */}
        <fieldset className="border-2 border-primary rounded-lg p-4">
          <legend className="text-lg font-semibold text-[#03373d]">
            Parcel Info
          </legend>

          {/* Type */}
          <div>
            <label className="block">Type:</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="document"
                  {...register("type", { required: true })}
                />
                Document
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="non-document"
                  {...register("type", { required: true })}
                />
                Non-document
              </label>
            </div>
            {errors.type && (
              <span className="text-red-500 text-sm">Type is required</span>
            )}
          </div>

          {/* Title & Weight in one row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="block">Title:</label>
              <input
                {...register("title", { required: true })}
                placeholder="Enter parcel title"
                className="w-full border rounded p-2"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">Title is required</span>
              )}
            </div>

            {parcelType === "non-document" && (
              <div>
                <label className="block">Weight (kg):</label>
                <input
                  type="number"
                  step="0.1"
                  {...register("weight")}
                  placeholder="Enter weight in kg"
                  className="w-full border rounded p-2"
                />
              </div>
            )}
          </div>
        </fieldset>

        {/* Section 2 & 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sender Info */}
          <fieldset className="border-2 border-primary rounded-lg p-4 space-y-3">
            <legend className="text-lg font-semibold text-[#03373d]">
              Sender Info
            </legend>

            {/* First 4 fields in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label>Name:</label>
                <input
                  defaultValue={(user && user.displayName) || ""}
                  {...register("senderName", { required: true })}
                  placeholder="Enter sender name"
                  readOnly
                  className="w-full border rounded p-2"
                />
                {errors.senderName && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>
              <div>
                <label>Sender Pickup Wire house:</label>
                <select
                  {...register("senderDistrict", { required: true })}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select Wire house</option>
                  {getDistricts(senderRegion).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.senderDistrict && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>
              <div>
                <label>Contact:</label>
                <input
                  {...register("senderContact", { required: true })}
                  placeholder="Enter contact number"
                  className="w-full border rounded p-2"
                />
                {errors.senderContact && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>
              <div>
                <label>Address:</label>
                <input
                  {...register("senderAddress", { required: true })}
                  placeholder="Enter full address"
                  className="w-full border rounded p-2"
                />
                {errors.senderAddress && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>
            </div>

            <div>
              <label>Select Region:</label>
              <select
                {...register("senderRegion", { required: true })}
                onChange={(e) => setSenderRegion(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.senderRegion && (
                <span className="text-red-500 text-sm">Required</span>
              )}
            </div>

            <div>
              <label>Pickup Instruction:</label>
              <textarea
                {...register("pickupInstruction", { required: true })}
                placeholder="Special instructions for pickup"
                className="w-full border rounded p-2"
              ></textarea>
              {errors.pickupInstruction && (
                <span className="text-red-500 text-sm">Required</span>
              )}
            </div>
          </fieldset>

          {/* Receiver Info */}
          <fieldset className="border-2 border-primary rounded-lg p-4 space-y-3">
            <legend className="text-lg font-semibold text-[#03373d]">
              Receiver Info
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label>Name:</label>
                <input
                  {...register("receiverName", { required: true })}
                  placeholder="Enter receiver name"
                  className="w-full border rounded p-2"
                />
                {errors.receiverName && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>
              <div>
                <label>Contact:</label>
                <input
                  {...register("receiverContact", { required: true })}
                  placeholder="Enter contact number"
                  className="w-full border rounded p-2"
                />
                {errors.receiverContact && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>
              <div>
                <label>Address:</label>
                <input
                  {...register("receiverAddress", { required: true })}
                  placeholder="Enter full address"
                  className="w-full border rounded p-2"
                />
                {errors.receiverAddress && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>
              <div>
                <label> Receiver Delivery Wire house</label>
                <select
                  {...register("receiverDistrict", { required: true })}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select Wire house</option>
                  {getDistricts(receiverRegion).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.receiverDistrict && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>
            </div>

            {/* Region in its own row */}
            <div>
              <label>Select Region</label>
              <select
                {...register("receiverRegion", { required: true })}
                onChange={(e) => setReceiverRegion(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.receiverRegion && (
                <span className="text-red-500 text-sm">Required</span>
              )}
            </div>

            {/* Instruction */}
            <div>
              <label>Receiver Instruction:</label>
              <textarea
                {...register("receiverInstruction", { required: true })}
                placeholder="Special instructions for delivery"
                className="w-full border rounded p-2"
              ></textarea>
              {errors.receiverInstruction && (
                <span className="text-red-500 text-sm">Required</span>
              )}
            </div>
          </fieldset>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-primary text-[#03373d] px-6 py-3 rounded-lg font-semibold block mx-auto hover:bg-[#03373d] hover:text-white transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default SendParcel;
