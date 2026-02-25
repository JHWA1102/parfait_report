import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* 헤더 */}
      <Header onMenuClick={() => setSidebarOpen((prev) => !prev)} />

      {/* 📱 모바일에서만 Sidebar 렌더링 */}
      {isMobile && (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}

      {/* 메인 */}
      <main className="pt-16 flex-1">
        <Outlet />
      </main>

      {/* 푸터 */}
      <Footer />
    </div>
  );
}
