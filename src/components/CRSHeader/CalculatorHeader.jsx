import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FaCalculator, FaExclamationTriangle } from "react-icons/fa";

const CalculatorHeader = memo(function CalculatorHeader() {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-8 lg:mb-12">
      <div className="inline-flex items-center justify-center w-18 h-18 lg:w-20 lg:h-20 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl mb-5 lg:mb-6 shadow-xl shadow-emerald-500/25">
        <FaCalculator className="w-9 h-9 lg:w-10 lg:h-10 text-white" />
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-emerald-100 to-blue-200 bg-clip-text text-transparent mb-4 lg:mb-5 leading-tight">
        {t('calculator.title')} 2025
      </h1>
      <p className="text-base lg:text-lg text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed mb-5 lg:mb-6 px-4">
        {t('calculator.subtitle')}
      </p>

      {/* Updated Policy Notice - Mobile optimized */}
      <div className="bg-amber-500/20 border border-amber-500/30 rounded-2xl p-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-3 justify-center lg:justify-start">
          <FaExclamationTriangle className="text-amber-400 text-lg flex-shrink-0" />
          <span className="text-amber-300 font-semibold text-base text-center lg:text-left">{t('calculator.policyUpdate')}</span>
        </div>
        <p className="text-amber-100 text-sm leading-relaxed text-center lg:text-left">
          {t('calculator.policyUpdateText')}
        </p>
      </div>
    </div>
  );
});

export default CalculatorHeader; 