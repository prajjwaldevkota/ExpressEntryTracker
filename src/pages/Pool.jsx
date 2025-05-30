import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FaUsers,
  FaChartBar,
  FaCalendarAlt,
  FaHashtag,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { BASE_URL } from "../Utils/utils";

// Memoized LoadingSpinner component
const LoadingSpinner = memo(function LoadingSpinner({ t }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-20">
      <div className="relative">
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-500/30 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
      </div>
      <p className="text-white text-lg sm:text-xl mt-4 sm:mt-6 animate-pulse">
        {t("pool.loading")}
      </p>
    </div>
  );
});

// Memoized StatCard component
const StatCard = memo(function StatCard({ icon: Icon, title, value, gradient }) {
  return (
    <div className="group relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-3xl p-4 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className={`p-3 sm:p-4 bg-gradient-to-br ${gradient.replace("/10", "")} rounded-lg sm:rounded-2xl shadow-lg`}>
            {Icon && <Icon className="text-white text-xl sm:text-2xl" />}
          </div>
          <div className="text-right">
            <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide">
              {title}
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800">
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

// Memoized PoolRangeCard component
const PoolRangeCard = memo(function PoolRangeCard({ range, value, totalCandidates, maxValue, index, t }) {
  const getScoreColor = useCallback((range) => {
    const score = parseInt(range.split("-")[0]);
    if (score >= 500) return "from-emerald-400 to-teal-500";
    if (score >= 450) return "from-blue-400 to-cyan-500";
    if (score >= 400) return "from-amber-400 to-orange-500";
    return "from-red-400 to-pink-500";
  }, []);

  const getRingColor = useCallback((range) => {
    const score = parseInt(range.split("-")[0]);
    if (score >= 500) return "ring-emerald-400/50";
    if (score >= 450) return "ring-blue-400/50";
    if (score >= 400) return "ring-amber-400/50";
    return "ring-red-400/50";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative"
    >
      <div className="flex items-center space-x-3 sm:space-x-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-slate-50/80 transition-all duration-300 cursor-pointer">
        <div
          className={`relative flex-shrink-0 w-16 sm:w-20 h-12 sm:h-14 bg-gradient-to-br ${getScoreColor(
            range
          )} rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center ring-4 ${getRingColor(
            range
          )} group-hover:scale-110 transition-transform duration-300`}
        >
          <span className="text-white font-bold text-xs sm:text-sm">
            {range}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="text-xs sm:text-sm text-slate-600 font-medium">
              {value.toLocaleString()} {t("pool.candidates")}
            </span>
            <span className="text-xs sm:text-sm text-slate-600 font-medium">
              {((value / totalCandidates) * 100).toFixed(3)}%
            </span>
          </div>
          <div className="h-1.5 sm:h-2 md:h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
              style={{
                width: `${(value / maxValue) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {index % 2 === 0 ? (
            <FaArrowUp className="text-emerald-500 w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <FaArrowDown className="text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default function Pool() {
  const [poolData, setPoolData] = useState([]);
  const [drawNumber, setDrawNumber] = useState(null);
  const [drawDate, setDrawDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const { t } = useTranslation();

  // Memoized maxValue calculation
  const maxValue = useMemo(() => Math.max(...poolData.map((r) => r.value)), [poolData]);

  // Memoized stat cards data
  const statCards = useMemo(
    () => [
      {
        icon: FaHashtag,
        title: t("pool.drawNumber"),
        value: drawNumber,
        gradient: "from-blue-500/10 to-blue-600/10",
      },
      {
        icon: FaCalendarAlt,
        title: t("pool.drawDate"),
        value: drawDate,
        gradient: "from-purple-500/10 to-pink-500/10",
      },
      {
        icon: FaUsers,
        title: t("pool.totalPool"),
        value: totalCandidates.toLocaleString(),
        gradient: "from-emerald-500/10 to-teal-500/10",
      },
    ],
    [drawNumber, drawDate, totalCandidates, t]
  );

  // Fetch data with cleanup
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    axios
      .get(`${BASE_URL}/pool`, { signal: controller.signal })
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
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.error("Error fetching pool data:", err);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-900 pt-14 sm:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-2xl">
            <FaUsers className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2 sm:mb-4">
            {t("pool.title")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 font-medium">
            {t("pool.subtitle")}
          </p>
        </motion.div>

        {loading ? (
          <LoadingSpinner t={t} />
        ) : (
          <>
            {/* Stats Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
            >
              {statCards.map((card, index) => (
                <StatCard
                  key={card.title}
                  {...card}
                  className={index === 2 ? "sm:col-span-2 md:col-span-1" : ""}
                />
              ))}
            </motion.div>

            {/* Interactive Pool Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 sm:p-8">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-blue-500/20 rounded-lg sm:rounded-xl">
                    <FaChartBar className="text-blue-400 text-xl sm:text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      {t("pool.distribution")}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-300">
                      {t("pool.breakdown")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-8">
                <div className="grid gap-3 sm:gap-4">
                  {poolData.map((range, index) => (
                    <PoolRangeCard
                      key={range.key}
                      range={range.range}
                      value={range.value}
                      totalCandidates={totalCandidates}
                      maxValue={maxValue}
                      index={index}
                      t={t}
                    />
                  ))}
                </div>
              </div>

              {/* Summary Footer */}
              <div className="bg-gradient-to-r from-slate-100 to-blue-50 p-4 sm:p-6 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                  <div className="text-center sm:text-left">
                    <p className="text-sm sm:text-base text-slate-600 font-medium">
                      {t("pool.highestConcentration")}:{" "}
                      <span className="font-bold text-slate-800">
                        431-450 {t("pool.range")}
                      </span>
                    </p>
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
