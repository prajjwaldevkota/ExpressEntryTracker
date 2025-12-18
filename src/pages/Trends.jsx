import { useEffect, useState, useCallback, useMemo, memo } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { BASE_URL } from "../Utils/utils";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

// Register Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// Chart colors
const chartColors = [
  { line: "#0ea5e9", fill: "rgba(14, 165, 233, 0.1)" },
  { line: "#22c55e", fill: "rgba(34, 197, 94, 0.1)" },
  { line: "#f59e0b", fill: "rgba(245, 158, 11, 0.1)" },
  { line: "#a855f7", fill: "rgba(168, 85, 247, 0.1)" },
  { line: "#ef4444", fill: "rgba(239, 68, 68, 0.1)" },
];

// Stat Card
const StatCard = memo(function StatCard({ label, value, description }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 transition-colors">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-2xl font-semibold text-slate-900 dark:text-white">{value}</p>
      {description && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>}
    </div>
  );
});

// Category Checkbox
const CategoryCheckbox = memo(function CategoryCheckbox({ category, isSelected, colorIndex, onChange }) {
  const color = chartColors[colorIndex % chartColors.length];

  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onChange(category)}
        className="sr-only"
      />
      <span
        className={`
          w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
          ${isSelected
            ? 'border-sky-500 bg-sky-500'
            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-slate-400'
          }
        `}
      >
        {isSelected && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
        {isSelected && (
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color.line }}
          />
        )}
        <span className="truncate max-w-[150px]">{category}</span>
      </span>
    </label>
  );
});

// Loading State
const LoadingState = memo(function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-slate-200 dark:border-slate-700 border-t-sky-500 rounded-full animate-spin mb-4" />
      <p className="text-slate-500 dark:text-slate-400">Loading trends data...</p>
    </div>
  );
});

export default function Trends() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [draws, setDraws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch data
  useEffect(() => {
    const fetchDraws = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/draws`, {
          params: { limit: 100, sort: 'desc' }
        });
        const drawsData = response.data.draws || [];

        const validDraws = drawsData.filter(draw =>
          draw.date && draw.minimumCRS && draw.category && draw.invitationsIssued
        );

        setDraws(validDraws);

        const uniqueCategories = [...new Set(validDraws.map(draw => draw.category))];
        setCategories(uniqueCategories);
        setSelectedCategories(uniqueCategories.slice(0, 3));
      } catch (error) {
        console.error("Error fetching draws:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDraws();
  }, []);

  // Toggle category
  const toggleCategory = useCallback((category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  }, []);

  // Chart data
  const chartData = useMemo(() => {
    if (!draws.length || !selectedCategories.length) return null;

    const filteredDraws = draws.filter(draw =>
      selectedCategories.includes(draw.category)
    );

    if (!filteredDraws.length) return null;

    const sortedDraws = filteredDraws.sort((a, b) => new Date(a.date) - new Date(b.date));
    const allDates = [...new Set(sortedDraws.map(draw => draw.date))].sort((a, b) => new Date(a) - new Date(b));

    const datasets = selectedCategories.map((category, index) => {
      const color = chartColors[index % chartColors.length];
      const categoryDraws = sortedDraws.filter(draw => draw.category === category);

      const data = allDates.map(date => {
        const draw = categoryDraws.find(d => d.date === date);
        return draw ? draw.invitationsIssued : null;
      });

      return {
        label: category,
        data,
        borderColor: color.line,
        backgroundColor: color.fill,
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: color.line,
        pointBorderColor: isDark ? '#1e293b' : '#fff',
        pointBorderWidth: 2,
        spanGaps: true,
      };
    });

    return { labels: allDates, datasets };
  }, [draws, selectedCategories, isDark]);

  // Chart options
  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : '#fff',
        titleColor: isDark ? '#f8fafc' : '#0f172a',
        bodyColor: isDark ? '#94a3b8' : '#64748b',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            if (context.parsed.y === null) return null;
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} invitations`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: isDark ? '#64748b' : '#94a3b8',
          font: { size: 11 },
          maxRotation: 45,
        }
      },
      y: {
        grid: {
          color: isDark ? '#334155' : '#f1f5f9',
          drawBorder: false,
        },
        border: { display: false },
        ticks: {
          color: isDark ? '#64748b' : '#94a3b8',
          font: { size: 11 },
          callback: (value) => value.toLocaleString(),
        },
        beginAtZero: true,
      }
    },
  }), [isDark]);

  // Stats
  const stats = useMemo(() => {
    if (!draws.length) return [];

    const recentDraws = draws.slice(0, 10);
    const avgInvitations = recentDraws.reduce((sum, d) => sum + (d.invitationsIssued || 0), 0) / recentDraws.length;
    const totalInvitations = recentDraws.reduce((sum, d) => sum + (d.invitationsIssued || 0), 0);

    return [
      { label: "Total Draws", value: draws.length, description: "All time" },
      { label: "Avg. Invitations", value: Math.round(avgInvitations).toLocaleString(), description: "Last 10 draws" },
      { label: "Total Invitations", value: totalInvitations.toLocaleString(), description: "Last 10 draws" },
    ];
  }, [draws]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {t("trends.title")}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          {t("trends.subtitle")}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden transition-colors">
        {/* Category Filters */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">Categories</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {selectedCategories.length} of {categories.length} selected
            </span>
          </div>
          <div className="flex flex-wrap gap-4">
            {categories.map((cat, index) => (
              <CategoryCheckbox
                key={cat}
                category={cat}
                isSelected={selectedCategories.includes(cat)}
                colorIndex={selectedCategories.indexOf(cat)}
                onChange={toggleCategory}
              />
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="p-6">
          {chartData && selectedCategories.length > 0 ? (
            <div className="h-80">
              <Line data={chartData} options={chartOptions} />
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-slate-900 dark:text-white font-medium">No data to display</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Select at least one category above</p>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        {selectedCategories.length > 0 && (
          <div className="px-6 pb-6">
            <div className="flex flex-wrap gap-4">
              {selectedCategories.map((cat, index) => (
                <div key={cat} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: chartColors[index % chartColors.length].line }}
                  />
                  <span className="truncate max-w-[150px]">{cat}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
