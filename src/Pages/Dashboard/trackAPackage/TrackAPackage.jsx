import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const TrackAPackage = () => {
  const { trackingId: urlTrackingId } = useParams();
const [trackingId, setTrackingId] = useState(urlTrackingId || "");
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

 const {
  data: parcel,
  isLoading,
  error,
} = useQuery({
  queryKey: ["track", urlTrackingId],
  enabled: !!urlTrackingId,
  queryFn: async () => {
    try {
      const res = await axiosSecure.get(`/track/${urlTrackingId}`);
      return res.data;
    } catch (err) {
      if (err.response?.status === 404) {
        return null; // Parcel not found
      }
      throw err; // Other errors bubble up
    }
  },
});

  const handleSearch = (e) => {
    e.preventDefault();
    if (trackingId.trim()) {
      navigate(`/dashboard/track-a-package/${trackingId}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🚚 Track Your Parcel
      </h1>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="flex mb-6">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter Tracking ID"
          className="input input-bordered flex-1 mr-2"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {/* Parcel Info */}
      {isLoading && <Loading></Loading>}

{error && <p className="text-red-500">Something went wrong</p>}

{!isLoading && parcel === null && (
  <p className="text-red-500">Parcel not found</p>
)}

{parcel && (
  <div className="p-4 bg-white rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-2">📦 Parcel Details</h2>
    <p><strong>Tracking ID:</strong> {parcel.trackingId}</p>
    <p><strong>Status:</strong> {parcel.status}</p>
    <p><strong>Title:</strong> {parcel.title}</p>
    <p><strong>Sender:</strong> {parcel.senderName}</p>
    <p><strong>Receiver:</strong> {parcel.receiverName}</p>
  </div>
)}

    </div>
  );
};

export default TrackAPackage;
