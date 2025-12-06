import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/", // 👈 정적 파일 경로 문제 해결
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      // ❌ 문제를 일으키는 "~" alias 제거
      // { find: "~", replacement: "/src" }
    ],
  },
  build: {
    outDir: "../backend/src/main/resources/static",
    emptyOutDir: true, // 이전 static 파일 자동 삭제
    assetsDir: "assets", // 기본값. asset 경로 안정적 유지
  },
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
