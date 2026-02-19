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
  
  // ★ _hasHydrated(로딩완료여부)를 가져옵니다.
  const { isAuthenticated, _hasHydrated } = useAppStore();

  // Next.js hydration mismatch 방지용
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // 1. 컴포넌트 마운트 전이면 대기
    if (!isMounted) return;

    // 2. ★★★ 저장소 데이터 로딩이 아직 안 끝났으면 대기 (여기서 튕기는 걸 막아줍니다)
    if (!_hasHydrated) return;

    // 3. 로딩도 다 끝났는데 인증이 안 되어 있다면? 그때 쫓아냄
    if (!isAuthenticated) {
      console.log("로딩 완료 후 확인: 인증 안됨. 이동합니다.");
      router.replace('/');
    }
  }, [isMounted, _hasHydrated, isAuthenticated, router]);

  // ★ 로딩 중이거나, 데이터 복구 중이면 화면을 보여주지 않고 로딩 표시
  if (!isMounted || !_hasHydrated) {
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