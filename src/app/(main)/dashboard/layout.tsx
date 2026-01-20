'use client'; // useEffect를 쓰려면 클라이언트 컴포넌트여야 함

import { useEffect } from 'react';
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

  // ⭐ 로그인 안 했으면 쫓아내기
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/'); // 로그인 화면으로 강제 이동
    }
  }, [isAuthenticated, router]);

  // 잠깐 깜빡임 방지 (로그인 안됐으면 화면 안 그림)
  if (!isAuthenticated) return null; 

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