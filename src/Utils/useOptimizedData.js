import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from './utils';

// Simple hook that just makes API calls directly
export const useOptimizedData = (endpoint, params = {}, includeLanguage = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add language parameter if needed
        const requestParams = { ...params };
        if (includeLanguage) {
          // Check all possible language keys
          console.log(`[useOptimizedData] All localStorage language keys:`, {
            'i18nextLng': localStorage.getItem('i18nextLng'),
            'i18next': localStorage.getItem('i18next'),
            'language': localStorage.getItem('language'),
            'lang': localStorage.getItem('lang')
          });
          
          // Try to get language from localStorage first, then fallback to 'en'
          let lang = localStorage.getItem('i18nextLng');
          if (!lang) {
            lang = 'en';
            console.log(`[useOptimizedData] No language found in localStorage, using fallback: ${lang}`);
          }
          
          console.log(`[useOptimizedData] localStorage key 'i18nextLng': ${localStorage.getItem('i18nextLng')}`);
          console.log(`[useOptimizedData] Using language: ${lang} for endpoint: ${endpoint}`);
          requestParams.lang = lang;
          console.log(`[useOptimizedData] Adding language parameter: ${lang} for endpoint: ${endpoint}`);
        }
        
        console.log(`[useOptimizedData] Making request to: ${BASE_URL}${endpoint} with params:`, requestParams);
        
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
          params: requestParams,
          timeout: 10000,
        });

        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params), includeLanguage]);

  const refetch = () => {
    setLoading(true);
    setError(null);
    
    // Add language parameter if needed
    const requestParams = { ...params };
    if (includeLanguage) {
      // Check all possible language keys
      console.log(`[useOptimizedData] Refetch - All localStorage language keys:`, {
        'i18nextLng': localStorage.getItem('i18nextLng'),
        'i18next': localStorage.getItem('i18next'),
        'language': localStorage.getItem('language'),
        'lang': localStorage.getItem('lang')
      });
      
      const lang = localStorage.getItem('i18nextLng') || 'en';
      console.log(`[useOptimizedData] Refetch - localStorage key 'i18nextLng': ${localStorage.getItem('i18nextLng')}`);
      console.log(`[useOptimizedData] Refetch - Using language: ${lang} for endpoint: ${endpoint}`);
      requestParams.lang = lang;
      console.log(`[useOptimizedData] Refetch - Adding language parameter: ${lang} for endpoint: ${endpoint}`);
    }
    
    console.log(`[useOptimizedData] Refetch - Making request to: ${BASE_URL}${endpoint} with params:`, requestParams);
    
    axios.get(`${BASE_URL}${endpoint}`, {
      params: requestParams,
      timeout: 10000,
    })
    .then(response => {
      setData(response.data);
    })
    .catch(err => {
      setError(err);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return { data, loading, error, refetch };
};

// Simple pagination hook
export const usePaginatedData = (endpoint, params = {}, pageSize = 50, includeLanguage = false) => {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, loading, error, refetch } = useOptimizedData(endpoint, {
    ...params,
    page,
    limit: pageSize
  }, includeLanguage);

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

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const reset = () => {
    setPage(1);
    setAllData([]);
    setHasMore(true);
  };

  return { data: allData, loading, error, hasMore, loadMore, reset, refetch };
};

// Simple hooks for specific endpoints
export const useLatestDraw = () => {
  return useOptimizedData('/draws/latest', {}, false);
};

export const useCategories = () => {
  return useOptimizedData('/categories', {}, true);
};