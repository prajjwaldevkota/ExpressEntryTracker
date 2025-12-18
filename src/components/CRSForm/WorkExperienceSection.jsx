import { memo } from "react";
import FormField from "./FormField";
import { WORK_EXPERIENCE_OPTIONS } from "../../Utils/crsConstants";

const WorkExperienceSection = memo(function WorkExperienceSection({
  formData,
  handleInputChange,
}) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 pb-6 mb-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Work Experience
      </h2>

      <div className="grid gap-4">
        <FormField
          label="Canadian Work Experience"
          type="select"
          value={formData.canadianWorkExperience}
          onChange={(e) => handleInputChange("canadianWorkExperience", e.target.value)}
          options={WORK_EXPERIENCE_OPTIONS}
          placeholder="Select Canadian work experience"
          tooltip="Skilled work in Canada"
        />

        <FormField
          label="Foreign Work Experience"
          type="select"
          value={formData.foreignWorkExperience}
          onChange={(e) => handleInputChange("foreignWorkExperience", e.target.value)}
          options={WORK_EXPERIENCE_OPTIONS}
          placeholder="Select foreign work experience"
          tooltip="Skilled work outside Canada"
        />
      </div>
    </div>
  );
});

export default WorkExperienceSection;