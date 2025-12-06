// src/components/Header.jsx

import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between z-50">
      {/* Left - Logo */}
      <div className="flex items-center gap-3">
        <div className="text-xl font-semibold text-gray-800 tracking-tight">
          PARFAIT REPORT
        </div>
      </div>

      {/* Right - Search / Notification / Profile */}
    </header>
  );
}
