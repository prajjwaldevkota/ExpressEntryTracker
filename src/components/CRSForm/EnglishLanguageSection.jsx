import { memo } from "react";
import { FaGlobe } from "react-icons/fa";
import FormField from "./FormField";
import { LANGUAGE_OPTIONS } from "../../Utils/crsConstants";

const EnglishLanguageSection = memo(function EnglishLanguageSection({
  formData,
  handleInputChange,
}) {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <FaGlobe className="text-blue-400" />
        English Language Skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Speaking"
          type="select"
          value={formData.englishSpeaking}
          onChange={(e) => handleInputChange("englishSpeaking", e.target.value)}
          options={LANGUAGE_OPTIONS}
          placeholder="Select CLB level"
          tooltip="Your English speaking proficiency level"
        />

        <FormField
          label="Listening"
          type="select"
          value={formData.englishListening}
          onChange={(e) => handleInputChange("englishListening", e.target.value)}
          options={LANGUAGE_OPTIONS}
          placeholder="Select CLB level"
          tooltip="Your English listening proficiency level"
        />

        <FormField
          label="Reading"
          type="select"
          value={formData.englishReading}
          onChange={(e) => handleInputChange("englishReading", e.target.value)}
          options={LANGUAGE_OPTIONS}
          placeholder="Select CLB level"
          tooltip="Your English reading proficiency level"
        />

        <FormField
          label="Writing"
          type="select"
          value={formData.englishWriting}
          onChange={(e) => handleInputChange("englishWriting", e.target.value)}
          options={LANGUAGE_OPTIONS}
          placeholder="Select CLB level"
          tooltip="Your English writing proficiency level"
        />
      </div>
    </div>
  );
});

export default EnglishLanguageSection; 