import { memo } from "react";
import { getScoreAnalysis } from "../../Utils/crsCalculator";

const ScoreAnalysis = memo(function ScoreAnalysis({ totalScore }) {
  const analysis = getScoreAnalysis(totalScore);

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
      <h3 className="text-xl font-bold text-white mb-4">
        Score Analysis & Recommendations
      </h3>
      <div className="space-y-4 text-sm">
        <div className={`bg-${analysis.color}-500/20 p-4 rounded-xl border border-${analysis.color}-500/20`}>
          <p className={`text-${analysis.color}-400 font-medium`}>
            {analysis.message}
          </p>
          <p className={`text-${analysis.color}-200 mt-2`}>
            {analysis.details}
          </p>
        </div>

        <div className="bg-blue-500/20 p-4 rounded-xl border border-blue-500/20">
          <h5 className="text-blue-400 font-medium mb-2">
            💡 Ways to Improve Your Score:
          </h5>
          <ul className="text-blue-200 space-y-1 text-sm">
            <li>
              • Achieve CLB 9+ in all language skills for maximum points
            </li>
            <li>
              • Gain Canadian work experience (each year significantly boosts your score)
            </li>
            <li>• Learn French (can add 25-50 points)</li>
            <li>• Get a Provincial Nomination (+600 points)</li>
            <li>• Complete Canadian education credentials</li>
            <li>
              • If you have a spouse, improve their language and education scores
            </li>
          </ul>
        </div>

        <div className="bg-purple-500/20 p-4 rounded-xl border border-purple-500/20">
          <h5 className="text-purple-400 font-medium mb-2">
            📋 Important Notes:
          </h5>
          <ul className="text-purple-200 space-y-1 text-sm">
            <li>
              • Job offer points have been removed as of March 25, 2025
            </li>
            <li>
              • This calculator provides an estimate - official scores may vary
            </li>
            <li>
              • Language test results must be less than 2 years old
            </li>
            <li>
              • Educational credentials may need assessment (ECA)
            </li>
            <li>
              • Minimum CRS score varies with each Express Entry draw
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export default ScoreAnalysis; 