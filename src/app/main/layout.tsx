import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header"; // Header도 여기서 불러야 합니다!

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. 전체 틀: 세로(Column) 방향! 이게 핵심입니다.
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      
      {/* 2. 헤더: 가장 위에 고정 (전체 너비) */}
      <Header />

      {/* 3. 바디: 헤더 아래 공간을 가로(Row)로 나눔 */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* 3-1. 사이드바: 왼쪽 */}
        <Sidebar />

        {/* 3-2. 컨텐츠: 오른쪽 나머지 */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
           {children}
        </main>
        
      </div>
    </div>
  );
}