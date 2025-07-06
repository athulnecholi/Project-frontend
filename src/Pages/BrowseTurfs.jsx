import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/axiosInstance";

const BrowseTurfs = () => {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const res = await api.get('/turfs'); // ✅ Old route
        setTurfs(res.data);
      } catch (err) {
        console.error("Failed to fetch turfs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTurfs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Browse Turfs</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading turfs...</p>
      ) : turfs.length === 0 ? (
        <p className="text-center text-red-500">No turfs available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {turfs.map((turf) => (
            <div
              key={turf._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <div className="flex space-x-2 overflow-x-auto mb-2">
                {turf.images && turf.images.length > 0 ? (
                  turf.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={`${import.meta.env.VITE_API_BASE_URL}/uploads/turfs/${img}`}
                      alt={`Turf ${idx + 1}`}
                      className="min-w-[200px] h-[200px] object-cover rounded border"
                    />
                  ))
                ) : (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/uploads/placeholder.png`}
                    alt="placeholder"
                    className="w-5 h-5 object-cover rounded"
                  />
                )}
              </div>

              <h2 className="text-lg font-semibold mt-2">{turf.name}</h2>
              <p className="text-sm text-gray-600">{turf.location}</p>

              <div className="flex justify-between items-center mt-3">
                <Link
                  to={`/turfs/${turf._id}`}
                  className="text-blue-500 underline text-sm"
                >
                  View Details
                </Link>

                <Link
                  to={`/user/book/${turf._id}`}
                  className="btn btn-sm btn-primary"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseTurfs;
