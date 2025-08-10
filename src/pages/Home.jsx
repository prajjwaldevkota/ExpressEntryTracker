import { memo } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { useLatestDraw } from "../Utils/useOptimizedData"
import {
  FaHashtag,
  FaCalendarAlt,
  FaChartLine,
  FaEnvelopeOpenText,
  FaLayerGroup,
  FaRegCalendarAlt,
  FaTrophy,
} from "react-icons/fa"

// Memoized StatCard component with improved design
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
      className="group relative bg-white/[0.02] backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${getIconBackground(iconColor)} shadow-lg`}>
            {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
          </div>
          <span className="text-slate-300 text-xs sm:text-sm font-semibold tracking-wide uppercase">{label}</span>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">{value || "—"}</p>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
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
    "text-blue-400": "from-blue-500 to-blue-600",
    "text-green-400": "from-emerald-500 to-green-600",
    "text-yellow-400": "from-amber-500 to-yellow-600",
    "text-orange-400": "from-orange-500 to-red-500",
    "text-indigo-400": "from-indigo-500 to-purple-600",
    "text-cyan-400": "from-cyan-500 to-blue-500",
  }
  return gradients[iconColor] || "from-gray-500 to-gray-600"
}

// Helper function to get progress bar gradient
function getProgressGradient(iconColor) {
  const gradients = {
    "text-blue-400": "from-blue-400 to-blue-500",
    "text-green-400": "from-emerald-400 to-green-500",
    "text-yellow-400": "from-amber-400 to-yellow-500",
    "text-orange-400": "from-orange-400 to-red-500",
    "text-indigo-400": "from-indigo-400 to-purple-500",
    "text-cyan-400": "from-cyan-400 to-blue-500",
  }
  return gradients[iconColor] || "from-gray-400 to-gray-500"
}

// Enhanced LoadingSpinner component
const LoadingSpinner = memo(function LoadingSpinner({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 sm:py-16"
    >
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-white/10 rounded-full"></div>
        {/* Spinning ring */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin absolute top-0 left-0"></div>
        {/* Inner pulsing dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-slate-400 text-sm sm:text-base font-medium mt-4"
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  )
})

export default function Home() {
  const { t } = useTranslation()
  const { data, loading } = useLatestDraw()
  const latestDraw = data?.draw

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
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative z-10 pb-12 mt-0 sm:mt-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Enhanced Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 lg:mb-8 shadow-2xl shadow-blue-500/25 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl sm:rounded-3xl"></div>
              <FaTrophy className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white relative z-10" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4 sm:mb-6 tracking-tight"
            >
              {t("home.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl lg:text-2xl text-slate-300 font-medium max-w-4xl mx-auto leading-relaxed px-2"
            >
              {t("home.subtitle")}
            </motion.p>

            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-6 sm:mt-8"
            />
          </motion.div>

          {/* Enhanced Stats Grid */}
          {loading ? (
            <LoadingSpinner message={t("common.loading")} />
          ) : latestDraw ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12"
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
              className="text-center py-12 sm:py-16"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-red-500/10 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-bold">!</span>
                </div>
              </div>
              <p className="text-slate-400 text-lg sm:text-xl font-medium">{t("common.error")}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
