import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/10">
      
      {/* 좌측: 고정 사이드바 */}
      <Sidebar />

      {/* 우측: 헤더 + 컨텐츠 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* 상단: 공통 헤더 (탭 + 유저/테마) */}
        <Header />

        {/* 하단: 실제 페이지 컨텐츠 (스크롤 가능) */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}