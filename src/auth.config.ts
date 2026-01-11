import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/", // 로그인 페이지 경로를 루트로 설정
  },
  providers: [],
  callbacks: {
    authorized({ auth }) {
      // 미들웨어에서 처리하므로 여기선 true 반환 (또는 추가 로직 구현)
      return true 
    },
  },
} satisfies NextAuthConfig