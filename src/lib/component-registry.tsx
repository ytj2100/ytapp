'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// 탭 컴포넌트들이 공통으로 받을 Props (필요 없다면 빈 객체로 두셔도 됩니다)
export interface ViewProps {
  tabId?: string;
}

// ⭐ 동적 임포트 설정
// (주의: 여기에 등록된 파일 경로에 실제로 파일이 있어야 에러가 안 납니다!)
export const ComponentRegistry: Record<string, ComponentType<ViewProps>> = {
  
  // 1. 대시보드 뷰
  'DashboardView': dynamic(() => import('@/components/views/DashboardView'), {
    loading: () => <div className="p-4 text-sm text-muted-foreground">대시보드 로딩 중...</div>
  }),

  // 2. 사용자 관리 뷰
  'UserListView': dynamic(() => import('@/components/views/UserListView'), {
    loading: () => <div className="p-4 text-sm text-muted-foreground">사용자 목록 불러오는 중...</div>
  }),

  // 3. 시스템 설정 뷰
  'SettingsView': dynamic(() => import('@/components/views/SettingsView'), {
    loading: () => <div className="p-4 text-sm text-muted-foreground">설정 화면 진입 중...</div>
  }),
};