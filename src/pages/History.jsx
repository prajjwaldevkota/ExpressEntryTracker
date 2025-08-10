import { useState, useCallback, useMemo, useEffect } from "react"
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaCalendarAlt,
  FaUsers,
  FaHashtag,
  FaTag,
  FaHistory,
  FaFilter,
} from "react-icons/fa"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { usePaginatedData, useCategories } from "../Utils/useOptimizedData"
import { memo } from "react"

// Add custom debounce hook at the top level
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  return debouncedValue
}

// Memoized DrawCard component
const DrawCard = memo(function DrawCard({ draw, index }) {
  return (
    <motion.div
      key={index}
      className="group relative p-3 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      style={{ willChange: "transform, opacity" }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
      <div className="relative bg-slate-800 border-2 border-slate-700 hover:border-orange-500/50 p-4 sm:p-6 rounded-2xl shadow-2xl hover:shadow-orange-500/10 transition-all duration-300">
        <div className="flex items-start justify-between mb-4 sm:mb-6 gap-2 sm:gap-3">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-400 flex-1 min-w-0">Draw #{draw.drawNumber}</h3>
          <span 
            className="px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs sm:text-sm rounded-2xl font-semibold shadow-lg max-w-[100px] sm:max-w-[150px] truncate flex-shrink-0 cursor-help"
            title={draw.category || "General"}
          >
            {draw.category || "General"}
          </span>
        </div>

        <div className="space-y-3 sm:space-y-5">
          <div className="flex items-center text-slate-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
              <FaCalendarAlt className="text-white text-sm sm:text-lg" />
            </div>
            <span className="text-sm sm:text-base font-medium">{draw.date}</span>
          </div>

          <div className="flex items-center text-slate-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
              <FaHashtag className="text-white text-sm sm:text-lg" />
            </div>
            <span className="text-sm sm:text-base font-medium">CRS: {draw.minimumCRS}</span>
          </div>

          <div className="flex items-center text-slate-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
              <FaUsers className="text-white text-sm sm:text-lg" />
            </div>
            <span className="text-sm sm:text-base font-medium">{draw.invitationsIssued} Invitations</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
      </div>
    </motion.div>
  )
})

// Loading skeleton component
const DrawCardSkeleton = memo(function DrawCardSkeleton() {
  return (
    <div className="group relative p-3 sm:p-6">
      <div className="relative bg-slate-800 border-2 border-slate-700 p-4 sm:p-6 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="h-6 sm:h-8 w-24 sm:w-32 bg-slate-700 rounded-lg animate-pulse"></div>
          <div className="h-6 sm:h-8 w-20 sm:w-24 bg-slate-700 rounded-2xl animate-pulse"></div>
        </div>
        <div className="space-y-3 sm:space-y-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-700 rounded-2xl animate-pulse mr-3 sm:mr-4"></div>
              <div className="h-5 sm:h-6 w-32 sm:w-40 bg-slate-700 rounded-lg animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

// Memoized FilterSection component
const FilterSection = memo(function FilterSection({
  year,
  setYear,
  category,
  setCategory,
  categories,
  sortOrder,
  toggleSortOrder,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="max-w-4xl mx-auto mb-8 sm:mb-12"
    >
      <div className="bg-slate-800 border-2 border-slate-700 p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FaFilter className="text-white text-lg sm:text-xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl text-white font-bold">Filter Draws</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Filter by year (e.g. 2024)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-3 sm:p-4 pl-12 sm:pl-14 rounded-2xl border-2 border-slate-600 bg-slate-900 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm sm:text-base"
            />
            <FaCalendarAlt className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 text-orange-400 text-base sm:text-lg" />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSortOrder}
            className="p-3 sm:p-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
            title="Toggle sort order"
          >
            {sortOrder === "asc" ? (
              <FaSortAmountUp size={20} className="text-white" />
            ) : (
              <FaSortAmountDown size={20} className="text-white" />
            )}
          </motion.button>

          <div className="relative flex-1">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 sm:p-4 pl-12 sm:pl-14 rounded-2xl border-2 border-slate-600 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all appearance-none text-sm sm:text-base"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900 text-white">
                  {cat}
                </option>
              ))}
            </select>
            <FaTag className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 text-orange-400 text-base sm:text-lg" />
          </div>
        </div>
      </div>
    </motion.div>
  )
})

