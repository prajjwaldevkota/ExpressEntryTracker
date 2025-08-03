import { memo } from "react";
import PersonalInfoSection from "./PersonalInfoSection";
import SpouseSection from "./SpouseSection";
import EnglishLanguageSection from "./EnglishLanguageSection";
import FrenchLanguageSection from "./FrenchLanguageSection";
import WorkExperienceSection from "./WorkExperienceSection";
import AdditionalFactorsSection from "./AdditionalFactorsSection";

const CalculatorForm = memo(function CalculatorForm({
  formData,
  handleInputChange,
  hasSpouse,
}) {
  return (
    <div className="space-y-6">
      <PersonalInfoSection formData={formData} handleInputChange={handleInputChange} />
      
      {hasSpouse && (
        <SpouseSection formData={formData} handleInputChange={handleInputChange} />
      )}
      
      <EnglishLanguageSection formData={formData} handleInputChange={handleInputChange} />
      
      <FrenchLanguageSection formData={formData} handleInputChange={handleInputChange} />
      
      <WorkExperienceSection formData={formData} handleInputChange={handleInputChange} />
      
      <AdditionalFactorsSection formData={formData} handleInputChange={handleInputChange} />
    </div>
  );
});

export default CalculatorForm; 