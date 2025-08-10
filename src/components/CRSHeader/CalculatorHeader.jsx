import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FaCalculator, FaExclamationTriangle } from "react-icons/fa";

const CalculatorHeader = memo(function CalculatorHeader() {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-6 sm:mb-8 lg:mb-12">
      <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 lg:mb-6 shadow-2xl">
        <FaCalculator className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-3 sm:mb-4 lg:mb-5">
        {t('calculator.title')} 2025
      </h1>
      <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-5 lg:mb-6 px-2">
        {t('calculator.subtitle')}
      </p>

      {/* Updated Policy Notice */}
      <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <FaExclamationTriangle className="text-yellow-400 text-base sm:text-lg" />
          <span className="text-yellow-300 font-semibold text-base sm:text-lg">{t('calculator.policyUpdate')}</span>
        </div>
        <p className="text-yellow-100 text-sm sm:text-base leading-relaxed">
          {t('calculator.policyUpdateText')}
        </p>
      </div>
    </div>
  );
});

export default CalculatorHeader; 