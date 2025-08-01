import { useState, useCallback, useMemo, useEffect } from "react";
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaCalendarAlt,
  FaUsers,
  FaHashtag,
  FaTag,
  FaHistory,
  FaFilter,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePaginatedData, useCategories } from "../Utils/useOptimizedData";
import { memo } from "react";

// Add custom debounce hook at the top level
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Memoized DrawCard component
const DrawCard = memo(function DrawCard({ draw, index }) {
  return (
    <motion.div
      key={index}
      className="group relative p-4 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      style={{ willChange: "transform, opacity" }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Draw #{draw.drawNumber}
          </h3>
          <span className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-xs sm:text-sm text-blue-300 rounded-full font-medium border border-blue-500/20">
            {draw.category || "General"}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center text-gray-300">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mr-3">
              <FaCalendarAlt className="text-blue-400" />
            </div>
            <span className="text-sm sm:text-base">{draw.date}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mr-3">
              <FaHashtag className="text-purple-400" />
            </div>
            <span className="text-sm sm:text-base">CRS: {draw.minimumCRS}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mr-3">
              <FaUsers className="text-green-400" />
            </div>
            <span className="text-sm sm:text-base">
              {draw.invitationsIssued} Invitations
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Loading skeleton component
const DrawCardSkeleton = memo(function DrawCardSkeleton() {
  return (
    <div className="group relative p-4 sm:p-6">
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="h-8 w-32 bg-white/10 rounded-lg animate-pulse"></div>
          <div className="h-6 w-24 bg-white/10 rounded-full animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div className="w-10 h-10 bg-white/10 rounded-xl animate-pulse mr-3"></div>
              <div className="h-6 w-40 bg-white/10 rounded-lg animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

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
      className="max-w-4xl mx-auto mb-12"
    >
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <FaFilter className="text-blue-400 text-xl" />
          <h2 className="text-xl sm:text-2xl text-white font-semibold">
            Filter Draws
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur"></div>
            <input
              type="text"
              placeholder="Filter by year (e.g. 2024)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="relative w-full p-4 pl-12 rounded-xl border border-white/10 bg-black/40 text-base sm:text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
            <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSortOrder}
            className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
            title="Toggle sort order"
          >
            {sortOrder === "asc" ? (
              <FaSortAmountUp size={20} className="text-white" />
            ) : (
              <FaSortAmountDown size={20} className="text-white" />
            )}
          </motion.button>

          <div className="relative flex-1">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur"></div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="relative w-full p-3 sm:p-4 pl-10 sm:pl-12 rounded-xl border border-white/10 bg-black/40 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-black text-white">
                  {cat}
                </option>
              ))}
            </select>
            <FaTag className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default function History() {
  const [yearInput, setYearInput] = useState(""); 
  const debouncedYear = useDebounce(yearInput, 500); 
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const { t } = useTranslation();

  const toggleSortOrder = useCallback(() => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  // Use optimized data hooks
  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.categories || [];

  const { data: drawsData, loading } = usePaginatedData('/draws', {
    year: debouncedYear || undefined,
    category: category || undefined
  }, 50);

  // Memoized sorted draws
  const sortedDraws = useMemo(() => {
    return [...(drawsData || [])].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [drawsData, sortOrder]);

  // Memoized paginated draws
  const paginatedDraws = useMemo(() => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    return sortedDraws.slice(startIndex, startIndex + cardsPerPage);
  }, [sortedDraws, currentPage]);

  const totalPages = Math.ceil(sortedDraws.length / cardsPerPage);

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [debouncedYear, category, sortOrder]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-900 pt-12 sm:pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ willChange: "transform" }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-2xl"
          >
            <FaHistory className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
            {t("history.title")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 font-medium">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {loading ? (
            <>
              {[...Array(cardsPerPage)].map((_, index) => (
                <DrawCardSkeleton key={index} />
              ))}
            </>
          ) : paginatedDraws.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-white/80 text-xl">No draws found.</p>
            </motion.div>
          ) : (
            paginatedDraws.map((draw, index) => (
              <DrawCard key={draw.drawNumber} draw={draw} index={index} />
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white transition-colors duration-200"
              aria-label="First page"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white transition-colors duration-200"
              aria-label="Previous page"
            >
              Previous
            </button>
            <span className="text-white/80 min-w-[100px] text-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white transition-colors duration-200"
              aria-label="Next page"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white transition-colors duration-200"
              aria-label="Last page"
            >
              Last
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
