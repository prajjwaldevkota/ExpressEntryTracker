import { memo } from "react";
import { getScoreAnalysis } from "../../Utils/crsCalculator";

const ScoreAnalysis = memo(function ScoreAnalysis({ totalScore }) {
  const analysis = getScoreAnalysis(totalScore);

  const getColorClasses = () => {
    if (analysis.color === "emerald") return {
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      border: "border-emerald-200 dark:border-emerald-800",
      text: "text-emerald-800 dark:text-emerald-300"
    };
    if (analysis.color === "amber") return {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-200 dark:border-amber-800",
      text: "text-amber-800 dark:text-amber-300"
    };
    return {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      text: "text-red-800 dark:text-red-300"
    };
  };

  const colors = getColorClasses();

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 transition-colors">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
        Score Analysis
      </h3>

      <div className="space-y-4">
        {/* Analysis Message */}
        <div className={`${colors.bg} ${colors.border} border rounded-lg p-4`}>
          <p className={`${colors.text} text-sm font-medium`}>
            {analysis.message}
          </p>
          <p className={`${colors.text} text-sm mt-1 opacity-80`}>
            {analysis.details}
          </p>
        </div>

        {/* Improvement Tips */}
        <div>
          <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Ways to Improve
          </h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-sky-500 mt-1">•</span>
              <span>Achieve CLB 9+ in all language skills</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500 mt-1">•</span>
              <span>Gain Canadian work experience</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500 mt-1">•</span>
              <span>Learn French for additional points</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500 mt-1">•</span>
              <span>Get a Provincial Nomination (+600 points)</span>
            </li>
          </ul>
        </div>

        {/* Notes */}
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 text-xs text-slate-500 dark:text-slate-400">
          <p className="font-medium text-slate-700 dark:text-slate-300 mb-1">Important Notes:</p>
          <ul className="space-y-1">
            <li>• Job offer points removed as of March 25, 2025</li>
            <li>• This is an estimate - official scores may vary</li>
            <li>• Language tests must be less than 2 years old</li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export default ScoreAnalysis;