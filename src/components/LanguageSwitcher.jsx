import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = memo(function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  }, [i18n]);

  const buttonText = useMemo(
    () => (i18n.language === "en" ? "FR" : "EN"),
    [i18n.language]
  );

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
      aria-label={`Switch to ${buttonText} language`}
    >
      {buttonText}
    </button>
  );
});

export default LanguageSwitcher;
