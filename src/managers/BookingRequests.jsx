import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingRequests = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("/api/bookings/manager", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // FIXED: Access bookings array from res.data.bookings
        setBookings(Array.isArray(res.data.bookings) ? res.data.bookings : []);
      } catch (err) {
        console.error("Failed to load bookings", err);
      }
    };
    fetchBookings();
  }, []);

  const updateStatus = async (bookingId, status) => {
    try {
      await axios.put(
        "/api/bookings/status",
        { bookingId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update status in local state
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status } : b))
      );
    } catch (err) {
      console.error("Failed to update booking status", err);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Booking Requests</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No booking requests.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="border p-4 mb-4 rounded shadow">
            <p><strong>User:</strong> {booking.userId?.name || "Unknown"}</p>
            <p><strong>Turf:</strong> {booking.turfId?.name || "Unknown"}</p>
            <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {booking.timeSlot}</p>
            <p><strong>Status:</strong> {booking.status}</p>

            {booking.status === "pending" && (
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => updateStatus(booking._id, "accepted")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(booking._id, "rejected")}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BookingRequests;
