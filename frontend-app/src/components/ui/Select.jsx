import clsx from "clsx";

export function Select({
  options = [],
  value,
  onChange,
  name,
  label,
  disabled = false,
  className,
}) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={clsx(
          `mt-2
          w-full rounded-xl px-4 py-2.5 text-sm
          bg-white dark:bg-slate-900
          text-slate-900 dark:text-white
          border border-slate-200 dark:border-slate-700
          outline-none transition-all duration-200

          focus:ring-2 focus:ring-blue-500/30
          focus:border-blue-500

          shadow-sm hover:shadow-md
          `,
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}