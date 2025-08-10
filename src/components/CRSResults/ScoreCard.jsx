import { memo } from "react";

const ScoreCard = memo(function ScoreCard({
  title,
  score,
  icon: Icon,
  color,
  maxScore,
}) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:scale-102 transition-transform">
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        {Icon && <Icon className={`${color} text-sm sm:text-base`} />}
        <span className="text-slate-400 font-medium text-sm sm:text-base">{title}</span>
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-white">{score}</p>
      {maxScore && <p className="text-xs sm:text-sm text-slate-500">/ {maxScore}</p>}
    </div>
  );
});

export default ScoreCard; 