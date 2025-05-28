import React, { useState, useEffect } from "react";
import axios from "axios";
import { NOC_URL } from "../Utils/utils";
import { Search, ChevronLeft, ChevronRight, ExternalLink, Briefcase, Layers, Target, Users, TrendingUp } from "lucide-react";

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

  // Function that fetches NOC codes from the API
  const fetchNocData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${NOC_URL}/api/nocs`, {
        params: {
          search: searchTerm || undefined,
          page: page,
          limit: limit,
        },
      });
      setNocData(response.data.data);
      setTotalEntries(response.data.pagination.total);
      //   setTotalEntries(response.);
    } catch (err) {
      console.error("Error fetching NOC codes:", err);
      setError("Error fetching NOC codes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Refetch data when search term or page changes.
  useEffect(() => {
    fetchNocData();
  }, [searchTerm, page]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-900 relative overflow-hidden mt-5">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-zinc-800 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-60 h-60 bg-slate-700 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="text-center mb-10 pt-8 mt-5">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-zinc-700 to-gray-800 rounded-2xl mb-6 shadow-2xl">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-zinc-300 bg-clip-text text-transparent mb-4">
            NOC Code Search
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover your perfect career path with Canada's National
            Occupational Classification system
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div
            className={`relative transition-all duration-300 ${
              searchFocused ? "transform scale-105" : ""
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-600 to-gray-700 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-2">
              <div className="relative">
                <Search
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    searchFocused ? "text-blue-400" : "text-gray-400"
                  }`}
                  size={24}
                />
                <input
                  type="text"
                  placeholder="Search for your dream occupation..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full pl-14 pr-6 py-4 bg-transparent text-white placeholder-gray-400 text-lg focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        {!loading && nocData.length > 0 && (
          <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="flex flex-wrap justify-center gap-8 text-center">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">Found</span>
                  <span className="text-2xl font-bold text-white">
                    {totalEntries}
                  </span>
                  <span className="text-gray-300">occupations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">Page</span>
                  <span className="text-2xl font-bold text-white">{page}</span>
                  <span className="text-gray-300">of {totalPages}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-500/30 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-white text-xl mt-6 animate-pulse">
              Searching occupations...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-500/10 backdrop-blur-lg border border-red-500/20 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-red-300 text-lg">{error}</p>
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && nocData.length === 0 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                No occupations found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search terms or explore different keywords
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && !error && nocData.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-6">
              {nocData.map((noc, index) => (
                <div
                  key={noc.noc_code}
                  className="group hover:transform hover:scale-[1.02] transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur group-hover:blur-lg transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                    <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">
                                  {noc.noc_code.slice(0, 2)}
                                </span>
                              </div>
                              <div>
                                <h2 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                                  {noc.noc_code} - {noc.title}
                                </h2>
                                {noc.teer && (
                                  <div
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${getTeerColor(
                                      noc.teer.title
                                    )} shadow-lg mt-2`}
                                  >
                                    <TrendingUp className="w-4 h-4 mr-1" />
                                    {noc.teer.title}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            {noc.description}
                          </p>

                          {noc.hierarchy && (
                            <div className="grid md:grid-cols-3 gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <Users className="w-4 h-4 text-blue-400" />
                                  <span className="text-sm font-semibold text-blue-400">
                                    Broad Group
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
                                    Major Group
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
                                    Minor Group
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
                          <div className="flex-shrink-0">
                            <a
                              href={noc.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                              <span>View Details</span>
                              <ExternalLink size={18} />
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
              <div className="flex justify-center items-center mt-12 gap-4">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:transform hover:scale-105"
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = Math.max(
                      1,
                      Math.min(page - 2 + i, totalPages - 4 + i)
                    );
                    if (pageNum > totalPages) return null;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-12 h-12 rounded-xl font-semibold transition-all duration-300 ${
                          page === pageNum
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                            : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
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
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:transform hover:scale-105"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
