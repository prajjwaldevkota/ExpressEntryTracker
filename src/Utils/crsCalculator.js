// CRS Calculator Utilities
// Contains all calculation logic and scoring tables for the CRS Calculator
// Updated to reflect latest official CRS criteria (as of 2025)

// Age scoring tables (from official Canada.ca)
export const AGE_SCORES = {
  withSpouse: {
    17: 0, 18: 90, 19: 95,
    20: 100, 21: 100, 22: 100, 23: 100, 24: 100, 25: 100, 26: 100, 27: 100, 28: 100, 29: 100,
    30: 95, 31: 90, 32: 85, 33: 80, 34: 75, 35: 70, 36: 65, 37: 60, 38: 55, 39: 50,
    40: 45, 41: 35, 42: 25, 43: 15, 44: 5, 45: 0
  },
  withoutSpouse: {
    17: 0, 18: 99, 19: 105,
    20: 110, 21: 110, 22: 110, 23: 110, 24: 110, 25: 110, 26: 110, 27: 110, 28: 110, 29: 110,
    30: 105, 31: 99, 32: 94, 33: 88, 34: 83, 35: 77, 36: 72, 37: 66, 38: 61, 39: 55,
    40: 50, 41: 39, 42: 28, 43: 17, 44: 6, 45: 0
  }
};

// Education scoring tables (from official Canada.ca)
export const EDUCATION_SCORES = {
  withSpouse: {
    "none": 0,
    "secondary": 28,
    "one-year": 84,
    "two-year": 91,
    "bachelors": 112,
    "two-certificates": 119,
    "masters": 126,
    "phd": 140
  },
  withoutSpouse: {
    "none": 0,
    "secondary": 30,
    "one-year": 90,
    "two-year": 98,
    "bachelors": 120,
    "two-certificates": 128,
    "masters": 135,
    "phd": 150
  }
};

// First Official Language scoring (from official Canada.ca)
export const ENGLISH_SCORES = {
  withSpouse: {
    "clb-3": { speaking: 0, listening: 0, reading: 0, writing: 0 },
    "clb-4": { speaking: 6, listening: 6, reading: 6, writing: 6 },
    "clb-5": { speaking: 6, listening: 6, reading: 6, writing: 6 },
    "clb-6": { speaking: 8, listening: 8, reading: 8, writing: 8 },
    "clb-7": { speaking: 16, listening: 16, reading: 16, writing: 16 },
    "clb-8": { speaking: 22, listening: 22, reading: 22, writing: 22 },
    "clb-9": { speaking: 29, listening: 29, reading: 29, writing: 29 },
    "clb-10": { speaking: 32, listening: 32, reading: 32, writing: 32 }
  },
  withoutSpouse: {
    "clb-3": { speaking: 0, listening: 0, reading: 0, writing: 0 },
    "clb-4": { speaking: 6, listening: 6, reading: 6, writing: 6 },
    "clb-5": { speaking: 6, listening: 6, reading: 6, writing: 6 },
    "clb-6": { speaking: 9, listening: 9, reading: 9, writing: 9 },
    "clb-7": { speaking: 17, listening: 17, reading: 17, writing: 17 },
    "clb-8": { speaking: 23, listening: 23, reading: 23, writing: 23 },
    "clb-9": { speaking: 31, listening: 31, reading: 31, writing: 31 },
    "clb-10": { speaking: 34, listening: 34, reading: 34, writing: 34 }
  }
};

// Second Official Language (French) scoring - same for both (max 6 per ability)
export const FRENCH_SCORES = {
  "clb-4": { speaking: 0, listening: 0, reading: 0, writing: 0 },
  "clb-5": { speaking: 1, listening: 1, reading: 1, writing: 1 },
  "clb-6": { speaking: 1, listening: 1, reading: 1, writing: 1 },
  "clb-7": { speaking: 3, listening: 3, reading: 3, writing: 3 },
  "clb-8": { speaking: 3, listening: 3, reading: 3, writing: 3 },
  "clb-9": { speaking: 6, listening: 6, reading: 6, writing: 6 },
  "clb-10": { speaking: 6, listening: 6, reading: 6, writing: 6 }
};

// Canadian work experience scoring (from official Canada.ca)
export const CANADIAN_WORK_SCORES = {
  withSpouse: { 0: 0, 1: 35, 2: 46, 3: 56, 4: 63, 5: 70 },
  withoutSpouse: { 0: 0, 1: 40, 2: 53, 3: 64, 4: 72, 5: 80 }
};

