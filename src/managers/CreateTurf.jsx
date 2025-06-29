import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setError,
  setSuccess,
  setNewTurf,
  resetTurfState,
} from "../redux/features/turfs/turfSlice";
import axios from "axios";

const TIME_SLOTS = [
  "06:00 - 07:00",
  "07:00 - 08:00",
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
];

const CreateTurfPage = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.turf);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    pricePerHour: "",
    availability: [],
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAvailabilityChange = (slot) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(slot)
        ? prev.availability.filter((s) => s !== slot)
        : [...prev.availability, slot],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetTurfState());
    dispatch(setLoading(true));

    try {
      const token = localStorage.getItem("token");
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("location", formData.location);
      payload.append("pricePerHour", formData.pricePerHour);

      formData.availability.forEach((slot) => payload.append("availability", slot));
      formData.images.forEach((img) => payload.append("images", img));

      const res = await axios.post("/api/turfs/create", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setNewTurf(res.data));
      dispatch(setSuccess(true));
      setFormData({
        name: "",
        location: "",
        pricePerHour: "",
        availability: [],
        images: [],
      });
    } catch (err) {
      dispatch(setError(err.response?.data?.msg || "Something went wrong"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Turf</h2>

      {loading && <p className="text-blue-600">Creating turf...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">Turf created successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium text-gray-700">Turf Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Price Per Hour (₹)</label>
          <input
            type="number"
            name="pricePerHour"
            value={formData.pricePerHour}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Availability (Time Slots)</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {TIME_SLOTS.map((slot) => (
              <label key={slot} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.availability.includes(slot)}
                  onChange={() => handleAvailabilityChange(slot)}
                />
                <span className="text-gray-600">{slot}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Upload Turf Images</label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="mt-1"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {formData.images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Turf
        </button>
      </form>
    </div>
  );
};

export default CreateTurfPage;
