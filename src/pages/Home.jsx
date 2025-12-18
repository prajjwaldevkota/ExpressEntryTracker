import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLatestDraw } from "../Utils/useOptimizedData";

// Simple Stat Card
const StatCard = memo(function StatCard({ label, value, className = "" }) {
  return (
    <div className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 transition-colors ${className}`}>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-2xl font-semibold text-slate-900 dark:text-white">{value || "—"}</p>
    </div>
  );
});

// Feature Card
const FeatureCard = memo(function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm transition-all">
      <div className="w-10 h-10 bg-sky-50 dark:bg-sky-900/30 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
});

// Loading Skeleton
const LoadingSkeleton = memo(function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-slate-100 dark:bg-slate-800 rounded-xl p-5 animate-pulse">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16 mb-3" />
          <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded w-20" />
        </div>
      ))}
    </div>
  );
});

export default function Home() {
  const { t } = useTranslation();
  const { data, loading, error } = useLatestDraw();
  const latestDraw = data?.draw;

  const features = [
    {
      title: "Draw History",
      description: "Browse through all past Express Entry draws with detailed information.",
      icon: <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      link: "/history"
    },
    {
      title: "Trends Analysis",
      description: "Visualize trends and patterns across different draw categories.",
      icon: <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
      link: "/trends"
    },
    {
      title: "Pool Statistics",
      description: "Understand the current Express Entry pool composition.",
      icon: <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      link: "/pool"
    },
    {
      title: "CRS Calculator",
      description: "Calculate your Comprehensive Ranking System score accurately.",
      icon: <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
      link: "/calculator"
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-sky-500 rounded-full" />
          Updated with latest draw data
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          {t("home.title")}
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
          {t("home.subtitle")}
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/calculator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 text-white font-medium rounded-lg hover:bg-sky-600 transition-colors"
          >
            Calculate CRS Score
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            to="/history"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            View Draw History
          </Link>
        </div>
      </div>

      {/* Latest Draw Stats */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Latest Draw</h2>
          <Link
            to="/history"
            className="text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium"
          >
            View all draws →
          </Link>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : error || !latestDraw ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
            <p className="text-red-600 dark:text-red-400">Unable to load latest draw data. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard label="Draw Number" value={`#${latestDraw.drawNumber}`} />
            <StatCard label="Date" value={latestDraw.date} />
            <StatCard label="Minimum CRS" value={latestDraw.minimumCRS} />
            <StatCard label="Invitations" value={latestDraw.invitationsIssued?.toLocaleString()} />
            <StatCard label="Category" value={latestDraw.category} className="col-span-2 md:col-span-1 lg:col-span-2" />
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Tools & Features</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link}>
              <FeatureCard {...feature} />
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 bg-slate-900 dark:bg-slate-800 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to calculate your CRS score?
        </h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Use our comprehensive calculator to see where you stand in the Express Entry pool.
        </p>
        <Link
          to="/calculator"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-colors"
        >
          Open Calculator
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>
    </div>
  );
}
