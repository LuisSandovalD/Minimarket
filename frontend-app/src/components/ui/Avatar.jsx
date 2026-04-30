export function Avatar({ name }) {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
      <span className="text-white font-bold text-[10px]">
        {name?.[0]?.toUpperCase() || "U"}
      </span>
    </div>
  );
}