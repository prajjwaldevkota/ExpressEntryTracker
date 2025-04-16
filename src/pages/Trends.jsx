import { useEffect, useState } from "react";
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
} from "chart.js";

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

// const BASE_URL = "http://localhost:3000/api";
const BASE_URL = "/api";
// const PROXY_URL = "/.netlify/functions/proxy";

// Preset color palette for datasets.
const colors = [
  { border: "rgba(255, 99, 132, 1)", background: "rgba(255, 99, 132, 0.2)" },
  { border: "rgba(54, 162, 235, 1)", background: "rgba(54, 162, 235, 0.2)" },
  { border: "rgba(255, 206, 86, 1)", background: "rgba(255, 206, 86, 0.2)" },
  { border: "rgba(75, 192, 192, 1)", background: "rgba(75, 192, 192, 0.2)" },
];

export default function Trends() {
  const [draws, setDraws] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [chartData, setChartData] = useState(null);

  // Fetch draws and categories on mount
  useEffect(() => {
    axios
      .get(`${BASE_URL}/draws`)
      .then((res) => setDraws(res.data.draws))
      .catch((err) => console.error("Error fetching draws:", err));

    axios
      .get(`${BASE_URL}/categories`)
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.error("Error fetching categories:", err));
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
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-white">
        Invitations Issued Trends
      </h1>

      <div className="mb-6 bg-gray-800/60 backdrop-blur-md border border-white/30 p-4 rounded-xl">
        <p className="text-white mb-2">
          Filter by Category (select one or more):
        </p>
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center text-white">
              <input
                type="checkbox"
                value={cat}
                onChange={handleCategoryChange}
                checked={selectedCategories.includes(cat)}
                className="mr-2"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/60 shadow-lg backdrop-blur-md border border-white/30 p-6 rounded-xl h-96">
        {chartData ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                  labels: { color: "#fff" },
                },
                title: {
                  display: true,
                  text: "Yearly Invitations Issued",
                  color: "#fff",
                  font: {
                    size: 18,
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Year",
                    color: "#fff",
                    font: { size: 14 },
                  },
                  ticks: { color: "#fff" },
                  grid: { color: "rgba(255, 255, 255, 0.1)" },
                },
                y: {
                  title: {
                    display: true,
                    text: "Total Invitations",
                    color: "#fff",
                    font: { size: 14 },
                  },
                  ticks: { color: "#fff" },
                  grid: { color: "rgba(255, 255, 255, 0.1)" },
                },
              },
            }}
          />
        ) : (
          <p className="text-white">Loading trends...</p>
        )}
      </div>
    </div>
  );
}
