import { useEffect, useState } from "react";
import axios from "axios";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { BASE_URL } from "../Utils/utils";


export default function History() {
  const [draws, setDraws] = useState([]);
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  // Fetch available categories for the filter.
  useEffect(() => {
    axios
      .get(`${BASE_URL}/categories`)
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Fetch draws based on filters.
  useEffect(() => {
    axios
      .get(`${BASE_URL}/draws`, {
        params: { year: year || undefined, category: category || undefined },
      })
      .then((res) => setDraws(res.data.draws))
      .catch((err) => console.error("Error fetching draws:", err));
  }, [year, category]);

  // Toggle the sort order between ascending and descending.
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Sort the draws by date.
  const sortedDraws = [...draws].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-6">
        Express Entry Draw History
      </h1>

      {/* Filter Section */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-gray-800/70 backdrop-blur-md border border-white/20 p-4 sm:p-6 rounded-xl shadow-lg">
          <h2 className="text-xl sm:text-2xl text-white font-semibold mb-4 text-center">
            Filter Draws
          </h2>
          <div className="flex flex-col md:flex-row md:space-x-4 gap-4">
            <input
              type="text"
              placeholder="Filter by year (e.g. 2024)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full md:w-1/2 p-2 sm:p-3 rounded-lg border border-white/20 bg-gray-700/70 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {/* Sort Icon Toggle */}
            <div className="flex justify-center items-center">
              <button
                onClick={toggleSortOrder}
                className="flex items-center justify-center p-2 sm:p-3 bg-blue-600 rounded-full hover:bg-blue-500 transition-all"
                title="Toggle sort order"
              >
                {sortOrder === "asc" ? (
                  <FaSortAmountUp size={20} className="text-white" />
                ) : (
                  <FaSortAmountDown size={20} className="text-white" />
                )}
                <span className="sr-only">Toggle sort order</span>
              </button>
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full md:w-1/2 p-2 sm:p-3 rounded-lg border border-white/20 bg-gray-700/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className="bg-gray-700 text-white"
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Draw Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {sortedDraws.length === 0 ? (
          <p className="text-white text-center col-span-full">
            No draws found.
          </p>
        ) : (
          sortedDraws.map((draw, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/30 p-4 sm:p-6 rounded-2xl shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <p className="text-white mb-1 sm:mb-2">
                <strong>Draw Number:</strong> {draw.drawNumber}
              </p>
              <p className="text-gray-300 mb-1 sm:mb-2">
                <strong>Date:</strong> {draw.date}
              </p>
              <p className="text-gray-300 mb-1 sm:mb-2">
                <strong>Minimum CRS:</strong> {draw.minimumCRS}
              </p>
              <p className="text-gray-300 mb-1 sm:mb-2">
                <strong>Invitations Issued:</strong> {draw.invitationsIssued}
              </p>
              <p className="text-gray-300 mb-1 sm:mb-2">
                <strong>Category:</strong> {draw.category || "N/A"}
              </p>
              <p className="text-gray-300">
                <strong>Year:</strong> {draw.year}
              </p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
