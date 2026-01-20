'use client';

import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react'; 

export function Header() {
  const { toggleSidebar } = useAppStore();
  const user = { name: "관리자", email: "admin@example.com" };

  return (
    // ⭐ z-50으로 제일 위에 뜨게 하고, 배경색 필수
    <header className="h-16 border-b flex items-center justify-between px-4 bg-background shrink-0 z-50">
      
      {/* 1. 좌측: 햄버거 버튼 + 로고 (여기에 고정!) */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="font-bold text-xl select-none">My ERP</h1>
      </div>

      {/* 2. 우측: 유저 정보 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden md:block">
            {user.name}님
          </span>
          <div className="h-8 w-8 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold text-xs">
              {user.name[0]}
          </div>
        </div>
      </div>
    </header>
  );
}