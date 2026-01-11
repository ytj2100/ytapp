// app/page.tsx
import { prisma } from '@/lib/db';
import TodoList from '@/components/todo-list'; // 위에서 만든 컴포넌트
import { ModeToggle } from '@/components/mode-toggle';

// async 컴포넌트로 만듭니다
export default async function Home() {
  // DB에서 최신순으로 데이터 가져오기 (Server Side)
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 relative">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      
      {/* DB에서 가져온 데이터를 클라이언트 컴포넌트에 전달 */}
      <TodoList initialTodos={todos} />
    </main>
  );
}