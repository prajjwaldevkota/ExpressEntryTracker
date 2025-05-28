import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaChartBar,
  FaCalendarAlt,
  FaHashtag,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { BASE_URL } from "../Utils/utils";

export default function Pool() {
  const [poolData, setPoolData] = useState([]);
  const [drawNumber, setDrawNumber] = useState(null);
  const [drawDate, setDrawDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalCandidates, setTotalCandidates] = useState(0);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/pool`)
      .then(({ data }) => {
        const parsed = data.pool.ranges.map((r) => ({
          ...r,
          value: parseInt(r.value.replace(/,/g, ""), 10),
        }));
        const totalEntry = parsed.find((r) => r.range === "Total");
        const buckets = parsed.filter((r) => r.range !== "Total");
        setPoolData(buckets);
        setTotalCandidates(totalEntry?.value ?? 0);
        setDrawNumber(data.pool.drawNumber);
        setDrawDate(data.pool.drawDate);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pool data:", err);
        setLoading(false);
      });
  }, []);

  const maxValue = Math.max(...poolData.map((r) => r.value));

  const getScoreColor = (range) => {
    const score = parseInt(range.split("-")[0]);
    if (score >= 500) return "from-emerald-400 to-teal-500";
    if (score >= 450) return "from-blue-400 to-cyan-500";
    if (score >= 400) return "from-amber-400 to-orange-500";
    return "from-red-400 to-pink-500";
  };

  const getRingColor = (range) => {
    const score = parseInt(range.split("-")[0]);
    if (score >= 500) return "ring-emerald-400/50";
    if (score >= 450) return "ring-blue-400/50";
    if (score >= 400) return "ring-amber-400/50";
    return "ring-red-400/50";
  };

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
          <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
            Pool Breakdown
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            Current Express Entry candidate distribution by CRS score ranges
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              <div className="group relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                      <FaHashtag className="text-white text-2xl" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                        Draw Number
                      </p>
                      <p className="text-4xl font-black text-slate-800">
                        {drawNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
                      <FaCalendarAlt className="text-white text-2xl" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                        Draw Date
                      </p>
                      <p className="text-2xl font-black text-slate-800">
                        {drawDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg">
                      <FaUsers className="text-white text-2xl" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                        Total Pool
                      </p>
                      <p className="text-3xl font-black text-slate-800">
                        {totalCandidates.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interactive Pool Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <FaChartBar className="text-blue-400 text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      CRS Score Distribution
                    </h2>
                    <p className="text-slate-300">
                      Interactive breakdown of candidate pool
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid gap-4">
                  {poolData.map((range, index) => {

                    return (
                      <motion.div
                        key={range.key}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="group relative"
                      >
                        <div className="flex items-center space-x-6 p-6 rounded-2xl hover:bg-slate-50/80 transition-all duration-300 cursor-pointer">
                          {/* Score Range Badge */}
                          <div
                            className={`relative flex-shrink-0 w-20 sm:w-24 h-14 sm:h-16 bg-gradient-to-br ${getScoreColor(
                              range.range
                            )} rounded-xl shadow-lg flex items-center justify-center ring-4 ${getRingColor(
                              range.range
                            )} group-hover:scale-110 transition-transform duration-300`}
                          >
                            <span className="text-white font-bold text-xs sm:text-sm">
                              {range.range}
                            </span>
                          </div>

                          {/* Progress Bar Container */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-slate-600 font-medium">
                                {range.value.toLocaleString()} candidates
                              </span>
                              <span className="text-sm text-slate-600 font-medium">
                                {(
                                  (range.value / totalCandidates) *
                                  100
                                ).toFixed(3)}
                                %
                              </span>
                            </div>
                            <div className="h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
                                style={{
                                  width: `${(range.value / maxValue) * 100}%`,
                                }}
                              />
                            </div>
                          </div>

                          {/* Trend Indicator */}
                          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {index % 2 === 0 ? (
                              <FaArrowUp className="text-emerald-500" />
                            ) : (
                              <FaArrowDown className="text-red-500" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Summary Footer */}
              <div className="bg-gradient-to-r from-slate-100 to-blue-50 p-6 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                  <div className="text-center sm:text-left">
                    <p className="text-slate-600 font-medium">
                      Highest concentration:{" "}
                      <span className="font-bold text-slate-800">
                        431-450 range
                      </span>
                    </p>
                    <p className="text-sm text-slate-500">
                      Data updated as of {drawDate}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-500">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                    <span>High Score</span>
                    <div className="w-3 h-3 bg-blue-400 rounded-full ml-4"></div>
                    <span>Mid Score</span>
                    <div className="w-3 h-3 bg-red-400 rounded-full ml-4"></div>
                    <span>Low Score</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
