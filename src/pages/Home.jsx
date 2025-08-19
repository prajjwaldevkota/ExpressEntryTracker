import { memo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLatestDraw } from "../Utils/useOptimizedData";
import {
  FaHashtag,
  FaCalendarAlt,
  FaChartLine,
  FaEnvelopeOpenText,
  FaLayerGroup,
  FaRegCalendarAlt,
  FaTrophy,
  FaArrowRight,
  FaCalculator,
  FaHistory,
  FaUsers,
} from "react-icons/fa";

// Modern StatCard component
const StatCard = memo(function StatCard({ icon: Icon, label, value, iconColor, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2 },
      }}
      className="group relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-center gap-5 mb-6">
          <div className={`p-4 rounded-xl bg-gradient-to-br ${getIconBackground(iconColor)} shadow-lg`}>
            {Icon && <Icon className="w-6 h-6 text-white" />}
          </div>
          <span className="text-slate-300 text-base font-semibold tracking-wide uppercase">{label}</span>
        </div>
        <p className="text-4xl font-bold text-white mb-4 tracking-tight">{value || "—"}</p>
        <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${getProgressGradient(iconColor)} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  )
})

// Helper function to get icon background gradient
function getIconBackground(iconColor) {
  const gradients = {
    "text-emerald-400": "from-emerald-500 to-emerald-600",
    "text-blue-400": "from-blue-500 to-blue-600",
    "text-amber-400": "from-amber-500 to-amber-600",
    "text-orange-400": "from-orange-500 to-orange-600",
    "text-purple-400": "from-purple-500 to-purple-600",
    "text-cyan-400": "from-cyan-500 to-cyan-600",
  };
  return gradients[iconColor] || "from-slate-500 to-slate-600";
}

// Helper function to get progress bar gradient
function getProgressGradient(iconColor) {
  const gradients = {
    "text-emerald-400": "from-emerald-400 to-emerald-500",
    "text-blue-400": "from-blue-400 to-blue-500",
    "text-amber-400": "from-amber-400 to-amber-500",
    "text-orange-400": "from-orange-400 to-orange-500",
    "text-purple-400": "from-purple-400 to-purple-500",
    "text-cyan-400": "from-cyan-400 to-cyan-500",
  };
  return gradients[iconColor] || "from-slate-400 to-slate-500";
}

// Modern LoadingSpinner component
const LoadingSpinner = memo(function LoadingSpinner({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16"
    >
      <div className="relative">
        {/* Outer ring */}
        <div className="w-20 h-20 border-4 border-slate-700 rounded-full"></div>
        {/* Spinning ring */}
        <div className="w-20 h-20 border-4 border-transparent border-t-emerald-500 border-r-blue-500 rounded-full animate-spin absolute top-0 left-0"></div>
        {/* Inner pulsing dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-slate-400 text-base font-medium mt-6"
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
});

// Feature Card component
const FeatureCard = memo(function FeatureCard({ icon: Icon, title, description, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-8 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <div className="flex items-start gap-6">
        <div className={`p-4 rounded-xl bg-gradient-to-br ${color} shadow-lg flex-shrink-0`}>
          {Icon && <Icon className="w-7 h-7 text-white" />}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
          <p className="text-slate-300 text-base leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  )
})

export default function Home() {
  const { t } = useTranslation();
  const { data, loading } = useLatestDraw();
  const latestDraw = data?.draw;
  const navigate = useNavigate();

  const statCards = [
    {
      icon: FaHashtag,
      label: t("home.drawNumber"),
      value: latestDraw?.drawNumber,
      iconColor: "text-emerald-400",
    },
    {
      icon: FaCalendarAlt,
      label: t("home.date"),
      value: latestDraw?.date,
      iconColor: "text-blue-400",
    },
    {
      icon: FaChartLine,
      label: t("home.minimumCRS"),
      value: latestDraw?.minimumCRS,
      iconColor: "text-amber-400",
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
      iconColor: "text-purple-400",
    },
    {
      icon: FaRegCalendarAlt,
      label: t("home.year"),
      value: latestDraw?.year,
      iconColor: "text-cyan-400",
    },
  ];

  const features = [
    {
      icon: FaChartLine,
      title: "Real-time Tracking",
      description:
        "Monitor Express Entry draws as they happen with live updates and notifications.",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: FaCalculator,
      title: "CRS Calculator",
      description:
        "Calculate your Comprehensive Ranking System score with our advanced 2025 calculator.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FaHistory,
      title: "Historical Data",
      description:
        "Access comprehensive historical data to analyze trends and patterns over time.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: FaUsers,
      title: "Pool Analysis",
      description:
        "Understand the current Express Entry pool composition and your position.",
      color: "from-amber-500 to-amber-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden pb-8">
      {/* Simple background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Modern Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-20 lg:mb-24 pt-12 lg:pt-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-emerald-500 via-blue-600 to-purple-600 rounded-3xl mb-8 lg:mb-10 shadow-2xl shadow-emerald-500/25 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
              <FaTrophy className="w-12 h-12 lg:w-14 lg:h-14 text-white relative z-10" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-emerald-100 to-blue-200 bg-clip-text text-transparent mb-8 tracking-tight"
            >
              {t("home.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl lg:text-2xl text-slate-300 font-medium max-w-5xl mx-auto leading-relaxed px-4 mb-8"
            >
              {t("home.subtitle")}
            </motion.p>

            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "160px" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mx-auto"
            />
          </motion.div>

          {/* Modern Stats Grid */}
          {loading ? (
            <LoadingSpinner message={t("common.loading")} />
          ) : latestDraw ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-24"
            >
              {statCards.map((card, index) => (
                <StatCard key={index} {...card} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-2xl mb-6">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">!</span>
                </div>
              </div>
              <p className="text-slate-400 text-2xl font-medium">{t("common.error")}</p>
            </motion.div>
          )}

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-24"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Everything You Need
              </h2>
              <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
                Comprehensive tools and insights to navigate your Express Entry journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} index={index} />
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-3xl p-10 lg:p-16">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Calculate Your CRS Score?
              </h3>
              <p className="text-slate-300 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
                Use our advanced CRS calculator to see where you stand and get personalized insights
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/calculator")}
                className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 shadow-emerald-500/25"
              >
                Calculate CRS Score
                <FaArrowRight className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
