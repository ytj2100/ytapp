"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { LoginSchema } from "@/schemas" // 기존 스키마 재사용하거나 새로 정의

// 회원가입용 스키마 정의
const RegisterSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  email: z.string().email("이메일 형식이 올바르지 않습니다."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
})

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "입력값을 확인해주세요." }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  // 이메일 중복 확인
  const existingUser = await db.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { error: "이미 사용 중인 이메일입니다." }
  }

  // 유저 생성
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return { success: "회원가입이 완료되었습니다! 로그인해주세요." }
}