import Header from "./components/Header";
import SidebarRight from "./components/Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="w-full h-full">
      <Header />
      <SidebarRight />

      {/* 메인 컨텐츠 영역 (헤더 아래로) */}
      <main className="pt-16 px-6">
        <Outlet />
      </main>
    </div>
  );
}
