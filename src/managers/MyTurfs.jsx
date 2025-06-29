import React, { useEffect, useState } from "react";
import { api } from "../api/axiosInstance";

const MyTurfs = () => {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // turfId being edited

  useEffect(() => {
    const fetchMyTurfs = async () => {
      try {
        const res = await api.get("/turfs/manager/my-turfs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTurfs(res.data);
      } catch (err) {
        console.error("Failed to load turfs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTurfs();
  }, []);

  const handleUpdate = async (turfId) => {
    const updated = turfs.find((t) => t._id === turfId);
    try {
      await api.patch(`/turfs/${turfId}`, updated, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Turf updated!");
      setEditing(null);
    } catch (err) {
      console.error("Failed to update", err);
    }
  };

  const handleChange = (id, field, value) => {
    setTurfs((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, [field]: field === "availability" ? value.split(",") : value } : t
      )
    );
  };

  if (loading) return <p>Loading your turfs...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Turfs</h2>
      {turfs.length === 0 && <p>You have not added any turfs yet.</p>}
      {turfs.map((turf) => (
        <div key={turf._id} className="border rounded p-4 mb-4 shadow">
          <h3 className="text-xl font-semibold">{turf.name}</h3>
          <p>{turf.location}</p>

          {editing === turf._id ? (
            <>
              <label className="block mt-2">Price Per Hour</label>
              <input
                type="number"
                value={turf.pricePerHour}
                onChange={(e) => handleChange(turf._id, "pricePerHour", e.target.value)}
                className="border p-2 w-full"
              />

              <label className="block mt-2">Availability (comma separated)</label>
              <input
                type="text"
                value={turf.availability.join(",")}
                onChange={(e) => handleChange(turf._id, "availability", e.target.value)}
                className="border p-2 w-full"
              />

              <label className="block mt-2">Disable Booking (for maintenance)</label>
              <input
                type="checkbox"
                checked={turf.isDisabled}
                onChange={(e) => handleChange(turf._id, "isDisabled", e.target.checked)}
                className="ml-2"
              />

              <button
                className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
                onClick={() => handleUpdate(turf._id)}
              >
                Save
              </button>
              <button className="ml-2 text-gray-500" onClick={() => setEditing(null)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <p>₹{turf.pricePerHour} / hour</p>
              <p>Availability: {turf.availability.join(", ")}</p>
              <p>Status: {turf.isDisabled ? "Disabled (Maintenance)" : "Active"}</p>
              <button
                onClick={() => setEditing(turf._id)}
                className="mt-2 text-blue-600 underline"
              >
                Edit Turf
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyTurfs;
