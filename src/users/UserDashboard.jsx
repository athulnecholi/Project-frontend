import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaFutbol, FaCalendarAlt, FaUserEdit } from "react-icons/fa";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.user);

  const profileImage = user?.profileImage
    ? `${import.meta.env.VITE_API_BASE_URL}/uploads/profiles/${user.profileImage}`
    : "/default-avatar.png"; // Fallback avatar

  return (
    <div className="relative max-w-5xl mx-auto py-10 px-4">
      {/* Profile Avatar */}
      <div className="absolute top-4 right-4">
        <img
          src={`${profileImage}?t=${new Date().getTime()}`} // prevents caching
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-white shadow-md"
        />
      </div>

      {/* Welcome Heading */}
      <h1 className="text-3xl font-bold text-center mb-10 text-white">
        Welcome to Your Dashboard
      </h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Browse Turfs */}
        <Link
          to="/turfs"
          className="bg-white bg-opacity-10 border border-white border-opacity-30 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition hover:scale-105 transform duration-300 cursor-pointer backdrop-blur-md"
        >
          <FaFutbol className="text-4xl text-green-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Browse Turfs</h2>
          <p className="text-sm text-gray-300">Explore available turfs near you and make bookings.</p>
        </Link>

        {/* My Bookings */}
        <Link
          to="/user/bookings"
          className="bg-white bg-opacity-10 border border-white border-opacity-30 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition hover:scale-105 transform duration-300 cursor-pointer backdrop-blur-md"
        >
          <FaCalendarAlt className="text-4xl text-blue-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">My Bookings</h2>
          <p className="text-sm text-gray-300">Check your booking history and upcoming schedules.</p>
        </Link>

        {/* Edit Profile */}
        <Link
          to="/user/profile"
          className="bg-white bg-opacity-10 border border-white border-opacity-30 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition hover:scale-105 transform duration-300 cursor-pointer backdrop-blur-md"
        >
          <FaUserEdit className="text-4xl text-yellow-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Edit Profile</h2>
          <p className="text-sm text-gray-300">Update your profile picture and contact info.</p>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
