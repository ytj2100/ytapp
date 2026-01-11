"use client"

import { logout } from "@/actions/logout"
import { Button } from "@/components/ui/button"

interface LogoutButtonProps {
  children?: React.ReactNode // 버튼 내부 텍스트 커스텀 가능
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout()
  }

  return (
    <Button onClick={onClick} variant="destructive">
      {children || "로그아웃"}
    </Button>
  )
}