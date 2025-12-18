import { memo } from "react";
import FormField from "./FormField";
import { EDUCATION_OPTIONS, LANGUAGE_OPTIONS, WORK_EXPERIENCE_OPTIONS } from "../../Utils/crsConstants";

const SpouseSection = memo(function SpouseSection({
  formData,
  handleInputChange,
}) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 pb-6 mb-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Spouse/Partner Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Spouse Education Level"
          type="select"
          value={formData.spouseEducation}
          onChange={(e) => handleInputChange("spouseEducation", e.target.value)}
          options={EDUCATION_OPTIONS}
          placeholder="Select spouse education"
        />

        <FormField
          label="Spouse Language Level"
          type="select"
          value={formData.spouseLanguage}
          onChange={(e) => handleInputChange("spouseLanguage", e.target.value)}
          options={LANGUAGE_OPTIONS}
          placeholder="Select CLB level"
        />

        <FormField
          label="Spouse Canadian Work Experience"
          type="select"
          value={formData.spouseCanadianWork}
          onChange={(e) => handleInputChange("spouseCanadianWork", e.target.value)}
          options={WORK_EXPERIENCE_OPTIONS}
          placeholder="Select work experience"
        />
      </div>
    </div>
  );
});

export default SpouseSection;