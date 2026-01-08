import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(true)} />

      {/* 본문 영역 */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 overflow-auto bg-white p-8">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer className="-mb-5" />
    </div>
  );
}
