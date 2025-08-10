import { useState, useEffect, useCallback, memo } from "react";
import axios from "axios";
import { NOC_URL } from "../Utils/utils";
import { useTranslation } from "react-i18next";
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

// Simplified debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

// Clean, modern NOC Card
const NocCard = memo(function NocCard({ noc, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTeerColor = (teer) => {
    const colors = {
      "TEER 0": "bg-emerald-500",
      "TEER 1": "bg-blue-500",
      "TEER 2": "bg-purple-500",
      "TEER 3": "bg-pink-500",
      "TEER 4": "bg-orange-500",
      "TEER 5": "bg-red-500",
    };
    return colors[teer] || "bg-slate-500";
  };

  const truncateText = (text, maxLength = 120) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div
      className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-slate-300"
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: "backwards",
      }}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 ${
                noc.teer ? getTeerColor(noc.teer.title) : "bg-slate-400"
              } rounded-lg flex items-center justify-center text-white font-semibold text-sm`}
            >
              {noc.noc_code.slice(0, 2)}
            </div>
            <div>
              <div className="text-sm font-medium text-slate-500 mb-1">
                NOC {noc.noc_code}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 leading-tight">
                {noc.title}
              </h3>
            </div>
          </div>

          {noc.link && (
            <a
              href={noc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <span className="hidden sm:inline">View</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {/* TEER Badge */}
        {noc.teer && (
          <div className="flex items-center gap-2 mb-4">
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${getTeerColor(
                noc.teer.title
              )} text-white text-xs font-medium rounded-full`}
            >
              <Award size={12} />
              {noc.teer.title}
            </div>
            <span className="text-xs text-slate-500">Skill Level</span>
          </div>
        )}

        {/* Description */}
        <div className="mb-4">
          <p className="text-slate-600 text-sm leading-relaxed">
            {isExpanded ? noc.description : truncateText(noc.description)}
          </p>
          {noc.description && noc.description.length > 120 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 transition-colors"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      </div>

      {/* Hierarchy Section */}
      {noc.hierarchy && (
        <div className="px-6 pb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Grid3X3 size={16} className="text-slate-500" />
              <span className="text-sm font-medium text-slate-700">
                Classification
              </span>
            </div>

            <div className="space-y-2">
              {noc.hierarchy.broad_group?.title && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-slate-600">
                    {noc.hierarchy.broad_group.title}
                  </span>
                </div>
              )}
              {noc.hierarchy.major_group?.title && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-slate-600">
                    {noc.hierarchy.major_group.title}
                  </span>
                </div>
              )}
              {noc.hierarchy.minor_group?.title && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-slate-600">
                    {noc.hierarchy.minor_group.title}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

// Clean loading skeleton
const LoadingSkeleton = memo(function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-slate-200 rounded-lg animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-20 animate-pulse"></div>
              <div className="h-5 bg-slate-200 rounded w-3/4 animate-pulse"></div>
            </div>
            <div className="h-8 w-16 bg-slate-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="h-4 bg-slate-200 rounded w-16 mb-4 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
});

// Simplified search input
const SearchInput = memo(function SearchInput({ value, onChange, onClear }) {
  return (
    <div className="relative">
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search occupations, skills, or NOC codes..."
          value={value}
          onChange={onChange}
          className="w-full pl-12 pr-12 py-4 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base shadow-sm"
        />
        {value && (
          <button
            onClick={onClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
});

// Clean scroll to top button
const ScrollToTop = memo(function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}
    >
      <ArrowUp size={20} />
    </button>
  );
});

export default function NocSearch() {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [nocData, setNocData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 12;
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { t } = useTranslation();

  // API fetch
  useEffect(() => {
    const controller = new AbortController();
    const fetchNocData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${NOC_URL}/api/nocs`, {
          params: {
            search: debouncedSearchTerm || undefined,
            page: page,
            limit: limit,
          },
          signal: controller.signal,
        });
        setNocData(response.data.data);
        setTotalEntries(response.data.pagination.total);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(
            err.response?.status === 404
              ? "No results found. Try different search terms."
              : "Something went wrong. Please try again."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNocData();
    return () => controller.abort();
  }, [debouncedSearchTerm, page]);

  const totalPages = Math.ceil(totalEntries / limit);

  // Event handlers
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  }, []);

  const handleSearchClear = useCallback(() => {
    setSearchTerm("");
    setPage(1);
  }, []);

  // Search debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Clean Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-lg">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            NOC Explorer
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-6">
            Discover Canadian occupations with our comprehensive National
            Occupational Classification database
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Canada</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Updated 2024</span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            onClear={handleSearchClear}
          />
        </div>

        {/* Stats Bar */}
        {!loading && nocData.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-sm">
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">
                    {totalEntries.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-500">
                    Occupations Found
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">
                    {page} / {totalPages}
                  </div>
                  <div className="text-sm text-slate-500">Current Page</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-600 text-lg">Searching occupations...</p>
            <div className="mt-8">
              <LoadingSkeleton />
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Something went wrong
              </h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && nocData.length === 0 && debouncedSearchTerm && (
          <div className="max-w-md mx-auto">
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-slate-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No Results Found
              </h3>
              <p className="text-slate-600 mb-6">
                We couldn't find any occupations matching{" "}
                <span className="font-semibold text-slate-900">
                  "{debouncedSearchTerm}"
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleSearchClear}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Search
                </button>
                <button
                  onClick={() => setSearchTerm("software")}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Try "Software"
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {!loading && !error && nocData.length > 0 && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {nocData.map((noc, index) => (
                <NocCard key={noc.noc_code} noc={noc} index={index} />
              ))}
            </div>

            {/* Clean Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                          page === pageNum
                            ? "bg-blue-600 text-white"
                            : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() =>
                    setPage((prev) => (prev < totalPages ? prev + 1 : prev))
                  }
                  disabled={page === totalPages}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Welcome State */}
        {!loading && !error && nocData.length === 0 && !debouncedSearchTerm && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                500+ NOC Codes
              </h3>
              <p className="text-slate-600 text-sm">
                Comprehensive occupation database
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                6 TEER Levels
              </h3>
              <p className="text-slate-600 text-sm">
                Training, Education, Experience levels
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Updated 2024
              </h3>
              <p className="text-slate-600 text-sm">
                Latest Canadian standards
              </p>
            </div>
          </div>
        )}
      </div>

      <ScrollToTop />
    </div>
  );
}
