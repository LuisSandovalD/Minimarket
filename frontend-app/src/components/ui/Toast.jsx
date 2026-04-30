export function Toast({ message, type = "success", onClose }) {
  return (
    <div
      className={`fixed bottom-5 right-5 px-4 py-2 rounded-xl shadow-lg text-white z-[9999]
        ${type === "success" ? "bg-green-600" : "bg-red-600"}
      `}
    >
      <div className="flex items-center gap-3">
        <span>{message}</span>

        {onClose && (
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-sm"
          >
            ✖
          </button>
        )}
      </div>
    </div>
  );
}