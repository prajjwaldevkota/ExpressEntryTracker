import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowUpRight, CalendarDays, Calculator, ChartNoAxesCombined, Users, Hash, Send, Info, History } from 'lucide-react';
import { useLatestDraw, useOptimizedData } from '../Utils/useOptimizedData';
import { PageHeading, SectionLink, DataState, Skeleton, DrawTable } from '../components/DashboardUI';

function CrsChart({ draws }) {
  const { t } = useTranslation();
  const points = useMemo(() => [...draws].reverse().filter(d => Number.isFinite(Number(d.minimumCRS))), [draws]);
  if (points.length < 2) return <DataState compact />;
  const scores = points.map(d => Number(d.minimumCRS));
  const low = Math.max(0, Math.floor((Math.min(...scores) - 30) / 50) * 50);
  const high = Math.ceil((Math.max(...scores) + 30) / 50) * 50;
  const x = i => 38 + i * 260 / (points.length - 1);
  const y = score => 158 - (score - low) / (high - low) * 122;
  const line = scores.map((score, i) => `${x(i)},${y(score)}`).join(' ');
  return <div className="crs-chart"><svg viewBox="0 0 320 192" role="img" aria-label={t('dashboard.chartDescription')}>
    <defs><linearGradient id="crs-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2b8c6f" stopOpacity=".19" /><stop offset="100%" stopColor="#2b8c6f" stopOpacity="0" /></linearGradient></defs>
    {[low, (low + high) / 2, high].map(value => <g key={value}><line x1="38" x2="303" y1={y(value)} y2={y(value)} className="chart-grid" /><text x="25" y={y(value) + 4} textAnchor="end">{Math.round(value)}</text></g>)}
    <polygon points={`38,158 ${line} 298,158`} fill="url(#crs-fill)" /><polyline points={line} fill="none" stroke="#2b8c6f" strokeWidth="2.5" strokeLinejoin="round" />
    {points.map((draw, i) => <circle key={draw.drawNumber} cx={x(i)} cy={y(scores[i])} r="3.5" fill="#2b8c6f" className="chart-point"><title>{`#${draw.drawNumber}: ${scores[i]} CRS · ${draw.category}`}</title></circle>)}
    <text x="38" y="184">#{points[0].drawNumber}</text><text x="298" y="184" textAnchor="end">#{points.at(-1).drawNumber}</text>
  </svg><p className="chart-note"><span className="status-dot" />{t('dashboard.mixedCategories')}</p></div>;
}

export default function Home() {
  const { t, i18n } = useTranslation();
  const { data, loading, error, refetch } = useLatestDraw();
  const recent = useOptimizedData('/draws', { limit: 10, sort: 'desc' });
  const draw = data?.draw;
  const draws = recent.data?.draws || [];
  const format = value => Number(value || 0).toLocaleString(i18n.resolvedLanguage);
  const totalInvitations = draws.reduce((sum, item) => sum + Number(item.invitationsIssued || 0), 0);
  const average = draws.length ? Math.round(draws.reduce((sum, item) => sum + Number(item.minimumCRS || 0), 0) / draws.length) : 0;

  return <div className="dashboard page-container">
    <PageHeading eyebrow={t('dashboard.eyebrow')} title={t('dashboard.title')} description={t('dashboard.subtitle')}><Link to="/history" className="button secondary heading-action"><History size={16} />{t('dashboard.allDraws')}<ArrowUpRight size={15} /></Link></PageHeading>
    <div className="hero-grid">
      <section className="latest-card" aria-labelledby="latest-title">
        <div className="latest-heading"><span className="latest-label"><span className="status-dot" />{t('home.latestDraw')}</span>{draw && !loading && !error && <span className="draw-round"><Hash size={13} />{draw.drawNumber}</span>}</div>
        {loading ? <Skeleton rows={3} /> : error || !draw ? <DataState error retry={refetch} /> : <>
          <h2 id="latest-title">{draw.category || t('home.latestDraw')}</h2>
          <p className="draw-date"><CalendarDays size={15} />{draw.date}</p>
          <div className="latest-numbers"><div><span className="number-label">{t('home.minimumCRS')}</span><p className="hero-number">{draw.minimumCRS}<span>CRS</span></p></div><div className="latest-invitations"><span className="number-label">{t('dashboard.invitationsIssued')}</span><p className="hero-number">{format(draw.invitationsIssued)}</p></div></div>
          <div className="latest-bottom"><span><Info size={14} />{t('dashboard.roundSpecific')}</span><Link to="/history" aria-label={t('dashboard.allDraws')}><ArrowUpRight size={20} /></Link></div>
        </>}
      </section>
      <section className="calculator-promo"><span className="promo-icon"><Calculator size={23} strokeWidth={1.6} /></span><span className="eyebrow">{t('dashboard.yourNextStep')}</span><h2>{t('dashboard.scoreTitle')}</h2><p>{t('dashboard.scoreDescription')}</p><Link to="/calculator" className="button primary">{t('dashboard.calculate')}<ArrowRight size={17} /></Link><span className="promo-footnote">{t('dashboard.freePrivate')}</span></section>
    </div>
    <div className="snapshot-heading"><h2>{t('dashboard.snapshot')}</h2><span>{t('dashboard.recentRounds', { count: draws.length || 10 })}</span></div>
    <div className="metric-grid" aria-busy={recent.loading}>
      {[[Send, 'dashboard.invitationsIssued', format(totalInvitations), 'mint'], [ChartNoAxesCombined, 'dashboard.averageCrs', format(average), 'sand'], [Users, 'dashboard.categoriesRepresented', new Set(draws.map(d => d.category)).size, 'lavender']].map(metric => { const [Icon, label, value, color] = metric; return <div className="metric-card" key={label}><div><span className="metric-label">{t(label)}</span><p>{recent.loading ? <span className="skeleton metric-skeleton" /> : recent.error || !draws.length ? '—' : value}</p></div><span className={`metric-icon ${color}`}><Icon size={22} strokeWidth={1.6} /></span></div>; })}
    </div>
    <div className="results-grid">
      <section className="panel recent-panel"><div className="panel-header"><div><h2>{t('dashboard.recentDraws')}</h2><p>{t('dashboard.recentDescription')}</p></div><SectionLink to="/history">{t('dashboard.viewAll')}</SectionLink></div>{recent.loading ? <Skeleton rows={5} /> : recent.error ? <DataState error retry={recent.refetch} /> : draws.length ? <DrawTable draws={draws.slice(0, 5)} /> : <DataState />}</section>
      <section className="panel chart-panel"><div className="panel-header"><div><h2>{t('dashboard.crsMovement')}</h2><p>{t('dashboard.recentRounds', { count: draws.length || 10 })}</p></div><ChartNoAxesCombined size={19} className="muted" /></div>{recent.loading ? <Skeleton rows={3} /> : recent.error ? <DataState error compact retry={recent.refetch} /> : <CrsChart draws={draws} />}<div className="chart-footer"><SectionLink to="/trends">{t('dashboard.exploreTrends')}</SectionLink></div></section>
    </div>
    <section className="journey-banner"><span className="journey-icon"><Users size={24} strokeWidth={1.5} /></span><div><h2>{t('dashboard.poolTitle')}</h2><p>{t('dashboard.poolDescription')}</p></div><SectionLink to="/pool">{t('dashboard.explorePool')}</SectionLink></section>
  </div>;
}
