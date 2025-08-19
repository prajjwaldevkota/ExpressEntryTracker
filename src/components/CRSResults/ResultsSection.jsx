import { memo } from "react";
import {
  FaCalculator,
  FaTrophy,
  FaUser,
  FaUserGraduate,
  FaLanguage,
  FaMapMarkerAlt,
  FaRing,
  FaHeart,
} from "react-icons/fa";
import ScoreCard from "./ScoreCard";
import LanguageSkillsBreakdown from "./LanguageSkillsBreakdown";

const ResultsSection = memo(function ResultsSection({
  calculatedScore,
  hasSpouse,
}) {
  if (!calculatedScore) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 lg:p-8 rounded-2xl shadow-xl">
        <h2 className="text-xl lg:text-2xl font-bold text-white mb-6 leading-tight">Your CRS Score</h2>
        <div className="text-center py-12">
          <FaCalculator className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-400 text-base leading-relaxed">
            Fill in the required fields to calculate your CRS score
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 lg:p-8 rounded-2xl shadow-xl">
      <h2 className="text-xl lg:text-2xl font-bold text-white mb-6 leading-tight">Your CRS Score</h2>

      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full mb-4 shadow-lg">
            <FaTrophy className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
            {calculatedScore.totalScore}
          </h3>
          <p className="text-slate-400 text-base leading-relaxed">Total CRS Score (Max: 1,200)</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ScoreCard
            title="Age"
            score={calculatedScore.scores.age}
            icon={FaUser}
            color="text-emerald-400"
            maxScore={hasSpouse ? 100 : 110}
          />
          <ScoreCard
            title="Education"
            score={calculatedScore.scores.education}
            icon={FaUserGraduate}
            color="text-blue-400"
            maxScore={hasSpouse ? 140 : 150}
          />
          <ScoreCard
            title="Language Skills"
            score={calculatedScore.scores.english + calculatedScore.scores.french}
            icon={FaLanguage}
            color="text-amber-400"
            maxScore={hasSpouse ? 174 : 184}
          />
          <ScoreCard
            title="Canadian Experience"
            score={calculatedScore.scores.canadianWorkExperience}
            icon={FaMapMarkerAlt}
            color="text-purple-400"
            maxScore={hasSpouse ? 70 : 80}
          />
          {hasSpouse && (
            <ScoreCard
              title="Spouse Factors"
              score={calculatedScore.spouseFactorsTotal}
              icon={FaRing}
              color="text-pink-400"
              maxScore={40}
            />
          )}
          <ScoreCard
            title="Additional Factors"
            score={calculatedScore.scores.additionalFactors}
            icon={FaHeart}
            color="text-cyan-400"
            maxScore={600}
          />
        </div>

        {/* Language Skills Detailed Breakdown */}
        {(calculatedScore.scores.englishBreakdown ||
          calculatedScore.scores.frenchBreakdown) && (
          <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 p-6 rounded-2xl border border-emerald-500/20">
            <h4 className="text-base lg:text-lg font-semibold text-white mb-4 flex items-center gap-2 leading-tight">
              <FaLanguage className="text-emerald-400 flex-shrink-0" />
              Language Skills Breakdown
            </h4>
            <LanguageSkillsBreakdown
              englishBreakdown={calculatedScore.scores.englishBreakdown}
              frenchBreakdown={calculatedScore.scores.frenchBreakdown}
            />
          </div>
        )}
      </div>
    </div>
  );
});

export default ResultsSection; 