import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import HeroSlider from "@/components/landing/HeroSlider";
import ExplainSection from "@/components/landing/ExplainSection";

export default function AppLayout({ onMenuClick }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header onMenuClick={onMenuClick} />
      <main className="pt-16 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
