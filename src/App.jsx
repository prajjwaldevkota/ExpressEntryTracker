import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Trends from "./pages/Trends";
import Pool from "./pages/Pool";
import NOC from "./pages/NOC";
import { FaBars, FaTimes, FaHome, FaHistory, FaChartLine, FaUsers, FaBriefcase } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/history", label: "All Draws", icon: FaHistory },
    { path: "/trends", label: "Trends", icon: FaChartLine },
    { path: "/noc", label: "NOC", icon: FaBriefcase },
    { path: "/pool", label: "Pool", icon: FaUsers },
  ];

  return (
    <Router>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shadow-lg"
            >
              <span className="tracking-tight">EE</span>
            </motion.div>
            <span className="text-3xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
              Express Entry <span className="text-blue-300">Tracker</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="group relative text-white/80 hover:text-white transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 group-hover:text-blue-400 transition-colors duration-300" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden"
            style={{ top: "4.5rem" }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center gap-3 text-2xl font-semibold text-white/80 hover:text-white transition-all duration-300"
                >
                  <item.icon className="w-6 h-6 group-hover:text-blue-400 transition-colors duration-300" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-900 transition-colors duration-300">
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
