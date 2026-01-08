import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SidebarRight({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  /* =========================
     라우트 변경 시 사이드바 닫기 (모바일 대응)
  ========================= */
  useEffect(() => {
    onClose && onClose();
  }, [location.pathname]);

  const menus = [
    {
      name: "재무상태표",
      path: "/balance-sheet",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          stroke="#393E46"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h18v18H3zM8 3v18M3 8h18"
          />
        </svg>
      ),
    },
    {
      name: "월간자금관리",
      path: "/monthly-finance",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          stroke="#393E46"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h18v4H3zM3 10h18v11H3z"
          />
        </svg>
      ),
    },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    onClose && onClose();
  };

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          bg-[#f9f9f9] border-r border-[#EEEEEE]
          flex flex-col p-6

          /* 배경 끊김 방지 */
          min-h-screen overflow-y-auto

          /* 데스크탑 */
          md:w-62 md:static md:translate-x-0

          /* 모바일 */
          fixed inset-0 z-50
          w-full
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          md:transform-none
        `}
      >
        {/* 상단 로고 */}
        <div className="mb-10 flex items-center justify-between">
          <div
            className="cursor-pointer select-none text-xl font-bold tracking-tight text-[#393E46]"
            onClick={() => handleMenuClick("/")}
          >
            PARFAIT REPORT
          </div>

          {/* 모바일 닫기 버튼 */}
          <button
            onClick={onClose}
            className="md:hidden"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#393E46]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 메뉴 리스트 */}
        <nav className="flex-1">
          <ul className="space-y-4">
            {menus.map((item) => (
              <li
                key={item.name}
                onClick={() => handleMenuClick(item.path)}
                className="
                  flex cursor-pointer items-center gap-3 rounded-md p-2
                  text-[#393E46]
                  hover:bg-[#F7F7F7]
                  transition-colors
                "
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
