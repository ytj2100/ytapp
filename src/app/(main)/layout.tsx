'use client';

import { useEffect, useState } from 'react'; // useState 추가
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated } = useAppStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ⭐ 로그인 안 했으면 로그인 페이지로 쫓아내기
  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      console.log("로그인 안됨! 쫓아냅니다."); // 콘솔 확인용
      router.replace('/'); 
    }
  }, [isAuthenticated, router, isMounted]);

  // 아직 로딩 중이거나 로그인 안 된 상태면 로딩 표시
  if (!isMounted || !isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">접속 권한 확인 중...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden relative bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}