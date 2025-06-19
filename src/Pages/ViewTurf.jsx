import React, { useState, useEffect } from 'react';
import useFetch from '../Hooks/useFetch';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { api } from '../api/axiosInstance';

function ViewTurf() {
  const { id } = useParams();
  const { data: turf, error, loading } = useFetch(`/turfs/${id}`);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/reviews/getReview/${id}`);
      setReviews(Array.isArray(response.data) ? response.data : response.data.reviews || []);

    } catch (err) {
      console.error('Failed to fetch reviews', err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/reviews/addreview/${id}`, { rating, comment }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
        
      });
      console.log("Submitting review for turf:", id);

      setSubmitted(true);
      setComment('');
      setRating(5);
      fetchReviews();
    } catch (err) {
      console.log("Submitting to: ", `/api/reviews/${id}`);

      setSubmitError('Failed to submit review.');
    }
  };

  if (loading) return <p>Loading Turf...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded shadow space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{turf.name}</h2>
        <p className="mb-1 text-gray-600">Location: {turf.location}</p>
        <p className="mb-1 text-gray-600">Price: ₹{turf.pricePerHour} / hour</p>

        {turf.images?.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-3">
            {turf.images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:3000/uploads/turfs/${img}`}
                alt={`Turf ${index}`}
                className="w-full h-40 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-semibold mt-4">Available Slots:</h3>
        <ul className="list-disc ml-5 text-gray-700">
          {turf.availability?.map((slot, index) => (
            <li key={index}>{slot}</li>
          ))}
        </ul>
      </div>

      {/* Reviews Section */}
      <div>
        <h3 className="text-xl font-bold mt-6 mb-2">User Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border p-3 rounded mb-2">
              <p><strong>Rating:</strong> ⭐ {review.rating}</p>
              <p><strong>Comment:</strong> {review.comment}</p>
              <p className="text-sm text-gray-500">
                {review.user?.name || "Anonymous"} on {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 italic">No reviews yet.</p>
        )}
      </div>

      {/* Add Review Form */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-xl font-bold mb-2">Add Your Review</h3>
        {submitError && <p className="text-red-500">{submitError}</p>}
        {submitted ? (
          <p className="text-green-600 font-semibold">Review submitted!</p>
        ) : (
          <form onSubmit={handleReviewSubmit} className="space-y-3">
            <div>
              <label className="block font-medium">Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border px-2 py-1 rounded w-20"
              />
            </div>
            <div>
              <label className="block font-medium">Comment</label>
              <textarea
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ViewTurf;
