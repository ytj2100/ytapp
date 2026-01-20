import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. 전체 화면 (세로 배치)
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      
      {/* 2. 헤더 (최상단 고정) */}
      <Header />

      {/* 3. 본문 영역 (가로 배치: 사이드바 + 컨텐츠) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* 사이드바 */}
        <Sidebar />

        {/* 컨텐츠 (탭 매니저가 들어올 곳) */}
        <main className="flex-1 flex flex-col overflow-hidden relative bg-background">
          {children}
        </main>

      </div>
    </div>
  );
}