// Spouse education scoring (from official Canada.ca)
export const SPOUSE_EDUCATION_SCORES = {
  "none": 0,
  "secondary": 2,
  "one-year": 6,
  "two-year": 7,
  "bachelors": 8,
  "two-certificates": 9,
  "masters": 10,
  "phd": 10
};

// Spouse language scoring (max 5 per ability, max 20 total)
export const SPOUSE_LANGUAGE_SCORES = {
  "clb-4": 0, "clb-5": 1, "clb-6": 1, "clb-7": 3, "clb-8": 3, "clb-9": 5, "clb-10": 5
};

// Spouse Canadian work experience scoring
export const SPOUSE_WORK_SCORES = { 0: 0, 1: 5, 2: 7, 3: 8, 4: 9, 5: 10 };

// Skill Transferability - Education + Language (from official Canada.ca)
// These points are based on CLB level and education level
export const SKILL_EDUCATION_LANGUAGE = {
  // Post-secondary of 1+ years
  "oneYear": {
    "clb-7": 13, "clb-8": 13, "clb-9": 25, "clb-10": 25
  },
  // Two or more credentials (one 3+ years)
  "twoCredentials": {
    "clb-7": 25, "clb-8": 25, "clb-9": 50, "clb-10": 50
  }
};

// Skill Transferability - Education + Canadian Work
export const SKILL_EDUCATION_WORK = {
  // Post-secondary of 1+ years
  "oneYear": {
    1: 13, 2: 25, 3: 25, 4: 25, 5: 25
  },
  // Two or more credentials (one 3+ years)
  "twoCredentials": {
    1: 25, 2: 50, 3: 50, 4: 50, 5: 50
  }
};

// Skill Transferability - Foreign Work + Language
export const SKILL_FOREIGN_LANGUAGE = {
  // 1-2 years foreign work
  "shortWork": {
    "clb-7": 13, "clb-8": 13, "clb-9": 25, "clb-10": 25
  },
  // 3+ years foreign work
  "longWork": {
    "clb-7": 25, "clb-8": 25, "clb-9": 50, "clb-10": 50
  }
};

// Skill Transferability - Foreign Work + Canadian Work
export const SKILL_FOREIGN_CANADIAN = {
  // 1-2 years foreign work
  "shortForeign": {
    1: 13, 2: 25, 3: 25, 4: 25, 5: 25
  },
  // 3+ years foreign work
  "longForeign": {
    1: 25, 2: 50, 3: 50, 4: 50, 5: 50
  }
};

