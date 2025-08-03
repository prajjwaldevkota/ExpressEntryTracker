import { memo } from "react";
import { FaUser } from "react-icons/fa";
import FormField from "./FormField";
import { EDUCATION_OPTIONS, YES_NO_OPTIONS } from "../../Utils/crsConstants";

const PersonalInfoSection = memo(function PersonalInfoSection({
  formData,
  handleInputChange,
}) {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <FaUser className="text-blue-400" />
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Age"
          type="number"
          value={formData.age}
          onChange={(e) => handleInputChange("age", e.target.value)}
          placeholder="Enter your age"
          required
          tooltip="Your age at the time of application"
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
          tooltip="Spouse/partner who will accompany you to Canada"
        />
      </div>
    </div>
  );
});

export default PersonalInfoSection; 