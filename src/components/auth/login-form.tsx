"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition, useState } from "react"
import { z } from "zod"
import { LoginSchema } from "@/schemas" 
import { login } from "@/actions/login" // 서버 액션
import Link from "next/link"

// ★ [추가 1] 라우터와 스토어 import
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store" // 경로가 맞는지 확인해주세요 (@/store/store.ts 일수도 있음)

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export const LoginForm = () => {
  // ★ [추가 2] 라우터와 스토어 훅 사용
  const router = useRouter();
  const loginToStore = useAppStore((state) => state.login); // 이름 겹침 방지를 위해 변수명 변경

  const [error, setError] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  })

 const onSubmit = (values: z.infer<typeof LoginSchema>) => {
  // debugger; // 디버깅용 (필요 없으면 삭제)
  setError("")

  startTransition(() => {
    login(values)
      .then((data) => {
        // ★ 1. 서버가 응답을 줬는지 확인하는 로그
        console.log("📢 [디버깅] 서버 응답 도착:", data); 

        if (data?.error) {
          // 실패 시
          setError(data.error);
        } else {
          // ★★★ 2. 성공 시 (이 부분이 이미지에서 빠져 있었습니다!)
          console.log("✅ [디버깅] 로그인 성공! 스토어 업데이트 시작");
          
          // (1) 스토어 상태 변경 (true로 설정)
          loginToStore({ 
            name: "User", 
            email: values.email 
          });

          // (2) 대시보드로 이동
          setTimeout(() => {
             router.push('/dashboard'); 
          }, 100);
        }
      })
      .catch((err) => {
        console.error("❌ [디버깅] 서버 통신 에러:", err);
        setError("Something went wrong!");
      });
  })
}

  return (
    <Card className="w-[350px] shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">로그인</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="name@example.com" type="email" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "로그인 중..." : "로그인"}
            </Button>
          </form>
        </Form>
      </CardContent>
      
      {/* ✅ 회원가입 링크 추가 영역 */}
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          계정이 없으신가요?{" "}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">
            회원가입
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}