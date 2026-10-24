import FormField from './FormField';
import { LANGUAGE_OPTIONS } from '../../Utils/crsConstants';
const options = LANGUAGE_OPTIONS.map(option => ({ ...option, label: option.label.replaceAll('CLB', 'NCLC') }));
export default function FrenchLanguageSection({ formData, handleInputChange }) {
  return <section className="border-b border-slate-200 dark:border-slate-700 pb-6 mb-6"><h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">French language skills</h2><p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Use your NCLC equivalents from TEF Canada or TCF Canada. The French-language bonus is calculated automatically.</p><div className="grid grid-cols-2 gap-4">{['Speaking', 'Listening', 'Reading', 'Writing'].map(ability => <FormField key={ability} label={ability} type="select" value={formData[`french${ability}`]} onChange={e => handleInputChange(`french${ability}`, e.target.value)} options={options} placeholder="Select NCLC" />)}</div></section>;
}
