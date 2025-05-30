import { useEffect, useState, useCallback, memo } from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/utils";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FaHashtag,
  FaCalendarAlt,
  FaChartLine,
  FaEnvelopeOpenText,
  FaLayerGroup,
  FaRegCalendarAlt,
  FaTrophy,
} from "react-icons/fa";

// Memoized StatCard component
const StatCard = memo(function StatCard({ icon: Icon, label, value, iconColor }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center gap-3 mb-2">
        {Icon && <Icon className={iconColor} />}
        <span className="text-slate-400">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </motion.div>
  );
});

// Memoized LoadingSpinner component
const LoadingSpinner = memo(function LoadingSpinner({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="text-white text-lg mt-6 font-medium">{message}</p>
    </div>
  );
});

export default function Home() {
  const [latestDraw, setLatestDraw] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const fetchLatestDraw = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/draws/latest`);
      setLatestDraw(data.draw);
    } catch (err) {
      console.error("Error fetching latest draw:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchLatestDraw();
    return () => controller.abort();
  }, [fetchLatestDraw]);

  const statCards = [
    {
      icon: FaHashtag,
      label: t("home.drawNumber"),
      value: latestDraw?.drawNumber,
      iconColor: "text-blue-400",
    },
    {
      icon: FaCalendarAlt,
      label: t("home.date"),
      value: latestDraw?.date,
      iconColor: "text-pink-400",
    },
    {
      icon: FaChartLine,
      label: t("home.minimumCRS"),
      value: latestDraw?.minimumCRS,
      iconColor: "text-green-400",
    },
    {
      icon: FaEnvelopeOpenText,
      label: t("home.invitations"),
      value: latestDraw?.invitationsIssued,
      iconColor: "text-yellow-400",
    },
    {
      icon: FaLayerGroup,
      label: t("home.category"),
      value: latestDraw?.category,
      iconColor: "text-purple-400",
    },
    {
      icon: FaRegCalendarAlt,
      label: t("home.year"),
      value: latestDraw?.year,
      iconColor: "text-indigo-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-900 pt-14 sm:pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-2xl">
            <FaTrophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl md:text-6xl sm:text-3xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-5">
            {t("home.title")}
          </h1>
          <p className="text-xl text-slate-400 font-medium">
            {t("home.subtitle")}
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
                <LoadingSpinner message={t("home.loading")} />
              ) : latestDraw ? (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {statCards.slice(0, 4).map((card, index) => (
                      <StatCard key={index} {...card} />
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {statCards.slice(4).map((card, index) => (
                      <StatCard key={index} {...card} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-white text-lg">{t("home.noData")}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}