
import { useState, useEffect, useCallback, useMemo, memo } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { FaUsers, FaChartBar, FaCalendarAlt, FaHashtag, FaTrophy, FaFire } from "react-icons/fa"
import { BASE_URL } from "../Utils/utils"

// Memoized LoadingSpinner component
const LoadingSpinner = memo(function LoadingSpinner({ t }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-20 h-20 border-8 border-slate-700 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 w-20 h-20 border-8 border-transparent border-t-orange-500 rounded-full animate-spin"></div>
        <div className="absolute inset-2 w-16 h-16 border-4 border-transparent border-t-red-500 rounded-full animate-spin animate-reverse"></div>
      </div>
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
        <p className="text-slate-300 text-lg font-medium">{t("pool.loading")}</p>
      </div>
    </div>
  )
})

// Redesigned StatCard component
const StatCard = memo(function StatCard({ icon: Icon, title, value, gradient, isHighlight }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative group ${isHighlight ? "col-span-full md:col-span-1" : ""}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      <div className="relative bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full -translate-y-16 translate-x-16"></div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div
              className={`p-4 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="text-white text-2xl" />
            </div>
            {isHighlight && (
              <div className="flex items-center space-x-1 bg-orange-500/20 px-3 py-1 rounded-full">
                <FaFire className="text-orange-400 text-sm" />
                <span className="text-orange-400 text-xs font-bold">TOTAL</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</p>
            <p className="text-white text-3xl font-black">{value}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

// Completely redesigned PoolRangeCard component
const PoolRangeCard = memo(function PoolRangeCard({ range, value, totalCandidates, maxValue, index, t }) {
  const getScoreData = useCallback((range) => {
    const score = Number.parseInt(range.split("-")[0])
    if (score >= 500)
      return {
        color: "from-emerald-400 to-teal-500",
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        icon: FaTrophy,
        label: "Elite",
      }
    if (score >= 450)
      return {
        color: "from-orange-400 to-amber-500",
        bg: "bg-orange-500/10",
        text: "text-orange-400",
        icon: FaFire,
        label: "High",
      }
    if (score >= 400)
      return {
        color: "from-blue-400 to-cyan-500",
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        icon: FaUsers,
        label: "Good",
      }
    return {
      color: "from-red-400 to-pink-500",
      bg: "bg-red-500/10",
      text: "text-red-400",
      icon: FaChartBar,
      label: "Entry",
    }
  }, [])

  const scoreData = getScoreData(range)
  const percentage = ((value / totalCandidates) * 100).toFixed(1)
  const barWidth = (value / maxValue) * 100

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 hover:bg-slate-800/80 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`relative p-3 bg-gradient-to-br ${scoreData.color} rounded-xl shadow-lg`}>
              <scoreData.icon className="text-white text-lg" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-white text-xl font-bold">{range}</span>
                <span className={`px-2 py-1 ${scoreData.bg} ${scoreData.text} text-xs font-bold rounded-full`}>
                  {scoreData.label}
                </span>
              </div>
              <p className="text-slate-400 text-sm">CRS Score Range</p>
            </div>
          </div>

          <div className="text-right">
            <p className={`${scoreData.text} text-2xl font-black`}>{percentage}%</p>
            <p className="text-slate-400 text-sm">{value.toLocaleString()} candidates</p>
          </div>
        </div>

        <div className="relative">
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${barWidth}%` }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${scoreData.color} rounded-full relative`}
            >
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
            </motion.div>
          </div>

          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>0</span>
            <span>{maxValue.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

export default function Pool() {
  const [poolData, setPoolData] = useState([])
  const [drawNumber, setDrawNumber] = useState(null)
  const [drawDate, setDrawDate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [totalCandidates, setTotalCandidates] = useState(0)
  const { t } = useTranslation()

  const maxValue = useMemo(() => Math.max(...poolData.map((r) => r.value)), [poolData])

  const statCards = useMemo(
    () => [
      {
        icon: FaHashtag,
        title: t("pool.drawNumber"),
        value: `#${drawNumber}`,
        gradient: "from-orange-500 to-red-600",
      },
      {
        icon: FaCalendarAlt,
        title: t("pool.drawDate"),
        value: drawDate,
        gradient: "from-red-500 to-pink-600",
      },
      {
        icon: FaUsers,
        title: t("pool.totalPool"),
        value: totalCandidates.toLocaleString(),
        gradient: "from-pink-500 to-purple-600",
        isHighlight: true,
      },
    ],
    [drawNumber, drawDate, totalCandidates, t],
  )

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)

    axios
      .get(`${BASE_URL}/pool`, { signal: controller.signal })
      .then(({ data }) => {
        const parsed = data.pool.ranges.map((r) => ({
          ...r,
          value: Number.parseInt(r.value.replace(/,/g, ""), 10),
        }))
        const totalEntry = parsed.find((r) => r.range === "Total")
        const buckets = parsed.filter((r) => r.range !== "Total").reverse() // Reverse for better visual hierarchy

        setPoolData(buckets)
        setTotalCandidates(totalEntry?.value ?? 0)
        setDrawNumber(data.pool.drawNumber)
        setDrawDate(data.pool.drawDate)
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.error("Error fetching pool data:", err)
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          {/* Modern Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-3xl mb-8 shadow-2xl">
              <FaUsers className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent mb-6">
              {t("pool.title")}
            </h1>

            <p className="text-xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">{t("pool.subtitle")}</p>
          </motion.div>

          {loading ? (
            <LoadingSpinner t={t} />
          ) : (
            <div className="space-y-12">
              {/* Enhanced Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {statCards.map((card, index) => (
                  <StatCard key={card.title} {...card} />
                ))}
              </motion.div>

              {/* Redesigned Pool Visualization */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-2">{t("pool.distribution")}</h2>
                  <p className="text-slate-400 text-lg">{t("pool.breakdown")}</p>
                </div>

                <div className="grid gap-4">
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

                {/* Enhanced Summary */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl border border-slate-600/30 rounded-2xl p-8"
                >
                  <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                        <FaTrophy className="text-white text-xl" />
                      </div>
                      <div>
                        <p className="text-slate-300 text-sm font-medium">{t("pool.highestConcentration")}</p>
                        <p className="text-white text-xl font-bold">431-450 {t("pool.range")}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-slate-400">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
                        <span>Live Data</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaChartBar className="text-slate-500" />
                        <span>Updated {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
