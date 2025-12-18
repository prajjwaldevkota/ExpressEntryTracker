import { memo } from "react";
import FormField from "./FormField";
import { YES_NO_OPTIONS, FRENCH_SKILLS_OPTIONS, CANADIAN_EDUCATION_OPTIONS } from "../../Utils/crsConstants";

const AdditionalFactorsSection = memo(function AdditionalFactorsSection({
  formData,
  handleInputChange,
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Additional Factors
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          label="Canadian Education Credential"
          type="select"
          value={formData.canadianEducationCredential}
          onChange={(e) => handleInputChange("canadianEducationCredential", e.target.value)}
          options={CANADIAN_EDUCATION_OPTIONS}
          placeholder="Canadian education"
        />
      </div>
    </div>
  );
});

export default AdditionalFactorsSection;