
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
import { FaChartLine, FaFilter, FaArrowUp } from "react-icons/fa"
import { BASE_URL } from "../Utils/utils"
import { useTranslation } from "react-i18next"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// Modern color palette for datasets
const colors = [
  { border: "rgba(16, 185, 129, 1)", background: "rgba(16, 185, 129, 0.2)" }, // Emerald
  { border: "rgba(59, 130, 246, 1)", background: "rgba(59, 130, 246, 0.2)" }, // Blue
  { border: "rgba(245, 158, 11, 1)", background: "rgba(245, 158, 11, 0.2)" }, // Amber
  { border: "rgba(168, 85, 247, 1)", background: "rgba(168, 85, 247, 0.2)" }, // Purple
  { border: "rgba(236, 72, 153, 1)", background: "rgba(236, 72, 153, 0.2)" }, // Pink
]

// Modern CategoryFilter component
const CategoryFilter = memo(function CategoryFilter({ categories, selectedCategories, onCategoryChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="max-w-4xl mx-auto mb-8"
    >
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <FaFilter className="text-white text-lg" />
          </div>
          <h2 className="text-2xl text-white font-bold">Filter Categories</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <motion.label
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 hover:border-emerald-500/50 text-white cursor-pointer hover:bg-slate-700/70 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-emerald-500/20"
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
                    ? "bg-gradient-to-r from-emerald-500 to-blue-500 border-emerald-500 shadow-lg"
                    : "border-slate-400 hover:border-emerald-400"
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
              <span className="truncate max-w-[200px]">{cat}</span>
            </motion.label>
          ))}
        </div>
      </div>
    </motion.div>
  )
})

// Modern LoadingSpinner component
const LoadingSpinner = memo(function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-slate-700 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin animate-reverse"></div>
      </div>
    </div>
  )
})

// Modern ChartContainer component
const ChartContainer = memo(function ChartContainer({ chartData, chartOptions }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Invitations Trends</h3>
        <p className="text-slate-300 text-sm">Track how the number of invitations issued has changed over time across different categories</p>
      </div>
      <div className="relative h-80 lg:h-96">
        <Line data={chartData} options={chartOptions} />
      </div>
    </motion.div>
  )
})

// Modern StatsCard component
const StatsCard = memo(function StatsCard({ title, value, change, icon: Icon, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg`}>
          {Icon && <Icon className="text-white text-lg" />}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
      </div>
      {change && (
        <div className={`text-sm font-medium ${change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {change > 0 ? '+' : ''}{change} from last month
        </div>
      )}
    </motion.div>
  )
})

