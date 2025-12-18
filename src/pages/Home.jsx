import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLatestDraw } from "../Utils/useOptimizedData";

// Enhanced Stat Card with icon and hover effect
const StatCard = memo(function StatCard({ label, value, icon, highlight = false }) {
  return (
    <div className={`
      group relative overflow-hidden
      bg-white dark:bg-slate-800 
      border border-slate-200 dark:border-slate-700 
      rounded-2xl p-6 
      hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50
      hover:border-slate-300 dark:hover:border-slate-600
      transition-all duration-300 ease-out
      ${highlight ? 'ring-2 ring-sky-500/20' : ''}
    `}>
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        {icon && (
          <div className="w-10 h-10 mb-4 rounded-xl bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center group-hover:bg-sky-100 dark:group-hover:bg-sky-900/30 transition-colors duration-300">
            {icon}
          </div>
        )}
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          {label}
        </p>
        <p className={`text-2xl font-bold ${highlight ? 'text-sky-600 dark:text-sky-400' : 'text-slate-900 dark:text-white'}`}>
          {value || "—"}
        </p>
      </div>
    </div>
  );
});

// Enhanced Feature Card with better hover
const FeatureCard = memo(function FeatureCard({ title, description, icon, gradient }) {
  return (
    <div className="group relative overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-1 transition-all duration-300">
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${gradient}`} />

      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center mb-5 shadow-lg shadow-sky-500/25 group-hover:shadow-sky-500/40 group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {description}
        </p>

        {/* Arrow indicator */}
        <div className="mt-4 flex items-center gap-2 text-sky-600 dark:text-sky-400 text-sm font-medium opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
          Learn more
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
});

// Loading Skeleton with consistent sizing
const LoadingSkeleton = memo(function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 animate-pulse">
          <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl mb-4" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20 mb-3" />
          <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded w-16" />
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
      description: "Browse through all past Express Entry draws with detailed information and filters.",
      icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      link: "/history",
      gradient: "bg-gradient-to-br from-sky-500/5 to-transparent"
    },
    {
      title: "Trends Analysis",
      description: "Visualize trends and patterns across different draw categories over time.",
      icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
      link: "/trends",
      gradient: "bg-gradient-to-br from-emerald-500/5 to-transparent"
    },
    {
      title: "Pool Statistics",
      description: "Understand the current Express Entry pool composition and your ranking.",
      icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      link: "/pool",
      gradient: "bg-gradient-to-br from-purple-500/5 to-transparent"
    },
    {
      title: "CRS Calculator",
      description: "Calculate your Comprehensive Ranking System score accurately with our tool.",
      icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
      link: "/calculator",
      gradient: "bg-gradient-to-br from-amber-500/5 to-transparent"
    },
  ];

  const statIcons = {
    draw: <svg className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-sky-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>,
    date: <svg className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-sky-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    crs: <svg className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-sky-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    invitations: <svg className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-sky-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with subtle gradient background */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-400/10 dark:bg-sky-400/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100/80 dark:bg-sky-900/40 backdrop-blur-sm text-sky-700 dark:text-sky-300 rounded-full text-sm font-medium mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              Updated with latest draw data
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              {t("home.title")}
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t("home.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/calculator"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-sky-500 text-white font-semibold rounded-xl hover:bg-sky-600 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                Calculate CRS Score
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link
                to="/history"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                View Draw History
                <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Draw Stats */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Latest Draw</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Most recent Express Entry draw results</p>
          </div>
          <Link
            to="/history"
            className="group hidden sm:inline-flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium"
          >
            View all draws
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : error || !latestDraw ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-red-600 dark:text-red-400 font-medium">Unable to load latest draw data</p>
            <p className="text-red-500 dark:text-red-500 text-sm mt-1">Please try again later</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Draw Number"
              value={`#${latestDraw.drawNumber}`}
              icon={statIcons.draw}
            />
            <StatCard
              label="Date"
              value={latestDraw.date}
              icon={statIcons.date}
            />
            <StatCard
              label="Minimum CRS"
              value={latestDraw.minimumCRS}
              icon={statIcons.crs}
              highlight={true}
            />
            <StatCard
              label="Invitations"
              value={latestDraw.invitationsIssued?.toLocaleString()}
              icon={statIcons.invitations}
            />
          </div>
        )}

        {/* Category Tag */}
        {latestDraw?.category && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">Category:</span>
            <span className="inline-flex px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-full">
              {latestDraw.category}
            </span>
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Tools & Features
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Everything you need to track your Express Entry journey
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link} className="block">
              <FeatureCard {...feature} />
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-3xl p-8 sm:p-12 lg:p-16">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to calculate your CRS score?
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Use our comprehensive calculator to see where you stand in the Express Entry pool and get personalized insights.
            </p>
            <Link
              to="/calculator"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Open Calculator
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
