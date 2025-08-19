import { useCRSCalculator } from "../Utils/useCRSCalculator"
import CalculatorHeader from "../components/CRSHeader/CalculatorHeader"
import CalculatorForm from "../components/CRSForm/CalculatorForm"
import CalculatorResults from "../components/CRSResults/CalculatorResults"

export default function CRSCalculator() {
  const { formData, handleInputChange, calculatedScore, hasSpouse } = useCRSCalculator()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-8">
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section - Mobile optimized */}
          <div className="pt-8 mb-8 lg:mb-12">
            <CalculatorHeader />
          </div>

          {/* Main Content - Mobile first grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Calculator Form Section */}
            <div className="order-2 lg:order-1">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 lg:p-8">
                  <CalculatorForm formData={formData} handleInputChange={handleInputChange} hasSpouse={hasSpouse} />
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="order-1 lg:order-2 mb-6 lg:mb-0">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 lg:p-8">
                  <CalculatorResults calculatedScore={calculatedScore} hasSpouse={hasSpouse} />
                </div>
              </div>

              {/* Mobile-optimized Info Card */}
              <div className="mt-6">
                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-white mb-2">About CRS Score</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        The Comprehensive Ranking System (CRS) is used to assess and score your profile for Express
                        Entry. Higher scores increase your chances of receiving an Invitation to Apply (ITA).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Mobile optimized tip cards */}
          <div className="mt-12 lg:mt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Education Tip */}
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 shadow-lg hover:bg-slate-800/50 hover:border-slate-600/50 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-white">Education</h4>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Higher education levels and Canadian credentials can significantly boost your CRS score.
                </p>
              </div>

              {/* Work Experience Tip */}
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 shadow-lg hover:bg-slate-800/50 hover:border-slate-600/50 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-white">Work Experience</h4>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Canadian work experience and skilled work history are key factors in your CRS calculation.
                </p>
              </div>

              {/* Language Skills Tip */}
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 shadow-lg hover:bg-slate-800/50 hover:border-slate-600/50 transition-colors duration-300 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                      />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-white">Language Skills</h4>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Strong English and French language test scores can add substantial points to your profile.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom padding for mobile */}
          <div className="h-8 lg:h-12"></div>
        </div>
      </div>
    </div>
  )
}
