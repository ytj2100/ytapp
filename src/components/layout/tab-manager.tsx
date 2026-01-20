'use client';

import { useAppStore } from '@/lib/store';
import { ComponentRegistry } from '@/lib/component-registry';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabManager() {
  const { tabs, activeTabId, setActiveTab } = useAppStore();

  return (
    <Tabs value={activeTabId ?? ''} onValueChange={setActiveTab} className="...">
      {/* 👇 이 부분이 없으면 탭 버튼이 안 나옵니다! */}
      <div className="border-b px-4 bg-muted/20">
        <TabsList>
           {tabs.map(tab => (
             <TabsTrigger key={tab.id} value={tab.id}>{tab.title}</TabsTrigger>
           ))}
        </TabsList>
      </div>
      {/* ... 상단 탭 리스트 부분은 그대로 ... */}

      <div className="flex-1 overflow-hidden bg-background p-0">
        {tabs.map((tab) => {
          // 1. 레지스트리에서 컴포넌트 조회
          const TargetComponent = ComponentRegistry[tab.componentKey];

          // 🚨 디버깅용: 콘솔을 확인해보세요! (F12)
          if (!TargetComponent) {
            console.error(`❌ 컴포넌트 찾기 실패! 키: "${tab.componentKey}"`);
            console.log('현재 등록된 키들:', Object.keys(ComponentRegistry));
          }

          return (
            <TabsContent key={tab.id} value={tab.id} className="h-full m-0 p-6 overflow-auto">
              {/* 2. ✅ 방어 코드: 컴포넌트가 있을 때만 렌더링 */}
              {TargetComponent ? (
                <TargetComponent tabId={tab.id} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-red-500">
                  <p className="text-lg font-bold">오류 발생</p>
                  <p>연결된 화면을 찾을 수 없습니다.</p>
                  <code className="bg-muted p-2 rounded mt-2 text-sm text-black">
                    Key: {tab.componentKey}
                  </code>
                </div>
              )}
            </TabsContent>
          );
        })}
      </div>
    </Tabs>
  );
}