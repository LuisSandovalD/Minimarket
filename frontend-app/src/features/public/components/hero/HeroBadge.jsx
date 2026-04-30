import { CheckCircle } from "lucide-react";

export default function HeroBadge() {
  return (
    <span
      className="
        inline-flex items-center gap-2
        px-4 py-1.5
        text-sm font-medium
        rounded-full

        backdrop-blur-md
        bg-gray-100/70 dark:bg-gray-800/70
        text-gray-700 dark:text-gray-200

        border border-gray-200/60 dark:border-gray-700/60
        shadow-sm

        transition-all duration-300
        hover:bg-gray-200/70 dark:hover:bg-gray-700/70
      "
    >
      <CheckCircle
        size={16}
        className="text-green-500 dark:text-green-400"
      />

      <span className="tracking-tight">
        Plataforma todo-en-uno
      </span>
    </span>
  );
}