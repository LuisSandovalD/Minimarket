import { X, AlertCircle, CheckCircle, Info } from "lucide-react";

export default function Modal({
  children,
  onClose,
  title,
  icon: IconComponent,
  variant = "default",
  size = "md",
  footer, // 👈 ahora es dinámico (botones custom)
}) {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  const iconColors = {
    default: "text-gray-400",
    success: "text-green-500",
    error: "text-red-500",
    info: "text-blue-500",
  };

  const borderAccent = {
    default: "",
    success: "before:bg-green-500",
    error: "before:bg-red-500",
    info: "before:bg-blue-500",
  };

  const getDefaultIcon = () => {
    switch (variant) {
      case "success":
        return CheckCircle;
      case "error":
        return AlertCircle;
      case "info":
        return Info;
      default:
        return null;
    }
  };

  const Icon = IconComponent || getDefaultIcon();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`
          relative w-full ${sizeClasses[size]}
          bg-white dark:bg-gray-900
          rounded-2xl
          shadow-[0_25px_80px_-20px_rgba(0,0,0,0.35)]
          border border-gray-200 dark:border-gray-800
          overflow-hidden
          
          before:absolute before:top-0 before:left-0 before:h-1 before:w-full
          ${borderAccent[variant]}
          
          animate-in fade-in zoom-in-95 duration-200
        `}
      >
        {/* HEADER */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          
          <div className="flex items-center gap-3">
            {Icon && (
              // eslint-disable-next-line react-hooks/static-components
              <Icon
                className={`w-6 h-6 ${iconColors[variant]}`}
                strokeWidth={2}
              />
            )}

            {title && (
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
            )}
          </div>

          <button
            onClick={onClose}
            className="
              p-2 rounded-lg
              text-gray-400 hover:text-gray-600
              dark:hover:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition
            "
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="px-6 py-5 text-gray-700 dark:text-gray-300">
          {children}
        </div>

        {/* FOOTER */}
        {footer && (
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 bg-gray-50 dark:bg-gray-900/50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}