import clsx from "clsx";

export function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  error,
  className,
  ...props
}) {
  return (
    <div className="space-y-1">
      <label
        className={clsx(
          "flex items-center gap-3 text-sm font-medium cursor-pointer",
          "text-slate-700 dark:text-slate-300",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className={clsx(
            `
            w-4 h-4 rounded-md
            border border-slate-300 dark:border-slate-600
            bg-white dark:bg-slate-900

            transition-all duration-200

            checked:bg-blue-600 checked:border-blue-600
            focus:ring-2 focus:ring-blue-500/30

            cursor-pointer
            `,
            error && "border-red-500 focus:ring-red-500/30"
          )}
          {...props}
        />

        {label && <span>{label}</span>}
      </label>

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}