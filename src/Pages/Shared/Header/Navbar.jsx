import React from "react";
import { Link, NavLink } from "react-router";
import ProFastLogo from "../Project-Logo/ProFastLogo";

const Navbar = () => {
  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about-us">About Us</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar px-5 lg:px-8 rounded-2xl bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          <Link to={"/auth/login"}>
            {" "}
            <button className="border border-primary rounded px-5 py-2.5 overflow-hidden group relative text-secondary hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300">
              <span className="absolute right-0 transition-all duration-1000 transform translate-x-12 bg-primary opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative font-bold">Sign In</span>
            </button> </Link>
            <button class=" rounded ml-3 px-5 py-2.5 overflow-hidden group bg-primary relative  hover:to-secondary text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300">
              <span class="absolute right-0  transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span class="relative text-black font-bold">Be a rider</span>
            </button>
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
