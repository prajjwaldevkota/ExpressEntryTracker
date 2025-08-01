import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { BASE_URL } from './utils';

// Request deduplication cache
const requestCache = new Map();
const pendingRequests = new Map();

// Optimized data fetching hook with caching and deduplication
export const useOptimizedData = (endpoint, params = {}, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const {
    cacheTime = 5 * 60 * 1000, // 5 minutes
    staleTime = 2 * 60 * 1000, // 2 minutes
    dedupeTime = 1000, // 1 second
    retryCount = 3,
    retryDelay = 1000,
  } = options;

  const generateCacheKey = useCallback((endpoint, params) => {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}:${params[key]}`)
      .join('|');
    return `${endpoint}${sortedParams ? `?${sortedParams}` : ''}`;
  }, []);

  const fetchData = useCallback(async (signal) => {
    const cacheKey = generateCacheKey(endpoint, params);
    
    // Check if we have a valid cached response
    const cached = requestCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < cacheTime) {
      setData(cached.data);
      setLoading(false);
      return;
    }

    // Check if there's already a pending request
    if (pendingRequests.has(cacheKey)) {
      try {
        const result = await pendingRequests.get(cacheKey);
        setData(result);
        setLoading(false);
        return;
      } catch (err) {
        // If pending request failed, continue with new request
      }
    }

    // Create new request promise
    const requestPromise = (async () => {
      let lastError;
      
      for (let attempt = 1; attempt <= retryCount; attempt++) {
        try {
          const response = await axios.get(`${BASE_URL}${endpoint}`, {
            params,
            signal,
            timeout: 10000, // 10 second timeout
          });

          const result = response.data;
          
          // Cache the successful response
          requestCache.set(cacheKey, {
            data: result,
            timestamp: Date.now()
          });

          return result;
        } catch (err) {
          lastError = err;
          
          if (signal?.aborted || err.code === 'ERR_CANCELED') {
            throw err;
          }

          if (attempt < retryCount) {
            await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
          }
        }
      }
      
      throw lastError;
    })();

    // Store pending request
    pendingRequests.set(cacheKey, requestPromise);

    try {
      const result = await requestPromise;
      setData(result);
      setError(null);
    } catch (err) {
      if (!signal?.aborted && err.code !== 'ERR_CANCELED') {
        setError(err);
      }
    } finally {
      pendingRequests.delete(cacheKey);
      setLoading(false);
    }
  }, [endpoint, params, cacheTime, retryCount, retryDelay, generateCacheKey]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    fetchData(abortControllerRef.current.signal);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  // Cleanup function to clear cache
  const clearCache = useCallback(() => {
    requestCache.clear();
    pendingRequests.clear();
  }, []);

  // Function to invalidate specific cache entry
  const invalidateCache = useCallback((endpoint, params = {}) => {
    const cacheKey = generateCacheKey(endpoint, params);
    requestCache.delete(cacheKey);
  }, [generateCacheKey]);

  return {
    data,
    loading,
    error,
    clearCache,
    invalidateCache,
    refetch: () => fetchData(abortControllerRef.current?.signal)
  };
};

// Hook for paginated data with virtual scrolling support
export const usePaginatedData = (endpoint, params = {}, pageSize = 50) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allData, setAllData] = useState([]);
  
  const { data, loading, error, refetch } = useOptimizedData(endpoint, {
    ...params,
    page,
    limit: pageSize
  });

  useEffect(() => {
    if (data?.draws) {
      if (page === 1) {
        setAllData(data.draws);
      } else {
        setAllData(prev => [...prev, ...data.draws]);
      }
      
      setHasMore(data.pagination?.hasNext || false);
    }
  }, [data, page]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  const reset = useCallback(() => {
    setPage(1);
    setAllData([]);
    setHasMore(true);
  }, []);

  return {
    data: allData,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
    refetch
  };
};

// Memory-efficient hook for latest draw data
export const useLatestDraw = () => {
  return useOptimizedData('/draws/latest', {}, {
    cacheTime: 2 * 60 * 1000, // 2 minutes for latest draw
    staleTime: 30 * 1000, // 30 seconds
  });
};

// Memory-efficient hook for categories
export const useCategories = () => {
  return useOptimizedData('/categories', {}, {
    cacheTime: 30 * 60 * 1000, // 30 minutes for categories
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}; 