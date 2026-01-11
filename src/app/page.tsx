import { LoginForm } from "@/components/auth/login-form"

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-gray-50">
        <h1 className="text-3xl font-bold">My App</h1>
        <LoginForm />
        {/* 로그인 폼 컴포넌트 하단에 회원가입 링크 추가 필요 */}
    </div>
  )
}