import React, { useState, useEffect } from "react";
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
} from "lucide-react";

export default function NocSearch() {
  // State variables for search term, NOC data and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [nocData, setNocData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10; // Number of items per page
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { t } = useTranslation();

  // Function that fetches NOC codes from the API
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
              ? "No results found. Please try different search terms."
              : err.response?.status === 500
              ? "Server error. Please try again later."
              : "Error fetching NOC codes. Please check your connection and try again."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNocData();
    return () => controller.abort();
  }, [debouncedSearchTerm, page]);

  // Add loading timeout
  useEffect(() => {
    let timeoutId;
    if (loading) {
      timeoutId = setTimeout(() => {
        setError("Request timed out. Please try again.");
        setLoading(false);
      }, 10000); // 10 second timeout
    }
    return () => clearTimeout(timeoutId);
  }, [loading]);

  const totalPages = Math.ceil(totalEntries / limit);

  const getTeerColor = (teer) => {
    const colors = {
      "TEER 0": "from-slate-800 to-slate-900",
      "TEER 1": "from-gray-800 to-zinc-900",
      "TEER 2": "from-stone-800 to-neutral-900",
      "TEER 3": "from-zinc-800 to-gray-900",
      "TEER 4": "from-neutral-800 to-stone-900",
      "TEER 5": "from-gray-900 to-black",
    };
    return colors[teer] || "from-gray-800 to-slate-900";
  };

  const getPageNumbers = () => {
    const total = totalPages;
    let start = page - 2;
    let end = page + 2;

    // shift window right if start falls below 1
    if (start < 1) {
      end += 1 - start;
      start = 1;
    }

    // shift window left if end exceeds total
    if (end > total) {
      start -= end - total;
      end = total;
    }

    // make sure start never falls below 1
    if (start < 1) start = 1;

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Add keyboard navigation for pagination
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

  // Add debouncing for search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-900 relative overflow-hidden pt-14 sm:pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-zinc-800 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-60 h-60 bg-slate-700 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-zinc-700 to-gray-800 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-2xl">
            <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-zinc-300 bg-clip-text text-transparent mb-3 sm:mb-4">
            {t("noc.title")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            {t("noc.subtitle")}
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
          <div
            className={`relative transition-all duration-300 ${
              searchFocused ? "transform scale-105" : ""
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-600 to-gray-700 rounded-xl sm:rounded-2xl blur opacity-30"></div>
            <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl p-2">
              <div className="relative">
                <Search
                  className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    searchFocused ? "text-blue-400" : "text-gray-400"
                  }`}
                  size={20}
                />
                <input
                  type="text"
                  placeholder={t("noc.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 md:py-4 bg-transparent text-white placeholder-gray-400 text-sm sm:text-base md:text-lg focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        {!loading && nocData.length > 0 && (
          <div className="max-w-6xl mx-auto mb-6 sm:mb-8 px-4">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/10 p-4 sm:p-6">
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-center">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  <span className="text-sm sm:text-base text-gray-300">
                    {t("noc.found")}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    {totalEntries}
                  </span>
                  <span className="text-sm sm:text-base text-gray-300">
                    {t("noc.occupations")}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <span className="text-sm sm:text-base text-gray-300">
                    {t("noc.page")}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    {page}
                  </span>
                  <span className="text-sm sm:text-base text-gray-300">
                    {t("noc.of")} {totalPages}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-500/30 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-white text-lg sm:text-xl mt-4 sm:mt-6 animate-pulse">
              {t("noc.searching")}
            </p>
            {/* Add skeleton cards */}
            <div className="w-full max-w-6xl mt-6 sm:mt-8 px-4">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-4 sm:mb-6 animate-pulse"
                >
                  <div className="h-6 sm:h-8 bg-white/10 rounded-lg w-3/4 mb-3 sm:mb-4"></div>
                  <div className="h-3 sm:h-4 bg-white/10 rounded-lg w-1/2 mb-2"></div>
                  <div className="h-3 sm:h-4 bg-white/10 rounded-lg w-full"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-red-500/10 backdrop-blur-lg border border-red-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <ExternalLink className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
              </div>
              <p className="text-red-300 text-base sm:text-lg">{error}</p>
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && nocData.length === 0 && (
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                {t("noc.noResults")}
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                {t("noc.tryDifferent")}
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && !error && nocData.length > 0 && (
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid gap-4 sm:gap-6">
              {nocData.map((noc, index) => (
                <div
                  key={noc.noc_code}
                  className="group hover:transform hover:scale-[1.02] transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl sm:rounded-2xl blur group-hover:blur-lg transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                    <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-white/15 transition-all duration-300">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-sm sm:text-base md:text-lg">
                                  {noc.noc_code.slice(0, 2)}
                                </span>
                              </div>
                              <div>
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                                  {noc.noc_code} - {noc.title}
                                </h2>
                                {noc.teer && (
                                  <div
                                    className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r ${getTeerColor(
                                      noc.teer.title
                                    )} shadow-lg mt-2`}
                                  >
                                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                    {noc.teer.title}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                            {noc.description}
                          </p>

                          {noc.hierarchy && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-lg sm:rounded-xl border border-white/10">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <Users className="w-4 h-4 text-blue-400" />
                                  <span className="text-sm font-semibold text-blue-400">
                                    {t("noc.broadGroup")}
                                  </span>
                                </div>
                                <p className="text-gray-300 text-sm">
                                  {noc.hierarchy.broad_group?.title}
                                </p>
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <Layers className="w-4 h-4 text-purple-400" />
                                  <span className="text-sm font-semibold text-purple-400">
                                    {t("noc.majorGroup")}
                                  </span>
                                </div>
                                <p className="text-gray-300 text-sm">
                                  {noc.hierarchy.major_group?.title}
                                </p>
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <Target className="w-4 h-4 text-green-400" />
                                  <span className="text-sm font-semibold text-green-400">
                                    {t("noc.minorGroup")}
                                  </span>
                                </div>
                                <p className="text-gray-300 text-sm">
                                  {noc.hierarchy.minor_group?.title}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {noc.link && (
                          <div className="flex-shrink-0 mt-4 lg:mt-0">
                            <a
                              href={noc.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                              <span className="text-sm sm:text-base">
                                {t("noc.viewDetails")}
                              </span>
                              <ExternalLink size={16} />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-center items-center mt-8 sm:mt-12 gap-4 px-4">
                <div className="flex w-full sm:w-auto gap-2">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    aria-label={t("noc.previousPage")}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg sm:rounded-xl text-white font-semibold hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <ChevronLeft size={18} />
                    <span className="hidden sm:inline text-sm sm:text-base">
                      {t("noc.previous")}
                    </span>
                  </button>

                  <button
                    onClick={() =>
                      setPage((prev) => (prev < totalPages ? prev + 1 : prev))
                    }
                    disabled={page === totalPages}
                    aria-label={t("noc.nextPage")}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg sm:rounded-xl text-white font-semibold hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <span className="hidden sm:inline text-sm sm:text-base">
                      {t("noc.next")}
                    </span>
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Page Numbers */}
                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto justify-center py-2">
                  {getPageNumbers().map((pNum) => (
                    <button
                      key={pNum}
                      onClick={() => setPage(pNum)}
                      aria-label={`${t("noc.goToPage")} ${pNum}`}
                      aria-current={page === pNum ? "page" : undefined}
                      className={`min-w-[32px] sm:min-w-[40px] h-8 sm:h-10 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                        page === pNum
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                          : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      {pNum}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
