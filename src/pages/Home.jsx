import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "/api";

export default function Home() {
  const [latestDraw, setLatestDraw] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/draws/latest`)
      .then(({ data }) => {
        setLatestDraw(data.draw);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching latest draw:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-xl p-8 max-w-md w-full shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Latest Express Entry Draw
        </h1>
        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : latestDraw ? (
          <div className="text-white items-center justify-center">
            <p><strong>Draw Number:</strong> {latestDraw.drawNumber}</p>
            <p><strong>Date:</strong> {latestDraw.date}</p>
            <p><strong>Minimum CRS:</strong> {latestDraw.minimumCRS}</p>
            <p><strong>Invitations Issued:</strong> {latestDraw.invitationsIssued}</p>
            <p><strong>Category:</strong> {latestDraw.category}</p>
            <p><strong>Year:</strong> {latestDraw.year}</p>
          </div>
        ) : (
          <p className="text-white text-center">No data found.</p>
        )}
      </div>
    </div>
  );
}
