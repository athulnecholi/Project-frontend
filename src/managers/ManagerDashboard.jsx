import React from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaClipboardList, FaThList } from "react-icons/fa";

const ManagerDashboard = () => {
  return (
    <div className="relative max-w-6xl mx-auto py-10 px-4">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-800 drop-shadow-md">
        Manager Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Create Turf */}
        <Link
          to="/manager/createturf"
          className="bg-white/80 hover:bg-white text-gray-800 border border-blue-300 rounded-xl p-6 text-center backdrop-blur-md shadow-md hover:shadow-xl transition hover:scale-105 duration-300"
        >
          <FaPlusCircle className="text-4xl text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Create Turf</h2>
          <p className="text-sm">Add new turf locations and set availability.</p>
        </Link>

        {/* Booking Requests */}
        <Link
          to="/manager/bookingrequest"
          className="bg-white/80 hover:bg-white text-gray-800 border border-blue-300 rounded-xl p-6 text-center backdrop-blur-md shadow-md hover:shadow-xl transition hover:scale-105 duration-300"
        >
          <FaClipboardList className="text-4xl text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Booking Requests</h2>
          <p className="text-sm">View and respond to user booking requests.</p>
        </Link>

        {/* My Turfs */}
        <Link
          to="/manager/my-turfs"
          className="bg-white/80 hover:bg-white text-gray-800 border border-blue-300 rounded-xl p-6 text-center backdrop-blur-md shadow-md hover:shadow-xl transition hover:scale-105 duration-300"
        >
          <FaThList className="text-4xl text-yellow-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">My Turfs</h2>
          <p className="text-sm">Manage and update details of your turfs.</p>
        </Link>
      </div>
    </div>
  );
};

export default ManagerDashboard;