export default function Trends() {
  const { t } = useTranslation()
  const [draws, setDraws] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [categories, setCategories] = useState([])

  // Fetch draws data
  useEffect(() => {
    const fetchDraws = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${BASE_URL}/draws`, {
          params: {
            limit: 100, // Get more draws for better trends
            sort: 'desc' // Get newest first
          }
        })
        const drawsData = response.data.draws || []
        console.log('Fetched draws:', drawsData) // Debug log
        
        // Filter out draws without essential data
        const validDraws = drawsData.filter(draw => 
          draw.date && 
          draw.minimumCRS && 
          draw.category && 
          draw.invitationsIssued
        )
        
        console.log('Valid draws:', validDraws) // Debug log
        setDraws(validDraws)
        
        // Extract unique categories
        const uniqueCategories = [...new Set(validDraws.map(draw => draw.category).filter(Boolean))]
        console.log('Categories found:', uniqueCategories) // Debug log
        setCategories(uniqueCategories)
        
        // Select first 3 categories by default, or all if less than 3
        const defaultCategories = uniqueCategories.slice(0, Math.min(3, uniqueCategories.length))
        setSelectedCategories(defaultCategories)
      } catch (error) {
        console.error("Error fetching draws:", error)
        setDraws([])
        setCategories([])
        setSelectedCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchDraws()
  }, [])

  // Handle category selection
  const handleCategoryChange = useCallback((event) => {
    const { value, checked } = event.target
    setSelectedCategories(prev => 
      checked 
        ? [...prev, value]
        : prev.filter(cat => cat !== value)
    )
  }, [])

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!draws.length || !selectedCategories.length) {
      console.log('No chart data - draws:', draws.length, 'categories:', selectedCategories.length)
      return null
    }

    const filteredDraws = draws.filter(draw => 
      selectedCategories.includes(draw.category) && 
      draw.invitationsIssued && 
      draw.date
    )

    console.log('Filtered draws for chart:', filteredDraws) // Debug log

    if (filteredDraws.length === 0) {
      console.log('No filtered draws available')
      return null
    }

    // Sort by date to ensure proper chronological order
    const sortedDraws = filteredDraws.sort((a, b) => new Date(a.date) - new Date(b.date))
    console.log('Sorted draws:', sortedDraws) // Debug log

    // Get all unique dates from the filtered draws to ensure consistent x-axis
    const allDates = [...new Set(sortedDraws.map(draw => draw.date))].sort((a, b) => new Date(a) - new Date(b))
    console.log('All dates for x-axis:', allDates) // Debug log

    const datasets = selectedCategories.map((category, index) => {
      const categoryDraws = sortedDraws.filter(draw => draw.category === category)
      console.log(`Category ${category} draws:`, categoryDraws) // Debug log
      
      // Map data to all dates, filling in missing values with 0
      const data = allDates.map(date => {
        const draw = categoryDraws.find(d => d.date === date)
        return draw ? draw.invitationsIssued : 0
      })
      
      return {
        label: category,
        data: data,
        borderColor: colors[index % colors.length].border,
        backgroundColor: colors[index % colors.length].background,
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    })

    const chartData = {
      labels: allDates,
      datasets
    }
    
    console.log('Final chart data:', chartData) // Debug log
    return chartData
  }, [draws, selectedCategories])

  // Chart options
  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12,
            weight: 'bold'
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#e2e8f0',
        borderColor: '#475569',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} invitations`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(71, 85, 105, 0.3)',
          borderColor: 'rgba(71, 85, 105, 0.5)'
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(71, 85, 105, 0.3)',
          borderColor: 'rgba(71, 85, 105, 0.5)'
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 11
          },
          callback: function(value) {
            return value.toLocaleString()
          }
        },
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Invitations',
          color: '#94a3b8',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  }), [])

  // Calculate statistics
  const stats = useMemo(() => {
    if (!draws.length) return []
    
    const recentDraws = draws.slice(-6) // Last 6 draws
    const avgInvitations = recentDraws.reduce((sum, draw) => sum + (draw.invitationsIssued || 0), 0) / recentDraws.length
    
    const totalInvitations = recentDraws.reduce((sum, draw) => sum + (draw.invitationsIssued || 0), 0)
    
    const categoriesCount = selectedCategories.length
    
    return [
      {
        title: "Average Invitations",
        value: Math.round(avgInvitations).toLocaleString(),
        change: null,
        icon: FaArrowUp,
        color: "from-emerald-500 to-emerald-600"
      },
      {
        title: "Total Invitations",
        value: totalInvitations.toLocaleString(),
        change: null,
        icon: FaChartLine,
        color: "from-blue-500 to-blue-600"
      },
      {
        title: "Categories Tracked",
        value: categoriesCount,
        change: null,
        icon: FaFilter,
        color: "from-amber-500 to-amber-600"
      }
    ]
  }, [draws, selectedCategories])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <LoadingSpinner />
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
              <FaChartLine className="w-10 h-10 lg:w-12 lg:h-12 text-white relative z-10" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-emerald-100 to-blue-200 bg-clip-text text-transparent mb-6 tracking-tight"
            >
              {t("trends.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg lg:text-xl text-slate-300 font-medium max-w-4xl mx-auto leading-relaxed px-4"
            >
              {t("trends.subtitle")}
            </motion.p>

            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mx-auto mt-8"
            />
          </motion.div>

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />

          {/* Statistics Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </motion.div>

          {/* Debug Info - Uncomment to troubleshoot data issues
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8 shadow-xl"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Debug Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div>
                <p><strong>Total Draws:</strong> {draws.length}</p>
                <p><strong>Categories:</strong> {categories.join(', ') || 'None'}</p>
                <p><strong>Selected:</strong> {selectedCategories.join(', ') || 'None'}</p>
              </div>
              <div>
                <p><strong>Chart Data:</strong> {chartData ? 'Available' : 'Not Available'}</p>
                <p><strong>Valid Draws:</strong> {draws.filter(d => d.date && d.minimumCRS && d.category).length}</p>
                <p><strong>Has Data:</strong> {chartData && chartData.datasets.some(d => d.data.length > 0) ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </motion.div>
          */}

          {/* Chart */}
          {chartData && chartData.datasets.some(dataset => dataset.data.length > 0) ? (
            <ChartContainer chartData={chartData} chartOptions={chartOptions} />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-700/50 rounded-2xl mb-4">
                <FaChartLine className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-400 text-xl font-medium mb-4">No chart data available</p>
              <p className="text-slate-500 text-base">Selected categories don't have enough data to display trends</p>
            </motion.div>
          )}

          {/* No Data State */}
          {(!chartData || !selectedCategories.length) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-700/50 rounded-2xl mb-4">
                <FaChartLine className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-400 text-xl font-medium mb-4">No data available</p>
              <p className="text-slate-500 text-base">
                {!draws.length ? 'No draws data found' : 'Select categories to view trends'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
