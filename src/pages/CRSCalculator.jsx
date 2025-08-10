import { useCRSCalculator } from "../Utils/useCRSCalculator"
import CalculatorHeader from "../components/CRSHeader/CalculatorHeader"
import CalculatorForm from "../components/CRSForm/CalculatorForm"
import CalculatorResults from "../components/CRSResults/CalculatorResults"

export default function CRSCalculator() {
  const { formData, handleInputChange, calculatedScore, hasSpouse } = useCRSCalculator()

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Enhanced background with modern dark gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Subtle background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full blur-3xl" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header Section */}
          <div className="pt-8 sm:pt-12 mb-8 sm:mb-12">
            <CalculatorHeader />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
            {/* Calculator Form Section */}
            <div className="space-y-6">
              <div className="relative">
                {/* Subtle glow effect for form container */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                  {/* Top accent line */}
                  <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                  <div className="p-6 sm:p-8">
                    <CalculatorForm formData={formData} handleInputChange={handleInputChange} hasSpouse={hasSpouse} />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className="relative">
                {/* Enhanced glow effect for results */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-75 transition-opacity duration-500" />

                <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                  {/* Top accent line with different gradient */}
                  <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

                  <div className="p-6 sm:p-8">
                    <CalculatorResults calculatedScore={calculatedScore} formData={formData} hasSpouse={hasSpouse} />
                  </div>
                </div>
              </div>

              {/* Additional Info Card */}
              <div className="relative">
                <div className="bg-white/[0.01] backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2">About CRS Score</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        The Comprehensive Ranking System (CRS) is used to assess and score your profile for Express
                        Entry. Higher scores increase your chances of receiving an Invitation to Apply (ITA).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Tips or Additional Info */}
          <div className="mt-12 sm:mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tip Cards */}
              <div className="bg-white/[0.01] backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-lg hover:bg-white/[0.02] transition-colors duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
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
                <p className="text-xs text-slate-400 leading-relaxed">
                  Higher education levels and Canadian credentials can significantly boost your CRS score.
                </p>
              </div>

              <div className="bg-white/[0.01] backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-lg hover:bg-white/[0.02] transition-colors duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
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
                <p className="text-xs text-slate-400 leading-relaxed">
                  Canadian work experience and skilled work history are key factors in your CRS calculation.
                </p>
              </div>

              <div className="bg-white/[0.01] backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-lg hover:bg-white/[0.02] transition-colors duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
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
                <p className="text-xs text-slate-400 leading-relaxed">
                  Strong English and French language test scores can add substantial points to your profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
