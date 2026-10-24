import { useTranslation } from 'react-i18next';
import { PageHeading } from '../DashboardUI';
export default function CalculatorHeader() {
  const { t } = useTranslation();
  return <PageHeading eyebrow={t('dashboard.yourNextStep')} title={t('calculator.title')} description="Understand your points, explore different scenarios, and plan your next step." />;
}
