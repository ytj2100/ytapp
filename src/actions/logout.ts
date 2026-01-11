"use server"

import { signOut } from "@/auth"

export const logout = async () => {
  // 로그아웃 후 메인(로그인) 화면으로 리다이렉트
  await signOut({ redirectTo: "/" })
}