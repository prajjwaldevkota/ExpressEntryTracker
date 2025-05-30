import { useEffect, useState, useCallback, useMemo, memo } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaChartLine, FaFilter } from "react-icons/fa";
import { BASE_URL } from "../Utils/utils";
import { useTranslation } from "react-i18next";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Modern color palette for datasets
const colors = [
  { border: "rgba(99, 102, 241, 1)", background: "rgba(99, 102, 241, 0.2)" }, // Indigo
  { border: "rgba(236, 72, 153, 1)", background: "rgba(236, 72, 153, 0.2)" }, // Pink
  { border: "rgba(16, 185, 129, 1)", background: "rgba(16, 185, 129, 0.2)" }, // Emerald
  { border: "rgba(245, 158, 11, 1)", background: "rgba(245, 158, 11, 0.2)" }, // Amber
];

// Memoized CategoryFilter component
const CategoryFilter = memo(function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryChange,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="max-w-4xl mx-auto mb-6 sm:mb-8"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 sm:p-6 rounded-2xl shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
          <FaFilter className="text-indigo-400" />
          <h2 className="text-lg sm:text-xl text-white font-semibold">
            Filter Categories
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {categories.map((cat) => (
            <motion.label
              key={cat}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-xl bg-white/5 border border-white/10 text-white cursor-pointer hover:bg-white/10 transition-all duration-300 text-xs sm:text-sm"
            >
              <input
                type="checkbox"
                className="sr-only"
                value={cat}
                checked={selectedCategories.includes(cat)}
                onChange={onCategoryChange}
              />
              <span
                className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 rounded border-2 transition-colors duration-300 ${
                  selectedCategories.includes(cat)
                    ? "bg-indigo-500 border-indigo-500"
                    : "border-white/30"
                }`}
              />
              {cat}
            </motion.label>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

// Memoized LoadingSpinner component
const LoadingSpinner = memo(function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );
});

export default function Trends() {
  const { t } = useTranslation();
  const [draws, setDraws] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Memoized chart options
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            color: "#fff",
            font: { size: 12, family: "'Inter', sans-serif" },
            padding: 16,
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        title: {
          display: true,
          text: t("trends.chartTitle"),
          color: "#fff",
          font: {
            size: 16,
            family: "'Inter', sans-serif",
            weight: "600",
          },
          padding: 16,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: t("trends.xAxisLabel"),
            color: "#fff",
            font: { size: 12, family: "'Inter', sans-serif" },
          },
          ticks: { color: "#fff" },
          grid: {
            color: "rgba(255,255,255,0.1)",
            drawBorder: false,
          },
        },
        y: {
          title: {
            display: true,
            text: t("trends.yAxisLabel"),
            color: "#fff",
            font: { size: 12, family: "'Inter', sans-serif" },
          },
          ticks: { color: "#fff" },
          grid: {
            color: "rgba(255,255,255,0.1)",
            drawBorder: false,
          },
        },
      },
      interaction: { intersect: false, mode: "index" },
      elements: {
        line: { tension: 0.4 },
        point: { radius: 3, hoverRadius: 5 },
      },
    }),
    [t]
  );

  // Memoized chart data
  const chartData = useMemo(() => {
    if (!draws.length) return null;

    const years = Array.from(new Set(draws.map((d) => d.year))).sort();

    const computeInvitations = (fn) =>
      years.map((y) =>
        draws
          .filter((d) => d.year === y && fn(d))
          .reduce((s, d) => s + d.invitationsIssued, 0)
      );

    if (!selectedCategories.length) {
      return {
        labels: years,
        datasets: [
          {
            label: t("trends.overallInvitations"),
            data: computeInvitations(() => true),
            borderColor: "rgba(255, 255, 255, 0.8)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            tension: 0.4,
          },
        ],
      };
    }

    return {
      labels: years,
      datasets: selectedCategories.map((cat, i) => ({
        label: `${cat} Invitations`,
        data: computeInvitations((d) => d.category === cat),
        borderColor: colors[i % colors.length].border,
        backgroundColor: colors[i % colors.length].background,
        tension: 0.4,
      })),
    };
  }, [draws, selectedCategories, t]);

  // Memoized handlers
  const handleCategoryChange = useCallback((e) => {
    const val = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]
    );
  }, []);

  // Fetch data
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    Promise.all([
      axios.get(`${BASE_URL}/draws`, { signal: controller.signal }),
      axios.get(`${BASE_URL}/categories`, { signal: controller.signal }),
    ])
      .then(([drawsRes, catsRes]) => {
        setDraws(drawsRes.data.draws);
        setCategories(catsRes.data.categories);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.error("Error fetching data:", err);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-900 pt-14 sm:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 sm:mb-6 shadow-2xl">
            <FaChartLine className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-2 sm:mb-4">
            {t("trends.title")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 font-medium">
            {t("trends.subtitle")}
          </p>
        </motion.div>

        {/* Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/10"
        >
          <div className="h-[300px] sm:h-[400px] md:h-[500px]">
            {loading ? (
              <LoadingSpinner />
            ) : chartData ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-white/60 text-base">{t("common.error")}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
