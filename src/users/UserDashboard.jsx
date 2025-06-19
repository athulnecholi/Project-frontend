import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <ul className="space-y-2">
        <li><Link to="/turfs" className="text-blue-500">Browse Turfs</Link></li>
        <li><Link to="/user/bookings" className="text-blue-500">View Bookings</Link></li>
        <li><Link to="/user/profile" className="text-blue-500">Edit Profile</Link></li>

      </ul>
    </div>
  );
};

export default UserDashboard;
