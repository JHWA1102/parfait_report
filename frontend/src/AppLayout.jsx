import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 메인 컨텐츠 영역 (헤더 아래로) */}
      <div className="flex-1 p-8 min-h-screen bg-white">
        <Outlet />
      </div>
    </div>
  );
}
