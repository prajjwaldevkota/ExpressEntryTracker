// Memory optimization utilities for React components

// Virtual scrolling implementation for large lists
export class VirtualScroller {
  constructor(itemHeight, containerHeight, overscan = 5) {
    this.itemHeight = itemHeight;
    this.containerHeight = containerHeight;
    this.overscan = overscan;
    this.scrollTop = 0;
  }

  getVisibleRange(totalItems) {
    const startIndex = Math.max(0, Math.floor(this.scrollTop / this.itemHeight) - this.overscan);
    const endIndex = Math.min(
      totalItems - 1,
      Math.ceil((this.scrollTop + this.containerHeight) / this.itemHeight) + this.overscan
    );
    
    return { startIndex, endIndex };
  }

  updateScrollPosition(scrollTop) {
    this.scrollTop = scrollTop;
  }

  getVisibleItems(items) {
    const { startIndex, endIndex } = this.getVisibleRange(items.length);
    return items.slice(startIndex, endIndex + 1).map((item, index) => ({
      ...item,
      virtualIndex: startIndex + index,
      style: {
        position: 'absolute',
        top: (startIndex + index) * this.itemHeight,
        height: this.itemHeight,
        width: '100%'
      }
    }));
  }
}

// Image optimization utility
export const optimizeImage = (src, width = 800, quality = 80) => {
  // For now, return the original src
  // In production, this could integrate with an image optimization service
  return src;
};

// Memory cleanup utility
export const cleanupMemory = () => {
  // Clear unused event listeners
  if (typeof window !== 'undefined') {
    // Clear any stored data that's no longer needed
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('temp_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }
};

// Debounced function to prevent excessive re-renders
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttled function for performance optimization
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Memory-efficient data structure for large datasets
export class MemoryEfficientMap {
  constructor() {
    this.data = new Map();
    this.maxSize = 1000;
  }

  set(key, value) {
    if (this.data.size >= this.maxSize) {
      // Remove oldest entries
      const firstKey = this.data.keys().next().value;
      this.data.delete(firstKey);
    }
    this.data.set(key, value);
  }

  get(key) {
    return this.data.get(key);
  }

  has(key) {
    return this.data.has(key);
  }

  delete(key) {
    return this.data.delete(key);
  }

  clear() {
    this.data.clear();
  }

  size() {
    return this.data.size;
  }
}

// Lazy loading utility for components
export const lazyLoadComponent = (importFunc, fallback = null) => {
  const LazyComponent = React.lazy(importFunc);
  
  return function LazyWrapper(props) {
    return (
      <React.Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </React.Suspense>
    );
  };
};

// Memory monitoring utility
export const getMemoryUsage = () => {
  if (typeof performance !== 'undefined' && performance.memory) {
    return {
      usedJSHeapSize: performance.memory.usedJSHeapSize,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
      jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
      usagePercentage: (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100
    };
  }
  return null;
};

// Component memory optimization hook
export const useMemoryOptimization = (dependencies = []) => {
  const [memoryUsage, setMemoryUsage] = useState(null);

  useEffect(() => {
    const updateMemoryUsage = () => {
      const usage = getMemoryUsage();
      if (usage) {
        setMemoryUsage(usage);
      }
    };

    updateMemoryUsage();
    const interval = setInterval(updateMemoryUsage, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, dependencies);

  const cleanup = useCallback(() => {
    cleanupMemory();
  }, []);

  return { memoryUsage, cleanup };
};

// React import for lazy loading
import React, { useState, useEffect, useCallback } from 'react'; 