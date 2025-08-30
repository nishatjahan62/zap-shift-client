import React from "react";
import { Link, NavLink } from "react-router";
import ProFastLogo from "../Project-Logo/ProFastLogo";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { logOut, user } = UseAuth();
  // Handle Logout
  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logged Out!",
          text: "You have successfully logged Out. ",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  const navItems = (
    <ul className="space-x-1.5 flex">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-primary text-[#03373d] font-extrabold px-4 py-2 rounded-lg shadow-md transition"
              : "text-secondary font-semibold  hover:text-[#03373d] px-4 py-2 rounded-lg transition"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive
              ? "bg-primary text-[#03373d] font-extrabold px-4 py-2 rounded-lg shadow-md transition"
              : "text-secondary font-semibold  hover:text-[#03373d] px-4 py-2 rounded-lg transition"
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            isActive
              ? "bg-primary text-[#03373d] font-extrabold px-4 py-2 rounded-lg shadow-md transition"
              : "text-secondary font-semibold  hover:text-[#03373d] px-4 py-2 rounded-lg transition"
          }
        >
          Coverage
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/send-parcel"
          className={({ isActive }) =>
            isActive
              ? "bg-primary text-[#03373d] font-extrabold px-4 py-2 rounded-lg shadow-md transition"
              : "text-secondary font-semibold  hover:text-[#03373d] px-4 py-2 rounded-lg transition"
          }
        >
          Pricing
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "bg-primary text-[#03373d] font-extrabold px-4 py-2 rounded-lg shadow-md transition"
                : "text-secondary font-semibold  hover:text-[#03373d] px-4 py-2 rounded-lg transition"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </ul>
  );
  return (
    <div>
      <div className="navbar px-5 lg:px-8 rounded-2xl bg-[#F8F8F8] shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                code
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <a className=" btn-ghost text-xl ">
            <ProFastLogo></ProFastLogo>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal ">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center justify-center gap-2">
              {" "}
              <div>
                Hello{" "}
                <span className="pl-1 font-bold text-primary">
                  {user && user.displayName?.split(" ")[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="cursor-pointer border border-primary rounded px-5 py-2.5 overflow-hidden group relative text-secondary hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300"
              >
                <span className="absolute right-0 transition-all duration-1000 transform translate-x-12 bg-primary opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative font-bold">Sign Out</span>
              </button>
            </div>
          ) : (
            <Link to={"/auth/login"}>
              {" "}
              <button className="cursor-pointer border border-primary rounded px-5 py-2.5 overflow-hidden group relative text-secondary hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300">
                <span className="absolute right-0 transition-all duration-1000 transform translate-x-12 bg-primary opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative font-bold">Sign In</span>
              </button>{" "}
            </Link>
          )}
          <button class="cursor-pointer rounded ml-3 px-5 py-2.5 overflow-hidden group bg-primary relative  hover:to-secondary text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300">
            <span class="absolute right-0  transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span class="relative text-black font-bold">Be a rider</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
