'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Settings, FileText, Box } from 'lucide-react';

// ... IconMap 코드는 그대로 ...
const IconMap: Record<string, any> = {
  dashboard: <LayoutDashboard className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  settings: <Settings className="h-5 w-5" />,
  report: <FileText className="h-5 w-5" />,
  default: <Box className="h-5 w-5" />
};

export function Sidebar() {
  const { addTab, isSidebarOpen } = useAppStore(); // toggleSidebar는 헤더에서 쓰므로 제거
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    // 메뉴 데이터 예시
    setMenuItems([
      { id: 'dashboard', title: '대시보드', icon: 'dashboard', componentKey: 'DashboardView' },
      { id: 'users', title: '사용자 관리', icon: 'users', componentKey: 'UserListView' },
      { id: 'settings', title: '시스템 설정', icon: 'settings', componentKey: 'SettingsView' },
      { id: 'todo', title: '할 일 목록', icon: 'report', componentKey: 'TodolistView' },
    ]);
  }, []);

  return (
    <aside
      className={cn(
        // ⭐ h-screen이 아니라 h-full 이어야 합니다! (부모가 남은 공간을 줬기 때문)
        "border-r bg-muted/40 h-full flex flex-col transition-all duration-300 ease-in-out overflow-hidden",
        isSidebarOpen ? "w-64" : "w-[72px]"
      )}
    >
      {/* ❌ 중요: 여기에 있던 로고와 햄버거 버튼 div를 싹 지우세요! */}
      
      {/* 네비게이션 메뉴 (위쪽에 여백 pt-4 추가) */}
      <nav className="flex-1 p-3 space-y-1 pt-4">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full flex items-center h-12 mb-1", 
              isSidebarOpen ? "justify-start px-3" : "justify-center px-0"
            )}
            onClick={() => addTab({
              id: item.id,
              title: item.title,
              componentKey: item.componentKey,
            })}
            title={!isSidebarOpen ? item.title : undefined}
          >
            <span className="shrink-0">
              {IconMap[item.icon] || IconMap.default}
            </span>

            <span 
              className={cn(
                "ml-3 whitespace-nowrap overflow-hidden transition-all duration-300",
                isSidebarOpen ? "w-auto opacity-100" : "w-0 opacity-0"
              )}
            >
              {item.title}
            </span>
          </Button>
        ))}
      </nav>
    </aside>
  );
}