import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/utils";
import { motion } from "framer-motion";
import {
  FaHashtag,
  FaCalendarAlt,
  FaChartLine,
  FaEnvelopeOpenText,
  FaLayerGroup,
  FaRegCalendarAlt,
  FaTrophy,
} from "react-icons/fa";

export default function Home() {
  const [latestDraw, setLatestDraw] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/draws/latest`)
      .then(({ data }) => {
        setLatestDraw(data.draw);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching latest draw:", err);
        setLoading(false);
      });
  }, []);

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
            <FaTrophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
            Latest Draw Results
          </h1>
          <p className="text-xl text-slate-400 font-medium">
            Stay updated with the most recent Express Entry draw
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative">
            {/* Animated background elements */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                  </div>
                  <p className="text-white text-lg mt-6 font-medium">
                    Fetching the latest draw...
                  </p>
                </div>
              ) : latestDraw ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <FaHashtag className="text-blue-400" />
                        <span className="text-slate-400">Draw Number</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{latestDraw.drawNumber}</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <FaCalendarAlt className="text-pink-400" />
                        <span className="text-slate-400">Date</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{latestDraw.date}</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <FaChartLine className="text-green-400" />
                        <span className="text-slate-400">Minimum CRS</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{latestDraw.minimumCRS}</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <FaEnvelopeOpenText className="text-yellow-400" />
                        <span className="text-slate-400">Invitations</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{latestDraw.invitationsIssued}</p>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <FaLayerGroup className="text-purple-400" />
                        <span className="text-slate-400">Category</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{latestDraw.category}</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <FaRegCalendarAlt className="text-indigo-400" />
                        <span className="text-slate-400">Year</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{latestDraw.year}</p>
                    </motion.div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-white text-lg">No data found.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
