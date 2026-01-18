import NextAuth from "next-auth"
import { authConfig } from "@/auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  
  // 현재 경로 확인
  const isDashboard = req.nextUrl.pathname.startsWith('/login')
  const isRoot = req.nextUrl.pathname === '/'

  // 1. 로그인 상태에서 루트(로그인화면) 접근 시 -> 대시보드로 이동
  if (isRoot && isLoggedIn) {
    // return Response.redirect(new URL('/dashboard', req.nextUrl))
    // return Response.redirect(new URL('/todolist', req.nextUrl))
    return Response.redirect(new URL('/main', req.nextUrl))
  }

  // 2. 비로그인 상태에서 대시보드 접근 시 -> 루트(로그인화면)로 이동
  if (isDashboard && !isLoggedIn) {
    return Response.redirect(new URL('/', req.nextUrl))
  }

  return
})

export const config = {
  // api, _next 등 제외하고 모든 경로에서 미들웨어 실행
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}