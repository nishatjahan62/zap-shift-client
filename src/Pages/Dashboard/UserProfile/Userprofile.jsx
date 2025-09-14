import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UserProfile = () => {
  const { user, updateUser, setUser } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const [name, setName] = useState(user?.displayName || "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch parcel count
  const { data: parcels = [] } = useQuery({
    queryKey: ["user-parcels-count", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    let uploadedImageURL = user?.photoURL;

    // Upload new image if selected
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const imageKey = import.meta.env.VITE_ImageBB_api_key;
        const url = `https://api.imgbb.com/1/upload?key=${imageKey}`;

        const res = await axiosSecure.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.success) {
          uploadedImageURL = res.data.data.url;
        }
      } catch (err) {
        Swal.fire("Error", "Image upload failed", err);
        setLoading(false);
        return;
      }
    }

    try {
      await updateUser({ displayName: name, photoURL: uploadedImageURL });
      setUser({ ...user, displayName: name, photoURL: uploadedImageURL });

      Swal.fire("Success", "Profile updated successfully", "success");
      setIsModalOpen(false); // close modal
    } catch (err) {
      Swal.fire("Error", "Failed to update profile", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">
        👤 My Profile
      </h1>

      {/* User Info */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-primary object-cover mb-3"
        />
        <h2 className="text-xl font-semibold">{user?.displayName}</h2>
        <p className="text-gray-500">{user?.email}</p>
        <p className="mt-2 text-lg font-bold text-secondary">
          Parcels: {parcels.length}
        </p>
      </div>

      {/* Edit Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full py-2.5 bg-primary text-white font-semibold rounded-md hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all duration-300"
      >
        Edit Profile
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-center mb-4 text-primary">
              ✏️ Edit Profile
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : user?.photoURL || "https://via.placeholder.com/150"
                  }
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full border-4 border-primary"
                />

                {/* Hidden file input */}
                <input
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {/* Beautiful clickable text */}
                <label
                  htmlFor="profileImageInput"
                  className="mt-3 text-sm font-medium text-primary cursor-pointer hover:underline"
                >
                  ✨ Change Profile Picture
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 bg-primary text-white font-semibold rounded-md hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all duration-300"
                >
                  {loading ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setImage(null);
                    setName(user?.displayName || "");
                  }}
                  className="flex-1 py-2.5 bg-gray-400 text-white font-semibold rounded-md hover:bg-gray-500 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
