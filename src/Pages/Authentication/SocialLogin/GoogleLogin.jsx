import React from "react";
import UseAuth from "../../../Hooks/UseAuth";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";

const GoogleLogin = () => {
  const { SignInWithGoogle, setUser } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosInstance = useAxios();

  const handleGoogleSignIn = async () => {
    try {
      const result = await SignInWithGoogle();
      const user = result.user;
      console.log(result.user);

      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
      };

      await axiosInstance.post("/users", userInfo);

      // Update global auth state (optional but useful)
      setUser(user);

      Swal.fire({
        title: "Welcome Back!",
        text: "You have successfully logged in.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from);
    } catch (error) {
      console.log("Google login failed:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleGoogleSignIn}
        className="btn w-full cursor-pointer text-black border-[#e5e5e5] bg-[#E9ECF1] flex items-center justify-center gap-2 px-4 py-2 rounded"
      >
        <svg
          aria-label="Google logo"
          width="18"
          height="18"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
