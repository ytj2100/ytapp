import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 1. 탭(Tab) 데이터 타입 정의
export interface Tab {
  id: string;
  title: string;
  componentKey: string;
}

interface User {
  name: string;
  email: string;
}

// 2. 스토어 상태(State) 및 액션(Action) 타입 정의
interface AppState {
  // --- 상태 변수 ---
  tabs: Tab[];
  activeTabId: string;
  isSidebarOpen: boolean;
  
  // 인증 관련 상태
  user: User | null;
  isAuthenticated: boolean;
  
  // ★ [중요] Hydration(로딩) 체크용 변수
  _hasHydrated: boolean;

  // --- 액션 함수 ---
  login: (userInfo: User) => void;
  logout: () => void;
  addTab: (tab: Tab) => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  toggleSidebar: () => void;
  
  // ★ [중요] Hydration 상태 변경 함수
  setHasHydrated: (state: boolean) => void;
}

// 3. 스토어 생성
// ★ create() 안쪽을 persist()로 감싸야 저장이 됩니다!
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // --- 초기값 설정 ---
      tabs: [{ id: 'dashboard', title: '대시보드', componentKey: 'DashboardView' }],
      activeTabId: 'dashboard',
      isSidebarOpen: true,
      
      user: null,
      isAuthenticated: false,
      
      // ★ [중요] 초기값: 아직 로딩 안 됨(false)
      _hasHydrated: false,

      // --- 로그인 함수 ---
      login: (userInfo) => set({
        user: userInfo,
        isAuthenticated: true, // 로그인하면 true로 변경됨 -> persist가 이걸 저장함
        tabs: [{ id: 'dashboard', title: '대시보드', componentKey: 'DashboardView' }],
        activeTabId: 'dashboard'
      }),
      
      logout: () => set({
        user: null,
        isAuthenticated: false,
        tabs: [],
        activeTabId: ''
      }),

      addTab: (tab) => set((state) => ({ tabs: [...state.tabs, tab], activeTabId: tab.id })),
      removeTab: (id) => set((state) => ({
        tabs: state.tabs.filter((t) => t.id !== id),
      })),
      setActiveTab: (id) => set({ activeTabId: id }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      
      // ★ [중요] 함수 구현: 로딩 상태를 바꿔주는 함수
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'app-storage', // 브라우저 저장소 키 이름
      storage: createJSONStorage(() => localStorage), // 저장소 설정
      
      // ★ [핵심] 데이터 로딩이 끝나면 자동으로 실행되어 '_hasHydrated'를 true로 바꿈
      onRehydrateStorage: () => (state) => {
        console.log("데이터 복구 완료:", state); // 콘솔에서 확인 가능
        state?.setHasHydrated(true);
      },
    }
  )
);