export function Tooltip({ text, children }) {
  return (
    <div className="relative group inline-block">
      {children}

      <span className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
        {text}
      </span>
    </div>
  );
}