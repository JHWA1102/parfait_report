import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SidebarRight() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setOpen(!open);

  const menus = [
    {
      name: "재무상태표",
      path: "/balanceSheet",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
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
      name: "적금계산기",
      path: "/savingCalc",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          stroke="#393E46"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 1v22M5 6h14M5 12h14M5 18h14"
          />
        </svg>
      ),
    },

    {
      name: "고정비관리",
      path: "/fixedCost",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
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

  // 메뉴 클릭 핸들러
  const handleMenuClick = (path) => {
    navigate(path);
    setOpen(false); // 클릭 후 사이드바 닫기
  };

  return (
    <>
      <aside className="w-64 h-screen bg-[#f9f9f9] border-r border-[#EEEEEE] p-6 flex flex-col">
        <div
          className="text-xl font-bold mb-10 tracking-tight text-[#393E46] cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          PARFAIT REPORT
        </div>

        {/* 메뉴 리스트 */}
        <nav className="flex-1">
          <ul className="space-y-4">
            {menus.map((item) => (
              <li
                key={item.name}
                onClick={() => item.path && navigate(item.path)}
                className="
                  cursor-pointer text-[#393E46] 
                  hover:bg-[#F7F7F7] 
                  p-2 rounded-md flex items-center gap-3
                "
              >
                {/* 아이콘 영역 */}
                <span>{item.icon}</span>

                {/* 메뉴 이름 */}
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
