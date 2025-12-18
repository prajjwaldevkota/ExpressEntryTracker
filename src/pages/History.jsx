import { useState, useCallback, useMemo, useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import { useOptimizedData } from "../Utils/useOptimizedData";

// Debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

// Draw Row Component
const DrawRow = memo(function DrawRow({ draw }) {
  const getCrsColor = (crs) => {
    const score = parseInt(crs);
    if (score >= 500) return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30";
    if (score >= 450) return "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30";
    if (score >= 400) return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30";
    return "text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700";
  };

  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <td className="px-4 py-4 text-sm font-medium text-slate-900 dark:text-white">
        #{draw.drawNumber}
      </td>
      <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">
        {draw.date}
      </td>
      <td className="px-4 py-4">
        <span className={`inline-flex px-2.5 py-1 text-sm font-medium rounded-md ${getCrsColor(draw.minimumCRS)}`}>
          {draw.minimumCRS}
        </span>
      </td>
      <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">
        {draw.invitationsIssued?.toLocaleString()}
      </td>
      <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400 max-w-[200px] truncate" title={draw.category}>
        {draw.category || "—"}
      </td>
    </tr>
  );
});

// Table Skeleton
const TableSkeleton = memo(function TableSkeleton() {
  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="px-4 py-4 flex gap-4">
          <div className="h-5 bg-slate-100 dark:bg-slate-800 rounded w-16 animate-pulse" />
          <div className="h-5 bg-slate-100 dark:bg-slate-800 rounded w-24 animate-pulse" />
          <div className="h-5 bg-slate-100 dark:bg-slate-800 rounded w-12 animate-pulse" />
          <div className="h-5 bg-slate-100 dark:bg-slate-800 rounded w-20 animate-pulse" />
          <div className="h-5 bg-slate-100 dark:bg-slate-800 rounded flex-1 animate-pulse" />
        </div>
      ))}
    </div>
  );
});

export default function History() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [allDraws, setAllDraws] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: categoriesData } = useOptimizedData('/categories', {}, true);

  const { data: drawsData, loading, error } = useOptimizedData('/draws', {
    page: currentPage,
    limit: 20,
    search: debouncedSearchTerm || undefined,
    category: selectedCategory || undefined,
    sort: sortOrder
  }, true);

  const categories = useMemo(() => {
    return categoriesData?.categories || categoriesData?.data || [];
  }, [categoriesData]);

  useEffect(() => {
    if (drawsData?.draws) {
      if (currentPage === 1) {
        setAllDraws(drawsData.draws);
      } else {
        setAllDraws(prev => [...prev, ...drawsData.draws]);
      }
      setHasMore(drawsData.pagination?.hasNext || false);
    }
  }, [drawsData, currentPage]);

  const filteredDraws = useMemo(() => {
    if (!allDraws) return [];
    let filtered = allDraws;

    if (debouncedSearchTerm) {
      filtered = filtered.filter(draw =>
        draw.drawNumber?.toString().includes(debouncedSearchTerm) ||
        draw.category?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        draw.date?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(draw => draw.category === selectedCategory);
    }

    return filtered;
  }, [allDraws, debouncedSearchTerm, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
    setAllDraws([]);
  }, [debouncedSearchTerm, selectedCategory, sortOrder]);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMore, loading]);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory("");
    setCurrentPage(1);
    setAllDraws([]);
  }, []);

  const hasFilters = searchTerm || selectedCategory;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {t("history.title")}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          {t("history.subtitle")}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-6 transition-colors">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by draw number, date, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center' }}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Sort Button */}
          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            {sortOrder === "desc" ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
                Newest First
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" /></svg>
                Oldest First
              </>
            )}
          </button>
        </div>

        {/* Active Filters */}
        {hasFilters && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <span className="text-sm text-slate-500 dark:text-slate-400">Filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 text-sm rounded-md">
                "{searchTerm}"
                <button onClick={() => setSearchTerm("")} className="hover:text-sky-900 dark:hover:text-sky-300">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 text-sm rounded-md">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("")} className="hover:text-sky-900 dark:hover:text-sky-300">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 ml-auto"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      {!loading && filteredDraws.length > 0 && (
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Showing {filteredDraws.length} {filteredDraws.length === 1 ? 'draw' : 'draws'}
        </p>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden transition-colors">
        {error ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-slate-900 dark:text-white font-medium mb-1">Error loading data</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Please try again later</p>
          </div>
        ) : loading && filteredDraws.length === 0 ? (
          <TableSkeleton />
        ) : filteredDraws.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-900 dark:text-white font-medium mb-1">No draws found</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Draw</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">CRS</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Invitations</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredDraws.map((draw, index) => (
                  <DrawRow key={draw.id || index} draw={draw} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Load More */}
      {hasMore && filteredDraws.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Draws"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
