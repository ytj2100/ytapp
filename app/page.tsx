// app/page.tsx
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Shadcn/ui 연동 성공!</h1>
      <div className="flex gap-2">
        <Button>기본 버튼</Button>
        <Button variant="destructive">삭제 버튼</Button>
        <Button variant="outline">외곽선 버튼</Button>
      </div>
    </div>
  )
}