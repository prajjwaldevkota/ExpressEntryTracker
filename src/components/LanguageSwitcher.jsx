import React, { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

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
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
      aria-label={`Switch to ${buttonText} language`}
    >
      {buttonText}
    </motion.button>
  );
});

export default LanguageSwitcher;
