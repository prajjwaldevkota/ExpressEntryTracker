import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Trends from "./pages/Trends";

export default function App() {
  return (
    <Router>
      <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600/80 backdrop-blur-lg px-6 py-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Replace this with your actual logo image or SVG if available */}
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">
            EE
          </div>
          <span className="text-2xl font-semibold text-white">
            Express Entry Tracker
          </span>
        </div>
        <div className="space-x-6">
          <Link
            to="/"
            className="text-white hover:text-blue-200 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/history"
            className="text-white hover:text-blue-200 transition-colors duration-300"
          >
            All Draws
          </Link>
          <Link
            to="/trends"
            className="text-white hover:text-blue-200 transition-colors duration-300"
          >
            Trends  
          </Link>
        </div>
      </nav>
      {/* Add padding-top equal to the height of the navbar so that content isn't hidden */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/trends" element={<Trends />} />
        </Routes>
      </div>
    </Router>
  );
}
