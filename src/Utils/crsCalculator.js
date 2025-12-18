// CRS Calculator Utilities
// Contains all calculation logic and scoring tables for the CRS Calculator
// Updated to reflect latest official CRS criteria (as of 2025)

// Age scoring tables (updated to match official data)
export const AGE_SCORES = {
  withSpouse: {
    18: 90, 19: 95, 20: 100, 21: 100, 22: 100, 23: 100, 24: 100, 25: 100,
    26: 100, 27: 100, 28: 100, 29: 100, 30: 95, 31: 90, 32: 85, 33: 80,
    34: 75, 35: 70, 36: 65, 37: 60, 38: 55, 39: 50, 40: 45, 41: 35,
    42: 25, 43: 15, 44: 5
  },
  withoutSpouse: {
    18: 99, 19: 105, 20: 110, 21: 110, 22: 110, 23: 110, 24: 110, 25: 110,
    26: 110, 27: 110, 28: 110, 29: 110, 30: 105, 31: 99, 32: 94, 33: 88,
    34: 83, 35: 77, 36: 72, 37: 66, 38: 61, 39: 55, 40: 50, 41: 39,
    42: 28, 43: 17, 44: 6
  }
};

// Education scoring tables (updated to match official data)
export const EDUCATION_SCORES = {
  withSpouse: {
    secondary: 28, "one-year": 84, "two-year": 91, bachelors: 112,
    "two-certificates": 119, masters: 126, phd: 140
  },
  withoutSpouse: {
    secondary: 30, "one-year": 90, "two-year": 98, bachelors: 120,
    "two-certificates": 128, masters: 135, phd: 150
  }
};

// English language scoring tables (updated to match official data)
export const ENGLISH_SCORES = {
  withSpouse: {
    "clb-4": { speaking: 6, listening: 6, reading: 6, writing: 6 },
    "clb-5": { speaking: 6, listening: 6, reading: 6, writing: 6 },
    "clb-6": { speaking: 8, listening: 8, reading: 8, writing: 8 },
    "clb-7": { speaking: 16, listening: 16, reading: 16, writing: 16 },
    "clb-8": { speaking: 22, listening: 22, reading: 22, writing: 22 },
    "clb-9": { speaking: 29, listening: 29, reading: 29, writing: 29 },
    "clb-10": { speaking: 32, listening: 32, reading: 32, writing: 32 }
  },
  withoutSpouse: {
    "clb-4": { speaking: 6, listening: 6, reading: 6, writing: 6 },
    "clb-5": { speaking: 6, listening: 6, reading: 6, writing: 6 },
    "clb-6": { speaking: 9, listening: 9, reading: 9, writing: 9 },
    "clb-7": { speaking: 17, listening: 17, reading: 17, writing: 17 },
    "clb-8": { speaking: 23, listening: 23, reading: 23, writing: 23 },
    "clb-9": { speaking: 31, listening: 31, reading: 31, writing: 31 },
    "clb-10": { speaking: 34, listening: 34, reading: 34, writing: 34 }
  }
};

// French language scoring table (same for both with/without spouse)
export const FRENCH_SCORES = {
  "clb-5": { speaking: 1, listening: 1, reading: 1, writing: 1 },
  "clb-6": { speaking: 1, listening: 1, reading: 1, writing: 1 },
  "clb-7": { speaking: 3, listening: 3, reading: 3, writing: 3 },
  "clb-8": { speaking: 3, listening: 3, reading: 3, writing: 3 },
  "clb-9": { speaking: 6, listening: 6, reading: 6, writing: 6 },
  "clb-10": { speaking: 6, listening: 6, reading: 6, writing: 6 }
};

// Canadian work experience scoring tables (updated to match official data)
export const CANADIAN_WORK_SCORES = {
  withSpouse: { 0: 0, 1: 35, 2: 46, 3: 56, 4: 63, 5: 70 },
  withoutSpouse: { 0: 0, 1: 40, 2: 53, 3: 64, 4: 72, 5: 80 }
};

// Spouse education scoring table (updated to match official data)
export const SPOUSE_EDUCATION_SCORES = {
  secondary: 2, "one-year": 6, "two-year": 7, bachelors: 8,
  "two-certificates": 9, masters: 10, phd: 10
};

// Spouse language scoring table (updated to match official data)
export const SPOUSE_LANGUAGE_SCORES = {
  "clb-5": 4, "clb-6": 4, "clb-7": 12, "clb-8": 12, "clb-9": 20, "clb-10": 20
};

