import { memo } from "react";
import ScoreCard from "./ScoreCard";
import LanguageSkillsBreakdown from "./LanguageSkillsBreakdown";

const ResultsSection = memo(function ResultsSection({
  calculatedScore,
  hasSpouse,
}) {
  if (!calculatedScore) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Your CRS Score</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Fill in the form to calculate your score
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Total Score */}
      <div className="text-center mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
        <p className="text-xs uppercase text-slate-500 dark:text-slate-400 font-medium tracking-wider mb-2">Total CRS Score</p>
        <p className="text-5xl font-bold text-slate-900 dark:text-white">{calculatedScore.totalScore}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">out of 1,200</p>
      </div>

      {/* Score Breakdown */}
      <div className="space-y-3">
        <ScoreCard
          title="Age"
          score={calculatedScore.scores.age}
          maxScore={hasSpouse ? 100 : 110}
        />
        <ScoreCard
          title="Education"
          score={calculatedScore.scores.education}
          maxScore={hasSpouse ? 140 : 150}
        />
        <ScoreCard
          title="Language Skills"
          score={calculatedScore.scores.english + calculatedScore.scores.french}
          maxScore={hasSpouse ? 174 : 184}
        />
        <ScoreCard
          title="Canadian Experience"
          score={calculatedScore.scores.canadianWorkExperience}
          maxScore={hasSpouse ? 70 : 80}
        />
        {hasSpouse && (
          <ScoreCard
            title="Spouse Factors"
            score={calculatedScore.spouseFactorsTotal}
            maxScore={40}
          />
        )}
        <ScoreCard
          title="Additional Factors"
          score={calculatedScore.scores.additionalFactors}
          maxScore={600}
        />
      </div>

      {/* Language Skills Breakdown */}
      {(calculatedScore.scores.englishBreakdown || calculatedScore.scores.frenchBreakdown) && (
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Language Skills Breakdown</h4>
          <LanguageSkillsBreakdown
            englishBreakdown={calculatedScore.scores.englishBreakdown}
            frenchBreakdown={calculatedScore.scores.frenchBreakdown}
          />
        </div>
      )}
    </div>
  );
});

export default ResultsSection;