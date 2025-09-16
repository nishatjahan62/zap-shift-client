import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";
import Swal from "sweetalert2";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch approved riders
  const { data: riders = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  // Update status handler
  const updateStatus = async (riderId, status) => {
    try {
      const res = await axiosSecure.patch(`/riders/${riderId}/status`, { status });
      if (res.data.success) {
        Swal.fire("Success", `Rider marked as ${status}`, "success");
        refetch();
      }
    } catch (err) {
      console.error("Error updating status:", err);
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  // Filter riders by search term
  const filteredRiders = riders.filter((rider) => {
    const term = searchTerm.toLowerCase();
    return (
      rider.name?.toLowerCase().includes(term) ||
      rider.email?.toLowerCase().includes(term) ||
      rider.region?.toLowerCase().includes(term)
    );
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Failed to load active riders.</p>;

  return (
    <div className="p-4">
      <h2 className="text-3xl  text-center text-primary font-bold mb-4">Active Riders</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <h3 className="text-lg font-bold py-2">Search Riders</h3>
        <input
          type="text"
          placeholder="Search by name, email, or region..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Riders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Region</th>
              <th className="p-2 border">District</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.length > 0 ? (
              filteredRiders.map((rider) => (
                <tr key={rider._id} className="hover:bg-gray-100">
                  <td className="p-2 border">{rider.name}</td>
                  <td className="p-2 border">{rider.email}</td>
                  <td className="p-2 border">{rider.contact}</td>
                  <td className="p-2 border">{rider.region}</td>
                  <td className="p-2 border">{rider.district}</td>
                  <td className="p-2 border">{rider.status}</td>
                  <td className="p-2 border">
                    {/* Only Deactivate Button */}
                    <button
                      className="flex items-center justify-center mx-auto bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      onClick={() => updateStatus(rider._id, "Inactive")}
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
