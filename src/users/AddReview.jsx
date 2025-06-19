import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosInstance';

function AddReview() {
  const { turfId } = useParams();  // <-- From route /review/:turfId
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(false);

  const addReview = async () => {
    try {
      const response = await api.post(
        `/reviews/${turfId}`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setComment('');
        setRating(5);
      }
    } catch (error) {
      console.log('Error adding review:', error);
      setSubmitError('Failed to submit review.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded bg-white shadow space-y-4">
      <h2 className="text-2xl font-bold mb-4">Add a Review</h2>

      {success && <p className="text-green-600 font-medium">Review submitted successfully!</p>}
      {submitError && <p className="text-red-500">{submitError}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border px-3 py-1 rounded w-20"
          />
        </div>

        <div>
          <label className="block font-medium">Comment</label>
          <textarea
            rows="4"
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
    </div>
  );
}

export default AddReview;
