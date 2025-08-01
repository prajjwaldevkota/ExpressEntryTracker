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
      className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white rounded-md text-xs font-medium transition-colors duration-300"
      aria-label={`Switch to ${buttonText} language`}
    >
      {buttonText}
    </motion.button>
  );
});

export default LanguageSwitcher;
