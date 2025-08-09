import { useCRSCalculator } from "../Utils/useCRSCalculator";
import CalculatorHeader from "../components/CRSHeader/CalculatorHeader";
import CalculatorForm from "../components/CRSForm/CalculatorForm";
import CalculatorResults from "../components/CRSResults/CalculatorResults";

export default function CRSCalculator() {
  const { formData, handleInputChange, calculatedScore, hasSpouse } = useCRSCalculator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-12 sm:pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CalculatorHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <CalculatorForm
            formData={formData}
            handleInputChange={handleInputChange}
            hasSpouse={hasSpouse}
          />

          {/* Results Section */}
          <CalculatorResults
            calculatedScore={calculatedScore}
            formData={formData}
            hasSpouse={hasSpouse}
          />
        </div>
      </div>
    </div>
  );
}