export default function History() {
  const [yearInput, setYearInput] = useState("")
  const debouncedYear = useDebounce(yearInput, 500)
  const [category, setCategory] = useState("")
  const [sortOrder, setSortOrder] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 6
  const { t, i18n } = useTranslation()

  const toggleSortOrder = useCallback(() => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
  }, [])

  // Use optimized data hooks
  const { data: categoriesData, refetch: refetchCategories } = useCategories()
  const categories = categoriesData?.categories || []

  const { data: drawsData, loading, refetch: refetchDraws } = usePaginatedData(
    "/draws",
    {
      year: debouncedYear || undefined,
      category: category || undefined,
    },
    50,
    true // includeLanguage: true to get French translations
  )

  // Refetch data when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log('[History] Language changed, refetching data...');
      refetchCategories()
      refetchDraws()
    }

    // Listen for language changes
    i18n.on('languageChanged', handleLanguageChange)
    console.log('[History] Language change listener added');
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
      console.log('[History] Language change listener removed');
    }
  }, [i18n, refetchCategories, refetchDraws])

  // Memoized sorted draws
  const sortedDraws = useMemo(() => {
    return [...(drawsData || [])].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })
  }, [drawsData, sortOrder])

  // Memoized paginated draws
  const paginatedDraws = useMemo(() => {
    const startIndex = (currentPage - 1) * cardsPerPage
    return sortedDraws.slice(startIndex, startIndex + cardsPerPage)
  }, [sortedDraws, currentPage])

  const totalPages = Math.ceil(sortedDraws.length / cardsPerPage)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedYear, category, sortOrder])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black pt-16 sm:pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ willChange: "transform" }}
            className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-3xl mb-6 sm:mb-8 shadow-2xl"
          >
            <FaHistory className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent mb-4 sm:mb-6">
            {t("history.title")}
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 font-medium max-w-2xl mx-auto px-2">
            {t("history.subtitle")}
          </p>
        </motion.div>

        {/* Filter Section */}
        <FilterSection
          year={yearInput}
          setYear={setYearInput}
          category={category}
          setCategory={setCategory}
          categories={categories}
          sortOrder={sortOrder}
          toggleSortOrder={toggleSortOrder}
        />

        {/* Draw Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {loading ? (
            <>
              {[...Array(cardsPerPage)].map((_, index) => (
                <DrawCardSkeleton key={index} />
              ))}
            </>
          ) : paginatedDraws.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl">
                <FaHistory className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <p className="text-white text-xl sm:text-2xl font-bold mb-2">No draws found.</p>
              <p className="text-slate-400 text-base sm:text-lg">Try adjusting your filters to see more results.</p>
            </motion.div>
          ) : (
            paginatedDraws.map((draw, index) => <DrawCard key={draw.drawNumber} draw={draw} index={index} />)
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center mt-8 sm:mt-12 gap-2 sm:gap-3">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 sm:px-5 py-2 sm:py-3 bg-slate-800 border-2 border-slate-700 hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl text-white text-sm sm:text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/20"
              aria-label="First page"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 sm:px-5 py-2 sm:py-3 bg-slate-800 border-2 border-slate-700 hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl text-white text-sm sm:text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/20"
              aria-label="Previous page"
            >
              Previous
            </button>
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl text-white text-sm sm:text-base font-bold min-w-[120px] sm:min-w-[140px] text-center shadow-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-5 py-2 sm:py-3 bg-slate-800 border-2 border-slate-700 hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl text-white text-sm sm:text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/20"
              aria-label="Next page"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-5 py-2 sm:py-3 bg-slate-800 border-2 border-slate-700 hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl text-white text-sm sm:text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/20"
              aria-label="Last page"
            >
              Last
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

