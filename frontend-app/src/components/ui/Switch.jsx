import { useState } from "react";

export function Switch() {
  const [on, setOn] = useState(false);

  return (
    <div
      onClick={() => setOn(!on)}
      className={`w-12 h-6 flex items-center p-1 rounded-full cursor-pointer ${
        on ? "bg-black" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full transition ${
          on ? "translate-x-6" : ""
        }`}
      />
    </div>
  );
}