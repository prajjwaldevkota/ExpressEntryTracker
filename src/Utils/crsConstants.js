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



// TEF Canada scoring options by ability
export const TEF_SPEAKING_OPTIONS = [
  { value: "clb-4", label: "CLB 4 (181-225)" },
  { value: "clb-5", label: "CLB 5 (226-270)" },
  { value: "clb-6", label: "CLB 6 (271-309)" },
  { value: "clb-7", label: "CLB 7 (310-348)" },
  { value: "clb-8", label: "CLB 8 (349-370)" },
  { value: "clb-9", label: "CLB 9 (371-392)" },
  { value: "clb-10", label: "CLB 10 (393-450)" },
];

export const TEF_LISTENING_OPTIONS = [
  { value: "clb-4", label: "CLB 4 (145-180)" },
  { value: "clb-5", label: "CLB 5 (181-216)" },
  { value: "clb-6", label: "CLB 6 (217-248)" },
  { value: "clb-7", label: "CLB 7 (249-279)" },
  { value: "clb-8", label: "CLB 8 (280-297)" },
  { value: "clb-9", label: "CLB 9 (298-315)" },
  { value: "clb-10", label: "CLB 10 (316-360)" },
];

export const TEF_READING_OPTIONS = [
  { value: "clb-4", label: "CLB 4 (121-150)" },
  { value: "clb-5", label: "CLB 5 (151-180)" },
  { value: "clb-6", label: "CLB 6 (181-206)" },
  { value: "clb-7", label: "CLB 7 (207-232)" },
  { value: "clb-8", label: "CLB 8 (233-247)" },
  { value: "clb-9", label: "CLB 9 (248-262)" },
  { value: "clb-10", label: "CLB 10 (263-300)" },
];

export const TEF_WRITING_OPTIONS = [
  { value: "clb-4", label: "CLB 4 (181-225)" },
  { value: "clb-5", label: "CLB 5 (226-270)" },
  { value: "clb-6", label: "CLB 6 (271-309)" },
  { value: "clb-7", label: "CLB 7 (310-348)" },
  { value: "clb-8", label: "CLB 8 (349-370)" },
  { value: "clb-9", label: "CLB 9 (371-392)" },
  { value: "clb-10", label: "CLB 10 (393-450)" },
];

// TCF Canada scoring options by ability
export const TCF_SPEAKING_OPTIONS = [
  { value: "clb-4", label: "CLB 4 (4-5)" },
  { value: "clb-5", label: "CLB 5 (6)" },
  { value: "clb-6", label: "CLB 6 (7-9)" },
  { value: "clb-7", label: "CLB 7 (10-11)" },
  { value: "clb-8", label: "CLB 8 (12-13)" },
  { value: "clb-9", label: "CLB 9 (14-15)" },
  { value: "clb-10", label: "CLB 10 (16-20)" },
];

export const TCF_LISTENING_OPTIONS = [
  { value: "clb-4", label: "CLB 4 (331-368)" },
  { value: "clb-5", label: "CLB 5 (369-397)" },
  { value: "clb-6", label: "CLB 6 (398-457)" },
  { value: "clb-7", label: "CLB 7 (458-502)" },
  { value: "clb-8", label: "CLB 8 (503-522)" },
  { value: "clb-9", label: "CLB 9 (523-548)" },
  { value: "clb-10", label: "CLB 10 (549-699)" },
];

export const TCF_READING_OPTIONS = [
  { value: "clb-4", label: "CLB 4 (342-374)" },
  { value: "clb-5", label: "CLB 5 (375-405)" },
  { value: "clb-6", label: "CLB 6 (406-452)" },
  { value: "clb-7", label: "CLB 7 (453-498)" },
  { value: "clb-8", label: "CLB 8 (499-523)" },
  { value: "clb-9", label: "CLB 9 (524-548)" },
  { value: "clb-10", label: "CLB 10 (549-699)" },
];

export const TCF_WRITING_OPTIONS = [
  { value: "clb-4", label: "CLB 4 (4-5)" },
  { value: "clb-5", label: "CLB 5 (6)" },
  { value: "clb-6", label: "CLB 6 (7-9)" },
  { value: "clb-7", label: "CLB 7 (10-11)" },
  { value: "clb-8", label: "CLB 8 (12-13)" },
  { value: "clb-9", label: "CLB 9 (14-15)" },
  { value: "clb-10", label: "CLB 10 (16-20)" },
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

// Helper function to get French scoring options based on test type and ability
export const getFrenchScoringOptions = (testType, ability) => {
  if (testType === "tef") {
    switch (ability) {
      case "speaking": return TEF_SPEAKING_OPTIONS;
      case "listening": return TEF_LISTENING_OPTIONS;
      case "reading": return TEF_READING_OPTIONS;
      case "writing": return TEF_WRITING_OPTIONS;
      default: return TEF_SPEAKING_OPTIONS;
    }
  } else if (testType === "tcf") {
    switch (ability) {
      case "speaking": return TCF_SPEAKING_OPTIONS;
      case "listening": return TCF_LISTENING_OPTIONS;
      case "reading": return TCF_READING_OPTIONS;
      case "writing": return TCF_WRITING_OPTIONS;
      default: return TCF_SPEAKING_OPTIONS;
    }
  }
  return [];
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

