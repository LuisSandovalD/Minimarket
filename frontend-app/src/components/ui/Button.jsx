import { Loader2 } from "lucide-react";

export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  full = false,
  disabled = false,
  loading = false,

  leftIcon: LeftIcon,
  rightIcon: RightIcon,

  type = "button",
  className = "",
  ariaLabel,
  ...rest
}) {
  const baseStyles = `
    inline-flex items-center
    w-auto
    gap-2
    font-medium transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2
    dark:focus:ring-offset-gray-950
  `;

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-md",
    md: "px-3 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-lg rounded-lg",
    xl: "px-8 py-4 text-xl rounded-xl",
  };

  const variantStyles = {
    primary: `
      bg-blue-600 text-white
      hover:bg-blue-700 active:bg-blue-800
      focus:ring-blue-500 shadow-sm hover:shadow-md
    `,
    ghost: `
      text-gray-700 dark:text-gray-300
      hover:bg-gray-100 dark:hover:bg-gray-800
      focus:ring-gray-500
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700 active:bg-red-800
      focus:ring-red-500 shadow-sm hover:shadow-md
    `,
    warning: `
      bg-yellow-500 text-white
      hover:bg-yellow-600 active:bg-yellow-700
      focus:ring-yellow-400 shadow-sm hover:shadow-md
    `,
    outline: `
      border border-gray-300 dark:border-gray-600
      text-gray-700 dark:text-gray-300
      hover:bg-gray-100 dark:hover:bg-gray-800
      focus:ring-gray-500
    `,
    
  };

  const disabledState = disabled || loading;

  return (
    <button
      type={type}
      onClick={!disabledState ? onClick : undefined}
      disabled={disabledState}
      aria-label={ariaLabel || (typeof children === "string" ? children : undefined)}
      aria-busy={loading}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${full ? "w-full" : ""}
        justify-between
        ${className}
      `}
      {...rest}
    >
      {/* IZQUIERDA (icono + texto) */}
      <div className="flex items-center gap-2 min-w-0">
        {/* Icono izquierdo */}
        {!loading && LeftIcon && (
          <LeftIcon className="w-4 h-4 shrink-0" />
        )}

        {/* Loader reemplaza icono izquierdo */}
        {loading && (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        )}

        {/* Texto */}
        <span className="truncate">{children}</span>
      </div>

      {/* DERECHA */}
      {!loading && RightIcon && (
        <RightIcon className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
}