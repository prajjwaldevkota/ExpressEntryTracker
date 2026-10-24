import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const Icon = theme === 'dark' ? Sun : Moon;
  return <button onClick={toggleTheme} className="icon-button" aria-label={t(theme === 'dark' ? 'dashboard.lightMode' : 'dashboard.darkMode')} title={t(theme === 'dark' ? 'dashboard.lightMode' : 'dashboard.darkMode')}><Icon size={17} strokeWidth={1.7} /></button>;
}
