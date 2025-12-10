import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex">
      {/* <Header /> */}
      <Sidebar />

      {/* 메인 컨텐츠 영역 (헤더 아래로) */}
      <div className="flex-1 p-8 min-h-screen bg-white">
        <Outlet />
      </div>
    </div>
  );
}
