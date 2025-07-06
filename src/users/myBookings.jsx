import React, { useState } from 'react';
import useFetch from '../Hooks/useFetch';
import { api } from '../api/axiosInstance';

const MyBookings = () => {
  const { data, loading, error } = useFetch('/bookings/myBookings');
  const [cancelingId, setCancelingId] = useState(null);

  const cancelBooking = async (bookingId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Session expired. Please login again.");
      return window.location.href = '/login';
    }

    setCancelingId(bookingId);

    try {
      await api.patch(
        `/bookings/${bookingId}/cancel`,
        { status: "cancelled" },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Booking cancelled successfully.");
      window.location.reload();

    } catch (err) {
      console.error('❌ Error cancelling booking:', err);

      if (err.response?.status === 401) {
        alert("Unauthorized. Please login again.");
        localStorage.removeItem('token');
        return window.location.href = '/login';
      }

      alert("Something went wrong. Please try again.");
    } finally {
      setCancelingId(null);
    }
  };

  
  // Render states
  if (loading) return <p className="p-4 text-gray-600">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!data || data.length === 0) return <p className="p-4 text-gray-600">No bookings found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Bookings</h2>

      {data.data.map((booking) => (
        <div
          key={booking._id}
          className="border p-4 mb-4 rounded-lg shadow bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          <p><strong>Turf:</strong> {booking.turfId?.name || "Turf not found"}</p>
          <p><strong>Location:</strong> {booking.turfId?.location || "Unknown"}</p>
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span className={`font-semibold ${
              booking.status === "cancelled"
                ? "text-red-600"
                : booking.status === "approved"
                ? "text-green-600"
                : "text-yellow-600"
            }`}>
              {booking.status}
            </span>
          </p>

          <div className="mt-3 flex flex-wrap gap-3">
            {booking.status === "approved" && !booking.isPaid && (
              <button
                onClick={() => handlePayment(booking)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Pay Now
              </button>
            )}

            {booking.status !== "cancelled" && (
              <button
                onClick={() => cancelBooking(booking._id)}
                disabled={cancelingId === booking._id}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition disabled:opacity-50"
              >
                {cancelingId === booking._id ? "Cancelling..." : "Cancel Booking"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
