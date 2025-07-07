import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BookingRequests = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/bookings/manager`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response",res.data)

        if (Array.isArray(res.data)) {
          setBookings(res.data);
          console.log("array is ",bookings)
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error("❌ Failed to load bookings:", err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const updateStatus = async (bookingId, status) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/bookings/status`,
        { bookingId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optimistically update local state
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status } : b))
      );
    } catch (err) {
      console.error("❌ Failed to update booking status:", err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading bookings...</p>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Booking Requests</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No booking requests found.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="border p-4 mb-4 rounded shadow bg-white"
          >
            <p><strong>User:</strong> {booking.userId?.name || "Unknown"}</p>
            <p><strong>Email:</strong> {booking.userId?.email || "N/A"}</p>
            <p><strong>Turf:</strong> {booking.turfId?.name || "Unknown"}</p>
            <p><strong>Location:</strong> {booking.turfId?.location || "N/A"}</p>
            <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {booking.timeSlot}</p>

            <p className="mt-1">
              <strong>Status:</strong>{" "}
              <span
                className={`inline-block px-2 py-0.5 rounded text-white text-sm ${
                  booking.status === "pending"
                    ? "bg-yellow-500"
                    : booking.status === "accepted"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {booking.status}
              </span>
            </p>

            {booking.status === "pending" && (
              <div className="mt-3 space-x-2">
                <button
                  onClick={() => updateStatus(booking._id, "accepted")}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(booking._id, "rejected")}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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
