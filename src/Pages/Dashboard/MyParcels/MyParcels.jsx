import React from "react";
import UseAuth from "../../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FiEye, FiCreditCard, FiTrash2 } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // Handle delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/parcels/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
            refetch();
            console.log(res.data);
          } else {
            Swal.fire(
              "Error",
              res.data.message || "Failed to delete parcel",
              "error"
            );
          }
        } catch (err) {
          Swal.fire("Error", "Something went wrong.", "error");
          console.log(err);
        }
      }
    });
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading parcels...</div>;
  }

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <h1 className="text-3xl text-primary font-bold mb-6 text-center">
        📦 My Parcels
      </h1>

      {parcels.length === 0 ? (
        <p className="text-center text-gray-500">No parcels found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full shadow-md rounded-lg">
            <thead className="bg-secondary text-white">
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Cost (৳)</th>
                <th>Payment Status</th>

                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id} className="hover:bg-gray-50">
                  <td className="font-semibold">{index + 1}</td>
                  <td className="capitalize font-medium">{parcel.type}</td>
                  <td>
                    <span
                      className={`px-3 py-2 rounded-full text-xs font-semibold ${
                        parcel.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : parcel.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {parcel.status}
                    </span>
                  </td>
                  <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>
                  <td className="font-semibold text-gray-700">
                    ৳ {parcel.totalCost || 0}
                  </td>
                  <td>
                    <span
                      className={`px-3 py-2 rounded-full text-xs font-semibold ${
                        parcel.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {parcel.paymentStatus || "Unpaid"}
                    </span>
                  </td>
                  <td className="flex  justify-center">
                    {/* View Details */}
                    <Link to={`/view-parcels-details/${parcel._id}`}>
                      <button
                        data-tooltip-id="view-details"
                        className="p-2 rounded-lg text-blue-500 text-xl cursor-pointer"
                      >
                        <FiEye />
                      </button>
                    </Link>
                    <Tooltip
                      id="view-details"
                      place="top"
                      content="View Details"
                    />

                  
                    {/* Pay */}
{parcel.paymentStatus === "Paid" ? (
  <button
    disabled
    className="p-2 rounded-lg text-gray-600 text-xl cursor-not-allowed"
    type="button"
  >
    <FiCreditCard />
  </button>
) : (
  <Link to={`/dashboard/payment/${parcel._id}`}>
    <button
      data-tooltip-id="view-pay"
      className="p-2 rounded-lg text-green-500 text-xl cursor-pointer"
    >
      <FiCreditCard />
    </button>
    <Tooltip id="view-pay" place="top" content="Pay" />
  </Link>
)}


                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(parcel._id)}
                      data-tooltip-id="view-delete"
                      className="p-2 rounded-lg text-red-500 text-xl cursor-pointer"
                    >
                      <FiTrash2 />
                    </button>
                    <Tooltip id="view-delete" place="top" content="Delete" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
