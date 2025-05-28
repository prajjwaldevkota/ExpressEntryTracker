import { useEffect, useState } from "react";
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

export default function Trends() {
  const [draws, setDraws] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch draws and categories on mount
  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`${BASE_URL}/draws`),
      axios.get(`${BASE_URL}/categories`)
    ])
      .then(([drawsRes, categoriesRes]) => {
        setDraws(drawsRes.data.draws);
        setCategories(categoriesRes.data.categories);
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, []);

  // Update chartData based on draws and filter selections.
  useEffect(() => {
    if (draws.length === 0) return;

    // Create sorted list of years from the draws.
    const yearsSet = new Set(draws.map((d) => d.year));
    const years = Array.from(yearsSet).sort();

    // Compute total invitations issued per year.
    const computeInvitations = (filterFn) => {
      return years.map((y) =>
        draws
          .filter((d) => d.year === y && filterFn(d))
          .reduce((total, d) => total + d.invitationsIssued, 0)
      );
    };

    // If no category is selected, compute overall invitations per year.
    if (selectedCategories.length === 0) {
      const overallInvitations = computeInvitations(() => true);
      setChartData({
        labels: years,
        datasets: [
          {
            label: "Overall Invitations Issued",
            data: overallInvitations,
            borderColor: "rgba(255, 255, 255, 0.8)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            tension: 0.4,
          },
        ],
      });
    } else {
      // For each selected category, compute invitations issued per year.
      const datasets = selectedCategories.map((cat, index) => {
        const invitations = computeInvitations((d) => d.category === cat);
        const color = colors[index % colors.length];
        return {
          label: `${cat} Invitations`,
          data: invitations,
          borderColor: color.border,
          backgroundColor: color.background,
          tension: 0.4,
        };
      });
      setChartData({
        labels: years,
        datasets,
      });
    }
  }, [draws, selectedCategories]);

  // Handle category checkbox toggle.
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((cat) => cat !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
            <FaChartLine className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
            Invitations Trends
          </h1>
          <p className="text-xl text-slate-400 font-medium">
            Track Express Entry invitations over time
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <FaFilter className="text-indigo-400" />
              <h2 className="text-xl text-white font-semibold">Filter Categories</h2>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {categories.map((cat) => (
                <motion.label
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  className="relative inline-flex items-center px-3 sm:px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white cursor-pointer hover:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                >
                  <input
                    type="checkbox"
                    value={cat}
                    onChange={handleCategoryChange}
                    checked={selectedCategories.includes(cat)}
                    className="sr-only"
                  />
                  <span className={`w-4 h-4 mr-2 rounded border-2 transition-colors duration-300 ${
                    selectedCategories.includes(cat)
                      ? "bg-indigo-500 border-indigo-500"
                      : "border-white/30"
                  }`} />
                  {cat}
                </motion.label>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-4 sm:p-6 h-[400px] sm:h-[500px] md:h-[600px]">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                  <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
              </div>
            ) : chartData ? (
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                      labels: {
                        color: "#fff",
                        font: {
                          size: 14,
                          family: "'Inter', sans-serif"
                        },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: "circle"
                      }
                    },
                    title: {
                      display: true,
                      text: "Yearly Invitations Issued",
                      color: "#fff",
                      font: {
                        size: 20,
                        family: "'Inter', sans-serif",
                        weight: "600"
                      },
                      padding: 20
                    }
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Year",
                        color: "#fff",
                        font: {
                          size: 14,
                          family: "'Inter', sans-serif"
                        }
                      },
                      ticks: { color: "#fff" },
                      grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                        drawBorder: false
                      }
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Total Invitations",
                        color: "#fff",
                        font: {
                          size: 14,
                          family: "'Inter', sans-serif"
                        }
                      },
                      ticks: { color: "#fff" },
                      grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                        drawBorder: false
                      }
                    }
                  },
                  interaction: {
                    intersect: false,
                    mode: "index"
                  },
                  elements: {
                    line: {
                      tension: 0.4
                    },
                    point: {
                      radius: 4,
                      hoverRadius: 6
                    }
                  }
                }}
              />
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-white/60 text-lg">No data available</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
