import React from "react";
import { useParams, Link, Links } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ViewParcelsDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // Fetch parcel details
  const { data: parcel, isLoading, isError } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
 
  });

  if (isLoading) return <p className="text-center text-lg">Loading parcel details...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load parcel details.</p>;


  const {
    title,
    type,
    status,
    trackingId,
    createdBy,
    createdByEmail,
    creation_date,
    senderName,
    senderContact,
    senderAddress,
    senderDistrict,
    senderRegion,
    pickupInstruction,
    receiverName,
    receiverContact,
    receiverAddress,
    receiverDistrict,
    receiverRegion,
    receiverInstruction,
    totalCost,
    paymentStatus,
  } = parcel || {};

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-2xl border border-white rounded-2xl p-6 lg:p-10  my-10 lg:my-20">
      <h2 className="text-4xl font-bold mb-4 text-primary text-center">Parcel Details</h2>

      {/* General Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600 font-bold">Title:</p>
          <p className="font-medium">{title}</p>
        </div>
        <div>
          <p className="text-gray-600 font-bold">Type:</p>
          <p className="font-medium">{type}</p>
        </div>
        <div>
          <p className="text-gray-600 pb-2 font-bold">Status:</p>
          <span
            className={`px-3 py-1.5  rounded-full text-white  ${
              status === "Pending"
                ? "bg-yellow-500"
                : status === "Delivered"
                ? "bg-green-600"
                : "bg-blue-600"
            }`}
          >
            {status}
          </span>
        </div>
        <div>
          <p className="text-gray-600 font-bold ">Tracking ID:</p>
          <p className="font-medium">{trackingId}</p>
        </div>
        <div>
          <p className="text-gray-600 font-bold">Created By:</p>
          <p className="font-medium">
            {createdBy} ({createdByEmail})
          </p>
        </div>
        <div>
          <p className="text-gray-600 font-bold">Created At:</p>
          <p className="font-medium">
            {new Date(creation_date).toLocaleString()}
          </p>
        </div>
      </div>

      <hr className="my-6" />

      {/* Sender Info */}
      <h3 className="text-2xl  mb-2 font-bold text-primary ">Sender Information</h3>
      <p><span className="text-gray-600 font-semibold">Name:</span> {senderName}</p>
      <p><span className="text-gray-600 font-semibold">Contact:</span> {senderContact}</p>
      <p>
        <span className="text-gray-600 font-semibold">Address:</span> {senderAddress}, {senderDistrict}, {senderRegion}
      </p>
      <p><span className="text-gray-600 font-semibold">Pickup Instruction:</span> {pickupInstruction}</p>

      <hr className="my-6" />

      {/* Receiver Info */}
      <h3 className="text-2xl  mb-2 font-bold text-primary">Receiver Information</h3>
      <p><span className="text-gray-600 font-semibold">Name:</span> {receiverName}</p>
      <p><span className="text-gray-600 font-semibold">Contact:</span> {receiverContact}</p>
      <p>
        <span className="text-gray-600 font-semibold">Address:</span> {receiverAddress}, {receiverDistrict}, {receiverRegion}
      </p>
      <p><span className="text-gray-600 font-semibold">Delivery Instruction:</span> {receiverInstruction}</p>

      <hr className="my-6" />

      {/* Cost & Payment */}
      <div className="flex justify-between items-center ">
        <p className=" text-primary font-bold text-2xl">Total Cost: ${totalCost}</p>
        <span
          className={`px-3 py-1 rounded-lg ${
            paymentStatus === "Paid" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {paymentStatus}
        </span>
      </div>

      {/* Back button */}
      <div className="mt-6 text-right">
        <Link
          to="/dashboard/my-parcels"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Back to My Parcels
        </Link>
      </div>
    </div>
  );
};

export default ViewParcelsDetails;
