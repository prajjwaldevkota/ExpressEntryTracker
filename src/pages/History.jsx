import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaCalendarAlt,
  FaUsers,
  FaHashtag,
  FaTag,
  FaHistory,
  FaFilter,
} from "react-icons/fa";
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
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-2xl">
            <FaHistory className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
            Draw History
          </h1>
          <p className="text-xl text-slate-400 font-medium">
            Explore all Express Entry draws and their details
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <FaFilter className="text-blue-400 text-xl" />
              <h2 className="text-2xl text-white font-semibold">Filter Draws</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur"></div>
                <input
                  type="text"
                  placeholder="Filter by year (e.g. 2024)"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="relative w-full p-4 pl-12 rounded-xl border border-white/10 bg-black/40 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
                <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSortOrder}
                className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                title="Toggle sort order"
              >
                {sortOrder === "asc" ? (
                  <FaSortAmountUp size={20} className="text-white" />
                ) : (
                  <FaSortAmountDown size={20} className="text-white" />
                )}
              </motion.button>

              <div className="relative flex-1">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur"></div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="relative w-full p-4 pl-12 rounded-xl border border-white/10 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                      className="bg-black text-white"
                    >
                      {cat}
                    </option>
                  ))}
                </select>
                <FaTag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Draw Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDraws.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-white/80 text-xl">No draws found.</p>
            </motion.div>
          ) : (
            sortedDraws.map((draw, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      Draw #{draw.drawNumber}
                    </h3>
                    <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/20">
                      {draw.category || "General"}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-gray-300">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mr-3">
                        <FaCalendarAlt className="text-blue-400" />
                      </div>
                      <span>{draw.date}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mr-3">
                        <FaHashtag className="text-purple-400" />
                      </div>
                      <span>CRS: {draw.minimumCRS}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mr-3">
                        <FaUsers className="text-green-400" />
                      </div>
                      <span>{draw.invitationsIssued} Invitations</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
