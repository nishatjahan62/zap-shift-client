import React from "react";
import { Link } from "react-router";


const ForgetPassword = () => {
 
  return (
    <div className="w-full max-w-md ">
      <h2 className="text-3xl font-bold text-gray-800 ">Forget Password?</h2>
      <p className="py-1 mb-6 text-lg">Enter your email address and we’ll send you a reset link.</p>
      <form className="space-y-4">
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
           
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="your email"
            required
          />
         
        </div>
    

        <button
          type="submit"
          class=" rounded w-full py-2.5 overflow-hidden group bg-primary relative  hover:to-secondary text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300"
        >
          <span class="absolute right-0  -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span class="relative text-black">Send</span>
        </button>
         <p className="text-sm text-center text-gray-600">
         Remember your password?{" "}
          <Link
            to="/auth/login"
            className="text-teal-600 hover:underline font-bold"
          >
            Sign In 
          </Link></p>
      </form>
    </div>
  );
};

export default ForgetPassword;
