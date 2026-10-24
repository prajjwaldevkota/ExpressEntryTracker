import { useTranslation } from 'react-i18next';
export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const isFrench = i18n.resolvedLanguage === 'fr';
  return <button className="icon-button language-button" onClick={() => i18n.changeLanguage(isFrench ? 'en' : 'fr')} aria-label={isFrench ? 'Switch to English' : 'Passer en français'}>{isFrench ? 'EN' : 'FR'}</button>;
}
