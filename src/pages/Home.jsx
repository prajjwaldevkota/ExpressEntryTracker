import { memo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLatestDraw } from "../Utils/useOptimizedData";
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
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        {Icon && <Icon className={iconColor} />}
        <span className="text-gray-300 text-sm font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value || "—"}</p>
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
  const { t } = useTranslation();
  const { data, loading } = useLatestDraw();
  const latestDraw = data?.draw;

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
      iconColor: "text-green-400",
    },
    {
      icon: FaChartLine,
      label: t("home.minimumCRS"),
      value: latestDraw?.minimumCRS,
      iconColor: "text-yellow-400",
    },
    {
      icon: FaEnvelopeOpenText,
      label: t("home.invitations"),
      value: latestDraw?.invitationsIssued,
      iconColor: "text-orange-400",
    },
    {
      icon: FaLayerGroup,
      label: t("home.category"),
      value: latestDraw?.category,
      iconColor: "text-indigo-400",
    },
    {
      icon: FaRegCalendarAlt,
      label: t("home.year"),
      value: latestDraw?.year,
      iconColor: "text-cyan-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-12 sm:pt-16 pb-12 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-2xl">
            <FaTrophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl sm:text-4xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-5">
            {t("home.title")}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed">
            {t("home.subtitle")}
          </p>
        </motion.div>

        {/* Stats Grid */}
        {loading ? (
          <LoadingSpinner message={t("common.loading")} />
        ) : latestDraw ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {statCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <StatCard {...card} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">{t("common.error")}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}