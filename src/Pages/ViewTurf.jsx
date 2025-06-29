import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
import useFetch from "../Hooks/useFetch";
import { api } from "../api/axiosInstance";

const ViewTurf = () => {
  const { id } = useParams();
  const { data: turf, error, loading } = useFetch(`/turfs/${id}`);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/reviews/getReview/${id}`);
      setReviews(Array.isArray(response.data) ? response.data : response.data.reviews || []);
    } catch (err) {
      console.error("Error fetching reviews", err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/reviews/addreview/${id}`, { rating, comment }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSubmitted(true);
      setRating(5);
      setComment("");
      fetchReviews();
    } catch (err) {
      setSubmitError("Failed to submit review.");
    }
  };

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading turf...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10 text-gray-800">
      {/* Banner */}
      <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
        <img
          src={`http://localhost:3000/uploads/turfs/${turf.images?.[0]}`}
          alt="Main Turf"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">{turf.name}</h1>
        </div>
      </div>

      {/* Info + Gallery */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-xl p-6 border">
          <h2 className="text-2xl font-semibold mb-4">Turf Info</h2>
          <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" /> {turf.location}</p>
          <p className="flex items-center mb-2"><FaRupeeSign className="mr-2" /> ₹{turf.pricePerHour} / hour</p>

          <h3 className="mt-4 font-semibold">Available Time Slots:</h3>
          <ul className="list-disc ml-5 mt-1 text-sm text-gray-600">
            {turf.availability?.map((slot, idx) => (
              <li key={idx}>{slot}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {turf.images?.map((img, idx) => (
            <img
              key={idx}
              src={`http://localhost:3000/uploads/turfs/${img}`}
              alt={`Turf ${idx}`}
              className="rounded-lg h-40 object-cover shadow"
            />
          ))}
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-white shadow rounded-xl p-6 border">
        <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-gray-100 p-4 rounded-md">
                <div className="flex items-center text-yellow-500 mb-1">
                  {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-1">
                  — {review.user?.name || "Anonymous"} on{" "}
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="italic text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Review Form */}
      <div className="bg-white shadow rounded-xl p-6 border">
        <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
        {submitError && <p className="text-red-500 mb-2">{submitError}</p>}
        {submitted ? (
          <p className="text-green-600 font-medium">✅ Review submitted!</p>
        ) : (
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Rating (1–5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-24 px-2 py-1 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Comment</label>
              <textarea
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 border rounded resize-none"
                placeholder="Share your experience..."
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ViewTurf;
