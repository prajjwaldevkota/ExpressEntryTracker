import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useOptimizedData, useCategories } from '../Utils/useOptimizedData';
import { PageHeading, DrawTable, DataState, Skeleton } from '../components/DashboardUI';

export default function History() {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState({ search: '', category: '', sort: 'desc', page: 1 });
  useEffect(() => {
    const timer = setTimeout(() => setQuery(prev => ({ ...prev, search: search.trim(), page: 1 })), 300);
    return () => clearTimeout(timer);
  }, [search]);
  useEffect(() => { setQuery(prev => ({ ...prev, category: '', page: 1 })); }, [i18n.resolvedLanguage]);
  const { data, loading, error, refetch } = useOptimizedData('/draws', { ...query, search: query.search || undefined, category: query.category || undefined, limit: 20 }, true);
  const { data: categoryData } = useCategories();
  const categories = categoryData?.categories || categoryData?.data || [];
  const draws = data?.draws || [];
  const update = (key, value) => setQuery(prev => ({ ...prev, [key]: value, page: 1 }));
  const reset = () => { setSearch(''); setQuery({ search: '', category: '', sort: 'desc', page: 1 }); };
  const pending = loading || search.trim() !== query.search;
  return <div className="page-container">
    <PageHeading eyebrow={t('dashboard.workspace')} title={t('history.title')} description={t('history.subtitle')} />
    <div className="filter-bar">
      <div className="field-group search-field"><label htmlFor="draw-search">{t('dashboard.search')}</label><div className="search-input-wrap"><Search size={16} /><input id="draw-search" type="search" className="field-control" value={search} onChange={e => setSearch(e.target.value)} placeholder={t('history.searchPlaceholder')} />{search && <button className="search-clear" onClick={() => setSearch('')} aria-label={t('history.clear')}><X size={15} /></button>}</div></div>
      <div className="field-group filter-select"><label htmlFor="draw-category">{t('home.category')}</label><select id="draw-category" className="field-control" value={query.category} onChange={e => update('category', e.target.value)}><option value="">{t('history.allCategories')}</option>{categories.map(category => <option key={category} value={category}>{category}</option>)}</select></div>
      <div className="field-group"><label htmlFor="draw-sort">{t('dashboard.sort')}</label><select id="draw-sort" className="field-control" value={query.sort} onChange={e => update('sort', e.target.value)}><option value="desc">{t('history.newestFirst')}</option><option value="asc">{t('history.oldestFirst')}</option></select></div>
    </div>
    <div className="results-caption"><span role="status">{pending ? t('common.loading') : t('dashboard.loaded', { count: draws.length })}</span>{(search || query.category || query.sort !== 'desc') && <button onClick={reset} className="text-link">{t('dashboard.reset')}<X size={13} /></button>}</div>
    <section className="panel history-panel" aria-busy={pending}>
      {pending ? <Skeleton rows={8} /> : error ? <DataState error retry={refetch} /> : draws.length ? <DrawTable draws={draws} /> : <DataState />}
      <div className="pagination-bar"><span>{t('dashboard.page', { page: query.page })}</span><div className="pagination-actions"><button className="button secondary" disabled={pending || query.page <= 1} onClick={() => setQuery(prev => ({ ...prev, page: prev.page - 1 }))}><ChevronLeft size={15} />{t('history.previous')}</button><button className="button secondary" disabled={pending || error || !data?.pagination?.hasNext} onClick={() => setQuery(prev => ({ ...prev, page: prev.page + 1 }))}>{t('history.next')}<ChevronRight size={15} /></button></div></div>
    </section>
  </div>;
}
