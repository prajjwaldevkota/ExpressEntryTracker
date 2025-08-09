import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FaCalculator, FaExclamationTriangle } from "react-icons/fa";

const CalculatorHeader = memo(function CalculatorHeader() {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-8 sm:mb-12">
      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-2xl">
        <FaCalculator className="w-8 h-8 sm:w-10 text-white" />
      </div>
      <h1 className="text-3xl md:text-5xl sm:text-4xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-5">
        {t('calculator.title')} 2025
      </h1>
      <p className="text-lg sm:text-xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed mb-6">
        {t('calculator.subtitle')}
      </p>

      {/* Updated Policy Notice */}
      <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <FaExclamationTriangle className="text-yellow-400 text-lg" />
          <span className="text-yellow-300 font-semibold text-lg">{t('calculator.policyUpdate')}</span>
        </div>
        <p className="text-yellow-100 text-base leading-relaxed">
          {t('calculator.policyUpdateText')}
        </p>
      </div>
    </div>
  );
});

export default CalculatorHeader; 