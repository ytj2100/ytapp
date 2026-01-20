"use server"

import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "입력값이 올바르지 않습니다." }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn("credentials", {
      email,
      password,
      // redirectTo: "/dashboard", // 로그인 성공 후 리다이렉트
      // redirectTo: "/todolist", // 로그인 성공 후 리다이렉트
      redirectTo: "/dashboard", // 로그인 성공 후 리다이렉트
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "이메일 또는 비밀번호를 확인해주세요." }
        default:
          return { error: "알 수 없는 오류가 발생했습니다." }
      }
    }
    throw error
  }
}