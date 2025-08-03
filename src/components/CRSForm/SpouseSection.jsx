import { memo } from "react";
import { FaRing } from "react-icons/fa";
import FormField from "./FormField";
import { EDUCATION_OPTIONS, LANGUAGE_OPTIONS, WORK_EXPERIENCE_OPTIONS } from "../../Utils/crsConstants";

const SpouseSection = memo(function SpouseSection({
  formData,
  handleInputChange,
}) {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <FaRing className="text-pink-400" />
        Spouse/Partner Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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