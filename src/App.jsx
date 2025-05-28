import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Trends from "./pages/Trends";
import Pool from "./pages/Pool";
import NOC from "./pages/NOC";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaHistory,
  FaChartLine,
  FaUsers,
  FaBriefcase,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Separate component for navigation items to handle active state
function NavItem({ path, label, icon: Icon, isActive, onClick }) {
  return (
    <Link
      to={path}
      onClick={onClick}
      className={`group relative text-white/80 hover:text-white transition-all duration-300 ${
        isActive ? "text-white" : ""
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 transition-colors duration-300 ${
          isActive ? "text-blue-400" : "group-hover:text-blue-400"
        }`} />
        <span className="font-medium">{label}</span>
      </div>
      <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
        isActive ? "w-full" : "w-0 group-hover:w-full"
      }`} />
    </Link>
  );
}

// Separate component for mobile menu
function MobileMenu({ isOpen, onClose, navItems, currentPath }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Menu Content */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-black/95 backdrop-blur-xl z-50"
            style={{ top: "4.5rem" }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6 p-8">
              {navItems.map((item) => (
                <NavItem
                  key={item.path}
                  {...item}
                  isActive={currentPath === item.path}
                  onClick={onClose}
                  className="text-2xl font-semibold py-3"
                />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  // Handle viewport height changes (mobile browser address bar)
  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", updateHeight);
    window.addEventListener("orientationchange", updateHeight);
    
    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("orientationchange", updateHeight);
    };
  }, []);

  const navItems = [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/history", label: "All Draws", icon: FaHistory },
    { path: "/trends", label: "Trends", icon: FaChartLine },
    { path: "/noc", label: "NOC", icon: FaBriefcase },
    { path: "/pool", label: "Pool", icon: FaUsers },
  ];

  return (
    <Router>
      <div style={{ minHeight: `${viewportHeight}px` }}>
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-4 shadow-2xl">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl sm:text-2xl shadow-lg"
              >
                <span className="tracking-tight">EE</span>
              </motion.div>
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
                Express Entry <span className="text-blue-300">Tracker</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <NavItem
                  key={item.path}
                  {...item}
                  isActive={window.location.pathname === item.path}
                />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white/80 hover:text-white transition-colors duration-300 p-2"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navItems={navItems}
          currentPath={window.location.pathname}
        />

        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-900 transition-colors duration-300 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/noc" element={<NOC />} />
            <Route path="/pool" element={<Pool />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
