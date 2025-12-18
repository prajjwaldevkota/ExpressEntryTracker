import { memo } from "react";
import FormField from "./FormField";
import { EDUCATION_OPTIONS, YES_NO_OPTIONS } from "../../Utils/crsConstants";

const PersonalInfoSection = memo(function PersonalInfoSection({
  formData,
  handleInputChange,
}) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 pb-6 mb-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Personal Information
      </h2>

      <div className="grid gap-4">
        <FormField
          label="Age"
          type="number"
          value={formData.age}
          onChange={(e) => handleInputChange("age", e.target.value)}
          placeholder="Enter your age"
          required
          tooltip="At time of application"
        />

        <FormField
          label="Education Level"
          type="select"
          value={formData.education}
          onChange={(e) => handleInputChange("education", e.target.value)}
          options={EDUCATION_OPTIONS}
          placeholder="Select education level"
          required
        />

        <FormField
          label="Do you have a spouse/partner?"
          type="select"
          value={formData.hasSpouse}
          onChange={(e) => handleInputChange("hasSpouse", e.target.value)}
          options={YES_NO_OPTIONS}
          placeholder="Select option"
        />
      </div>
    </div>
  );
});

export default PersonalInfoSection;