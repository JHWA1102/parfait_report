import React, { useState, useRef, useEffect } from "react";

export default function CategorySelect({
  value,
  options = [],
  onChange,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      {/* 선택 버튼 */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
        h-11 w-full px-4
        flex items-center justify-between
        border border-gray-300
        rounded-lg
        text-sm
        bg-white
        focus:border-slate-400 focus:ring-slate-400
        outline-none
      "
      >
        <span className="truncate">{selected?.value || "선택"}</span>

        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* dropdown */}
      {open && (
        <div
          className="
          absolute left-0 top-full mt-1
          w-full
          bg-white
          border border-gray-200
          rounded-lg
          shadow-lg
          z-50
          max-h-50
          overflow-y-auto
        "
        >
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className="
              w-full px-4 py-2
              text-left text-sm
              hover:bg-gray-100
              truncate
            "
            >
              {o.value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
