import React, { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const LanguageSwitcher = memo(function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    console.log(`[LanguageSwitcher] Switching language from ${i18n.language} to ${newLang}`);
    i18n.changeLanguage(newLang);
    console.log(`[LanguageSwitcher] Language changed to: ${i18n.language}`);
  }, [i18n]);

  const buttonText = useMemo(
    () => (i18n.language === "en" ? "FR" : "EN"),
    [i18n.language]
  );

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl shadow-emerald-500/25"
      aria-label={`Switch to ${buttonText} language`}
    >
      {buttonText}
    </motion.button>
  );
});

export default LanguageSwitcher;
