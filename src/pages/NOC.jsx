import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://e6276813-noc-canada.karanjit-sagun01.workers.dev";

export default function NocSearch() {
  // State variables for search term, NOC data and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [nocData, setNocData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10; // Number of items per page
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function that fetches NOC codes from the API
  const fetchNocData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_BASE_URL}/api/nocs`, {
        params: {
          search: searchTerm || undefined,
          page: page,
          limit: limit,
        },
      });
      setNocData(response.data.data);
      setTotalEntries(response.data.pagination.total);
    //   setTotalEntries(response.);
    } catch (err) {
      console.error("Error fetching NOC codes:", err);
      setError("Error fetching NOC codes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Refetch data when search term or page changes.
  useEffect(() => {
    fetchNocData();
  }, [searchTerm, page]);

  const totalPages = Math.ceil(totalEntries / limit);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">NOC Code Search</h1>
      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Enter occupation keywords (e.g., engineer)"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1); // Reset to page 1 on a new search
          }}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {loading ? (
        <p className="text-center">Loading NOC codes...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : nocData.length === 0 ? (
        <p className="text-center">No NOC codes found.</p>
      ) : (
        <div className="max-w-5xl mx-auto">
          <ul className="space-y-4">
            {nocData.map((noc) => (
              <li
                key={noc.noc_code}
                className="bg-gray-800/70 p-4 rounded-lg border border-gray-700 shadow-md"
              >
                <div className="flex flex-col space-y-2">
                  <h2 className="text-2xl font-semibold">
                    {noc.noc_code} - {noc.title}
                  </h2>
                  <p>{noc.description}</p>
                  {noc.teer && (
                    <p>
                      <strong>TEER Level:</strong> {noc.teer.title}
                    </p>
                  )}
                  {noc.hierarchy && (
                    <div className="text-sm">
                      <p>
                        <strong>Broad Group:</strong>{" "}
                        {noc.hierarchy.broad_group?.title}
                      </p>
                      <p>
                        <strong>Major Group:</strong>{" "}
                        {noc.hierarchy.major_group?.title}
                      </p>
                      <p>
                        <strong>Minor Group:</strong>{" "}
                        {noc.hierarchy.minor_group?.title}
                      </p>
                    </div>
                  )}
                  {noc.link && (
                    <a
                      href={noc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      View More Details
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() =>
                setPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              disabled={page === totalPages}
              className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
