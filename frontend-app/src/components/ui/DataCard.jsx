export function DataCard({ title, children, actions }) {
  return (
    <div
      className="
        rounded-2xl border
        border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900
        shadow-sm p-6
        space-y-4
      "
    >
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            {title}
          </h2>

          {actions && <div>{actions}</div>}
        </div>
      )}

      {/* Content */}
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}