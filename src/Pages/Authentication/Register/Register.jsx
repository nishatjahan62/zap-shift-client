import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, setUser, updateUser } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const [image, setImage] = useState(null);
  const navigation = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onsubmit = async (data) => {
    const { name, email, password } = data;
    let uploadedImageURL = "";

    // image Upload
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
          console.log(uploadedImageURL);
        }
      } catch (err) {
        console.log("Image upload failed", err);

        return;
      }
    }

    // Create User in Firebase
    createUser(email, password)
      .then((res) => {
        const user = res.user;
        updateUser({ displayName: name, photoURL: uploadedImageURL }).then(
          () => {
            setUser({ ...user, displayName: name, photoURL: uploadedImageURL });
          }
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Account Created",
          text: "Your Account has been created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigation(from);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-gray-800">Create an account</h2>
      <p className="py-1 mb-6 text-lg">Register with Profast</p>
      <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
        {/* Profile Image */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-1"
            required
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Your name"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your password"
            required
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="rounded w-full py-2.5 bg-primary text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all duration-300"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-teal-600 hover:underline font-bold"
          >
            Sign In here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
