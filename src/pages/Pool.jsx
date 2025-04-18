import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "/api";

export default function Pool() {
  const [poolData, setPoolData] = useState([]);
  const [drawNumber, setDrawNumber] = useState(null);
  const [drawDate, setDrawDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/pool`)
      .then(({ data }) => {
        setPoolData(data.pool.ranges || []);
        setDrawNumber(data.pool.drawNumber);
        setDrawDate(data.pool.drawDate);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pool data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-6">
        Express Entry Pool Breakdown
      </h1>

      {loading ? (
        <p className="text-white text-center">Loading pool data...</p>
      ) : (
        <div className="max-w-2xl mx-auto bg-gray-800/70 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
          <div className="text-white text-center mb-6">
            <p>
              <strong>Draw Number:</strong> {drawNumber}
            </p>
            <p>
              <strong>Draw Date:</strong> {drawDate}
            </p>
          </div>
          <table className="w-full text-white text-sm sm:text-base">
            <thead>
              <tr className="border-b border-white/30">
                <th className="text-left py-2">CRS Score Range</th>
                <th className="text-right py-2">Number of Candidates</th>
              </tr>
            </thead>
            <tbody>
              {poolData.map((range) => (
                <tr key={range.key} className="border-b border-white/10">
                  <td className="py-2">{range.range}</td>
                  <td className="py-2 text-right">{range.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
