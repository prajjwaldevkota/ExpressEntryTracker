import { memo } from "react";
import { FaBriefcase } from "react-icons/fa";
import FormField from "./FormField";
import { WORK_EXPERIENCE_OPTIONS } from "../../Utils/crsConstants";

const WorkExperienceSection = memo(function WorkExperienceSection({
  formData,
  handleInputChange,
}) {
  return (
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
          onChange={(e) => handleInputChange("canadianWorkExperience", e.target.value)}
          options={WORK_EXPERIENCE_OPTIONS}
          placeholder="Select Canadian work experience"
          tooltip="Skilled work experience in Canada"
        />

        <FormField
          label="Foreign Work Experience"
          type="select"
          value={formData.foreignWorkExperience}
          onChange={(e) => handleInputChange("foreignWorkExperience", e.target.value)}
          options={WORK_EXPERIENCE_OPTIONS}
          placeholder="Select foreign work experience"
          tooltip="Skilled work experience outside Canada"
        />
      </div>
    </div>
  );
});

export default WorkExperienceSection; 