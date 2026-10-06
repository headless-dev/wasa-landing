import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  // GitHub Pages 프로젝트 주소(/저장소명/)와 커스텀 도메인(/)을 환경변수로 전환합니다.
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    // 일반 정적 호스팅과 현재 배포 도구가 함께 사용할 배포용 파일 디렉터리입니다.
    outDir: path.resolve(import.meta.dirname, "dist", "public"),
    emptyOutDir: true,
  },
  // 개발 미리보기·로컬 LAN 검증에만 사용됩니다. 프로덕션 배포는 `dist/` 정적 파일입니다.
  server: { host: true, allowedHosts: true },
});
