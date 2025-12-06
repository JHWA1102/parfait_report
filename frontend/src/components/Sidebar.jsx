import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [submenu, setSubmenu] = useState({
    dashboard: false,
    member: false,
    order: false,
    product: false,
    setting: false,
  });

  const toggleSidebar = () => setOpen(!open);

  const toggleMenu = (key) => {
    setSubmenu((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-20 left-2 z-50 bg-indigo-600 text-white px-3 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition"
      >
        {open ? "Hide" : "Show"}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed 
          top-16 left-0 
          h-[calc(100vh-4rem)] 
          bg-white 
          border-r border-gray-200 
          w-64 
          p-5 
          overflow-y-auto
          z-40 
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-6">MENU</h2>

        <nav className="space-y-2 text-gray-700">
          {/* Dashboard */}
          <div>
            <button
              onClick={() => toggleMenu("dashboard")}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <span>Dashboard</span>
              <span>{submenu.dashboard ? "▲" : "▼"}</span>
            </button>

            {submenu.dashboard && (
              <div className="ml-6 text-sm space-y-1 mt-1">
                <button className="block text-left px-2 py-1 rounded-lg hover:bg-gray-50">
                  통계 요약
                </button>
                <button className="block text-left px-2 py-1 rounded-lg hover:bg-gray-50">
                  매출 분석
                </button>
                <button className="block text-left px-2 py-1 rounded-lg hover:bg-gray-50">
                  사용 로그
                </button>
              </div>
            )}
          </div>

          {/* Member */}
          <div>
            <button
              onClick={() => toggleMenu("member")}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <span>회원관리</span>
              <span>{submenu.member ? "▲" : "▼"}</span>
            </button>

            {submenu.member && (
              <div className="ml-6 text-sm space-y-1 mt-1">
                <button className="block text-left px-2 py-1 rounded-lg hover:bg-gray-50">
                  회원 목록
                </button>
                <button className="block text-left px-2 py-1 rounded-lg hover:bg-gray-50">
                  회원 등급관리
                </button>
                <button className="block text-left px-2 py-1 rounded-lg hover:bg-gray-50">
                  탈퇴회원 관리
                </button>
              </div>
            )}
          </div>

          {/* Product */}
          <div>
            <button
              onClick={() => toggleMenu("product")}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <span>상품관리</span>
              <span>{submenu.product ? "▲" : "▼"}</span>
            </button>

            {submenu.product && (
              <div className="ml-6 text-sm space-y-1 mt-1">
                <Link
                  to="/item_list"
                  className="block text-left px-2 py-1 rounded-lg hover:bg-gray-50 text-gray-700 no-underline"
                >
                  상품 목록
                </Link>
                <Link
                  to="/item_regist"
                  className="block text-left px-2 py-1 rounded-lg hover:bg-gray-50 text-gray-700 no-underline"
                >
                  상품 등록
                </Link>
                <Link
                  to="/category_setting"
                  className="block text-left px-2 py-1 rounded-lg hover:bg-gray-50 text-gray-700 no-underline"
                >
                  카테고리 설정
                </Link>
              </div>
            )}
          </div>

          {/* Order */}
          <div>
            <button
              onClick={() => toggleMenu("order")}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <span>주문관리</span>
              <span>{submenu.order ? "▲" : "▼"}</span>
            </button>

            {submenu.order && (
              <div className="ml-6 text-sm space-y-1 mt-1">
                <button className="block text-left px-2 py-1 rounded-lg hover:bg-gray-50">
                  주문 목록
                </button>
                <button className="block text-left px-2 py-1 rounded-lg hover:bg-gray-50">
                  정산 대기
                </button>
                <button className="block text-left px-2 py-1 rounded-lg hover:bg-gray-50">
                  취소/환불
                </button>
              </div>
            )}
          </div>

          {/* Setting */}
          <div>
            <button
              onClick={() => toggleMenu("setting")}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <span>시스템 설정</span>
              <span>{submenu.setting ? "▲" : "▼"}</span>
            </button>

            {submenu.setting && (
              <div className="ml-6 text-sm space-y-1 mt-1">
                <button className="block text-left px-2 py-1 rounded-lg hover:bg-gray-50">
                  환경 설정
                </button>
                <button className="block text-left px-2 py-1 rounded-lg hover:bg-gray-50">
                  관리자 계정
                </button>
                <button className="block text-left px-2 py-1 rounded-lg hover:bg-gray-50">
                  로그 정책
                </button>
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}
