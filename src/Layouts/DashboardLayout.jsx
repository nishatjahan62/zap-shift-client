import React from "react";
import { Link, Outlet } from "react-router";
import ProFastLogo from "../Pages/Shared/Project-Logo/ProFastLogo";
import UseAuth from "../Hooks/UseAuth";

const DashboardLayout = () => {
  const { user } = UseAuth();

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

          {/* Navigation links */}
          <nav className="space-y-2">
            <Link to="/" className="block text-gray-700 hover:text-blue-500">
              Home
            </Link>
            <Link
              to="/coverage"
              className="block text-gray-700 hover:text-blue-500"
            >
              Coverage
            </Link>
            {user && (
              <Link
                to="/dashboard/profile"
                className="block text-gray-700 hover:text-blue-500"
              >
                Profile
              </Link>
            )}{" "}
            {user && (
              <Link
                to="/dashboard/my-parcels"
                className="block text-gray-700 hover:text-blue-500"
              >
                My Parcels
              </Link>
            )}
          </nav>

          {/* Logout */}
          {user && (
            <button className="btn btn-error mt-6 w-full">Logout</button>
          )}
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
