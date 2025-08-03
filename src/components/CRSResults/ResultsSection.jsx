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
  formData,
  hasSpouse,
}) {
  if (!calculatedScore) {
    return (
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Your CRS Score</h2>
        <div className="text-center py-12">
          <FaCalculator className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">
            Fill in the required fields to calculate your CRS score
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Your CRS Score</h2>

      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <FaTrophy className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-5xl font-bold text-white mb-2">
            {calculatedScore.totalScore}
          </h3>
          <p className="text-slate-400">Total CRS Score (Max: 1,200)</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ScoreCard
            title="Age"
            score={calculatedScore.scores.age}
            icon={FaUser}
            color="text-blue-400"
            maxScore={hasSpouse ? 100 : 110}
          />
          <ScoreCard
            title="Education"
            score={calculatedScore.scores.education}
            icon={FaUserGraduate}
            color="text-green-400"
            maxScore={hasSpouse ? 140 : 150}
          />
          <ScoreCard
            title="Language Skills"
            score={calculatedScore.scores.english + calculatedScore.scores.french}
            icon={FaLanguage}
            color="text-yellow-400"
            maxScore={hasSpouse ? 174 : 184}
          />
          <ScoreCard
            title="Canadian Experience"
            score={calculatedScore.scores.canadianWorkExperience}
            icon={FaMapMarkerAlt}
            color="text-pink-400"
            maxScore={hasSpouse ? 70 : 80}
          />
          {hasSpouse && (
            <ScoreCard
              title="Spouse Factors"
              score={calculatedScore.spouseFactorsTotal}
              icon={FaRing}
              color="text-purple-400"
              maxScore={40}
            />
          )}
          <ScoreCard
            title="Additional Factors"
            score={calculatedScore.scores.additionalFactors}
            icon={FaHeart}
            color="text-indigo-400"
            maxScore={600}
          />
        </div>

        {/* Language Skills Detailed Breakdown */}
        {(calculatedScore.scores.englishBreakdown ||
          calculatedScore.scores.frenchBreakdown) && (
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-2xl border border-blue-500/20">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FaLanguage className="text-blue-400" />
              Language Skills Breakdown
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {calculatedScore.scores.englishBreakdown && (
                <LanguageSkillsBreakdown
                  title="First Official Language"
                  speaking={calculatedScore.scores.englishBreakdown.speaking || 0}
                  listening={calculatedScore.scores.englishBreakdown.listening || 0}
                  reading={calculatedScore.scores.englishBreakdown.reading || 0}
                  writing={calculatedScore.scores.englishBreakdown.writing || 0}
                  totalScore={calculatedScore.scores.english}
                  languageType="english"
                />
              )}
              {calculatedScore.scores.frenchBreakdown &&
                Object.values(calculatedScore.scores.frenchBreakdown).some(
                  (v) => v > 0
                ) && (
                  <LanguageSkillsBreakdown
                    title="Second Official Language"
                    speaking={calculatedScore.scores.frenchBreakdown.speaking || 0}
                    listening={calculatedScore.scores.frenchBreakdown.listening || 0}
                    reading={calculatedScore.scores.frenchBreakdown.reading || 0}
                    writing={calculatedScore.scores.frenchBreakdown.writing || 0}
                    totalScore={calculatedScore.scores.french}
                    isSecondLanguage={true}
                    languageType="french"
                  />
                )}
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-slate-600/20 to-slate-700/20 p-6 rounded-2xl border border-slate-500/20">
          <h4 className="text-lg font-semibold text-white mb-3">
            Detailed Score Breakdown
          </h4>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="bg-black/20 p-3 rounded-xl">
              <h5 className="text-blue-400 font-medium mb-2">
                A. Core/Human Capital Factors
              </h5>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Age:</span>
                  <span>{calculatedScore.scores.age} points</span>
                </div>
                <div className="flex justify-between">
                  <span>Education:</span>
                  <span>{calculatedScore.scores.education} points</span>
                </div>
                <div className="flex justify-between">
                  <span>English Language:</span>
                  <span>{calculatedScore.scores.english} points</span>
                </div>
                <div className="flex justify-between">
                  <span>French Language:</span>
                  <span>{calculatedScore.scores.french} points</span>
                </div>
                <div className="flex justify-between">
                  <span>Canadian Work Experience:</span>
                  <span>{calculatedScore.scores.canadianWorkExperience} points</span>
                </div>
                <div className="flex justify-between font-medium text-blue-400 border-t border-white/10 pt-1">
                  <span>Subtotal:</span>
                  <span>{calculatedScore.coreFactorsTotal} points</span>
                </div>
              </div>
            </div>

            {hasSpouse && (
              <div className="bg-black/20 p-3 rounded-xl">
                <h5 className="text-purple-400 font-medium mb-2">
                  B. Spouse/Partner Factors
                </h5>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Education:</span>
                    <span>{calculatedScore.scores.spouseEducation} points</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Language:</span>
                    <span>{calculatedScore.scores.spouseLanguage} points</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Canadian Work:</span>
                    <span>{calculatedScore.scores.spouseCanadianWork} points</span>
                  </div>
                  <div className="flex justify-between font-medium text-purple-400 border-t border-white/10 pt-1">
                    <span>Subtotal:</span>
                    <span>{calculatedScore.spouseFactorsTotal} points</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-black/20 p-3 rounded-xl">
              <h5 className="text-green-400 font-medium mb-2">
                C. Skill Transferability
              </h5>
              <div className="flex justify-between">
                <span>Combined factors:</span>
                <span>{calculatedScore.scores.skillTransferability} points</span>
              </div>
            </div>

            <div className="bg-black/20 p-3 rounded-xl">
              <h5 className="text-indigo-400 font-medium mb-2">
                D. Additional Factors
              </h5>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Provincial Nomination:</span>
                  <span>
                    {formData.provincialNomination === "yes" ? "600" : "0"} points
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>French Language:</span>
                  <span>
                    {formData.frenchSkills === "strong"
                      ? "50"
                      : formData.frenchSkills === "basic"
                      ? "25"
                      : "0"}{" "}
                    points
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sibling in Canada:</span>
                  <span>
                    {formData.siblingInCanada === "yes" ? "15" : "0"} points
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Canadian Education:</span>
                  <span>
                    {formData.canadianEducationCredential === "three-plus"
                      ? "30"
                      : formData.canadianEducationCredential === "one-two"
                      ? "15"
                      : "0"}{" "}
                    points
                  </span>
                </div>
                <div className="flex justify-between font-medium text-indigo-400 border-t border-white/10 pt-1">
                  <span>Subtotal:</span>
                  <span>{calculatedScore.scores.additionalFactors} points</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-3 rounded-xl border border-blue-500/20">
              <div className="flex justify-between font-bold text-lg text-white">
                <span>TOTAL CRS SCORE:</span>
                <span>{calculatedScore.totalScore} points</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ResultsSection; 