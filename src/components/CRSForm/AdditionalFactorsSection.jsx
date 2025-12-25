import { memo, useEffect } from "react";
import FormField from "./FormField";
import { YES_NO_OPTIONS, FRENCH_SKILLS_OPTIONS, CANADIAN_EDUCATION_OPTIONS } from "../../Utils/crsConstants";

// Map education levels to Canadian credential lengths
const getAutoSuggestedCredential = (education) => {
  switch (education) {
    case "one-year":
      return "one-two";
    case "two-year":
      return "one-two";
    case "bachelors":
    case "two-certificates":
    case "masters":
    case "phd":
      return "three-plus";
    default:
      return "none";
  }
};

const AdditionalFactorsSection = memo(function AdditionalFactorsSection({
  formData,
  handleInputChange,
}) {
  // Auto-suggest Canadian credential based on education when user says they studied in Canada
  useEffect(() => {
    if (formData.studiedInCanada === "yes" && formData.education) {
      const suggested = getAutoSuggestedCredential(formData.education);
      if (formData.canadianEducationCredential === "none" && suggested !== "none") {
        handleInputChange("canadianEducationCredential", suggested);
      }
    } else if (formData.studiedInCanada === "no") {
      handleInputChange("canadianEducationCredential", "none");
    }
  }, [formData.studiedInCanada, formData.education]);

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Additional Factors
      </h2>

      <div className="space-y-4">
        <FormField
          label="Provincial Nomination"
          type="select"
          value={formData.provincialNomination}
          onChange={(e) => handleInputChange("provincialNomination", e.target.value)}
          options={YES_NO_OPTIONS}
          placeholder="Do you have a PNP?"
          tooltip="PNP certificate"
        />

        <FormField
          label="French Language Skills"
          type="select"
          value={formData.frenchSkills}
          onChange={(e) => handleInputChange("frenchSkills", e.target.value)}
          options={FRENCH_SKILLS_OPTIONS}
          placeholder="Select French skills"
        />

        <FormField
          label="Sibling in Canada"
          type="select"
          value={formData.siblingInCanada}
          onChange={(e) => handleInputChange("siblingInCanada", e.target.value)}
          options={YES_NO_OPTIONS}
          placeholder="Canadian citizen/PR sibling?"
        />

        <FormField
          label="Have you earned a Canadian degree, diploma or certificate?"
          type="select"
          value={formData.studiedInCanada}
          onChange={(e) => handleInputChange("studiedInCanada", e.target.value)}
          options={YES_NO_OPTIONS}
          placeholder="Did you study in Canada?"
          tooltip="Select Yes if you completed any education in Canada"
        />

        {formData.studiedInCanada === "yes" && (
          <FormField
            label="Canadian Education Credential Length"
            type="select"
            value={formData.canadianEducationCredential}
            onChange={(e) => handleInputChange("canadianEducationCredential", e.target.value)}
            options={CANADIAN_EDUCATION_OPTIONS.filter(opt => opt.value !== "none")}
            placeholder="Select credential length"
            tooltip="Length of your Canadian education program"
          />
        )}
      </div>
    </div>
  );
});

export default AdditionalFactorsSection;