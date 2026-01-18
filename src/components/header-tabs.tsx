"use client"

import { usePathname } from "next/navigation"

export function HeaderTabs() {
  const pathname = usePathname()
  
  // 경로에 따른 탭 이름 매핑 (실제로는 동적으로 관리 가능)
  const getPageName = (path: string) => {
    if (path === "/") return "홈"
    if (path === "/todolist") return "할 일 목록"
    if (path === "/settings") return "설정"
    return "페이지"
  }

  return (
    <header className="h-14 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex items-end px-4">
      {/* 활성화된 탭 디자인 */}
      <div className="px-6 py-2 bg-blue-50 dark:bg-gray-800 border-t-2 border-l border-r border-blue-500 dark:border-blue-400 rounded-t-lg text-blue-600 dark:text-blue-300 font-semibold text-sm translate-y-[1px] relative bg-white dark:bg-gray-900 z-10">
        {getPageName(pathname)}
      </div>
      
      {/* (옵션) 비활성화된 다른 탭들이 있다면 여기에 추가 */}
    </header>
  )
}