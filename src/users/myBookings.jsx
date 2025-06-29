import React from 'react';
import useFetch from '../Hooks/useFetch';
import { api } from '../api/axiosInstance';

const MyBookings = () => {
  const { data, loading, error } = useFetch('/bookings/myBookings');

  const cancelBooking = async (bookingId) => {
    try {
      await api.patch(`/bookings/${bookingId}/cancel`, { status: "cancelled" }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      window.location.reload();
    } catch (err) {
      console.error('Error cancelling booking:', err);
    }
  };

  const handlePayment = async (booking) => {
    try {
      const amount = booking.turfId?.pricePerHour || 500;
      const res = await api.post('/payment/razorpay-order', {
        amount,
        bookingId: booking._id
      });

      const { order } = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Turf Booking",
        description: `Booking ID: ${booking._id}`,
        order_id: order.id,
        handler: async function (response) {
          alert("Payment successful!");
          await api.post(`/payment/verify`, {
            ...response,
            bookingId: booking._id
          }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          window.location.reload();
        },
        prefill: {
          name: booking.user?.name || "User",
          email: booking.user?.email || "example@mail.com"
        },
        theme: { color: "#3399cc" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment initiation failed', err);
    }
  };

  if (loading) return <p className="p-4 text-gray-600">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!data || data.length === 0) return <p className="p-4 text-gray-600">No bookings found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>

      {data.data.map((booking) => (
        <div key={booking._id} className="border p-4 mb-4 rounded-lg shadow bg-white text-gray-800">
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
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
