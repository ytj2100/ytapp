'use client';

import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Menu, LogOut } from 'lucide-react'; 

export function Header() {
  const router = useRouter();
  // ⭐ user, logout 함수 가져오기
  const { toggleSidebar, user, logout } = useAppStore();

  const handleLogout = () => {
    logout();         // 상태 초기화
    router.push('/'); // 로그인 화면으로 이동
  };

  return (
    // ⭐ z-50으로 최상단 고정
    <header className="h-16 border-b flex items-center justify-between px-4 bg-background shrink-0 sticky top-0 z-50">
      
      {/* 좌측: 햄버거 버튼 + 로고 */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="font-bold text-xl select-none">My ERP</h1>
      </div>

      {/* 우측: 유저 정보 + 로그아웃 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden md:block">
            {user?.name || '게스트'}님
          </span>
          <div className="h-8 w-8 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold text-xs">
              {user?.name?.[0] || 'G'}
          </div>
        </div>

        {/* ⭐ 로그아웃 버튼 */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogout}
          className="ml-2 gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">로그아웃</span>
        </Button>
      </div>
    </header>
  );
}