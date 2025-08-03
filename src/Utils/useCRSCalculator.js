import { useState, useCallback, useMemo } from "react";
import { calculateCRSScore } from "./crsCalculator";
import { INITIAL_FORM_DATA } from "./crsConstants";

export const useCRSCalculator = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const calculatedScore = useMemo(() => {
    if (!formData.age || !formData.education) return null;
    return calculateCRSScore(formData);
  }, [formData]);

  const hasSpouse = formData.hasSpouse === "yes";

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
  }, []);

  return {
    formData,
    handleInputChange,
    calculatedScore,
    hasSpouse,
    resetForm,
  };
}; 