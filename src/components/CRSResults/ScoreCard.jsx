import { memo } from "react";

const ScoreCard = memo(function ScoreCard({
  title,
  score,
  icon: Icon,
  color,
  maxScore,
}) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:scale-102 transition-transform">
      <div className="flex items-center gap-3 mb-3">
        {Icon && <Icon className={color} />}
        <span className="text-slate-400 font-medium">{title}</span>
      </div>
      <p className="text-3xl font-bold text-white">{score}</p>
      {maxScore && <p className="text-sm text-slate-500">/ {maxScore}</p>}
    </div>
  );
});

export default ScoreCard; 