import { auth } from "@/auth"
import { LogoutButton } from "@/components/auth/logout-button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"

export default async function DashboardPage() {
  const session = await auth()

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 gap-6">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>환영합니다!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="text-center">
            <p className="text-lg font-medium">{session?.user?.name || "사용자"}님</p>
            <p className="text-sm text-gray-500">{session?.user?.email}</p>
          </div>
          
          {/* 로그아웃 버튼 배치 */}
          <div className="flex justify-center mt-4">
            <LogoutButton>
              계정 로그아웃
            </LogoutButton>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}