import { useState, useEffect, useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { NOC_URL } from "../Utils/utils";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Briefcase,
  Target,
  Users,
  X,
  ArrowUp,
  Clock,
  Award,
  MapPin,
  Grid3X3,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

// Simplified debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

// Modern NOC Card component
const NocCard = memo(function NocCard({ noc, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTeerColor = (teer) => {
    const colors = {
      "TEER 0": "from-emerald-500 to-emerald-600",
      "TEER 1": "from-blue-500 to-blue-600",
      "TEER 2": "from-purple-500 to-purple-600",
      "TEER 3": "from-amber-500 to-amber-600",
      "TEER 4": "from-orange-500 to-orange-600",
      "TEER 5": "from-red-500 to-red-600",
    };
    return colors[teer] || "from-slate-500 to-slate-600";
  };

  const truncateText = (text, maxLength = 120) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${
                noc.teer ? getTeerColor(noc.teer.title) : "from-slate-500 to-slate-600"
              } rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-lg`}
            >
              {noc.noc_code.slice(0, 2)}
            </div>
            <div>
              <div className="text-sm font-medium text-slate-400 mb-1">
                NOC {noc.noc_code}
              </div>
              <h3 className="text-lg font-semibold text-white leading-tight">
                {noc.title}
              </h3>
            </div>
          </div>

          {noc.link && (
            <a
              href={noc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-sm font-medium rounded-lg transition-colors duration-200 border border-emerald-500/30"
            >
              <span className="hidden sm:inline">View</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {/* TEER Badge */}
        {noc.teer && (
          <div className="flex items-center gap-2 mb-4">
            <div className={`px-3 py-1 bg-gradient-to-r ${getTeerColor(noc.teer.title)} text-white text-xs font-semibold rounded-lg shadow-lg`}>
              {noc.teer.title}
            </div>
            <span className="text-sm text-slate-400">
              {noc.teer.description}
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          {isExpanded ? noc.description : truncateText(noc.description)}
        </p>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors duration-200"
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Briefcase size={14} />
            <span>Job Classification</span>
          </div>
          <div className="flex items-center gap-2">
            <Target size={14} />
            <span>Express Entry</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Modern SearchBar component
const SearchBar = memo(function SearchBar({ searchTerm, setSearchTerm, placeholder }) {
  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full pl-12 pr-4 py-4 border border-slate-600/50 rounded-2xl bg-slate-800/60 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all shadow-lg"
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-300 transition-colors duration-200"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
});

// Modern Pagination component
const Pagination = memo(function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <ChevronLeft size={20} />
      </button>
      
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
            page === currentPage
              ? "bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg"
              : typeof page === "number"
              ? "bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/50"
              : "text-slate-500 cursor-default"
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
});

// Modern LoadingSpinner component
const LoadingSpinner = memo(function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-slate-700 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-emerald-500 border-r-blue-500 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
});

export default function NOC() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [nocData, setNocData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const itemsPerPage = 12;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Fetch NOC data from API
  useEffect(() => {
    const fetchNocData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${NOC_URL}/api/nocs`, {
          params: {
            search: debouncedSearchTerm || undefined,
            page: currentPage,
            limit: itemsPerPage,
          },
          timeout: 10000,
        });
        
        if (response.data && response.data.data) {
          if (currentPage === 1) {
            setNocData(response.data.data);
            setFilteredData(response.data.data);
          } else {
            setNocData(prev => [...prev, ...response.data.data]);
            setFilteredData(prev => [...prev, ...response.data.data]);
          }
          setTotalPages(Math.ceil(response.data.pagination?.total / itemsPerPage) || 1);
        } else {
          if (currentPage === 1) {
            setNocData([]);
            setFilteredData([]);
          }
          setTotalPages(1);
        }
      } catch (err) {
        console.error('Error fetching NOC data:', err);
        setError(err.message || 'Failed to fetch NOC data');
        if (currentPage === 1) {
          setNocData([]);
          setFilteredData([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNocData();
  }, [debouncedSearchTerm, currentPage]);

  // Filter data based on search term
  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setFilteredData(nocData);
      return;
    }

    const filtered = nocData.filter(noc =>
      noc.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      noc.noc_code.includes(debouncedSearchTerm) ||
      (noc.description && noc.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    );

    setFilteredData(filtered);
  }, [debouncedSearchTerm, nocData]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    // Reset data when changing pages to avoid duplicates
    if (page === 1) {
      setNocData([]);
      setFilteredData([]);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
              <Briefcase className="w-10 h-10 lg:w-12 lg:h-12 text-white relative z-10" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-emerald-100 to-blue-200 bg-clip-text text-transparent mb-6 tracking-tight"
            >
              {t("noc.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg lg:text-xl text-slate-300 font-medium max-w-4xl mx-auto leading-relaxed px-4"
            >
              {t("noc.subtitle")}
            </motion.p>

            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mx-auto mt-8"
            />
          </motion.div>

          {/* Search Bar */}
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search NOC codes, job titles, or descriptions..."
          />

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mb-8"
          >
            <p className="text-slate-400 text-lg">
              Found <span className="text-emerald-400 font-semibold">{filteredData.length}</span> NOC codes
            </p>
          </motion.div>

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-2xl mb-4">
                <Briefcase className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-red-400 text-xl font-medium mb-4">Error loading data</p>
              <p className="text-slate-500 text-base">{error}</p>
            </motion.div>
          )}

          {/* NOC Grid */}
          {loading ? (
            <LoadingSpinner />
          ) : filteredData.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              >
                {filteredData.map((noc, index) => (
                  <NocCard key={noc.noc_code} noc={noc} index={index} />
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
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
                <Briefcase className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-400 text-xl font-medium mb-4">No NOC codes found</p>
              <p className="text-slate-500 text-base">Try adjusting your search terms</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
