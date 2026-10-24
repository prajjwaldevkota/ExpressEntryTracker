import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { BASE_URL } from './utils';

// Browsers supply their own User-Agent. Setting a custom UA here is unreliable
// and would not resolve DNS failures. Keep requests CORS-simple (no custom headers).
export const useOptimizedData = (endpoint, params = {}, includeLanguage = false) => {
  const { i18n } = useTranslation();
  const language = includeLanguage ? i18n.resolvedLanguage || 'en' : undefined;
  const serializedParams = JSON.stringify(params);
  const [revision, setRevision] = useState(0);
  const [state, setState] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });
    axios.get(`${BASE_URL}${endpoint}`, {
      params: { ...JSON.parse(serializedParams), ...(language ? { lang: language } : {}) },
      timeout: 20000,
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    }).then(response => {
      if (!controller.signal.aborted) setState({ data: response.data, loading: false, error: null });
    }).catch(error => {
      if (!controller.signal.aborted) setState({ data: null, loading: false, error });
    });
    return () => controller.abort();
  }, [endpoint, serializedParams, language, revision]);
  const refetch = useCallback(() => setRevision(value => value + 1), []);
  return { ...state, refetch };
};

export const useLatestDraw = () => useOptimizedData('/draws/latest');
export const useCategories = () => useOptimizedData('/categories', {}, true);
export const usePools = () => useOptimizedData('/pool');
