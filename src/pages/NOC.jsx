import React, { useState, useEffect, useCallback, memo } from "react";
import axios from "axios";
import { NOC_URL } from "../Utils/utils";
import { useTranslation } from "react-i18next";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Briefcase,
  Layers,
  Target,
  Users,
  TrendingUp,
  X,
  ArrowUp,
  Clock,
  Award,
  MapPin
} from "lucide-react";

// Memoized NocCard component with enhanced design
const NocCard = memo(function NocCard({ noc, index }) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getTeerColor = (teer) => {
    const colors = {
      "TEER 0": "from-emerald-500 to-teal-600",
      "TEER 1": "from-blue-500 to-indigo-600", 
      "TEER 2": "from-purple-500 to-violet-600",
      "TEER 3": "from-pink-500 to-rose-600",
      "TEER 4": "from-orange-500 to-amber-600",
      "TEER 5": "from-red-500 to-rose-600",
    };
    return colors[teer] || "from-gray-500 to-slate-600";
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Animation styles
  const cardStyle = {
    transform: isHovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    animationDelay: `${index * 0.1}s`,
    animationFillMode: 'backwards'
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const card = document.getElementById(`noc-card-${noc.noc_code}`);
      if (card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    }, index * 100);
    return () => clearTimeout(timer);
  }, [index, noc.noc_code]);

  return (
    <div
      id={`noc-card-${noc.noc_code}`}
      style={{
        ...cardStyle,
        opacity: 0,
        transform: 'translateY(30px)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="relative">
        {/* Enhanced glow effect */}
        <div 
          className={`absolute -inset-0.5 bg-gradient-to-r ${noc.teer ? getTeerColor(noc.teer.title) : 'from-gray-500 to-slate-600'} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-500`}
        ></div>
        
        {/* Main card */}
        <div className="relative bg-gradient-to-br from-white/[0.12] to-white/[0.04] backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden hover:border-white/25 transition-all duration-500 shadow-xl hover:shadow-2xl">
          {/* Top accent bar */}
          <div className={`h-1 bg-gradient-to-r ${noc.teer ? getTeerColor(noc.teer.title) : 'from-gray-500 to-slate-600'}`}></div>
          
          <div className="p-5 sm:p-7">
            {/* Header Section */}
            <div className="flex items-start gap-4 mb-5">
              {/* NOC Code Icon */}
              <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${noc.teer ? getTeerColor(noc.teer.title) : 'from-gray-500 to-slate-600'} rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
                <span className="text-white font-bold text-base sm:text-lg">
                  {noc.noc_code.slice(0, 2)}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 leading-tight mb-2">
                      <span className="inline-flex items-center gap-2">
                        <span className="text-blue-400 font-mono">{noc.noc_code}</span>
                        <span className="text-gray-500">•</span>
                      </span>
                      <span className="block sm:inline break-words mt-1 sm:mt-0">{noc.title}</span>
                    </h2>
                    
                    {/* TEER Badge with enhanced styling */}
                    {noc.teer && (
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getTeerColor(noc.teer.title)} shadow-md border border-white/10`}>
                          <TrendingUp className="w-3 h-3 mr-1.5" />
                          {noc.teer.title}
                        </div>
                        <div className="flex items-center text-xs text-gray-400">
                          <Award className="w-3 h-3 mr-1" />
                          <span>Skill Level</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* View Details Button */}
                  {noc.link && (
                    <div className="flex-shrink-0">
                      <a
                        href={noc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm group/btn"
                      >
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">Details</span>
                        <ExternalLink size={14} className="group-hover/btn:rotate-12 transition-transform duration-200" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description Section with enhanced styling */}
            <div className="mb-6">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-1 h-4 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mt-1"></div>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Description</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed ml-3 pl-3 border-l border-white/5">
                {isExpanded ? noc.description : truncateText(noc.description)}
              </p>
              {noc.description && noc.description.length > 150 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium mt-3 ml-6 transition-colors duration-200 flex items-center gap-1"
                >
                  {isExpanded ? 'Show Less' : 'Read More'}
                  <ChevronRight size={12} className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
              )}
            </div>

            {/* Enhanced Hierarchy Section */}
            {noc.hierarchy && (
              <div className="bg-gradient-to-r from-white/[0.04] to-white/[0.02] rounded-xl border border-white/5 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-gradient-to-b from-green-400 to-blue-500 rounded-full"></div>
                  <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Classification Hierarchy</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {noc.hierarchy.broad_group?.title && (
                    <div className="space-y-2 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                          Broad Group
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm leading-snug font-medium">
                        {noc.hierarchy.broad_group.title}
                      </p>
                    </div>
                  )}
                  
                  {noc.hierarchy.major_group?.title && (
                    <div className="space-y-2 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
                          Major Group
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm leading-snug font-medium">
                        {noc.hierarchy.major_group.title}
                      </p>
                    </div>
                  )}
                  
                  {noc.hierarchy.minor_group?.title && (
                    <div className="space-y-2 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="text-xs font-semibold text-purple-400 uppercase tracking-wide">
                          Minor Group
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm leading-snug font-medium">
                        {noc.hierarchy.minor_group.title}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

// Enhanced LoadingSkeleton component
const LoadingSkeleton = memo(function LoadingSkeleton() {
  return (
    <div className="w-full max-w-6xl mt-8 px-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          style={{
            opacity: 0,
            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`
          }}
          className="bg-white/[0.08] backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-xl animate-pulse"></div>
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-gradient-to-r from-white/10 to-white/5 rounded-lg w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-white/10 to-white/5 rounded-lg w-1/4 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-white/10 to-white/5 rounded-lg w-full animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-white/10 to-white/5 rounded-lg w-5/6 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
});

