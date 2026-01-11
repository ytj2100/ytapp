import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import { db } from "@/lib/db"
import { authConfig } from "@/auth.config" // 방금 만든 설정 가져오기
import { LoginSchema } from "@/schemas"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig, // 기본 설정 병합
  adapter: PrismaAdapter(db), // Prisma는 여기서만 사용
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          const user = await db.user.findUnique({ where: { email } })
          if (!user || !user.password) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)
          if (passwordsMatch) return user
        }
        return null
      },
    }),
  ],
})