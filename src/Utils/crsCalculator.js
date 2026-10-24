// CRS Calculator Utilities
// Contains all calculation logic and scoring tables for the CRS Calculator
// Verified against IRCC criteria on 2026-10-24. See CRS_CALCULATOR_VERIFICATION.md.

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

// Keep policy dates explicit: upcoming points must not change current estimates.
export const CRS_POLICY_DATE = '2026-11-03';
export const CRS_SOURCE = 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/check-score/crs-criteria.html';
export const CRS_CHANGES_SOURCE = 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/changes.html';
export const getDefaultRules = (date = new Date()) => date.toLocaleDateString('en-CA', { timeZone: 'America/Toronto' }) >= CRS_POLICY_DATE ? '2026-11' : '2025-03';
const abilities = ['speaking', 'listening', 'reading', 'writing'];
const field = (language, ability) => `${language}${ability[0].toUpperCase()}${ability.slice(1)}`;
const sum = values => values.reduce((total, value) => total + value, 0);
const years = value => Math.min(5, Math.max(0, parseInt(value, 10) || 0));
const minimumLevel = (data, language) => Math.min(...abilities.map(ability => parseInt(String(data[field(language, ability)] || '').replace('clb-', ''), 10) || 0));

function calculateForLanguage(formData, firstLanguage) {
  const hasSpouse = formData.hasSpouse === 'yes';
  const family = hasSpouse ? 'withSpouse' : 'withoutSpouse';
  const rules = formData.rulesVersion || getDefaultRules();
  const newRules = rules === '2026-11';
  const scores = {};
  scores.age = AGE_SCORES[family][Number(formData.age)] || 0;
  scores.education = EDUCATION_SCORES[family][formData.education] || 0;
  for (const language of ['english', 'french']) {
    const table = language === firstLanguage ? ENGLISH_SCORES[family] : FRENCH_SCORES;
    const breakdown = Object.fromEntries(abilities.map(ability => [ability, table[formData[field(language, ability)]]?.[ability] || 0]));
    scores[`${language}Breakdown`] = breakdown;
    scores[language] = Math.min(sum(Object.values(breakdown)), language === firstLanguage ? (hasSpouse ? 128 : 136) : (hasSpouse ? 22 : 24));
  }
  const canadianYears = years(formData.canadianWorkExperience);
  const foreignYears = years(formData.foreignWorkExperience);
  scores.canadianWorkExperience = CANADIAN_WORK_SCORES[family][canadianYears];
  // The highest qualifying high-wage band applies, not a sum of bands.
  scores.highWageExperience = newRules && canadianYears >= 1 ? ({ none: 0, level1: 20, level2: 40, level3: 70 }[formData.highWageExperience] || 0) : 0;
  scores.jobOffer = newRules ? ({ none: 0, level1: 50, level2: 70, level3: 100 }[formData.highWageJobOffer] || 0) : 0;
  scores.labourMarketIntegration = Math.max(scores.canadianWorkExperience + scores.highWageExperience, scores.jobOffer);
  scores.spouseEducation = hasSpouse ? SPOUSE_EDUCATION_SCORES[formData.spouseEducation] || 0 : 0;
  scores.spouseLanguage = hasSpouse ? sum(abilities.map(ability => SPOUSE_LANGUAGE_SCORES[formData[field('spouse', ability)]] || 0)) : 0;
  scores.spouseCanadianWork = hasSpouse ? SPOUSE_WORK_SCORES[years(formData.spouseCanadianWork)] : 0;

  const firstMinimum = minimumLevel(formData, firstLanguage);
  const advancedEducation = ['two-certificates', 'masters', 'phd'].includes(formData.education);
  const postSecondary = advancedEducation || ['one-year', 'two-year', 'bachelors'].includes(formData.education);
  const educationLanguage = postSecondary && firstMinimum >= 7 ? (advancedEducation ? (firstMinimum >= 9 ? 50 : 25) : (firstMinimum >= 9 ? 25 : 13)) : 0;
  const educationWork = postSecondary && canadianYears >= 1 ? (advancedEducation ? (canadianYears >= 2 ? 50 : 25) : (canadianYears >= 2 ? 25 : 13)) : 0;
  const foreignLanguage = foreignYears >= 1 && firstMinimum >= 7 ? (foreignYears >= 3 ? (firstMinimum >= 9 ? 50 : 25) : (firstMinimum >= 9 ? 25 : 13)) : 0;
  const foreignCanadian = foreignYears >= 1 && canadianYears >= 1 ? (foreignYears >= 3 ? (canadianYears >= 2 ? 50 : 25) : (canadianYears >= 2 ? 25 : 13)) : 0;
  scores.tradeCertificate = formData.tradeCertificate === 'yes' && firstMinimum >= 5 ? (firstMinimum >= 7 ? 50 : 25) : 0;
  scores.skillTransferability = Math.min(Math.min(educationLanguage + educationWork, 50) + Math.min(foreignLanguage + foreignCanadian, 50) + scores.tradeCertificate, 100);

  scores.frenchBonus = minimumLevel(formData, 'french') >= 7 ? (minimumLevel(formData, 'english') >= 5 ? 50 : 25) : 0;
  scores.nomination = formData.provincialNomination === 'yes' ? 600 : 0;
  scores.sibling = formData.siblingInCanada === 'yes' ? 15 : 0;
  scores.canadianEducation = formData.studiedInCanada === 'yes' ? ({ 'one-two': 15, 'three-plus': 30 }[formData.canadianEducationCredential] || 0) : 0;
  scores.additionalFactors = Math.min(scores.nomination + scores.frenchBonus + scores.sibling + scores.canadianEducation, 600);
  const coreFactorsTotal = scores.age + scores.education + scores.english + scores.french + scores.labourMarketIntegration;
  const spouseFactorsTotal = scores.spouseEducation + scores.spouseLanguage + scores.spouseCanadianWork;
  return { totalScore: coreFactorsTotal + spouseFactorsTotal + scores.skillTransferability + scores.additionalFactors, scores, coreFactorsTotal, spouseFactorsTotal, firstLanguage, rulesVersion: rules, newRules };
}

export function calculateCRSScore(formData) {
  if (formData.firstOfficialLanguage === 'english' || formData.firstOfficialLanguage === 'french') return calculateForLanguage(formData, formData.firstOfficialLanguage);
  const english = calculateForLanguage(formData, 'english');
  const french = calculateForLanguage(formData, 'french');
  return french.totalScore > english.totalScore ? french : english;
}
