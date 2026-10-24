import { lazy, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, History as HistoryIcon, ChartNoAxesCombined, Users, Calculator, ArrowUpRight, Menu, X, ChevronRight, Leaf, BookOpen, BriefcaseBusiness } from 'lucide-react';
import LanguageSwitcher from './components/LanguageSwitcher';
import ThemeToggle from './components/ThemeToggle';
import ScrollToTop from './components/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const History = lazy(() => import('./pages/History'));
const Trends = lazy(() => import('./pages/Trends'));
const Pool = lazy(() => import('./pages/Pool'));
const NOC = lazy(() => import('./pages/NOC'));
const CRSCalculator = lazy(() => import('./pages/CRSCalculator'));
const officialUrl = 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html';

function Brand() {
  return <Link to="/" className="brand" aria-label="Express Entry Tracker"><span className="brand-mark"><Leaf size={23} strokeWidth={1.8} /></span><span>Express Entry<span className="brand-subtitle">TRACKER</span></span></Link>;
}

function Navigation({ onNavigate }) {
  const { t } = useTranslation();
  const items = [
    ['/', 'dashboard.overview', LayoutDashboard], ['/history', 'nav.history', HistoryIcon],
    ['/trends', 'nav.trends', ChartNoAxesCombined], ['/pool', 'nav.pool', Users],
    ['/calculator', 'nav.calculator', Calculator], ['/noc', 'nav.noc', BriefcaseBusiness],
  ];
  return <>
    <p className="nav-caption">{t('dashboard.workspace')}</p>
    <nav aria-label={t('dashboard.navigation')} className="workspace-nav">
      {items.map(item => { const [path, label, Icon] = item; return <NavLink key={path} to={path} end={path === '/'} onClick={onNavigate} className={({ isActive }) => `workspace-link${isActive ? ' active' : ''}`}><Icon size={19} strokeWidth={1.7} /><span>{t(label)}</span><ChevronRight size={15} className="nav-chevron" /></NavLink>; })}
    </nav>
    <div className="sidebar-bottom">
      <div className="sidebar-note"><span className="note-icon"><BookOpen size={19} /></span><h3>{t('dashboard.newHere')}</h3><p>{t('dashboard.guideDescription')}</p><a href={officialUrl} target="_blank" rel="noopener noreferrer">{t('dashboard.officialGuide')}<ArrowUpRight size={15} /></a></div>
      <div className="sidebar-signoff"><span className="status-dot" />{t('dashboard.madeForJourney')}</div>
    </div>
  </>;
}

function AppLayout() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const titles = { '/': 'dashboard.overview', '/history': 'nav.history', '/trends': 'nav.trends', '/pool': 'nav.pool', '/calculator': 'nav.calculator', '/noc': 'nav.noc' };
  const closeMenu = () => { menuRef.current?.close(); menuButtonRef.current?.focus(); };

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage || 'en';
  }, [i18n.resolvedLanguage]);
  useEffect(() => {
    menuRef.current?.close();
    document.body.style.overflow = '';
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return <div className="app-shell">
    <a className="skip-link" href="#main-content">{t('dashboard.skip')}</a>
    <aside className="sidebar"><Brand /><Navigation /></aside>
    <div className="workspace">
      <header className="topbar">
        <div className="topbar-start"><button ref={menuButtonRef} className="icon-button mobile-menu-trigger" aria-label={t('dashboard.openMenu')} aria-haspopup="dialog" onClick={() => { menuRef.current.showModal(); document.body.style.overflow = 'hidden'; }}><Menu size={21} /></button><span className="breadcrumb-root">{t('dashboard.workspace')}</span><ChevronRight size={14} className="breadcrumb-root" /><span className="breadcrumb-current">{t(titles[location.pathname] || 'dashboard.overview')}</span></div>
        <div className="topbar-actions"><a className="official-link" href={officialUrl} target="_blank" rel="noopener noreferrer">{t('dashboard.ircc')}<ArrowUpRight size={14} /></a><span className="topbar-divider" /><LanguageSwitcher /><ThemeToggle /></div>
      </header>
      <dialog ref={menuRef} className="mobile-drawer" aria-label={t('dashboard.navigation')} onClick={event => { if (event.target === event.currentTarget) closeMenu(); }} onClose={() => { document.body.style.overflow = ''; }}>
        <div className="drawer-inner"><div className="drawer-header"><Brand /><button className="icon-button" onClick={closeMenu} aria-label={t('dashboard.closeMenu')}><X size={21} /></button></div><Navigation onNavigate={closeMenu} /></div>
      </dialog>
      <main id="main-content" tabIndex={-1} className="main-content">
        <Suspense fallback={<div className="route-loader" role="status"><span className="loading-ring" />{t('common.loading')}</div>}>
          <Routes>
            <Route path="/" element={<Home />} /><Route path="/history" element={<History />} /><Route path="/trends" element={<Trends />} /><Route path="/pool" element={<Pool />} /><Route path="/noc" element={<NOC />} /><Route path="/calculator" element={<CRSCalculator />} />
            <Route path="*" element={<div className="empty-state"><h1>{t('dashboard.notFound')}</h1><Link className="button primary" to="/">{t('dashboard.backHome')}</Link></div>} />
          </Routes>
        </Suspense>
      </main>
      <footer className="workspace-footer"><span>© {new Date().getFullYear()} Express Entry Tracker</span><span>{t('dashboard.independent')}</span><a href={officialUrl} target="_blank" rel="noopener noreferrer">{t('dashboard.officialSource')}<ArrowUpRight size={13} /></a></footer>
    </div>
  </div>;
}

export default function App() {
  return <BrowserRouter><AppLayout /><ScrollToTop /></BrowserRouter>;
}
