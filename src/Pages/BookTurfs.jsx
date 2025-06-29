import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/axiosInstance";
import useFetch from "../Hooks/useFetch";

const BookTurfs = () => {
  const { turfId } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [error, setError] = useState("");

  const {
    data: turf,
    loading,
    error: fetchError,
  } = useFetch(`/turfs/${turfId}`);

  const handleBooking = async () => {
    if (!date || !timeSlot) {
      return setError("Please select both date and time slot.");
    }

    try {
      await api.post(
        "/bookings",
        {
          turfId,
          date,
          timeSlot,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Booking request sent! Awaiting manager approval.");
      navigate("/user/bookings");
    } catch (error) {
      setError("Booking failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">Loading turf details...</p>
    );
  }

  if (fetchError || !turf) {
    return (
      <p className="text-center mt-10 text-red-500">
        {fetchError || "Turf not found."}
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border shadow rounded bg-white">
      <h2 className="text-2xl font-bold mb-2">{turf.name}</h2>
      <p className="text-gray-600 mb-2">{turf.location}</p>

      {turf.images?.[0] && (
        <img
          src={`http://localhost:3000/uploads/turfs/${turf.images[0]}`}
          alt="Turf"
          className="w-full h-56 object-cover rounded mb-4"
        />
      )}

      {error && <p className="text-red-600 font-medium mb-3">{error}</p>}

      <div className="mb-4">
        <label className="block font-medium mb-1">Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border px-3 py-2 rounded text-black bg-white"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Select Time Slot:</label>
        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="w-full border px-3 py-2 rounded text-black bg-white"
        >
          <option value="">-- Select --</option>
          {turf.availability?.map((slot, idx) => (
            <option key={idx} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleBooking}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Book Turf
      </button>
    </div>
  );
};

export default BookTurfs;
