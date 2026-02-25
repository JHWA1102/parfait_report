import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("accessToken");
  const isLoggedIn = !!token;

  /* =========================
     라우트 변경 시 사이드바 닫기 (모바일 대응)
  ========================= */
  useEffect(() => {
    onClose && onClose();
  }, [location.pathname]);

  const menus = [
    {
      name: "자산현황",
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
      name: "자금설계",
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
    {
      name: "경제노트",
      path: "/feed",
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
            d="M7 3h7l5 5v13H7z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 13h6M9 17h6"
          />
        </svg>
      ),
    },
    {
      name: "자금동향(개인사업자)",
      path: "/flow-register",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          stroke="#393E46"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 14l4-4 4 4 4-8"
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
        {/* 상단 영역 */}
        <div className="mb-8 space-y-3">
          {!isLoggedIn ? (
            <button
              onClick={() => handleMenuClick("/login")}
              className="
                w-full
                rounded-lg
                border border-slate-300
                py-2
                !bg-white
                hover:bg-slate-100
                transition
                mt-14
              "
            >
              로그인
            </button>
          ) : (
            <>
              {/* 사용자 아이디 표시 */}
              <div className="rounded-lg bg-white border border-[#EEEEEE] p-3 text-sm font-medium text-[#393E46]">
                {localStorage.getItem("userEmail") || "사용자"}
              </div>

              <button
                onClick={() => handleMenuClick("/dashboard")}
                className="w-full rounded-lg border border-[#393E46] py-2 text-[#393E46]"
              >
                마이페이지
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("userEmail");
                  handleMenuClick("/login");
                }}
                className="w-full rounded-lg bg-[#393E46] py-2 text-white"
              >
                로그아웃
              </button>
            </>
          )}
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
