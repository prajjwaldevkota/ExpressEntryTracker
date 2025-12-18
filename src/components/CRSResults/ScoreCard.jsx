import { memo } from "react";

const ScoreCard = memo(function ScoreCard({ title, score, maxScore }) {
  const percentage = maxScore ? Math.min((score / maxScore) * 100, 100) : 0;

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-slate-600 dark:text-slate-400">{title}</span>
      <div className="flex items-center gap-3">
        <div className="w-24 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm font-semibold text-slate-900 dark:text-white w-16 text-right">
          {score} <span className="text-slate-400 font-normal">/ {maxScore}</span>
        </span>
      </div>
    </div>
  );
});

export default ScoreCard;