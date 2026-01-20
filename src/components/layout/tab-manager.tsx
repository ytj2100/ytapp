'use client';

import { useAppStore } from '@/lib/store';
import { ComponentRegistry } from '@/lib/component-registry';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from 'lucide-react'; 
import { cn } from '@/lib/utils';

export function TabManager() {
  const { tabs, activeTabId, setActiveTab, removeTab } = useAppStore();

  return (
    <Tabs 
      value={activeTabId} 
      onValueChange={setActiveTab} 
      className="flex flex-col h-full w-full overflow-hidden"
    >
      {/* 탭바 영역 */}
      <div className="bg-muted/10 border-b px-2 pt-2 select-none">
        
        {/* ⭐ TabsList 수정: w-full 대신 inline-flex로 변경하고 justify-start 강제 */}
        <TabsList className="h-10 p-0 bg-transparent flex flex-row justify-start gap-1 overflow-x-auto no-scrollbar w-full">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className={cn(
                // ⭐ 핵심 수정: flex-none(늘어나지 않음) + w-[150px] 강제
                "flex-none w-[150px] min-w-[150px] h-9", 
                "relative flex items-center justify-between px-3", 
                
                // 스타일 유지
                "text-xs text-muted-foreground bg-transparent border border-transparent rounded-t-md opacity-70",
                "hover:bg-muted/50 hover:opacity-100 transition-all",
                "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:opacity-100",
                "data-[state=active]:border-x data-[state=active]:border-t data-[state=active]:border-b-background",
                "data-[state=active]:shadow-sm data-[state=active]:font-medium"
              )}
            >
              <span className="truncate max-w-[80%] text-left" title={tab.title}>
                {tab.title}
              </span>

              {tab.id !== 'dashboard' && (
                <div 
                  role="button"
                  className="rounded-full p-0.5 hover:bg-red-100 hover:text-red-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    removeTab(tab.id);
                  }}
                >
                  <X className="w-3 h-3" />
                </div>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="flex-1 overflow-hidden bg-background relative">
        {tabs.map((tab) => {
          const TargetComponent = ComponentRegistry[tab.componentKey];
          return (
            <TabsContent key={tab.id} value={tab.id} className="h-full m-0 p-0 data-[state=inactive]:hidden">
              {TargetComponent ? <TargetComponent tabId={tab.id} /> : null}
            </TabsContent>
          );
        })}
      </div>
    </Tabs>
  );
}