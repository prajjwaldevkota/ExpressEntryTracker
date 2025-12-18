import { memo } from "react";
import ResultsSection from "./ResultsSection";
import ScoreAnalysis from "./ScoreAnalysis";

const CalculatorResults = memo(function CalculatorResults({
  calculatedScore,
  hasSpouse,
}) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <ResultsSection
        calculatedScore={calculatedScore}
        hasSpouse={hasSpouse}
      />

      {calculatedScore && (
        <ScoreAnalysis totalScore={calculatedScore.totalScore} />
      )}
    </div>
  );
});

export default CalculatorResults; 