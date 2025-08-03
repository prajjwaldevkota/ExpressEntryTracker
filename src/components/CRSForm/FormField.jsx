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
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="text-white font-medium">{label}</label>
        {tooltip && (
          <div className="group relative">
            <FaInfoCircle className="text-blue-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 max-w-xs">
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
          className="w-full p-3 rounded-xl border border-white/10 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
          className="w-full p-3 rounded-xl border border-white/10 bg-black/40 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
      )}
    </div>
  );
});

export default FormField; 