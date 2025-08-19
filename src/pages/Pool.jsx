
import { useState, useEffect, useCallback, useMemo, memo } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { FaUsers, FaChartBar, FaCalendarAlt, FaTrophy, FaFire, FaArrowUp } from "react-icons/fa"

// Modern LoadingSpinner component
const LoadingSpinner = memo(function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-20 h-20 border-8 border-slate-700 rounded-full animate-pulse"></div>
        <div className="w-20 h-20 border-8 border-transparent border-t-emerald-500 rounded-full animate-spin absolute inset-0"></div>
        <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin animate-reverse absolute inset-2"></div>
      </div>
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
        <p className="text-slate-300 text-lg font-medium">Loading pool data...</p>
      </div>
    </div>
  )
})

// Modern StatCard component
const StatCard = memo(function StatCard({ icon: Icon, title, value, gradient, isHighlight }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative group ${isHighlight ? "col-span-full md:col-span-1" : ""}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full -translate-y-16 translate-x-16"></div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div
              className={`p-4 bg-gradient-to-br ${gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              {Icon && <Icon className="text-white text-2xl" />}
            </div>
            {isHighlight && (
              <div className="flex items-center space-x-1 bg-emerald-500/20 px-3 py-1 rounded-full">
                <FaFire className="text-emerald-400 text-sm" />
                <span className="text-emerald-400 text-xs font-bold">TOTAL</span>
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

// Modern PoolRangeCard component
const PoolRangeCard = memo(function PoolRangeCard({ range, value, totalCandidates, maxValue, index }) {
  const getScoreData = useCallback((range) => {
    const score = Number.parseInt(range.split("-")[0])
    if (score >= 500)
      return {
        color: "from-emerald-400 to-emerald-500",
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        icon: FaTrophy,
        label: "Elite",
      }
    if (score >= 450)
      return {
        color: "from-blue-400 to-blue-500",
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        icon: FaFire,
        label: "High",
      }
    if (score >= 400)
      return {
        color: "from-amber-400 to-amber-500",
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        icon: FaUsers,
        label: "Good",
      }
    return {
      color: "from-purple-400 to-purple-500",
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      icon: FaChartBar,
      label: "Entry",
    }
  }, [])

  const scoreData = getScoreData(range)
  const percentage = totalCandidates > 0 ? (value / totalCandidates) * 100 : 0
  const barWidth = maxValue > 0 ? (value / maxValue) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${scoreData.color} rounded-xl flex items-center justify-center shadow-lg`}>
            <scoreData.icon className="text-white text-lg" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{range}</h3>
            <p className={`text-sm font-medium ${scoreData.text}`}>{scoreData.label}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{value.toLocaleString()}</p>
          <p className="text-sm text-slate-400">{percentage.toFixed(1)}%</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${barWidth}%` }}
            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
            className={`h-full bg-gradient-to-r ${scoreData.color} rounded-full shadow-lg`}
          />
        </div>
        
        <div className="flex justify-between text-sm text-slate-400">
          <span>0</span>
          <span>{maxValue.toLocaleString()}</span>
        </div>
      </div>
    </motion.div>
  )
})

// Modern PoolInsights component
const PoolInsights = memo(function PoolInsights({ poolData }) {
  const insights = useMemo(() => {
    if (!poolData || !poolData.length) return []
    
    const totalCandidates = poolData.reduce((sum, range) => sum + range.value, 0)
    const highScoreCandidates = poolData.filter(range => {
      const score = Number.parseInt(range.range.split("-")[0])
      return score >= 450
    }).reduce((sum, range) => sum + range.value, 0)
    
    const avgScore = poolData.reduce((sum, range) => {
      const score = Number.parseInt(range.range.split("-")[0])
      return sum + (score * range.value)
    }, 0) / totalCandidates
    
    return [
      {
        title: "High Score Candidates",
        value: `${((highScoreCandidates / totalCandidates) * 100).toFixed(1)}%`,
        description: "Candidates with CRS 450+",
        icon: FaTrophy,
        color: "from-emerald-500 to-emerald-600"
      },
      {
        title: "Average CRS",
        value: Math.round(avgScore),
        description: "Weighted average score",
        icon: FaArrowUp,
        color: "from-blue-500 to-blue-600"
      },
      {
        title: "Competition Level",
        value: totalCandidates > 100000 ? "Very High" : totalCandidates > 50000 ? "High" : "Moderate",
        description: "Based on pool size",
        icon: FaUsers,
        color: "from-amber-500 to-amber-600"
      }
    ]
  }, [poolData])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mb-8"
    >
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 text-center">Pool Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${insight.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <insight.icon className="text-white text-lg" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
                <p className="text-2xl font-bold text-white">{insight.value}</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm">{insight.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
})

export default function Pool() {
  const { t } = useTranslation()
  const [poolData, setPoolData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch pool data
  useEffect(() => {
    const fetchPoolData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Simulate pool data since we don't have real API endpoint
        const mockPoolData = [
          { range: "500-600", value: 12500, totalCandidates: 150000 },
          { range: "450-499", value: 18750, totalCandidates: 150000 },
          { range: "400-449", value: 37500, totalCandidates: 150000 },
          { range: "350-399", value: 45000, totalCandidates: 150000 },
          { range: "300-349", value: 37500, totalCandidates: 150000 },
          { range: "250-299", value: 18750, totalCandidates: 150000 },
          { range: "200-249", value: 18750, totalCandidates: 150000 },
          { range: "150-199", value: 18750, totalCandidates: 150000 },
          { range: "100-149", value: 18750, totalCandidates: 150000 },
          { range: "50-99", value: 18750, totalCandidates: 150000 },
          { range: "0-49", value: 18750, totalCandidates: 150000 }
        ]
        
        setPoolData(mockPoolData)
      } catch (error) {
        console.error("Error fetching pool data:", error)
        setError("Failed to load pool data")
      } finally {
        setLoading(false)
      }
    }

    fetchPoolData()
  }, [])

  // Calculate totals
  const totalCandidates = useMemo(() => 
    poolData.reduce((sum, range) => sum + range.value, 0), 
    [poolData]
  )
  
  const maxValue = useMemo(() => 
    Math.max(...poolData.map(range => range.value)), 
    [poolData]
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaChartBar className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-slate-400 text-xl font-medium mb-2">Error loading pool data</p>
          <p className="text-slate-500 text-base">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-8">
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-12 lg:mb-16 pt-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-emerald-500 via-blue-600 to-purple-600 rounded-3xl mb-6 lg:mb-8 shadow-2xl shadow-emerald-500/25 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
              <FaUsers className="w-10 h-10 lg:w-12 lg:h-12 text-white relative z-10" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-emerald-100 to-blue-200 bg-clip-text text-transparent mb-6 tracking-tight"
            >
              {t("pool.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg lg:text-xl text-slate-300 font-medium max-w-4xl mx-auto leading-relaxed px-4"
            >
              {t("pool.subtitle")}
            </motion.p>

            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mx-auto mt-8"
            />
          </motion.div>

          {/* Key Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <StatCard
              icon={FaUsers}
              title="Total Candidates"
              value={totalCandidates.toLocaleString()}
              gradient="from-emerald-500 to-emerald-600"
              isHighlight={true}
            />
            <StatCard
              icon={FaChartBar}
              title="Score Ranges"
              value={poolData.length}
              gradient="from-blue-500 to-blue-600"
            />
            <StatCard
              icon={FaCalendarAlt}
              title="Last Updated"
              value="Today"
              gradient="from-amber-500 to-amber-600"
            />
          </motion.div>

          {/* Pool Insights */}
          <PoolInsights poolData={poolData} />

          {/* Pool Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 text-center">CRS Score Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {poolData.map((range, index) => (
                <PoolRangeCard
                  key={range.range}
                  range={range.range}
                  value={range.value}
                  totalCandidates={totalCandidates}
                  maxValue={maxValue}
                  index={index}
                  t={t}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
