import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Trends from "./pages/Trends";
import Pool from "./pages/Pool";
import NOC from "./pages/NOC";
import { FaBars, FaTimes } from "react-icons/fa";

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600/80 backdrop-blur-lg px-6 py-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">
            EE
          </div>
          <span className="text-2xl font-semibold text-white">
            Express Entry Tracker
          </span>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
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
          <Link
            to="/noc"
            className="text-white hover:text-blue-200 transition-colors duration-300"
          >
            NOC
          </Link>
          <Link
            to="/pool"
            className="text-white hover:text-blue-200 transition-colors duration-300"
          >
            Pool
          </Link>
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full bg-blue-600/90 backdrop-blur-lg shadow-lg z-50">
          <div className="flex flex-col items-center space-y-4 p-4">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-blue-200 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/history"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-blue-200 transition-colors duration-300"
            >
              All Draws
            </Link>
            <Link
              to="/trends"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-blue-200 transition-colors duration-300"
            >
              Trends
            </Link>
            <Link
              to="/noc"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-blue-200 transition-colors duration-300"
            >
              NOC
            </Link>
            <Link
              to="/pool"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-blue-200 transition-colors duration-300"
            >
              Pool
            </Link>
          </div>
        </div>
      )}

      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/noc" element={<NOC />} />
          <Route path="/pool" element={<Pool />} />
        </Routes>
      </div>
    </Router>
  );
}
