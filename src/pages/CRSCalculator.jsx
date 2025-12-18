import { useCRSCalculator } from "../Utils/useCRSCalculator";
import CalculatorHeader from "../components/CRSHeader/CalculatorHeader";
import CalculatorForm from "../components/CRSForm/CalculatorForm";
import CalculatorResults from "../components/CRSResults/CalculatorResults";

export default function CRSCalculator() {
  const { formData, handleInputChange, calculatedScore, hasSpouse } = useCRSCalculator();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <CalculatorHeader />

      {/* Main Content */}
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Form Section - Takes 3 columns */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 transition-colors">
            <CalculatorForm
              formData={formData}
              handleInputChange={handleInputChange}
              hasSpouse={hasSpouse}
            />
          </div>
        </div>

        {/* Results Section - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Score Card */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 transition-colors">
              <CalculatorResults
                calculatedScore={calculatedScore}
                hasSpouse={hasSpouse}
              />
            </div>

            {/* Tips */}
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5 transition-colors">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Tips to Improve Your Score</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm">
                  <svg className="w-5 h-5 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="text-slate-600 dark:text-slate-400">Higher education levels and Canadian credentials boost your score</span>
                </li>
                <li className="flex gap-3 text-sm">
                  <svg className="w-5 h-5 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-slate-600 dark:text-slate-400">Canadian work experience adds significant points</span>
                </li>
                <li className="flex gap-3 text-sm">
                  <svg className="w-5 h-5 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span className="text-slate-600 dark:text-slate-400">Strong language test scores can add substantial points</span>
                </li>
              </ul>
            </div>

            {/* Info Box */}
            <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-xl p-5 transition-colors">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-sky-900 dark:text-sky-300">About CRS Score</h4>
                  <p className="text-xs text-sky-700 dark:text-sky-400 mt-1 leading-relaxed">
                    The Comprehensive Ranking System (CRS) is used to assess and score your profile for Express Entry. Higher scores increase your chances of receiving an ITA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
