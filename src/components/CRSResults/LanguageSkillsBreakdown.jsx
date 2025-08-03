import { memo } from "react";
import {
  FaLanguage,
  FaComments,
  FaHeadphones,
  FaBookOpen,
  FaPen,
} from "react-icons/fa";

const LanguageSkillsBreakdown = memo(function LanguageSkillsBreakdown({
  title,
  speaking,
  listening,
  reading,
  writing,
  totalScore,
  isSecondLanguage = false,
  languageType = "english",
}) {
  const maxPerSkill = isSecondLanguage ? 6 : 34;
  const languageLabel = languageType === "french" ? "French" : "English";

  return (
    <div className="bg-black/20 p-4 rounded-xl border border-white/5">
      <h5 className="text-white font-medium mb-3 flex items-center gap-2">
        <FaLanguage className="text-blue-400" />
        {title} ({languageLabel})
      </h5>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400 flex items-center gap-1">
            <FaComments className="text-green-400" />
            Speaking:
          </span>
          <span className="text-white">
            {speaking}/{maxPerSkill}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400 flex items-center gap-1">
            <FaHeadphones className="text-blue-400" />
            Listening:
          </span>
          <span className="text-white">
            {listening}/{maxPerSkill}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400 flex items-center gap-1">
            <FaBookOpen className="text-yellow-400" />
            Reading:
          </span>
          <span className="text-white">
            {reading}/{maxPerSkill}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400 flex items-center gap-1">
            <FaPen className="text-purple-400" />
            Writing:
          </span>
          <span className="text-white">
            {writing}/{maxPerSkill}
          </span>
        </div>
      </div>
      <div className="border-t border-white/10 mt-3 pt-3">
        <div className="flex justify-between font-medium">
          <span className="text-blue-400">Total:</span>
          <span className="text-blue-400">{totalScore}</span>
        </div>
      </div>
    </div>
  );
});

export default LanguageSkillsBreakdown; 