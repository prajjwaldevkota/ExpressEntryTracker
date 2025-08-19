import { memo } from "react";
import { FaInfoCircle } from "react-icons/fa";

const FormField = memo(function FormField({
  label,
  type,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  tooltip,
  disabled = false,
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <label className="text-white font-medium text-base leading-tight">{label}</label>
        {tooltip && (
          <div className="group relative">
            <FaInfoCircle className="text-emerald-400 cursor-help text-base flex-shrink-0" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800/95 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 max-w-[250px] pointer-events-none shadow-xl border border-slate-700/50">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      {type === "select" ? (
        <select
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="w-full p-4 rounded-xl border border-slate-600/50 bg-slate-800/60 text-white text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,<svg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%206l5%205%205-5%202%201-7%207-7-7%202-1z%22%20fill%3D%22%23ffffff%22/%3E%3C/svg%3E')] bg-no-repeat bg-right-12 bg-[length:20px_20px] pr-12 shadow-lg"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className="w-full p-4 rounded-xl border border-slate-600/50 bg-slate-800/60 text-white text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        />
      )}
    </div>
  );
});

export default FormField; 