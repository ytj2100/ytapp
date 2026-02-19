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
    // ★ [수정 핵심] redirectTo를 지우고, redirect: false를 추가합니다.
    await signIn("credentials", {
      email,
      password,
      redirect: false, // ★ 서버가 페이지를 강제로 이동시키지 않게 막음
    })
    
    // ★ 로그인 성공 시 명시적으로 성공 메시지 반환
    return { success: "로그인 성공" };

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