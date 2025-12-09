import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SidebarRight() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setOpen(!open);

  const menus = [
    { name: "재무상태표", path: "/balanceSheet" },
    { name: "적금계산기" },
    { name: "고정비관리" },
  ];

  // 메뉴 클릭 핸들러
  const handleMenuClick = (path) => {
    navigate(path);
    setOpen(false); // 클릭 후 사이드바 닫기
  };

  return (
    <>
      {/* 🔘 오른쪽 토글 버튼 (헤더 아래에 배치) — 가시성 강화 버전 */}
      {!open && (
        <button
          onClick={toggleSidebar}
          className="
            fixed top-20 right-4 z-40
            bg-white border border-[#EEEEEE]
            p-2 rounded-md shadow-sm
            hover:bg-[#F7F7F7] hover:border-[#929AAB]
            transition flex items-center justify-center
          "
        >
          {/* 명확한 햄버거 아이콘 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#393E46"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 7h16M4 12h16M4 17h16"
            />
          </svg>
        </button>
      )}

      {/* 📌 오른쪽에서 부드럽게 열리는 사이드바 */}
      <aside
        className={`
          fixed top-16 right-0 h-[calc(100%-64px)] w-64 
          bg-white border-l border-[#EEEEEE]
          shadow-xl text-[#393E46]
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
          z-50
        `}
      >
        {/* 🔘 상단 닫기 버튼 */}
        <button
          onClick={toggleSidebar}
          className="
            absolute top-4 right-4 
            bg-white border border-[#EEEEEE] 
            p-2 rounded-md shadow-sm
            hover:bg-[#F7F7F7] hover:border-[#929AAB]
            transition
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#393E46"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 메뉴 리스트 */}
        <nav className="px-6 py-16">
          <ul className="space-y-2">
            {menus.map((item) => (
              <li
                key={item.name}
                onClick={() => handleMenuClick(item.path)}
                className="
                  cursor-pointer rounded-md px-4 py-2
                  hover:bg-[#F7F7F7] transition
                "
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
