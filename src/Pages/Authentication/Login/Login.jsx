import React from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import UseAuth from "../../../Hooks/UseAuth";
import GoogleLogin from "../SocialLogin/GoogleLogin";
import Swal from "sweetalert2";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { signIn } = UseAuth();
  const onsubmit = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then((result) => {
      console.log("logging in",result.user);
        Swal.fire({
          title: "Welcome Back!",
          text: "You have successfully logged in. ",
          icon: "success",
          showConfirmButton: false,
        });
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-full max-w-md ">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back</h2>
      <p className="py-1 text-lg">Register with Profast</p>
      <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
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
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          class=" cursor-pointer rounded w-full py-2.5 overflow-hidden group bg-primary relative  hover:to-secondary text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300"
        >
          <span class="absolute right-0  -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span class="relative text-black">Sign In</span>
        </button>

        <Link to="/auth/forget-password">Forget Password?</Link>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?
          <Link to="/auth/register" className="text-teal-600 hover:underline">
            Register here
          </Link>
        </p>
        <div className="w-full text-center">
          <p>OR</p>

          <GoogleLogin></GoogleLogin>
        </div>
      </form>
    </div>
  );
};

export default Login;
