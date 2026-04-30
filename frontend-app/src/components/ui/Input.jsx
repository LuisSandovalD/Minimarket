import clsx from "clsx";

export function Input({
  type = "text",
  placeholder,
  label,
  error,
  icon: Icon,
  disabled = false,
  className,
  ...props
}) {
  return (
    <div className="w-full space-y-1.5">

      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      <div className="relative group">

        {Icon && (
          <Icon
            className="
              absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4
              text-slate-400
              group-focus-within:text-blue-500
              transition-colors
            "
          />
        )}

        <input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            `
            mt-2
            w-full rounded-xl
            px-4 py-2.5 text-sm
            outline-none transition-all duration-200

            bg-white dark:bg-slate-900
            text-slate-900 dark:text-white
            placeholder:text-slate-400

            border border-slate-200 dark:border-slate-700

            focus:ring-2 focus:ring-blue-500/30
            focus:border-blue-500

            shadow-sm hover:shadow-md

            `,
            Icon && "pl-10",

            error &&
              "border-red-500 focus:ring-red-500/30 focus:border-red-500",

            disabled &&
              "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800",

            className
          )}
          {...props}
        />
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}