import { useState, useEffect, memo, lazy, Suspense, useCallback, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ScrollToTop from "./components/ScrollToTop";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaHistory,
  FaChartLine,
  FaUsers,
  FaBriefcase,
  FaCalculator,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Lazy load pages with loading fallback
const Home = lazy(() => import("./pages/Home"));
const History = lazy(() => import("./pages/History"));
const Trends = lazy(() => import("./pages/Trends"));
const Pool = lazy(() => import("./pages/Pool"));
const NOC = lazy(() => import("./pages/NOC"));
const CRSCalculator = lazy(() => import("./pages/CRSCalculator"));

// Memoized LoadingSpinner component
const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-blue-500/30 rounded-full animate-spin"></div>
      <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  </div>
));

// Memoized NavItem component with optimized animations
const NavItem = memo(function NavItem({
  path,
  label,
  icon: Icon,
  isActive,
  onClick,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={path}
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors duration-300 ${
          isActive
            ? "bg-white/10 text-white"
            : "text-white/70 hover:text-white hover:bg-white/5"
        }`}
      >
        {Icon && <Icon className="w-4 h-4" />}
        <span className="font-medium text-sm">{label}</span>
      </Link>
    </motion.div>
  );
});

// Memoized MobileMenu component with optimized animations
const MobileMenu = memo(function MobileMenu({
  isOpen,
  onClose,
  navItems,
  currentPath,
}) {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
                  style={{ willChange: "transform, opacity" }}
        className="fixed top-[2.5rem] sm:top-16 left-0 w-full bg-gray-900/95 backdrop-blur-xl border-b border-white/20 z-40 md:hidden"
        >
                      <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <NavItem
                  key={item.path}
                  {...item}
                  isActive={currentPath === item.path}
                  onClick={handleClose}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

// Memoized Navigation component with optimized state management
const Navigation = memo(function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const { t } = useTranslation();
  const location = useLocation();

  // Memoize navItems to prevent unnecessary re-renders
  const navItems = useMemo(() => [
    { path: "/", label: t("nav.home"), icon: FaHome },
    { path: "/history", label: t("nav.history"), icon: FaHistory },
    { path: "/trends", label: t("nav.trends"), icon: FaChartLine },
    { path: "/pool", label: t("nav.pool"), icon: FaUsers },
    { path: "/noc", label: t("nav.noc"), icon: FaBriefcase },
    { path: "/calculator", label: t("nav.calculator"), icon: FaCalculator },
  ], [t]);

  // Memoize handlers
  const handleResize = useCallback(() => {
    setViewportHeight(window.innerHeight);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Add keyboard navigation for mobile menu
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isMobileMenuOpen, closeMobileMenu]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div style={{ minHeight: `${viewportHeight}px` }}>
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/95 backdrop-blur-xl border-b border-white/20 px-3 sm:px-4 py-2 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-extrabold text-base sm:text-lg shadow-lg"
            >
              <span className="tracking-tight">EE</span>
            </motion.div>
            <Link
              to="/"
              className="text-base sm:text-lg md:text-xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-lg tracking-tight"
            >
              Express Entry <span className="text-blue-400">Tracker</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                {...item}
                isActive={location.pathname === item.path}
              />
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className="text-white/90 hover:text-white transition-colors duration-300 p-1"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </motion.button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        navItems={navItems}
        currentPath={location.pathname}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-zinc-800 to-gray-800 transition-colors duration-300 mt-1">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/noc" element={<NOC />} />
            <Route path="/pool" element={<Pool />} />
            <Route path="/calculator" element={<CRSCalculator />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
});

export default function App() {
  return (
    <Router>
      <Navigation />
      <ScrollToTop />
    </Router>
  );
}
