import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useOptimizedData } from '../Utils/useOptimizedData';
import { PageHeading, DataState, Skeleton } from '../components/DashboardUI';

export default function NOC() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState({ search: '', page: 1 });
  useEffect(() => {
    const timer = setTimeout(() => setQuery({ search: search.trim(), page: 1 }), 300);
    return () => clearTimeout(timer);
  }, [search]);
  const { data, loading, error, refetch } = useOptimizedData('/nocs', { ...query, limit: 12 });
  const occupations = data?.data || [];
  const totalPages = Math.ceil((data?.pagination?.total || 0) / 12);
  return <div className="page-container"><PageHeading eyebrow={t('dashboard.workspace')} title={t('noc.title')} description={t('noc.subtitle')} /><div className="filter-bar"><div className="field-group search-field"><label htmlFor="noc-search">{t('noc.searchPlaceholder')}</label><div className="search-input-wrap"><Search size={16} /><input id="noc-search" className="field-control" type="search" value={search} onChange={event => setSearch(event.target.value)} /></div></div></div>
    {loading ? <Skeleton rows={6} /> : error ? <div className="panel"><DataState error retry={refetch} /></div> : !occupations.length ? <div className="panel"><DataState /></div> : <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">{occupations.map(noc => <article key={noc.noc_code} className="panel p-5"><p className="eyebrow">NOC {noc.noc_code}</p><h2 className="font-semibold text-base mb-3">{noc.title}</h2>{noc.teer && <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{noc.teer.title} · {noc.teer.description}</p>}{noc.description && <details className="text-xs text-slate-600 dark:text-slate-300 mb-4"><summary className="cursor-pointer">{t('noc.viewDetails')}</summary><p className="mt-3 leading-relaxed">{noc.description}</p></details>}{noc.link && /^https?:\/\//i.test(noc.link) && <a href={noc.link} target="_blank" rel="noopener noreferrer" className="text-link">{t('noc.viewDetails')}<ExternalLink size={13} /></a>}</article>)}</div>}
    <div className="pagination-bar"><span>{t('dashboard.page', { page: query.page })}</span><div className="pagination-actions"><button className="button secondary" disabled={loading || query.page <= 1} onClick={() => setQuery(prev => ({ ...prev, page: prev.page - 1 }))}><ChevronLeft size={15} />{t('history.previous')}</button><button className="button secondary" disabled={loading || error || query.page >= totalPages} onClick={() => setQuery(prev => ({ ...prev, page: prev.page + 1 }))}>{t('history.next')}<ChevronRight size={15} /></button></div></div>
  </div>;
}
