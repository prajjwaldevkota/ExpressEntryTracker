import { memo } from "react";
import { FaLanguage } from "react-icons/fa";
import FormField from "./FormField";
import { FRENCH_TEST_OPTIONS, getFrenchScoringOptions, getFrenchPlaceholder, getFrenchTooltip } from "../../Utils/crsConstants";

const FrenchLanguageSection = memo(function FrenchLanguageSection({
  formData,
  handleInputChange,
}) {
  const frenchOptions = getFrenchScoringOptions(formData.frenchTestType);

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <FaLanguage className="text-green-400" />
        French Language Skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Test Type"
          type="select"
          value={formData.frenchTestType}
          onChange={(e) => handleInputChange("frenchTestType", e.target.value)}
          options={FRENCH_TEST_OPTIONS}
          placeholder="Select a test type"
          tooltip="Select the type of French language test you took"
        />

        <FormField
          label="Speaking"
          type="select"
          value={formData.frenchSpeaking}
          onChange={(e) => handleInputChange("frenchSpeaking", e.target.value)}
          options={frenchOptions}
          placeholder={getFrenchPlaceholder(formData.frenchTestType)}
          tooltip={getFrenchTooltip(formData.frenchTestType, "speaking")}
          disabled={!formData.frenchTestType}
        />

        <FormField
          label="Listening"
          type="select"
          value={formData.frenchListening}
          onChange={(e) => handleInputChange("frenchListening", e.target.value)}
          options={frenchOptions}
          placeholder={getFrenchPlaceholder(formData.frenchTestType)}
          tooltip={getFrenchTooltip(formData.frenchTestType, "listening")}
          disabled={!formData.frenchTestType}
        />

        <FormField
          label="Reading"
          type="select"
          value={formData.frenchReading}
          onChange={(e) => handleInputChange("frenchReading", e.target.value)}
          options={frenchOptions}
          placeholder={getFrenchPlaceholder(formData.frenchTestType)}
          tooltip={getFrenchTooltip(formData.frenchTestType, "reading")}
          disabled={!formData.frenchTestType}
        />

        <FormField
          label="Writing"
          type="select"
          value={formData.frenchWriting}
          onChange={(e) => handleInputChange("frenchWriting", e.target.value)}
          options={frenchOptions}
          placeholder={getFrenchPlaceholder(formData.frenchTestType)}
          tooltip={getFrenchTooltip(formData.frenchTestType, "writing")}
          disabled={!formData.frenchTestType}
        />
      </div>
    </div>
  );
});

export default FrenchLanguageSection; 