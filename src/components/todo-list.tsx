// components/todo-list.tsx
'use client';

import { useState, KeyboardEvent } from 'react';
import { Trash2, Plus, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createTodo, toggleTodo, deleteTodo } from '@/app/actions'; // 서버 액션 임포트

// Prisma가 생성한 타입 사용 가능하지만 간단히 정의
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  // DB 데이터가 업데이트될 때까지 기다리지 않고 UI를 보여주기 위해 상태 사용 (Optimistic Update)
  // 여기서는 간단하게 props를 그대로 렌더링하도록 짰지만,
  // 실제로는 useOptimistic을 쓰거나 router.refresh()를 활용합니다.
  // 이 예제는 Next.js가 revalidatePath로 페이지를 다시 그릴 때 props가 업데이트되어 반영됩니다.
  
  const [inputValue, setInputValue] = useState('');

  const handleAdd = async () => {
    if (!inputValue.trim()) return;
    await createTodo(inputValue); // 서버 DB 저장
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 justify-center">
          <CalendarCheck className="w-6 h-6 text-primary" />
          <CardTitle className="text-2xl">Todo List</CardTitle>
        </div>
        <CardDescription className="text-center">
          DB 연동 완료 ({initialTodos.filter((t) => !t.completed).length}개 남음)
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Input
            placeholder="할 일을 입력하세요..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleAdd} size="icon">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {initialTodos.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground text-sm">
              일정이 없습니다.
            </div>
          ) : (
            initialTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors group"
              >
                <div className="flex items-center gap-3 flex-1 overflow-hidden">
                  <Checkbox
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    // 서버 액션 호출
                    onCheckedChange={(checked) => toggleTodo(todo.id, checked as boolean)}
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`text-sm font-medium leading-none cursor-pointer select-none truncate ${
                      todo.completed ? 'line-through text-muted-foreground' : ''
                    }`}
                  >
                    {todo.text}
                  </label>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  // 서버 액션 호출
                  onClick={() => deleteTodo(todo.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}