import React from 'react';
import useFetch from '../Hooks/useFetch'; 
import {api} from '../api/axiosInstance'

const MyBookings = () => {
  const { data, loading, error } = useFetch('/bookings/myBookings');
  console.log(data.data)

  const cancelBooking = async (bookingId) => {
  try {
    await api.patch(`/bookings/${bookingId}/cancel`, { status: "cancelled" },{headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }}); 
    window.location.reload(); 
  } catch (err) {
    console.error('Error cancelling booking:', err);
  }
};
  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!data || data.length === 0) return <p className="p-4">No bookings found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      {data.data.map((booking) => (
        <div key={booking._id} className="border p-3 mb-2 rounded shadow">
          <p><strong>Turf:</strong> {booking.turfId?.name||"Turf not found"}</p>
          <p><strong>Location:</strong> {booking.turfId?.location || "Unknown"}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <p><strong>Date:</strong> {booking.date}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`${
                booking.status === "cancelled"
                  ? "text-red-600 font-semibold"
                  : "text-green-700"
              }`}
            >
              {booking.status}
            </span>
          </p>

          {booking.status !== "cancelled" && (
            <button
              className="bg-red-600 text-white px-4 py-1 mt-2 rounded"
              onClick={() => cancelBooking(booking._id)}
            >
              Cancel Booking
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyBookings;

