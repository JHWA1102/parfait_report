// src/components/Header.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    { name: "재무상태표", path: "/balance-sheet" },
    { name: "월간자금관리", path: "/monthly-finance" },
    { name: "피드", path: "/feed" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white/90 backdrop-blur border-b border-slate-100 z-[100]">
      <div className="h-full max-w-6xl mx-3 px-6 flex items-center">
        {/* Left group: Logo + Menu */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => navigate("/")}
          >
            <span className="text-[17px] font-semibold tracking-tight text-slate-900">
              GITHUB ACTION PARFAIT
            </span>
            <span className="text-[17px] font-medium tracking-tight text-slate-400">
              REPORT
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-7">
            {menus.map((menu) => {
              const isActive = location.pathname === menu.path;

              return (
                <span
                  key={menu.name}
                  onClick={() => navigate(menu.path)}
                  className={`
                    cursor-pointer select-none
                    text-[16px] font-medium
                    transition-colors
                    ${
                      isActive
                        ? "text-slate-900"
                        : "text-slate-500 hover:text-slate-900"
                    }
                  `}
                >
                  {menu.name}
                </span>
              );
            })}
          </nav>
        </div>

        {/* Right */}
        <div className="ml-auto">
          {/* Mobile hamburger */}
          <div
            onClick={onMenuClick}
            className="
              md:hidden
              w-10 h-10
              flex items-center justify-center
              cursor-pointer
              rounded-full
              hover:bg-slate-100
              active:bg-slate-200
              transition
            "
            aria-label="Open menu"
            role="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-slate-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
