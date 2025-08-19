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

// Modern LoadingSpinner component
const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-slate-700 rounded-full animate-spin"></div>
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-emerald-500 border-r-blue-500 rounded-full animate-spin"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
    </div>
  </div>
));

// Modern NavItem component
const NavItem = memo(function NavItem({
  path,
  label,
  icon: Icon,
  isActive,
  onClick,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={path}
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${
          isActive
            ? "bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg shadow-emerald-500/25"
            : "text-slate-300 hover:text-white hover:bg-slate-800/50 hover:shadow-lg"
        }`}
      >
        {Icon && <Icon className="w-4 h-4" />}
        <span className="whitespace-nowrap">{label}</span>
      </Link>
    </motion.div>
  );
});

// Modern MobileMenu component
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
          className="fixed top-[4rem] left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 z-40 md:hidden shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col space-y-3">
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

// Modern Navigation component
const Navigation = memo(function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = useMemo(() => [
    { path: "/", label: t("nav.home"), icon: FaHome },
    { path: "/history", label: t("nav.history"), icon: FaHistory },
    { path: "/trends", label: t("nav.trends"), icon: FaChartLine },
    { path: "/pool", label: t("nav.pool"), icon: FaUsers },
    { path: "/noc", label: t("nav.noc"), icon: FaBriefcase },
    { path: "/calculator", label: t("nav.calculator"), icon: FaCalculator },
  ], [t]);

  const handleResize = useCallback(() => {
    setViewportHeight(window.innerHeight);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

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
      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 px-4 py-3 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-emerald-500/25"
            >
              <span className="tracking-tight">EE</span>
            </motion.div>
            <Link
              to="/"
              className="text-lg md:text-xl font-extrabold bg-gradient-to-r from-white via-emerald-100 to-blue-200 bg-clip-text text-transparent drop-shadow-lg tracking-tight"
            >
              Express Entry <span className="text-emerald-400">Tracker</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
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
              className="text-slate-300 hover:text-white transition-colors duration-300 p-2 rounded-xl hover:bg-slate-800/50"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
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

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-colors duration-300 mt-16">
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
