// app/actions.ts
'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// 1. 생성 (Create)
export async function createTodo(text: string) {
  if (!text.trim()) return;
  
  await prisma.todo.create({
    data: {
      text,
      completed: false,
    },
  });

  revalidatePath('/'); // 페이지 데이터를 갱신함
}

// 2. 상태 변경 (Update)
export async function toggleTodo(id: number, completed: boolean) {
  await prisma.todo.update({
    where: { id },
    data: { completed },
  });
  revalidatePath('/');
}

// 3. 삭제 (Delete)
export async function deleteTodo(id: number) {
  await prisma.todo.delete({
    where: { id },
  });
  revalidatePath('/');
}