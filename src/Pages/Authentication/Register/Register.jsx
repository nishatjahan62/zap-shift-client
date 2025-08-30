import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, setUser, updateUser } = UseAuth();
  const onsubmit = (data) => {
    const { name, email, password } = data;
    createUser(email, password)
      .then((res) => {
        const user = res.user;
        updateUser({ displayName: name }).then(() => {
          setUser({ ...user, displayName: name });
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Account Created",
          text: "Your Account has been created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full max-w-md ">
      <h2 className="text-3xl font-bold text-gray-800 ">Create an account</h2>
      <p className="py-1 mb-6 text-lg">Register with Profast</p>
      <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-600">
            name
          </label>
          <input
            type="text"
            {...register("name")}
            name="name"
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="your name"
            required
          />
          {errors.email && <p role="alert">{errors.email.message}</p>}
          {errors.email?.type === "required" && (
            <p role="alert">{errors.email.message}</p>
          )}
        </div>
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
          {errors.email && <p role="alert">{errors.email.message}</p>}
          {errors.email?.type === "required" && (
            <p role="alert">{errors.email.message}</p>
          )}
        </div>

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
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Only letters are allowed in the password",
              },
            })}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your password"
            required
          />

          {errors.password && (
            <p role="alert" className="text-sm text-red-500 mt-1">
              {errors.password.message}
              {errors.password?.type === "required" && (
                <p role="alert">{errors.password.message}</p>
              )}
            </p>
          )}
        </div>

        <button
          type="submit"
          class=" rounded w-full py-2.5 overflow-hidden group bg-primary relative  hover:to-secondary text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300"
        >
          <span class="absolute right-0  -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span class="relative text-black">Sign up</span>
        </button>

        <p className="text-sm text-center text-gray-600">
          already have an account?{" "}
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
