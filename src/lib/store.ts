import { create } from 'zustand';

// 1. 탭(Tab) 데이터 타입 정의
export interface Tab {
  id: string;          // 탭의 고유 ID (예: 'users', 'settings')
  title: string;       // 탭 제목 (예: '사용자 관리')
  componentKey: string; // 컴포넌트 레지스트리에서 찾을 키 (예: 'UserListView')
}

// 2. 스토어 상태(State) 및 액션(Action) 타입 정의
interface AppState {
  // --- 상태 변수 ---
  tabs: Tab[];           // 열려있는 탭 목록
  activeTabId: string;   // 현재 보고 있는 탭의 ID
  isSidebarOpen: boolean; // 사이드바가 열려있는지 여부 (추가됨 ⭐)

  // --- 액션 함수 ---
  addTab: (tab: Tab) => void;          // 탭 추가
  removeTab: (id: string) => void;     // 탭 닫기
  setActiveTab: (id: string) => void;  // 탭 변경
  toggleSidebar: () => void;           // 사이드바 토글 (추가됨 ⭐)
}

// 3. 스토어 생성
export const useAppStore = create<AppState>((set) => ({
  // --- 초기값 설정 ---
  // 기본적으로 '대시보드' 탭 하나는 열어둡니다.
  tabs: [{ id: 'dashboard', title: '대시보드', componentKey: 'DashboardView' }],
  activeTabId: 'dashboard',
  isSidebarOpen: true, // 처음엔 사이드바 열림

  // --- 함수 구현 ---
  
  // 1. 탭 활성화 (클릭 시 이동)
  setActiveTab: (id) => set({ activeTabId: id }),

  // 2. 탭 추가 (이미 있으면 이동만 함)
  addTab: (newTab) => set((state) => {
    // 이미 열려있는 탭인지 확인
    const exists = state.tabs.some((t) => t.id === newTab.id);
    
    if (exists) {
      // 이미 있으면 그 탭으로 포커스만 이동
      return { activeTabId: newTab.id };
    }
    
    // 없으면 목록에 추가하고 포커스 이동
    return { 
      tabs: [...state.tabs, newTab], 
      activeTabId: newTab.id 
    };
  }),

  // 3. 탭 닫기 (닫으면 바로 옆 탭으로 이동하는 로직 포함)
  removeTab: (id) => set((state) => {
    // 삭제 후 남을 탭들
    const newTabs = state.tabs.filter((t) => t.id !== id);

    // 만약 현재 보고 있던 탭을 닫았다면?
    let newActiveId = state.activeTabId;
    if (id === state.activeTabId) {
      // 남은 탭 중 맨 마지막 탭을 보여줌 (없으면 빈 문자열)
      newActiveId = newTabs.length > 0 ? newTabs[newTabs.length - 1].id : '';
      
      // (선택사항) 탭을 다 닫아도 '대시보드'는 강제로 남기고 싶다면 아래 주석 해제
      /*
      if (newTabs.length === 0) {
         newTabs.push({ id: 'dashboard', title: '대시보드', componentKey: 'DashboardView' });
         newActiveId = 'dashboard';
      }
      */
    }

    return { 
      tabs: newTabs, 
      activeTabId: newActiveId 
    };
  }),

  // 4. 사이드바 토글 (True <-> False 반전)
  toggleSidebar: () => set((state) => ({ 
    isSidebarOpen: !state.isSidebarOpen 
  })),
}));