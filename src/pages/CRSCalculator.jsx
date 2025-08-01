import { useState, useCallback, useMemo, memo } from "react";
import {
  FaCalculator,
  FaUserGraduate,
  FaBriefcase,
  FaLanguage,
  FaHeart,
  FaMapMarkerAlt,
  FaTrophy,
  FaInfoCircle,
  FaUser,
  FaRing,
  FaExclamationTriangle,
  FaGlobe,
  FaComments,
  FaHeadphones,
  FaBookOpen,
  FaPen,
} from "react-icons/fa";

// Memoized ScoreCard component
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

// Memoized FormField component
const FormField = memo(function FormField({
  label,
  type,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  tooltip,
  disabled = false,
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="text-white font-medium">{label}</label>
        {tooltip && (
          <div className="group relative">
            <FaInfoCircle className="text-blue-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 max-w-xs">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      {type === "select" ? (
        <select
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="w-full p-3 rounded-xl border border-white/10 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className="w-full p-3 rounded-xl border border-white/10 bg-black/40 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
      )}
    </div>
  );
});

// Language Skills Breakdown Component
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

// Updated CRS Score calculation logic based on 2025 policies
const calculateCRSScore = (formData) => {
  let totalScore = 0;
  const scores = {};
  const hasSpouse = formData.hasSpouse === "yes";

  // A. Core/Human Capital Factors
  // Age Score
  const age = parseInt(formData.age);
  const ageScores = hasSpouse
    ? {
        18: 90,
        19: 95,
        20: 100,
        21: 100,
        22: 100,
        23: 100,
        24: 100,
        25: 100,
        26: 100,
        27: 100,
        28: 100,
        29: 100,
        30: 95,
        31: 90,
        32: 85,
        33: 80,
        34: 75,
        35: 70,
        36: 65,
        37: 60,
        38: 55,
        39: 50,
        40: 45,
        41: 35,
        42: 25,
        43: 15,
        44: 5,
      }
    : {
        18: 99,
        19: 105,
        20: 110,
        21: 110,
        22: 110,
        23: 110,
        24: 110,
        25: 110,
        26: 110,
        27: 110,
        28: 110,
        29: 110,
        30: 105,
        31: 99,
        32: 94,
        33: 88,
        34: 83,
        35: 77,
        36: 72,
        37: 66,
        38: 61,
        39: 55,
        40: 50,
        41: 39,
        42: 28,
        43: 17,
        44: 6,
      };
  scores.age = age >= 20 && age <= 44 ? ageScores[age] || 0 : 0;

  // Education Score
  const educationScores = hasSpouse
    ? {
        secondary: 28,
        "one-year": 84,
        "two-year": 91,
        bachelors: 112,
        "two-certificates": 119,
        masters: 126,
        phd: 140,
      }
    : {
        secondary: 30,
        "one-year": 90,
        "two-year": 98,
        bachelors: 120,
        "two-certificates": 128,
        masters: 135,
        phd: 150,
      };
  scores.education = educationScores[formData.education] || 0;

  // Language Proficiency Score - First Official Language (English)
  const englishScores = hasSpouse
    ? {
        "clb-4": { speaking: 6, listening: 6, reading: 6, writing: 6 },
        "clb-5": { speaking: 6, listening: 6, reading: 6, writing: 6 },
        "clb-6": { speaking: 8, listening: 8, reading: 8, writing: 8 },
        "clb-7": { speaking: 16, listening: 16, reading: 16, writing: 16 },
        "clb-8": { speaking: 22, listening: 22, reading: 22, writing: 22 },
        "clb-9": { speaking: 29, listening: 29, reading: 29, writing: 29 },
        "clb-10": { speaking: 32, listening: 32, reading: 32, writing: 32 },
      }
    : {
        "clb-4": { speaking: 6, listening: 6, reading: 6, writing: 6 },
        "clb-5": { speaking: 6, listening: 6, reading: 6, writing: 6 },
        "clb-6": { speaking: 9, listening: 9, reading: 9, writing: 9 },
        "clb-7": { speaking: 17, listening: 17, reading: 17, writing: 17 },
        "clb-8": { speaking: 23, listening: 23, reading: 23, writing: 23 },
        "clb-9": { speaking: 31, listening: 31, reading: 31, writing: 31 },
        "clb-10": { speaking: 34, listening: 34, reading: 34, writing: 34 },
      };

  // Calculate English scores based on individual skills
  const englishSkills = {
    speaking: englishScores[formData.englishSpeaking] || { speaking: 0 },
    listening: englishScores[formData.englishListening] || { listening: 0 },
    reading: englishScores[formData.englishReading] || { reading: 0 },
    writing: englishScores[formData.englishWriting] || { writing: 0 },
  };

  scores.englishBreakdown = {
    speaking: englishSkills.speaking.speaking || 0,
    listening: englishSkills.listening.listening || 0,
    reading: englishSkills.reading.reading || 0,
    writing: englishSkills.writing.writing || 0,
  };
  scores.english = Object.values(scores.englishBreakdown).reduce(
    (sum, score) => sum + score,
    0
  );

  // Language Proficiency Score - Second Official Language (French)
  const frenchScores = {
    "clb-5": { speaking: 1, listening: 1, reading: 1, writing: 1 },
    "clb-6": { speaking: 1, listening: 1, reading: 1, writing: 1 },
    "clb-7": { speaking: 3, listening: 3, reading: 3, writing: 3 },
    "clb-8": { speaking: 3, listening: 3, reading: 3, writing: 3 },
    "clb-9": { speaking: 6, listening: 6, reading: 6, writing: 6 },
    "clb-10": { speaking: 6, listening: 6, reading: 6, writing: 6 },
  };

  // Calculate French scores based on individual skills
  const frenchSkills = {
    speaking: frenchScores[formData.frenchSpeaking] || { speaking: 0 },
    listening: frenchScores[formData.frenchListening] || { listening: 0 },
    reading: frenchScores[formData.frenchReading] || { reading: 0 },
    writing: frenchScores[formData.frenchWriting] || { writing: 0 },
  };

  scores.frenchBreakdown = {
    speaking: frenchSkills.speaking.speaking || 0,
    listening: frenchSkills.listening.listening || 0,
    reading: frenchSkills.reading.reading || 0,
    writing: frenchSkills.writing.writing || 0,
  };
  scores.french = Object.values(scores.frenchBreakdown).reduce(
    (sum, score) => sum + score,
    0
  );

  // Canadian Work Experience
  const canadianWorkScores = hasSpouse
    ? {
        0: 0,
        1: 35,
        2: 46,
        3: 56,
        4: 63,
        5: 70,
      }
    : {
        0: 0,
        1: 40,
        2: 53,
        3: 64,
        4: 72,
        5: 80,
      };
  const canadianWorkExp = Math.min(
    parseInt(formData.canadianWorkExperience) || 0,
    5
  );
  scores.canadianWorkExperience = canadianWorkScores[canadianWorkExp];

  // B. Spouse/Partner factors (if applicable)
  scores.spouseEducation = 0;
  scores.spouseLanguage = 0;
  scores.spouseCanadianWork = 0;

  if (hasSpouse) {
    // Spouse Education
    const spouseEducationScores = {
      secondary: 2,
      "one-year": 6,
      "two-year": 7,
      bachelors: 8,
      "two-certificates": 9,
      masters: 10,
      phd: 10,
    };
    scores.spouseEducation =
      spouseEducationScores[formData.spouseEducation] || 0;

    // Spouse Language
    const spouseLangScores = {
      "clb-5": 4,
      "clb-6": 4,
      "clb-7": 12,
      "clb-8": 12,
      "clb-9": 20,
      "clb-10": 20,
    };
    scores.spouseLanguage = spouseLangScores[formData.spouseLanguage] || 0;

    // Spouse Canadian Work
    const spouseWorkScores = { 0: 0, 1: 5, 2: 7, 3: 8, 4: 9, 5: 10 };
    const spouseWorkExp = Math.min(
      parseInt(formData.spouseCanadianWork) || 0,
      5
    );
    scores.spouseCanadianWork = spouseWorkScores[spouseWorkExp];
  }

  // C. Skill Transferability factors (simplified for this calculator)
  scores.skillTransferability = 0;
  // This would require complex logic based on combinations - simplified here
  if (scores.education >= 90 && scores.english >= 68) {
    scores.skillTransferability += 50;
  }
  if (
    scores.canadianWorkExperience > 0 &&
    parseInt(formData.foreignWorkExperience) > 0
  ) {
    scores.skillTransferability += Math.min(
      50,
      100 - scores.skillTransferability
    );
  }

  // D. Additional factors
  let additionalScore = 0;

  // Provincial Nomination (600 points)
  if (formData.provincialNomination === "yes") {
    additionalScore += 600;
  }

  // French Language Skills Bonus
  if (formData.frenchSkills === "strong") {
    additionalScore += 50; // CLB 7+ in all four skills + CLB 5+ in English
  } else if (formData.frenchSkills === "basic") {
    additionalScore += 25; // CLB 7+ in all four skills + CLB 4 or lower in English
  }

  // Sibling in Canada
  if (formData.siblingInCanada === "yes") {
    additionalScore += 15;
  }

  // Canadian Education
  if (formData.canadianEducationCredential === "three-plus") {
    additionalScore += 30;
  } else if (formData.canadianEducationCredential === "one-two") {
    additionalScore += 15;
  }

  scores.additionalFactors = additionalScore;

  // Calculate totals
  const coreFactorsTotal =
    scores.age +
    scores.education +
    scores.english +
    scores.french +
    scores.canadianWorkExperience;
  const spouseFactorsTotal =
    scores.spouseEducation + scores.spouseLanguage + scores.spouseCanadianWork;

  totalScore =
    coreFactorsTotal +
    spouseFactorsTotal +
    scores.skillTransferability +
    additionalScore;

  return {
    totalScore,
    scores,
    coreFactorsTotal,
    spouseFactorsTotal,
  };
};

export default function CRSCalculator() {
  const [formData, setFormData] = useState({
    age: "",
    education: "",
    hasSpouse: "no",
    spouseEducation: "",
    spouseLanguage: "",
    spouseCanadianWork: "",
    // English Language Skills
    englishSpeaking: "",
    englishListening: "",
    englishReading: "",
    englishWriting: "",
    // French Language Skills
    frenchTestType: "",
    frenchSpeaking: "",
    frenchListening: "",
    frenchReading: "",
    frenchWriting: "",
    canadianWorkExperience: "",
    foreignWorkExperience: "",
    provincialNomination: "no",
    frenchSkills: "none",
    siblingInCanada: "no",
    canadianEducationCredential: "none",
  });

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const calculatedScore = useMemo(() => {
    if (!formData.age || !formData.education) return null;
    return calculateCRSScore(formData);
  }, [formData]);

  const hasSpouse = formData.hasSpouse === "yes";

  const educationOptions = [
    { value: "secondary", label: "Secondary school (high school) diploma" },
    { value: "one-year", label: "One-year post-secondary program" },
    { value: "two-year", label: "Two-year post-secondary program" },
    { value: "bachelors", label: "Bachelor's degree or 3+ year program" },
    {
      value: "two-certificates",
      label: "Two or more certificates (one 3+ years)",
    },
    { value: "masters", label: "Master's degree or professional degree" },
    { value: "phd", label: "Doctoral degree (Ph.D.)" },
  ];

  const languageOptions = [
    { value: "clb-4", label: "CLB 4" },
    { value: "clb-5", label: "CLB 5" },
    { value: "clb-6", label: "CLB 6" },
    { value: "clb-7", label: "CLB 7" },
    { value: "clb-8", label: "CLB 8" },
    { value: "clb-9", label: "CLB 9" },
    { value: "clb-10", label: "CLB 10+" },
  ];

  // TEF Canada scoring options
  const tefScoringOptions = [
    {
      value: "clb-4",
      label:
        "CLB 4 (121-150 Reading, 181-225 Writing, 145-180 Listening, 181-225 Speaking)",
    },
    {
      value: "clb-5",
      label:
        "CLB 5 (151-180 Reading, 226-270 Writing, 181-216 Listening, 226-270 Speaking)",
    },
    {
      value: "clb-6",
      label:
        "CLB 6 (181-206 Reading, 271-309 Writing, 217-248 Listening, 271-309 Speaking)",
    },
    {
      value: "clb-7",
      label:
        "CLB 7 (207-232 Reading, 310-348 Writing, 249-279 Listening, 310-348 Speaking)",
    },
    {
      value: "clb-8",
      label:
        "CLB 8 (233-247 Reading, 349-370 Writing, 280-297 Listening, 349-370 Speaking)",
    },
    {
      value: "clb-9",
      label:
        "CLB 9 (248-262 Reading, 371-392 Writing, 298-315 Listening, 371-392 Speaking)",
    },
    {
      value: "clb-10",
      label:
        "CLB 10 (263-300 Reading, 393-450 Writing, 316-360 Listening, 393-450 Speaking)",
    },
  ];

  // TCF Canada scoring options
  const tcfScoringOptions = [
    {
      value: "clb-4",
      label:
        "CLB 4 (342-374 Reading, 4-5 Writing, 331-368 Listening, 4-5 Speaking)",
    },
    {
      value: "clb-5",
      label:
        "CLB 5 (375-405 Reading, 6 Writing, 369-397 Listening, 6 Speaking)",
    },
    {
      value: "clb-6",
      label:
        "CLB 6 (406-452 Reading, 7-9 Writing, 398-457 Listening, 7-9 Speaking)",
    },
    {
      value: "clb-7",
      label:
        "CLB 7 (453-498 Reading, 10-11 Writing, 458-502 Listening, 10-11 Speaking)",
    },
    {
      value: "clb-8",
      label:
        "CLB 8 (499-523 Reading, 12-13 Writing, 503-522 Listening, 12-13 Speaking)",
    },
    {
      value: "clb-9",
      label:
        "CLB 9 (524-548 Reading, 14-15 Writing, 523-548 Listening, 14-15 Speaking)",
    },
    {
      value: "clb-10",
      label:
        "CLB 10 (549-699 Reading, 16-20 Writing, 549-699 Listening, 16-20 Speaking)",
    },
  ];

  const workExperienceOptions = [
    { value: "0", label: "None or less than 1 year" },
    { value: "1", label: "1 year" },
    { value: "2", label: "2 years" },
    { value: "3", label: "3 years" },
    { value: "4", label: "4 years" },
    { value: "5", label: "5 years or more" },
  ];

  const yesNoOptions = [
    { value: "no", label: "No" },
    { value: "yes", label: "Yes" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-900 pt-12 sm:pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-2xl">
            <FaCalculator className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-6xl sm:text-4xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-5">
            CRS Calculator 2025
          </h1>
          <p className="text-xl text-slate-400 font-medium mb-4">
            Calculate your Comprehensive Ranking System score with the latest
            policies
          </p>

          {/* Updated Policy Notice */}
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <FaExclamationTriangle className="text-yellow-400" />
              <span className="text-yellow-300 font-semibold">
                Policy Update
              </span>
            </div>
            <p className="text-yellow-100 text-sm">
              As of March 25, 2025, job offer points have been removed from the
              CRS system. This calculator reflects the latest changes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaUser className="text-blue-400" />
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="Enter your age"
                  required
                  tooltip="Your age at the time of application"
                />

                <FormField
                  label="Education Level"
                  type="select"
                  value={formData.education}
                  onChange={(e) =>
                    handleInputChange("education", e.target.value)
                  }
                  options={educationOptions}
                  placeholder="Select education level"
                  required
                />

                <FormField
                  label="Do you have a spouse/partner?"
                  type="select"
                  value={formData.hasSpouse}
                  onChange={(e) =>
                    handleInputChange("hasSpouse", e.target.value)
                  }
                  options={yesNoOptions}
                  placeholder="Select option"
                  tooltip="Spouse/partner who will accompany you to Canada"
                />
              </div>
            </div>

            {/* Spouse Information */}
            {hasSpouse && (
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <FaRing className="text-pink-400" />
                  Spouse/Partner Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Spouse Education Level"
                    type="select"
                    value={formData.spouseEducation}
                    onChange={(e) =>
                      handleInputChange("spouseEducation", e.target.value)
                    }
                    options={educationOptions}
                    placeholder="Select spouse education"
                  />

                  <FormField
                    label="Spouse Language Level"
                    type="select"
                    value={formData.spouseLanguage}
                    onChange={(e) =>
                      handleInputChange("spouseLanguage", e.target.value)
                    }
                    options={languageOptions}
                    placeholder="Select CLB level"
                  />

                  <FormField
                    label="Spouse Canadian Work Experience"
                    type="select"
                    value={formData.spouseCanadianWork}
                    onChange={(e) =>
                      handleInputChange("spouseCanadianWork", e.target.value)
                    }
                    options={workExperienceOptions}
                    placeholder="Select work experience"
                  />
                </div>
              </div>
            )}

            {/* English Language Proficiency */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaGlobe className="text-blue-400" />
                English Language Skills
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Speaking"
                  type="select"
                  value={formData.englishSpeaking}
                  onChange={(e) =>
                    handleInputChange("englishSpeaking", e.target.value)
                  }
                  options={languageOptions}
                  placeholder="Select CLB level"
                  tooltip="Your English speaking proficiency level"
                />

                <FormField
                  label="Listening"
                  type="select"
                  value={formData.englishListening}
                  onChange={(e) =>
                    handleInputChange("englishListening", e.target.value)
                  }
                  options={languageOptions}
                  placeholder="Select CLB level"
                  tooltip="Your English listening proficiency level"
                />

                <FormField
                  label="Reading"
                  type="select"
                  value={formData.englishReading}
                  onChange={(e) =>
                    handleInputChange("englishReading", e.target.value)
                  }
                  options={languageOptions}
                  placeholder="Select CLB level"
                  tooltip="Your English reading proficiency level"
                />

                <FormField
                  label="Writing"
                  type="select"
                  value={formData.englishWriting}
                  onChange={(e) =>
                    handleInputChange("englishWriting", e.target.value)
                  }
                  options={languageOptions}
                  placeholder="Select CLB level"
                  tooltip="Your English writing proficiency level"
                />
              </div>
            </div>

            {/* French Language Proficiency */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaLanguage className="text-green-400" />
                French Language Skills
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Test Type"
                  type="select"
                  value={formData.frenchTestType}
                  onChange={(e) =>
                    handleInputChange("frenchTestType", e.target.value)
                  }
                  options={[
                    { value: "tef", label: "TEF Canada" },
                    { value: "tcf", label: "TCF Canada" },
                  ]}
                  placeholder="Select a test type"
                  tooltip="Select the type of French language test you took"
                />

                <FormField
                  label="Speaking"
                  type="select"
                  value={formData.frenchSpeaking}
                  onChange={(e) =>
                    handleInputChange("frenchSpeaking", e.target.value)
                  }
                  options={
                    formData.frenchTestType === "tef"
                      ? tefScoringOptions
                      : formData.frenchTestType === "tcf"
                      ? tcfScoringOptions
                      : []
                  }
                  placeholder={
                    formData.frenchTestType
                      ? "Select CLB level"
                      : "Select test type first"
                  }
                  tooltip={`Your French speaking proficiency level (${
                    formData.frenchTestType === "tef"
                      ? "TEF"
                      : formData.frenchTestType === "tcf"
                      ? "TCF"
                      : "Select test type"
                  } test)`}
                  disabled={!formData.frenchTestType}
                />

                <FormField
                  label="Listening"
                  type="select"
                  value={formData.frenchListening}
                  onChange={(e) =>
                    handleInputChange("frenchListening", e.target.value)
                  }
                  options={
                    formData.frenchTestType === "tef"
                      ? tefScoringOptions
                      : formData.frenchTestType === "tcf"
                      ? tcfScoringOptions
                      : []
                  }
                  placeholder={
                    formData.frenchTestType
                      ? "Select CLB level"
                      : "Select test type first"
                  }
                  tooltip={`Your French listening proficiency level (${
                    formData.frenchTestType === "tef"
                      ? "TEF"
                      : formData.frenchTestType === "tcf"
                      ? "TCF"
                      : "Select test type"
                  } test)`}
                  disabled={!formData.frenchTestType}
                />

                <FormField
                  label="Reading"
                  type="select"
                  value={formData.frenchReading}
                  onChange={(e) =>
                    handleInputChange("frenchReading", e.target.value)
                  }
                  options={
                    formData.frenchTestType === "tef"
                      ? tefScoringOptions
                      : formData.frenchTestType === "tcf"
                      ? tcfScoringOptions
                      : []
                  }
                  placeholder={
                    formData.frenchTestType
                      ? "Select CLB level"
                      : "Select test type first"
                  }
                  tooltip={`Your French reading proficiency level (${
                    formData.frenchTestType === "tef"
                      ? "TEF"
                      : formData.frenchTestType === "tcf"
                      ? "TCF"
                      : "Select test type"
                  } test)`}
                  disabled={!formData.frenchTestType}
                />

                <FormField
                  label="Writing"
                  type="select"
                  value={formData.frenchWriting}
                  onChange={(e) =>
                    handleInputChange("frenchWriting", e.target.value)
                  }
                  options={
                    formData.frenchTestType === "tef"
                      ? tefScoringOptions
                      : formData.frenchTestType === "tcf"
                      ? tcfScoringOptions
                      : []
                  }
                  placeholder={
                    formData.frenchTestType
                      ? "Select CLB level"
                      : "Select test type first"
                  }
                  tooltip={`Your French writing proficiency level (${
                    formData.frenchTestType === "tef"
                      ? "TEF"
                      : formData.frenchTestType === "tcf"
                      ? "TCF"
                      : "Select test type"
                  } test)`}
                  disabled={!formData.frenchTestType}
                />
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaBriefcase className="text-purple-400" />
                Work Experience
              </h2>

              <div className="space-y-6">
                <FormField
                  label="Canadian Work Experience"
                  type="select"
                  value={formData.canadianWorkExperience}
                  onChange={(e) =>
                    handleInputChange("canadianWorkExperience", e.target.value)
                  }
                  options={workExperienceOptions}
                  placeholder="Select Canadian work experience"
                  tooltip="Skilled work experience in Canada"
                />

                <FormField
                  label="Foreign Work Experience"
                  type="select"
                  value={formData.foreignWorkExperience}
                  onChange={(e) =>
                    handleInputChange("foreignWorkExperience", e.target.value)
                  }
                  options={workExperienceOptions}
                  placeholder="Select foreign work experience"
                  tooltip="Skilled work experience outside Canada"
                />
              </div>
            </div>

            {/* Additional Factors */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaHeart className="text-red-400" />
                Additional Factors
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Provincial Nomination"
                  type="select"
                  value={formData.provincialNomination}
                  onChange={(e) =>
                    handleInputChange("provincialNomination", e.target.value)
                  }
                  options={yesNoOptions}
                  placeholder="Do you have a PNP?"
                  tooltip="Provincial Nominee Program certificate"
                />

                <FormField
                  label="French Language Skills"
                  type="select"
                  value={formData.frenchSkills}
                  onChange={(e) =>
                    handleInputChange("frenchSkills", e.target.value)
                  }
                  options={[
                    { value: "none", label: "None" },
                    {
                      value: "basic",
                      label: "CLB 7+ French (with CLB 4- English)",
                    },
                    {
                      value: "strong",
                      label: "CLB 7+ French (with CLB 5+ English)",
                    },
                  ]}
                  placeholder="Select French skills"
                />

                <FormField
                  label="Sibling in Canada"
                  type="select"
                  value={formData.siblingInCanada}
                  onChange={(e) =>
                    handleInputChange("siblingInCanada", e.target.value)
                  }
                  options={yesNoOptions}
                  placeholder="Canadian citizen/PR sibling?"
                />

                <FormField
                  label="Canadian Education Credential"
                  type="select"
                  value={formData.canadianEducationCredential}
                  onChange={(e) =>
                    handleInputChange(
                      "canadianEducationCredential",
                      e.target.value
                    )
                  }
                  options={[
                    { value: "none", label: "None" },
                    { value: "one-two", label: "1-2 year credential" },
                    { value: "three-plus", label: "3+ year credential" },
                  ]}
                  placeholder="Canadian education"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">
                Your CRS Score
              </h2>

              {calculatedScore ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                      <FaTrophy className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-5xl font-bold text-white mb-2">
                      {calculatedScore.totalScore}
                    </h3>
                    <p className="text-slate-400">
                      Total CRS Score (Max: 1,200)
                    </p>
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
                      score={
                        calculatedScore.scores.english +
                        calculatedScore.scores.french
                      }
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
                            speaking={
                              calculatedScore.scores.englishBreakdown
                                .speaking || 0
                            }
                            listening={
                              calculatedScore.scores.englishBreakdown
                                .listening || 0
                            }
                            reading={
                              calculatedScore.scores.englishBreakdown.reading ||
                              0
                            }
                            writing={
                              calculatedScore.scores.englishBreakdown.writing ||
                              0
                            }
                            totalScore={calculatedScore.scores.english}
                            languageType="english"
                          />
                        )}
                        {calculatedScore.scores.frenchBreakdown &&
                          Object.values(
                            calculatedScore.scores.frenchBreakdown
                          ).some((v) => v > 0) && (
                            <LanguageSkillsBreakdown
                              title="Second Official Language"
                              speaking={
                                calculatedScore.scores.frenchBreakdown
                                  .speaking || 0
                              }
                              listening={
                                calculatedScore.scores.frenchBreakdown
                                  .listening || 0
                              }
                              reading={
                                calculatedScore.scores.frenchBreakdown
                                  .reading || 0
                              }
                              writing={
                                calculatedScore.scores.frenchBreakdown
                                  .writing || 0
                              }
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
                            <span>
                              {calculatedScore.scores.education} points
                            </span>
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
                            <span>
                              {calculatedScore.scores.canadianWorkExperience}{" "}
                              points
                            </span>
                          </div>
                          <div className="flex justify-between font-medium text-blue-400 border-t border-white/10 pt-1">
                            <span>Subtotal:</span>
                            <span>
                              {calculatedScore.coreFactorsTotal} points
                            </span>
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
                              <span>
                                {calculatedScore.scores.spouseEducation} points
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Language:</span>
                              <span>
                                {calculatedScore.scores.spouseLanguage} points
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Canadian Work:</span>
                              <span>
                                {calculatedScore.scores.spouseCanadianWork}{" "}
                                points
                              </span>
                            </div>
                            <div className="flex justify-between font-medium text-purple-400 border-t border-white/10 pt-1">
                              <span>Subtotal:</span>
                              <span>
                                {calculatedScore.spouseFactorsTotal} points
                              </span>
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
                          <span>
                            {calculatedScore.scores.skillTransferability} points
                          </span>
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
                              {formData.provincialNomination === "yes"
                                ? "600"
                                : "0"}{" "}
                              points
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
                              {formData.siblingInCanada === "yes" ? "15" : "0"}{" "}
                              points
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Canadian Education:</span>
                            <span>
                              {formData.canadianEducationCredential ===
                              "three-plus"
                                ? "30"
                                : formData.canadianEducationCredential ===
                                  "one-two"
                                ? "15"
                                : "0"}{" "}
                              points
                            </span>
                          </div>
                          <div className="flex justify-between font-medium text-indigo-400 border-t border-white/10 pt-1">
                            <span>Subtotal:</span>
                            <span>
                              {calculatedScore.scores.additionalFactors} points
                            </span>
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
              ) : (
                <div className="text-center py-12">
                  <FaCalculator className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">
                    Fill in the required fields to calculate your CRS score
                  </p>
                </div>
              )}
            </div>

            {calculatedScore && (
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">
                  Score Analysis & Recommendations
                </h3>
                <div className="space-y-4 text-sm">
                  {calculatedScore.totalScore >= 500 ? (
                    <div className="bg-green-500/20 p-4 rounded-xl border border-green-500/20">
                      <p className="text-green-400 font-medium">
                        🎉 Excellent! Your score is highly competitive for
                        Express Entry draws.
                      </p>
                      <p className="text-green-200 mt-2">
                        Recent draws have been selecting candidates with scores
                        around 480-540. You're in a strong position!
                      </p>
                    </div>
                  ) : calculatedScore.totalScore >= 470 ? (
                    <div className="bg-yellow-500/20 p-4 rounded-xl border border-yellow-500/20">
                      <p className="text-yellow-400 font-medium">
                        ✅ Good score! You have a decent chance of receiving an
                        invitation.
                      </p>
                      <p className="text-yellow-200 mt-2">
                        Consider improving your language scores or gaining more
                        work experience to increase your chances.
                      </p>
                    </div>
                  ) : calculatedScore.totalScore >= 400 ? (
                    <div className="bg-orange-500/20 p-4 rounded-xl border border-orange-500/20">
                      <p className="text-orange-400 font-medium">
                        ⚠️ Your score needs improvement to be competitive.
                      </p>
                      <p className="text-orange-200 mt-2">
                        Focus on improving language skills, education
                        credentials, or consider Provincial Nominee Programs.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-red-500/20 p-4 rounded-xl border border-red-500/20">
                      <p className="text-red-400 font-medium">
                        📈 Significant improvements needed for Express Entry
                        eligibility.
                      </p>
                      <p className="text-red-200 mt-2">
                        Consider improving language skills, gaining more work
                        experience, or exploring other immigration pathways.
                      </p>
                    </div>
                  )}

                  <div className="bg-blue-500/20 p-4 rounded-xl border border-blue-500/20">
                    <h5 className="text-blue-400 font-medium mb-2">
                      💡 Ways to Improve Your Score:
                    </h5>
                    <ul className="text-blue-200 space-y-1 text-sm">
                      <li>
                        • Achieve CLB 9+ in all language skills for maximum
                        points
                      </li>
                      <li>
                        • Gain Canadian work experience (each year significantly
                        boosts your score)
                      </li>
                      <li>• Learn French (can add 25-50 points)</li>
                      <li>• Get a Provincial Nomination (+600 points)</li>
                      <li>• Complete Canadian education credentials</li>
                      <li>
                        • If you have a spouse, improve their language and
                        education scores
                      </li>
                    </ul>
                  </div>

                  <div className="bg-purple-500/20 p-4 rounded-xl border border-purple-500/20">
                    <h5 className="text-purple-400 font-medium mb-2">
                      📋 Important Notes:
                    </h5>
                    <ul className="text-purple-200 space-y-1 text-sm">
                      <li>
                        • Job offer points have been removed as of March 25,
                        2025
                      </li>
                      <li>
                        • This calculator provides an estimate - official scores
                        may vary
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