// Main CRS calculation function
export const calculateCRSScore = (formData) => {
  let totalScore = 0;
  const scores = {};
  const hasSpouse = formData.hasSpouse === "yes";

  // A. Core/Human Capital Factors
  // Age Score
  const age = parseInt(formData.age);
  const ageScores = hasSpouse ? AGE_SCORES.withSpouse : AGE_SCORES.withoutSpouse;
  scores.age = ageScores[age] !== undefined ? ageScores[age] : 0;

  // Education Score
  const educationScores = hasSpouse ? EDUCATION_SCORES.withSpouse : EDUCATION_SCORES.withoutSpouse;
  scores.education = educationScores[formData.education] || 0;

  // First Official Language (English)
  const englishScores = hasSpouse ? ENGLISH_SCORES.withSpouse : ENGLISH_SCORES.withoutSpouse;
  const getEnglishScore = (ability) => {
    const clbLevel = formData[`english${ability.charAt(0).toUpperCase() + ability.slice(1)}`];
    return englishScores[clbLevel]?.[ability] || 0;
  };

  scores.englishBreakdown = {
    speaking: getEnglishScore('speaking'),
    listening: getEnglishScore('listening'),
    reading: getEnglishScore('reading'),
    writing: getEnglishScore('writing'),
  };
  scores.english = Object.values(scores.englishBreakdown).reduce((sum, s) => sum + s, 0);

  // Second Official Language (French) - max 22 with spouse, 24 without
  const getFrenchScore = (ability) => {
    const clbLevel = formData[`french${ability.charAt(0).toUpperCase() + ability.slice(1)}`];
    return FRENCH_SCORES[clbLevel]?.[ability] || 0;
  };

  scores.frenchBreakdown = {
    speaking: getFrenchScore('speaking'),
    listening: getFrenchScore('listening'),
    reading: getFrenchScore('reading'),
    writing: getFrenchScore('writing'),
  };
  const frenchTotal = Object.values(scores.frenchBreakdown).reduce((sum, s) => sum + s, 0);
  scores.french = Math.min(frenchTotal, hasSpouse ? 22 : 24);

  // Canadian Work Experience
  const canadianWorkScores = hasSpouse ? CANADIAN_WORK_SCORES.withSpouse : CANADIAN_WORK_SCORES.withoutSpouse;
  const canadianWorkExp = Math.min(parseInt(formData.canadianWorkExperience) || 0, 5);
  scores.canadianWorkExperience = canadianWorkScores[canadianWorkExp] || 0;

  // B. Spouse/Partner factors (if applicable)
  scores.spouseEducation = 0;
  scores.spouseLanguage = 0;
  scores.spouseCanadianWork = 0;

  if (hasSpouse) {
    scores.spouseEducation = SPOUSE_EDUCATION_SCORES[formData.spouseEducation] || 0;

    // Spouse language - simplified, using overall CLB level
    const spouseClb = formData.spouseLanguage;
    const perAbilityScore = SPOUSE_LANGUAGE_SCORES[spouseClb] || 0;
    scores.spouseLanguage = Math.min(perAbilityScore * 4, 20); // max 20 points

    const spouseWorkExp = Math.min(parseInt(formData.spouseCanadianWork) || 0, 5);
    scores.spouseCanadianWork = SPOUSE_WORK_SCORES[spouseWorkExp] || 0;
  }

  // C. Skill Transferability factors (max 100 points total)
  // Helper: Get minimum CLB across all English abilities
  const getMinEnglishCLB = () => {
    const clbLevels = ['englishSpeaking', 'englishListening', 'englishReading', 'englishWriting']
      .map(key => formData[key])
      .filter(val => val)
      .map(val => parseInt(val.replace('clb-', '')));
    return clbLevels.length === 4 ? Math.min(...clbLevels) : 0;
  };

  const minEnglishCLB = getMinEnglishCLB();
  const hasPostSecondary = ['one-year', 'two-year', 'bachelors', 'two-certificates', 'masters', 'phd'].includes(formData.education);
  const hasTwoCredentials = formData.education === 'two-certificates';
  const foreignWorkExp = parseInt(formData.foreignWorkExperience) || 0;

  let educationSkillPoints = 0;
  let foreignSkillPoints = 0;

  // 1. Education + Language (max 50)
  if (hasPostSecondary && minEnglishCLB >= 7) {
    const table = hasTwoCredentials ? SKILL_EDUCATION_LANGUAGE.twoCredentials : SKILL_EDUCATION_LANGUAGE.oneYear;
    const clbKey = `clb-${Math.min(minEnglishCLB, 10)}`;
    educationSkillPoints += table[clbKey] || 0;
  }

  // 2. Education + Canadian Work (max 50)
  if (hasPostSecondary && canadianWorkExp >= 1) {
    const table = hasTwoCredentials ? SKILL_EDUCATION_WORK.twoCredentials : SKILL_EDUCATION_WORK.oneYear;
    educationSkillPoints += table[canadianWorkExp] || 0;
  }

  // Cap education skill points at 50
  educationSkillPoints = Math.min(educationSkillPoints, 50);

  // 3. Foreign Work + Language (max 50)
  if (foreignWorkExp >= 1 && minEnglishCLB >= 7) {
    const table = foreignWorkExp >= 3 ? SKILL_FOREIGN_LANGUAGE.longWork : SKILL_FOREIGN_LANGUAGE.shortWork;
    const clbKey = `clb-${Math.min(minEnglishCLB, 10)}`;
    foreignSkillPoints += table[clbKey] || 0;
  }

  // 4. Foreign Work + Canadian Work (max 50)
  if (foreignWorkExp >= 1 && canadianWorkExp >= 1) {
    const table = foreignWorkExp >= 3 ? SKILL_FOREIGN_CANADIAN.longForeign : SKILL_FOREIGN_CANADIAN.shortForeign;
    foreignSkillPoints += table[canadianWorkExp] || 0;
  }

  // Cap foreign skill points at 50
  foreignSkillPoints = Math.min(foreignSkillPoints, 50);

  // Total skill transferability (max 100)
  scores.skillTransferability = Math.min(educationSkillPoints + foreignSkillPoints, 100);

  // D. Additional factors
  let additionalScore = 0;

  // Provincial Nomination (600 points)
  if (formData.provincialNomination === "yes") {
    additionalScore += 600;
  }

  // French Language Skills Bonus
  if (formData.frenchSkills === "strong") {
    // NCLC 7+ in all French + CLB 5+ in English = 50 points
    additionalScore += 50;
  } else if (formData.frenchSkills === "basic") {
    // NCLC 7+ in all French + CLB 4 or less in English = 25 points
    additionalScore += 25;
  }

  // Sibling in Canada (15 points)
  if (formData.siblingInCanada === "yes") {
    additionalScore += 15;
  }

  // Canadian Education Credential
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

// Helper function to get score analysis
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