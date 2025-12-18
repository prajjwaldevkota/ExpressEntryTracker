import { memo } from "react";
import FormField from "./FormField";
import { LANGUAGE_OPTIONS } from "../../Utils/crsConstants";

const EnglishLanguageSection = memo(function EnglishLanguageSection({
  formData,
  handleInputChange,
}) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 pb-6 mb-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        English Language Skills
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Speaking"
          type="select"
          value={formData.englishSpeaking}
          onChange={(e) => handleInputChange("englishSpeaking", e.target.value)}
          options={LANGUAGE_OPTIONS}
          placeholder="Select CLB level"
        />

        <FormField
          label="Listening"
          type="select"
          value={formData.englishListening}
          onChange={(e) => handleInputChange("englishListening", e.target.value)}
          options={LANGUAGE_OPTIONS}
          placeholder="Select CLB level"
        />

        <FormField
          label="Reading"
          type="select"
          value={formData.englishReading}
          onChange={(e) => handleInputChange("englishReading", e.target.value)}
          options={LANGUAGE_OPTIONS}
          placeholder="Select CLB level"
        />

        <FormField
          label="Writing"
          type="select"
          value={formData.englishWriting}
          onChange={(e) => handleInputChange("englishWriting", e.target.value)}
          options={LANGUAGE_OPTIONS}
          placeholder="Select CLB level"
        />
      </div>
    </div>
  );
});

export default EnglishLanguageSection;