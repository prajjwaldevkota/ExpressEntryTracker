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
  FaSearch,
} from "react-icons/fa"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { useOptimizedData } from "../Utils/useOptimizedData"
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

// Modern DrawCard component
const DrawCard = memo(function DrawCard({ draw, index }) {
  return (
    <motion.div
      key={index}
      className="group relative p-3 lg:p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      style={{ willChange: "transform, opacity" }}
    >
      <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-emerald-500/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 group-hover:-translate-y-1">
        <div className="flex items-start justify-between mb-6 gap-3">
          <h3 className="text-xl lg:text-2xl font-bold text-emerald-400 flex-1 min-w-0">Draw #{draw.drawNumber}</h3>
          <span 
            className="px-3 py-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-sm rounded-xl font-semibold shadow-lg max-w-[150px] truncate flex-shrink-0 cursor-help"
            title={draw.category || "General"}
          >
            {draw.category || "General"}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center text-slate-300">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <FaCalendarAlt className="text-white text-lg" />
            </div>
            <span className="text-base font-medium">{draw.date}</span>
          </div>

          <div className="flex items-center text-slate-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <FaHashtag className="text-white text-lg" />
            </div>
            <span className="text-base font-medium">CRS: {draw.minimumCRS}</span>
          </div>

          <div className="flex items-center text-slate-300">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <FaUsers className="text-white text-lg" />
            </div>
            <span className="text-base font-medium">{draw.invitationsIssued} Invitations</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
      </div>
    </motion.div>
  )
})

// Modern loading skeleton component
const DrawCardSkeleton = memo(function DrawCardSkeleton() {
  return (
    <div className="p-3 lg:p-4">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-32 bg-slate-700 rounded-lg animate-pulse"></div>
          <div className="h-8 w-24 bg-slate-700 rounded-xl animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div className="w-12 h-12 bg-slate-700 rounded-xl animate-pulse mr-4"></div>
              <div className="h-6 w-40 bg-slate-700 rounded-lg animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

// Modern filter component
const FilterSection = memo(function FilterSection({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  categories,
  sortOrder,
  setSortOrder 
}) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8 shadow-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder={t("history.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-slate-600/50 rounded-xl bg-slate-800/60 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all shadow-lg"
          />
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full px-3 py-3 border border-slate-600/50 rounded-xl bg-slate-800/60 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all shadow-lg appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,<svg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%206l5%205%205-5%202%201-7%207-7-7%202-1z%22%20fill%3D%22%23ffffff%22/%3E%3C/svg%3E')] bg-no-repeat bg-right-3 bg-[length:20px_20px] pr-10"
          >
            <option value="">{t("history.allCategories")}</option>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))
            ) : (
              <option value="" disabled>Loading categories...</option>
            )}
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl shadow-emerald-500/25"
          >
            {sortOrder === "desc" ? (
              <>
                <FaSortAmountDown className="w-5 h-5" />
                {t("history.newestFirst")}
              </>
            ) : (
              <>
                <FaSortAmountUp className="w-5 h-5" />
                {t("history.oldestFirst")}
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
})

export default function History() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortOrder, setSortOrder] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [allDraws, setAllDraws] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  
  // Fetch categories
  const { data: categoriesData } = useOptimizedData('/categories', {}, true)
  
  // Fetch draws with pagination
  const { data: drawsData, loading: drawsLoading, error: drawsError } = useOptimizedData('/draws', {
    page: currentPage,
    limit: 12,
    search: debouncedSearchTerm || undefined,
    category: selectedCategory || undefined,
    sort: sortOrder
  }, true)

  // Extract categories from the API response
  const categories = useMemo(() => {
    if (categoriesData?.categories) {
      return categoriesData.categories
    }
    if (categoriesData?.data) {
      return categoriesData.data
    }
    return []
  }, [categoriesData])

  // Handle draws data
  useEffect(() => {
    if (drawsData?.draws) {
      if (currentPage === 1) {
        setAllDraws(drawsData.draws)
      } else {
        setAllDraws(prev => [...prev, ...drawsData.draws])
      }
      setHasMore(drawsData.pagination?.hasNext || false)
    }
  }, [drawsData, currentPage])

  // Filter draws based on search and category
  const filteredDraws = useMemo(() => {
    if (!allDraws) return []
    
    let filtered = allDraws
    
    if (debouncedSearchTerm) {
      filtered = filtered.filter(draw => 
        draw.drawNumber?.toString().includes(debouncedSearchTerm) ||
        draw.category?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        draw.date?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(draw => draw.category === selectedCategory)
    }
    
    return filtered
  }, [allDraws, debouncedSearchTerm, selectedCategory])

  const handleLoadMore = useCallback(() => {
    if (hasMore && !drawsLoading) {
      setCurrentPage(prev => prev + 1)
    }
  }, [hasMore, drawsLoading])

  const resetFilters = useCallback(() => {
    setSearchTerm("")
    setSelectedCategory("")
    setCurrentPage(1)
    setAllDraws([])
  }, [])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
    setAllDraws([])
  }, [debouncedSearchTerm, selectedCategory])

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
              <FaHistory className="w-10 h-10 lg:w-12 lg:h-12 text-white relative z-10" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-emerald-100 to-blue-200 bg-clip-text text-transparent mb-6 tracking-tight"
            >
              {t("history.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg lg:text-xl text-slate-300 font-medium max-w-4xl mx-auto leading-relaxed px-4"
            >
              {t("history.subtitle")}
            </motion.p>

            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mx-auto mt-8"
            />
          </motion.div>

          {/* Filter Section */}
          <FilterSection
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          {/* Reset Filters Button */}
          {(searchTerm || selectedCategory) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-8"
            >
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700/50 hover:bg-slate-700/70 text-slate-300 hover:text-white font-medium rounded-xl transition-all duration-300 border border-slate-600/50 hover:border-slate-500/50"
              >
                <FaFilter className="w-4 h-4" />
                {t("history.resetFilters")}
              </button>
            </motion.div>
          )}

          {/* Error State */}
          {drawsError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-2xl mb-4">
                <FaHistory className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-red-400 text-xl font-medium mb-4">Error loading data</p>
              <p className="text-slate-500 text-base">Please try again later</p>
            </motion.div>
          )}

          {/* Draws Grid */}
          {drawsLoading && filteredDraws.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <DrawCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredDraws.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              >
                {filteredDraws.map((draw, index) => (
                  <DrawCard key={draw.id || index} draw={draw} index={index} />
                ))}
              </motion.div>

              {/* Load More Button */}
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mb-8"
                >
                  <button
                    onClick={handleLoadMore}
                    disabled={drawsLoading}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {drawsLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        {t("common.loading")}
                      </>
                    ) : (
                      <>
                        <FaHistory className="w-5 h-5" />
                        {t("history.loadMore")}
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-700/50 rounded-2xl mb-4">
                <FaHistory className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-400 text-xl font-medium mb-4">{t("history.noResults")}</p>
              <p className="text-slate-500 text-base">{t("history.tryDifferentFilters")}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

