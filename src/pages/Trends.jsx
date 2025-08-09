
import { useEffect, useState, useCallback, useMemo, memo } from "react"
import axios from "axios"
import { Line } from "react-chartjs-2"
import { motion } from "framer-motion"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { FaChartLine, FaFilter } from "react-icons/fa"
import { BASE_URL } from "../Utils/utils"
import { useTranslation } from "react-i18next"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// Modern warm color palette for datasets
const colors = [
  { border: "rgba(251, 146, 60, 1)", background: "rgba(251, 146, 60, 0.2)" }, // Orange
  { border: "rgba(239, 68, 68, 1)", background: "rgba(239, 68, 68, 0.2)" }, // Red
  { border: "rgba(236, 72, 153, 1)", background: "rgba(236, 72, 153, 0.2)" }, // Pink
  { border: "rgba(245, 158, 11, 1)", background: "rgba(245, 158, 11, 0.2)" }, // Amber
  { border: "rgba(217, 70, 239, 1)", background: "rgba(217, 70, 239, 0.2)" }, // Fuchsia
]

// Memoized CategoryFilter component
const CategoryFilter = memo(function CategoryFilter({ categories, selectedCategories, onCategoryChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="max-w-4xl mx-auto mb-6 sm:mb-8"
    >
      <div className="bg-slate-800 border-2 border-slate-700 p-4 sm:p-6 rounded-3xl shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FaFilter className="text-white text-lg" />
          </div>
          <h2 className="text-xl sm:text-2xl text-white font-bold">Filter Categories</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <motion.label
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-3 rounded-2xl bg-slate-700 border-2 border-slate-600 hover:border-orange-500 text-white cursor-pointer hover:bg-slate-600 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-orange-500/20"
            >
              <input
                type="checkbox"
                className="sr-only"
                value={cat}
                checked={selectedCategories.includes(cat)}
                onChange={onCategoryChange}
              />
              <span
                className={`w-5 h-5 mr-3 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${
                  selectedCategories.includes(cat)
                    ? "bg-gradient-to-r from-orange-500 to-red-500 border-orange-500 shadow-lg"
                    : "border-slate-400 hover:border-orange-400"
                }`}
              >
                {selectedCategories.includes(cat) && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
              <span className="truncate max-w-[120px] sm:max-w-[200px]">{cat}</span>
            </motion.label>
          ))}
        </div>
      </div>
    </motion.div>
  )
})

// Memoized LoadingSpinner component
const LoadingSpinner = memo(function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-slate-600 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-transparent border-t-orange-500 rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-12 h-12 sm:w-16 sm:h-16 border-4 border-transparent border-t-red-500 rounded-full animate-spin animate-reverse"></div>
      </div>
    </div>
  )
})

export default function Trends() {
  const { t } = useTranslation()
  const [draws, setDraws] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [loading, setLoading] = useState(true)

  // Memoized chart options
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            color: "#f1f5f9",
            font: { size: 14, family: "'Inter', sans-serif", weight: "600" },
            padding: 20,
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 12,
            boxHeight: 12,
          },
        },
        title: {
          display: true,
          text: t("trends.chartTitle"),
          color: "#f97316",
          font: {
            size: 20,
            family: "'Inter', sans-serif",
            weight: "700",
          },
          padding: 24,
        },
        tooltip: {
          backgroundColor: "rgba(30, 41, 59, 0.95)",
          titleColor: "#f97316",
          bodyColor: "#f1f5f9",
          borderColor: "#f97316",
          borderWidth: 2,
          cornerRadius: 12,
          padding: 12,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: t("trends.xAxisLabel"),
            color: "#f1f5f9",
            font: { size: 14, family: "'Inter', sans-serif", weight: "600" },
          },
          ticks: {
            color: "#cbd5e1",
            font: { size: 12, weight: "500" },
          },
          grid: {
            color: "rgba(248, 113, 113, 0.1)",
            drawBorder: false,
          },
        },
        y: {
          title: {
            display: true,
            text: t("trends.yAxisLabel"),
            color: "#f1f5f9",
            font: { size: 14, family: "'Inter', sans-serif", weight: "600" },
          },
          ticks: {
            color: "#cbd5e1",
            font: { size: 12, weight: "500" },
          },
          grid: {
            color: "rgba(248, 113, 113, 0.1)",
            drawBorder: false,
          },
        },
      },
      interaction: { intersect: false, mode: "index" },
      elements: {
        line: {
          tension: 0.4,
          borderWidth: 3,
        },
        point: {
          radius: 4,
          hoverRadius: 8,
          borderWidth: 2,
          hoverBorderWidth: 3,
        },
      },
    }),
    [t],
  )

  // Memoized chart data
  const chartData = useMemo(() => {
    if (!draws.length) return null

    const years = Array.from(new Set(draws.map((d) => d.year))).sort()
    const computeInvitations = (fn) =>
      years.map((y) => draws.filter((d) => d.year === y && fn(d)).reduce((s, d) => s + d.invitationsIssued, 0))

    if (!selectedCategories.length) {
      return {
        labels: years,
        datasets: [
          {
            label: t("trends.overallInvitations"),
            data: computeInvitations(() => true),
            borderColor: "rgba(251, 146, 60, 1)",
            backgroundColor: "rgba(251, 146, 60, 0.2)",
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: "rgba(251, 146, 60, 1)",
            pointBorderColor: "#1e293b",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
          },
        ],
      }
    }

    return {
      labels: years,
      datasets: selectedCategories.map((cat, i) => ({
        label: `${cat} Invitations`,
        data: computeInvitations((d) => d.category === cat),
        borderColor: colors[i % colors.length].border,
        backgroundColor: colors[i % colors.length].background,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: colors[i % colors.length].border,
        pointBorderColor: "#1e293b",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
      })),
    }
  }, [draws, selectedCategories, t])

  // Memoized handlers
  const handleCategoryChange = useCallback((e) => {
    const val = e.target.value
    setSelectedCategories((prev) => (prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]))
  }, [])

  // Fetch data
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)

    Promise.all([
      axios.get(`${BASE_URL}/draws`, { signal: controller.signal }),
      axios.get(`${BASE_URL}/categories`, { signal: controller.signal }),
    ])
      .then(([drawsRes, catsRes]) => {
        setDraws(drawsRes.data.draws)
        setCategories(catsRes.data.categories)
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.error("Error fetching data:", err)
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black pt-14 sm:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-3xl mb-6 sm:mb-8 shadow-2xl">
            <FaChartLine className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent mb-4 sm:mb-6">
            {t("trends.title")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            {t("trends.subtitle")}
          </p>
        </motion.div>

        {/* Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-slate-800 border-2 border-slate-700 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl"
        >
          <div className="h-[350px] sm:h-[450px] md:h-[550px]">
            {loading ? (
              <LoadingSpinner />
            ) : chartData ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <FaChartLine className="w-8 h-8 text-white" />
                </div>
                <p className="text-slate-400 text-lg font-medium">{t("common.error")}</p>
                <p className="text-slate-500 text-sm mt-2">Unable to load chart data</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
