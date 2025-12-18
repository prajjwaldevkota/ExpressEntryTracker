import { memo } from "react";

const LanguageSkillsBreakdown = memo(function LanguageSkillsBreakdown({
  englishBreakdown,
  frenchBreakdown,
}) {
  const renderBreakdown = (breakdown, language) => {
    if (!breakdown) return null;

    return (
      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
        <h5 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          {language}
        </h5>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Speaking:</span>
            <span className="text-slate-900 dark:text-white font-medium">{breakdown.speaking || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Listening:</span>
            <span className="text-slate-900 dark:text-white font-medium">{breakdown.listening || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Reading:</span>
            <span className="text-slate-900 dark:text-white font-medium">{breakdown.reading || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Writing:</span>
            <span className="text-slate-900 dark:text-white font-medium">{breakdown.writing || 0}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid gap-3">
      {englishBreakdown && renderBreakdown(englishBreakdown, "English")}
      {frenchBreakdown && renderBreakdown(frenchBreakdown, "French")}
    </div>
  );
});

export default LanguageSkillsBreakdown;