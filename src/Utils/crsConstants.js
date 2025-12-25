// CRS Calculator Constants
// Contains all form options and configuration data
// Updated to reflect latest official CRS criteria (as of 2025)

export const EDUCATION_OPTIONS = [
  { value: "secondary", label: "Secondary diploma (high school graduation)" },
  { value: "one-year", label: "One-year degree, diploma or certificate from a university, college, trade or technical school, or other institute" },
  { value: "two-year", label: "Two-year program at a university, college, trade or technical school, or other institute" },
  { value: "bachelors", label: "Bachelor's degree OR a three or more year program at a university, college, trade or technical school, or other institute" },
  { value: "two-certificates", label: "Two or more certificates, diplomas, or degrees. One must be for a program of three or more years" },
  { value: "masters", label: "Master's degree, OR professional degree needed to practice in a licensed profession" },
  { value: "phd", label: "Doctoral level university degree (Ph.D.)" },
];

export const LANGUAGE_OPTIONS = [
  { value: "clb-4", label: "CLB 4" },
  { value: "clb-5", label: "CLB 5" },
  { value: "clb-6", label: "CLB 6" },
  { value: "clb-7", label: "CLB 7" },
  { value: "clb-8", label: "CLB 8" },
  { value: "clb-9", label: "CLB 9" },
  { value: "clb-10", label: "CLB 10+" },
];



// TEF Canada scoring options (updated to match official data)
export const TEF_SCORING_OPTIONS = [
  {
    value: "clb-4",
    label: "CLB 4 (121-150 Reading, 181-225 Writing, 145-180 Listening, 181-225 Speaking)",
  },
  {
    value: "clb-5",
    label: "CLB 5 (151-180 Reading, 226-270 Writing, 181-216 Listening, 226-270 Speaking)",
  },
  {
    value: "clb-6",
    label: "CLB 6 (181-206 Reading, 271-309 Writing, 217-248 Listening, 271-309 Speaking)",
  },
  {
    value: "clb-7",
    label: "CLB 7 (207-232 Reading, 310-348 Writing, 249-279 Listening, 310-348 Speaking)",
  },
  {
    value: "clb-8",
    label: "CLB 8 (233-247 Reading, 349-370 Writing, 280-297 Listening, 349-370 Speaking)",
  },
  {
    value: "clb-9",
    label: "CLB 9 (248-262 Reading, 371-392 Writing, 298-315 Listening, 371-392 Speaking)",
  },
  {
    value: "clb-10",
    label: "CLB 10 (263-300 Reading, 393-450 Writing, 316-360 Listening, 393-450 Speaking)",
  },
];

// TCF Canada scoring options (updated to match official data)
export const TCF_SCORING_OPTIONS = [
  {
    value: "clb-4",
    label: "CLB 4 (342-374 Reading, 4-5 Writing, 331-368 Listening, 4-5 Speaking)",
  },
  {
    value: "clb-5",
    label: "CLB 5 (375-405 Reading, 6 Writing, 369-397 Listening, 6 Speaking)",
  },
  {
    value: "clb-6",
    label: "CLB 6 (406-452 Reading, 7-9 Writing, 398-457 Listening, 7-9 Speaking)",
  },
  {
    value: "clb-7",
    label: "CLB 7 (453-498 Reading, 10-11 Writing, 458-502 Listening, 10-11 Speaking)",
  },
  {
    value: "clb-8",
    label: "CLB 8 (499-523 Reading, 12-13 Writing, 503-522 Listening, 12-13 Speaking)",
  },
  {
    value: "clb-9",
    label: "CLB 9 (524-548 Reading, 14-15 Writing, 523-548 Listening, 14-15 Speaking)",
  },
  {
    value: "clb-10",
    label: "CLB 10 (549-699 Reading, 16-20 Writing, 549-699 Listening, 16-20 Speaking)",
  },
];

export const WORK_EXPERIENCE_OPTIONS = [
  { value: "0", label: "None or less than 1 year" },
  { value: "1", label: "1 year" },
  { value: "2", label: "2 years" },
  { value: "3", label: "3 years" },
  { value: "4", label: "4 years" },
  { value: "5", label: "5 years or more" },
];

export const YES_NO_OPTIONS = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes" },
];

export const FRENCH_TEST_OPTIONS = [
  { value: "tef", label: "TEF Canada" },
  { value: "tcf", label: "TCF Canada" },
];

export const FRENCH_SKILLS_OPTIONS = [
  { value: "none", label: "None" },
  { value: "basic", label: "CLB 7+ French (with CLB 4- English)" },
  { value: "strong", label: "CLB 7+ French (with CLB 5+ English)" },
];

export const CANADIAN_EDUCATION_OPTIONS = [
  { value: "none", label: "None" },
  { value: "one-two", label: "Post-secondary education in Canada - credential of one or two years" },
  { value: "three-plus", label: "Post-secondary education in Canada - credential three years or longer" },
];




// Initial form data structure (updated to remove job offer fields)
export const INITIAL_FORM_DATA = {
  // Personal Information
  maritalStatus: "",
  age: "",
  education: "",
  hasSpouse: "no",

  // Spouse Information (if applicable)
  spouseEducation: "",
  spouseLanguage: "",
  spouseCanadianWork: "",

  // English Language Skills
  englishTestType: "",
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

  // Work Experience
  canadianWorkExperience: "",
  foreignWorkExperience: "",

  // Additional Factors
  provincialNomination: "no",
  frenchSkills: "none",
  siblingInCanada: "no",
  studiedInCanada: "no",
  canadianEducationCredential: "none",
};

// Helper function to get French scoring options based on test type
export const getFrenchScoringOptions = (testType) => {
  switch (testType) {
    case "tef":
      return TEF_SCORING_OPTIONS;
    case "tcf":
      return TCF_SCORING_OPTIONS;
    default:
      return [];
  }
};

// Helper function to get placeholder text for French fields
export const getFrenchPlaceholder = (testType) => {
  return testType ? "Select CLB level" : "Select test type first";
};

// Helper function to get tooltip text for French fields
export const getFrenchTooltip = (testType, skill) => {
  const testName = testType === "tef" ? "TEF" : testType === "tcf" ? "TCF" : "Select test type";
  return `Your French ${skill} proficiency level (${testName} test)`;
};

