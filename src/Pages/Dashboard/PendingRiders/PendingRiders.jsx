import React, { useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  // Fetch pending riders
  const {
    data: riders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

const updateStatus = async (riderId, action, email) => {
  // Show confirmation alert
  const confirmResult = await Swal.fire({
    title: `Are you sure?`,
    text: `You are about to ${action.toLowerCase()} this rider.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: action === "approved" ? "#22c55e" : "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: `Yes, ${action}`,
  });

  if (!confirmResult.isConfirmed) return; // Exit if cancelled

  try {
    // Match exactly what you pass from buttons
    let status;
    if (action.toLowerCase() === "approved") {
      status = "approved"; // backend converts to Active
    } else {
      status = "Cancelled"; // or Inactive
    }

    const res = await axiosSecure.patch(`/riders/${riderId}/status`, {
      status,
      email,
    });
    if (res.data.success) {
      Swal.fire("Success", res.data.message, "success");
      refetch();
    }
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Failed to update status", "error");
  }
};


  if (isLoading) return <Loading></Loading>;
  if (isError) return <Loading></Loading>;

  return (
    <div className="p-4">
      <h2 className="text-3xl  text-center text-primary font-bold mb-4 ">
        Pending Riders
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Region</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr key={rider._id} className="hover:bg-gray-100">
                <td className="p-2 border">{rider.name}</td>
                <td className="p-2 border">{rider.email}</td>
                <td className="p-2 border">{rider.contact}</td>
                <td className="p-2 border">{rider.region}</td>
                <td className="p-2 border">
                  <div className="flex flex-col mx-auto items-center justify-center sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      onClick={() =>
                        updateStatus(rider._id, "approved", rider.email)
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      onClick={() =>
                        updateStatus(rider._id, "Cancelled", rider.email)
                      }
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      onClick={() => setSelectedRider(rider)}
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedRider && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-lg w-full animate-slide-in relative">
            <button
              className="absolute top-3 right-3 text-gray-600 font-bold hover:text-gray-800 transition"
              onClick={() => setSelectedRider(null)}
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4 text-primary text-center">
              Rider Details
            </h3>
            <hr className="mb-4" />
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Personal Info</h4>
              <p>
                <strong>Name:</strong> {selectedRider.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRider.email}
              </p>
              <p>
                <strong>Contact:</strong> {selectedRider.contact}
              </p>
              <p>
                <strong>Age:</strong> {selectedRider.age}
              </p>
              <p>
                <strong>NID:</strong> {selectedRider.nid}
              </p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Bike Info</h4>
              <p>
                <strong>Bike Model:</strong> {selectedRider.bikeModel}
              </p>
              <p>
                <strong>License:</strong> {selectedRider.license}
              </p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Other Info</h4>
              <p>
                <strong>Region:</strong> {selectedRider.region}
              </p>
              <p>
                <strong>District:</strong> {selectedRider.district}
              </p>
            </div>
            <p className="font-semibold">
              <strong>Status:</strong> {selectedRider.status}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
