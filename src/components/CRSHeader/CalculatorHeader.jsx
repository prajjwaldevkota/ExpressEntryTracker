import { memo } from "react";
import { FaCalculator, FaExclamationTriangle } from "react-icons/fa";

const CalculatorHeader = memo(function CalculatorHeader() {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-2xl">
        <FaCalculator className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
      </div>
      <h1 className="text-3xl md:text-6xl sm:text-4xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-5">
        CRS Calculator 2025
      </h1>
      <p className="text-xl text-slate-400 font-medium mb-4">
        Calculate your Comprehensive Ranking System score with the latest policies
      </p>

      {/* Updated Policy Notice */}
      <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-4 max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <FaExclamationTriangle className="text-yellow-400" />
          <span className="text-yellow-300 font-semibold">Policy Update</span>
        </div>
        <p className="text-yellow-100 text-sm">
          As of March 25, 2025, job offer points have been removed from the CRS
          system. This calculator reflects the latest changes.
        </p>
      </div>
    </div>
  );
});

export default CalculatorHeader; 