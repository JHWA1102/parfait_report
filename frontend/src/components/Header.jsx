// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();

  return (
    <header className="md:hidden fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between z-50">
      {/* Left - Logo (절대 변경 없음) */}
      <div
        className="flex items-center gap-3 cursor-pointer select-none"
        onClick={() => navigate("/")}
      >
        <div className="text-xl font-semibold text-gray-800 tracking-tight">
          PARFAIT REPORT
        </div>
      </div>

      {/* Right - 기존 영역 유지 + 모바일 메뉴 버튼 추가 */}
      <div className="flex items-center gap-4">
        {/* 🔹 모바일 전용 햄버거 버튼 */}
        <button
          onClick={onMenuClick}
          className="md:hidden"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-[#393E46]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* ⬇️ 여기에 나중에 알림 / 프로필 들어와도 영향 없음 */}
      </div>
    </header>
  );
}