// Spouse work experience scoring table (updated to match official data)
export const SPOUSE_WORK_SCORES = { 0: 0, 1: 5, 2: 7, 3: 8, 4: 9, 5: 10 };

// Skill transferability factors (updated to match official criteria)
export const SKILL_TRANSFERABILITY_SCORES = {
  // Education + Language combinations
  educationLanguage: {
    "clb-7": 13, "clb-8": 25, "clb-9": 25, "clb-10": 25
  },
  // Education + Canadian Work Experience combinations
  educationCanadianWork: {
    "1-year": 13, "2-years": 25, "3-years": 25, "4-years": 25, "5-years": 25
  },
  // Foreign Work Experience + Language combinations
  foreignWorkLanguage: {
    "clb-7": 13, "clb-8": 25, "clb-9": 25, "clb-10": 25
  },
  // Foreign Work Experience + Canadian Work Experience combinations
  foreignWorkCanadianWork: {
    "1-year": 13, "2-years": 25, "3-years": 25, "4-years": 25, "5-years": 25
  }
};

// Main CRS calculation function (updated to remove job offer points)
export const calculateCRSScore = (formData) => {
  let totalScore = 0;
  const scores = {};
  const hasSpouse = formData.hasSpouse === "yes";

  // A. Core/Human Capital Factors
  // Age Score
  const age = parseInt(formData.age);
  const ageScores = hasSpouse ? AGE_SCORES.withSpouse : AGE_SCORES.withoutSpouse;
  scores.age = age >= 20 && age <= 44 ? ageScores[age] || 0 : 0;

  // Education Score
  const educationScores = hasSpouse ? EDUCATION_SCORES.withSpouse : EDUCATION_SCORES.withoutSpouse;
  scores.education = educationScores[formData.education] || 0;

  // Language Proficiency Score - First Official Language (English)
  const englishScores = hasSpouse ? ENGLISH_SCORES.withSpouse : ENGLISH_SCORES.withoutSpouse;

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
    (sum, score) => sum + score, 0
  );

  // Language Proficiency Score - Second Official Language (French)
  const frenchSkills = {
    speaking: FRENCH_SCORES[formData.frenchSpeaking] || { speaking: 0 },
    listening: FRENCH_SCORES[formData.frenchListening] || { listening: 0 },
    reading: FRENCH_SCORES[formData.frenchReading] || { reading: 0 },
    writing: FRENCH_SCORES[formData.frenchWriting] || { writing: 0 },
  };

  scores.frenchBreakdown = {
    speaking: frenchSkills.speaking.speaking || 0,
    listening: frenchSkills.listening.listening || 0,
    reading: frenchSkills.reading.reading || 0,
    writing: frenchSkills.writing.writing || 0,
  };
  scores.french = Object.values(scores.frenchBreakdown).reduce(
    (sum, score) => sum + score, 0
  );

  // Canadian Work Experience
  const canadianWorkScores = hasSpouse ? CANADIAN_WORK_SCORES.withSpouse : CANADIAN_WORK_SCORES.withoutSpouse;
  const canadianWorkExp = Math.min(parseInt(formData.canadianWorkExperience) || 0, 5);
  scores.canadianWorkExperience = canadianWorkScores[canadianWorkExp];

  // B. Spouse/Partner factors (if applicable)
  scores.spouseEducation = 0;
  scores.spouseLanguage = 0;
  scores.spouseCanadianWork = 0;

  if (hasSpouse) {
    // Spouse Education
    scores.spouseEducation = SPOUSE_EDUCATION_SCORES[formData.spouseEducation] || 0;

    // Spouse Language
    scores.spouseLanguage = SPOUSE_LANGUAGE_SCORES[formData.spouseLanguage] || 0;

    // Spouse Canadian Work
    const spouseWorkExp = Math.min(parseInt(formData.spouseCanadianWork) || 0, 5);
    scores.spouseCanadianWork = SPOUSE_WORK_SCORES[spouseWorkExp];
  }

  // C. Skill Transferability factors (updated to match official criteria)
  scores.skillTransferability = 0;

  // Education + Language combinations
  const maxLanguageScore = Math.max(
    scores.englishBreakdown.speaking,
    scores.englishBreakdown.listening,
    scores.englishBreakdown.reading,
    scores.englishBreakdown.writing
  );

  // Check higher CLB levels first (CLB 9+ = 31pts, CLB 8 = 23pts, CLB 7 = 17pts)
  if (scores.education >= 90) {
    if (maxLanguageScore >= 31) { // CLB 9+
      scores.skillTransferability += 25;
    } else if (maxLanguageScore >= 23) { // CLB 8
      scores.skillTransferability += 25;
    } else if (maxLanguageScore >= 17) { // CLB 7
      scores.skillTransferability += 13;
    }
  }

  // Education + Canadian Work Experience combinations
  // Check higher years first
  if (scores.education >= 90 && scores.canadianWorkExperience > 0) {
    if (canadianWorkExp >= 2) {
      scores.skillTransferability += 25;
    } else if (canadianWorkExp >= 1) {
      scores.skillTransferability += 13;
    }
  }

  // Foreign Work Experience + Language combinations
  // Check higher CLB levels first
  const foreignWorkExp = parseInt(formData.foreignWorkExperience) || 0;
  if (foreignWorkExp >= 1) {
    if (maxLanguageScore >= 31) { // CLB 9+
      scores.skillTransferability += 25;
    } else if (maxLanguageScore >= 23) { // CLB 8
      scores.skillTransferability += 25;
    } else if (maxLanguageScore >= 17) { // CLB 7
      scores.skillTransferability += 13;
    }
  }

  // Foreign Work Experience + Canadian Work Experience combinations
  // Check higher years first
  if (foreignWorkExp >= 1 && scores.canadianWorkExperience > 0) {
    if (canadianWorkExp >= 2) {
      scores.skillTransferability += 25;
    } else if (canadianWorkExp >= 1) {
      scores.skillTransferability += 13;
    }
  }

  // Cap skill transferability at 100 points
  scores.skillTransferability = Math.min(scores.skillTransferability, 100);

  // D. Additional factors (updated to remove job offer points)
  let additionalScore = 0;

  // Provincial Nomination (600 points)
  if (formData.provincialNomination === "yes") {
    additionalScore += 600;
  }

  // French Language Skills Bonus (updated to match official criteria)
  if (formData.frenchSkills === "strong") {
    // CLB 7+ in all four French skills + CLB 5+ in English
    additionalScore += 50;
  } else if (formData.frenchSkills === "basic") {
    // CLB 7+ in all four French skills + CLB 4 or lower in English
    additionalScore += 25;
  }

  // Sibling in Canada (15 points)
  if (formData.siblingInCanada === "yes") {
    additionalScore += 15;
  }

  // Canadian Education (updated to match official criteria)
  if (formData.canadianEducationCredential === "three-plus") {
    additionalScore += 30;
  } else if (formData.canadianEducationCredential === "one-two") {
    additionalScore += 15;
  }

  scores.additionalFactors = additionalScore;

  // Calculate totals
  const coreFactorsTotal = scores.age + scores.education + scores.english +
    scores.french + scores.canadianWorkExperience;
  const spouseFactorsTotal = scores.spouseEducation + scores.spouseLanguage +
    scores.spouseCanadianWork;

  totalScore = coreFactorsTotal + spouseFactorsTotal + scores.skillTransferability + additionalScore;

  return {
    totalScore,
    scores,
    coreFactorsTotal,
    spouseFactorsTotal,
  };
};

// Helper function to get score analysis (updated with current draw trends)
export const getScoreAnalysis = (totalScore) => {
  if (totalScore >= 500) {
    return {
      type: 'excellent',
      message: '🎉 Excellent! Your score is highly competitive for Express Entry draws.',
      details: 'Recent draws have been selecting candidates with scores around 480-540. You\'re in a strong position!',
      color: 'green'
    };
  } else if (totalScore >= 470) {
    return {
      type: 'good',
      message: '✅ Good score! You have a decent chance of receiving an invitation.',
      details: 'Consider improving your language scores or gaining more work experience to increase your chances.',
      color: 'yellow'
    };
  } else if (totalScore >= 400) {
    return {
      type: 'needs-improvement',
      message: '⚠️ Your score needs improvement to be competitive.',
      details: 'Focus on improving language skills, education credentials, or consider Provincial Nominee Programs.',
      color: 'orange'
    };
  } else {
    return {
      type: 'significant-improvement',
      message: '📈 Significant improvements needed for Express Entry eligibility.',
      details: 'Consider improving language skills, gaining more work experience, or exploring other immigration pathways.',
      color: 'red'
    };
  }
}; 