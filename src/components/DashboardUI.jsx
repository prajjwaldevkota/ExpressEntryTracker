import { ArrowRight, RefreshCw, WifiOff, Inbox } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function PageHeading({ eyebrow, title, description, children }) {
  return <div className="page-heading"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1><p className="page-description">{description}</p></div>{children}</div>;
}

export function SectionLink({ to, children }) {
  return <Link to={to} className="text-link">{children}<ArrowRight size={15} /></Link>;
}

export function DataState({ error = false, retry, compact = false }) {
  const { t } = useTranslation();
  const Icon = error ? WifiOff : Inbox;
  return <div className={`empty-state${compact ? ' compact' : ''}`} role="status"><span className="empty-icon"><Icon size={23} /></span><h3>{t(error ? 'dashboard.unavailable' : 'dashboard.noResults')}</h3><p>{t(error ? 'dashboard.unavailableDescription' : 'dashboard.noResultsDescription')}</p>{retry && <button className="button secondary" onClick={retry}><RefreshCw size={15} />{t('common.retry')}</button>}</div>;
}

export function Skeleton({ rows = 3 }) {
  const { t } = useTranslation();
  return <div className="skeleton-stack" role="status" aria-label={t('common.loading')}>{Array.from({ length: rows }, (_, i) => <div className="skeleton" key={i} />)}</div>;
}

export function DrawTable({ draws }) {
  const { t, i18n } = useTranslation();
  return <div className="table-scroll" tabIndex={0} role="region" aria-label={t('history.title')}><table className="draw-table"><thead><tr><th scope="col">{t('dashboard.round')}</th><th scope="col">{t('home.date')}</th><th scope="col">{t('home.category')}</th><th scope="col" className="numeric">{t('dashboard.crs')}</th><th scope="col" className="numeric">{t('dashboard.invitations')}</th></tr></thead><tbody>{draws.map(draw => <tr key={draw.id || draw.drawNumber}><td className="draw-number">#{draw.drawNumber}</td><td className="date-cell">{draw.date}</td><td><span className="category-tag">{draw.category || '—'}</span></td><td className="numeric"><span className="crs-pill">{draw.minimumCRS ?? '—'}</span></td><td className="numeric invitation-value">{Number(draw.invitationsIssued || 0).toLocaleString(i18n.resolvedLanguage)}</td></tr>)}</tbody></table></div>;
}
