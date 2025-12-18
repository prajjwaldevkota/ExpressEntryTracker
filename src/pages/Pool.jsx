import { useState, useEffect, useMemo, memo } from "react";
import { useTranslation } from "react-i18next";

// Range Card
const RangeCard = memo(function RangeCard({ range, value, total, maxValue }) {
  const percentage = ((value / total) * 100).toFixed(1);
  const barWidth = (value / maxValue) * 100;

  const getColor = () => {
    const score = parseInt(range.split("-")[0]);
    if (score >= 500) return { bg: "bg-emerald-500", light: "bg-emerald-50 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400" };
    if (score >= 450) return { bg: "bg-sky-500", light: "bg-sky-50 dark:bg-sky-900/30", text: "text-sky-700 dark:text-sky-400" };
    if (score >= 400) return { bg: "bg-amber-500", light: "bg-amber-50 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400" };
    if (score >= 300) return { bg: "bg-orange-500", light: "bg-orange-50 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400" };
    return { bg: "bg-slate-400", light: "bg-slate-50 dark:bg-slate-700", text: "text-slate-600 dark:text-slate-400" };
  };

  const color = getColor();

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2 py-1 text-xs font-semibold rounded ${color.light} ${color.text}`}>
          {range}
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-400">{percentage}%</span>
      </div>

      <p className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
        {value.toLocaleString()}
      </p>

      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${color.bg} rounded-full transition-all duration-500`}
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
});

// Stat Card
const StatCard = memo(function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 bg-sky-50 dark:bg-sky-900/30 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</p>
      </div>
      <p className="text-2xl font-semibold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
});

// Loading Skeleton
const LoadingSkeleton = memo(function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 animate-pulse">
          <div className="flex justify-between mb-3">
            <div className="h-6 bg-slate-100 dark:bg-slate-700 rounded w-20" />
            <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-10" />
          </div>
          <div className="h-8 bg-slate-100 dark:bg-slate-700 rounded w-24 mb-3" />
          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded" />
        </div>
      ))}
    </div>
  );
});

export default function Pool() {
  const { t } = useTranslation();
  const [poolData, setPoolData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoolData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        const mockData = [
          { range: "601-1200", value: 5234 },
          { range: "501-600", value: 12453 },
          { range: "451-500", value: 24567 },
          { range: "401-450", value: 38234 },
          { range: "351-400", value: 42123 },
          { range: "301-350", value: 35678 },
          { range: "251-300", value: 28456 },
          { range: "201-250", value: 18234 },
          { range: "0-200", value: 12456 },
        ];

        setPoolData(mockData);
      } catch (error) {
        console.error("Error fetching pool data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoolData();
  }, []);

  const { total, maxValue } = useMemo(() => {
    const total = poolData.reduce((sum, item) => sum + item.value, 0);
    const maxValue = Math.max(...poolData.map(item => item.value));
    return { total, maxValue };
  }, [poolData]);

  const stats = useMemo(() => {
    if (!poolData.length) return [];

    const above450 = poolData
      .filter(item => parseInt(item.range.split("-")[0]) >= 450)
      .reduce((sum, item) => sum + item.value, 0);

    const highestRange = poolData.reduce((prev, curr) =>
      curr.value > prev.value ? curr : prev
      , poolData[0]);

    return [
      {
        label: "Total Candidates",
        value: total.toLocaleString(),
        icon: <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      },
      {
        label: "CRS 450+",
        value: above450.toLocaleString(),
        icon: <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
      },
      {
        label: "Most Common Range",
        value: highestRange?.range || "—",
        icon: <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
      },
    ];
  }, [poolData, total]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {t("pool.title")}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          {t("pool.subtitle")}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Pool Distribution */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">CRS Score Distribution</h2>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {poolData.map((item) => (
              <RangeCard
                key={item.range}
                range={item.range}
                value={item.value}
                total={total}
                maxValue={maxValue}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 transition-colors">
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-sky-600 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-slate-900 dark:text-white mb-1">About Pool Data</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              The Express Entry pool composition shows the distribution of candidates by their CRS score ranges.
              This data is updated periodically by IRCC and helps you understand where you stand relative to other candidates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