// Enhanced SearchInput component
const SearchInput = memo(function SearchInput({ 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  focused,
  onClear 
}) {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-600/20 to-cyan-500/20 rounded-2xl blur transition-all duration-500 ${focused ? 'opacity-60 scale-105' : 'opacity-0'}`}></div>
        
        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 shadow-xl">
          <div className="relative">
            <Search
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                focused ? "text-blue-400 scale-110" : "text-gray-400"
              }`}
              size={20}
            />
            <input
              type="text"
              placeholder="Search occupations, skills, or NOC codes..."
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className="w-full pl-12 pr-12 py-4 sm:py-5 bg-transparent text-white placeholder-gray-400 text-base sm:text-lg focus:outline-none"
            />
            {value && (
              <button
                onClick={onClear}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 p-1 rounded-full hover:bg-white/10"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Search suggestions hint */}
      <div className={`mt-2 text-center transition-all duration-300 ${focused ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <span className="text-gray-500">Try:</span>
          <button className="text-blue-400 hover:text-blue-300 transition-colors">software developer</button>
          <span className="text-gray-600">•</span>
          <button className="text-purple-400 hover:text-purple-300 transition-colors">nurse</button>
          <span className="text-gray-600">•</span>
          <button className="text-green-400 hover:text-green-300 transition-colors">engineer</button>
        </div>
      </div>
    </div>
  );
});

// Scroll to top button
const ScrollToTop = memo(function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center hover:scale-110 backdrop-blur-xl border border-white/10"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
});

export default function NocSearch() {
  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [nocData, setNocData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { t } = useTranslation();

  // API fetch function
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
          console.error("Error fetching NOC codes:", err);
          setError(
            err.response?.status === 404
              ? "No results found. Try adjusting your search terms."
              : err.response?.status === 500
              ? "Server temporarily unavailable. Please try again."
              : "Connection error. Please check your internet and try again."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNocData();
    return () => controller.abort();
  }, [debouncedSearchTerm, page]);

  // Loading timeout
  useEffect(() => {
    let timeoutId;
    if (loading) {
      timeoutId = setTimeout(() => {
        setError("Request timed out. Please try again.");
        setLoading(false);
      }, 10000);
    }
    return () => clearTimeout(timeoutId);
  }, [loading]);

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

  const handleSearchFocus = useCallback(() => {
    setSearchFocused(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    setTimeout(() => setSearchFocused(false), 150); // Delay to allow click events
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft" && page > 1) {
        setPage((prev) => prev - 1);
      } else if (e.key === "ArrowRight" && page < totalPages) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [page, totalPages]);

  // Search debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-zinc-950 mt-10">

      <div className="relative z-10 px-4 py-8 sm:py-12">
        {/* Enhanced Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 rounded-2xl mb-6 shadow-2xl shadow-blue-500/20 relative">
            <Briefcase className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 rounded-2xl blur animate-pulse opacity-50"></div>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4 tracking-tight">
            NOC Explorer
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-2">
            Discover Canadian occupations with our comprehensive National Occupational Classification database
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Canada</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Updated 2024</span>
            </div>
          </div>
        </div>

        {/* Enhanced Search Section */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-12">
          <SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            onClear={handleSearchClear}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            focused={searchFocused}
          />
        </div>

        {/* Enhanced Stats Bar */}
        {!loading && nocData.length > 0 && (
          <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-white/[0.08] backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6 shadow-xl">
              <div className="flex flex-wrap justify-center gap-6 sm:gap-12 text-center">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      {totalEntries.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      Occupations Found
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      {page} / {totalPages}
                    </div>
                    <div className="text-sm text-gray-400">
                      Current Page
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative mb-8">
              <div className="w-20 h-20 border-4 border-blue-500/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute top-2 left-2 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <div className="text-center">
              <p className="text-white text-xl mb-2 font-semibold">Searching occupations...</p>
              <p className="text-gray-400 text-sm">Please wait while we find the best matches</p>
            </div>
            <LoadingSkeleton />
          </div>
        )}

        {/* Enhanced Error State */}
        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 sm:p-8 text-center shadow-xl">
              <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <X className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Oops! Something went wrong</h3>
              <p className="text-red-300 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Enhanced No Results */}
        {!loading && !error && nocData.length === 0 && debouncedSearchTerm && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-12 text-center shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-500/20 to-slate-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">No Results Found</h3>
              <p className="text-gray-400 mb-6">
                We couldn't find any occupations matching <span className="text-blue-400 font-semibold">"{debouncedSearchTerm}"</span>. Try different keywords or browse all occupations.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleSearchClear}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Clear Search
                </button>
                <button
                  onClick={() => setSearchTerm("software")}
                  className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  Try "Software"
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {!loading && !error && nocData.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="space-y-4 sm:space-y-6">
              {nocData.map((noc, index) => (
                <NocCard key={noc.noc_code} noc={noc} index={index} />
              ))}
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-center items-center mt-12 gap-6">
                {/* Navigation buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <ChevronLeft size={18} />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <button
                    onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                    disabled={page === totalPages}
                    className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Enhanced Page numbers with smart pagination */}
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {/* First page */}
                  {page > 3 && (
                    <>
                      <button
                        onClick={() => setPage(1)}
                        className="w-10 h-10 rounded-lg font-semibold transition-all duration-300 bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white hover:scale-105"
                      >
                        1
                      </button>
                      {page > 4 && <span className="text-gray-400 px-1">...</span>}
                    </>
                  )}
                  
                  {/* Page range around current page */}
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

                    // Skip if we already showed this page
                    if ((page > 3 && pageNum === 1) || (page < totalPages - 2 && pageNum === totalPages)) {
                      return null;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                          page === pageNum
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-110"
                            : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white hover:scale-105"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {/* Last page */}
                  {page < totalPages - 2 && (
                    <>
                      {page < totalPages - 3 && <span className="text-gray-400 px-1">...</span>}
                      <button
                        onClick={() => setPage(totalPages)}
                        className="w-10 h-10 rounded-lg font-semibold bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-300 hover:scale-105"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                {/* Quick jump to page */}
                <div className="hidden md:flex items-center gap-2 text-sm">
                  <span className="text-gray-400">Jump to:</span>
                  <input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={page}
                    onChange={(e) => {
                      const newPage = parseInt(e.target.value);
                      if (newPage >= 1 && newPage <= totalPages) {
                        setPage(newPage);
                      }
                    }}
                    className="w-16 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-center focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick stats footer for empty states */}
        {!loading && !error && nocData.length === 0 && !debouncedSearchTerm && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">500+ NOC Codes</h3>
                <p className="text-gray-400 text-sm">Comprehensive occupation database</p>
              </div>
              <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">6 TEER Levels</h3>
                <p className="text-gray-400 text-sm">Training, Education, Experience levels</p>
              </div>
              <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Updated 2024</h3>
                <p className="text-gray-400 text-sm">Latest Canadian standards</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ScrollToTop />
      
      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
        
        .backdrop-blur-xl {
          backdrop-filter: blur(24px);
        }
        
        .backdrop-blur-lg {
          backdrop-filter: blur(16px);
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );
}