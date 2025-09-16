import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import ProFastLogo from "../Pages/Shared/Project-Logo/ProFastLogo";
import UseAuth from "../Hooks/UseAuth";
import {
  FiHome,
  FiMapPin,
  FiUserPlus,
  FiUser,
  FiPackage,
  FiCreditCard,
  FiTruck,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
const DashboardLayout = () => {
  const { user } = UseAuth();

  const linkClass = ({ isActive }) =>
    `flex items-center text-lg font-semibold transition-colors ${
      isActive ? "text-primary" : "text-secondary hover:text-primary"
    }`;

  return (
    <div className="drawer drawer-mobile lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Top Navbar for small screens only */}
        <div className="navbar bg-base-300 lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2">
            <ProFastLogo />
          </div>
        </div>

        {/* Page content */}
        <div className="p-4 flex-1">
          <Outlet />
          <h1></h1>
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="menu w-64 bg-base-200 min-h-screen p-4">
          {/* Logo */}
          <div className="mb-6">
            <ProFastLogo />
          </div>
          {/* User info */}
          {user && (
            <div className="flex items-center mb-6">
              <img
                src={user.photoURL || "https://via.placeholder.com/50"}
                alt="User"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{user.displayName}</p>
                <p className="text-xs text-gray-400">User</p>
              </div>
            </div>
          )}
    <nav className="space-y-2">
      <NavLink to="/" className={linkClass}>
        <FiHome className="mr-2 text-lg" /> Home
      </NavLink>

      <NavLink to="/coverage" className={linkClass}>
        <FiMapPin className="mr-2 text-lg" /> Coverage
      </NavLink>

      {user && (
        <NavLink to="/Be-a-rider" className={linkClass}>
          <FiUserPlus className="mr-2 text-lg" /> Be A Rider
        </NavLink>
      )}

      {user && (
        <NavLink to="/dashboard/user-profile" className={linkClass}>
          <FiUser className="mr-2 text-lg" /> Profile
        </NavLink>
      )}

      {user && (
        <NavLink to="/dashboard/my-parcels" className={linkClass}>
          <FiPackage className="mr-2 text-lg" /> My Parcels
        </NavLink>
      )}

      {user && (
        <NavLink to="/dashboard/payment-history" className={linkClass}>
          <FiCreditCard className="mr-2 text-lg" /> Payment History
        </NavLink>
      )}

      {user && (
        <NavLink to="/dashboard/track-a-package" className={linkClass}>
          <FiTruck className="mr-2 text-lg" /> Track A Package
        </NavLink>
      )}

      {/* Rider Management Links */}
      {user && (
        <NavLink to="/dashboard/active-riders" className={linkClass}>
          <FiCheckCircle className="mr-2 text-lg" /> Active Riders
        </NavLink>
      )}

      {user && (
        <NavLink to="/dashboard/pending-riders" className={linkClass}>
          <FiClock className="mr-2 text-lg" /> Pending Riders
        </NavLink>
      )}
    </nav>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
