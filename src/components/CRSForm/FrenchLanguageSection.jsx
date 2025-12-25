import { memo } from "react";
import FormField from "./FormField";
import { FRENCH_TEST_OPTIONS, getFrenchScoringOptions, getFrenchPlaceholder } from "../../Utils/crsConstants";

const FrenchLanguageSection = memo(function FrenchLanguageSection({
  formData,
  handleInputChange,
}) {
  // Get ability-specific options
  const speakingOptions = getFrenchScoringOptions(formData.frenchTestType, "speaking");
  const listeningOptions = getFrenchScoringOptions(formData.frenchTestType, "listening");
  const readingOptions = getFrenchScoringOptions(formData.frenchTestType, "reading");
  const writingOptions = getFrenchScoringOptions(formData.frenchTestType, "writing");

  return (
    <div className="border-b border-slate-200 dark:border-slate-700 pb-6 mb-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        French Language Skills
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Test Type"
          type="select"
          value={formData.frenchTestType}
          onChange={(e) => handleInputChange("frenchTestType", e.target.value)}
          options={FRENCH_TEST_OPTIONS}
          placeholder="Select a test type"
        />

        <FormField
          label="Speaking"
          type="select"
          value={formData.frenchSpeaking}
          onChange={(e) => handleInputChange("frenchSpeaking", e.target.value)}
          options={speakingOptions}
          placeholder={getFrenchPlaceholder(formData.frenchTestType)}
          disabled={!formData.frenchTestType}
        />

        <FormField
          label="Listening"
          type="select"
          value={formData.frenchListening}
          onChange={(e) => handleInputChange("frenchListening", e.target.value)}
          options={listeningOptions}
          placeholder={getFrenchPlaceholder(formData.frenchTestType)}
          disabled={!formData.frenchTestType}
        />

        <FormField
          label="Reading"
          type="select"
          value={formData.frenchReading}
          onChange={(e) => handleInputChange("frenchReading", e.target.value)}
          options={readingOptions}
          placeholder={getFrenchPlaceholder(formData.frenchTestType)}
          disabled={!formData.frenchTestType}
        />

        <FormField
          label="Writing"
          type="select"
          value={formData.frenchWriting}
          onChange={(e) => handleInputChange("frenchWriting", e.target.value)}
          options={writingOptions}
          placeholder={getFrenchPlaceholder(formData.frenchTestType)}
          disabled={!formData.frenchTestType}
        />
      </div>
    </div>
  );
});

export default FrenchLanguageSection;