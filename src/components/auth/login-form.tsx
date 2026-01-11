"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition, useState } from "react"
import { z } from "zod"
import { LoginSchema } from "@/schemas" // 스키마 경로 확인
import { login } from "@/actions/login"
import Link from "next/link" // ✅ Link 컴포넌트 추가

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
// ✅ CardFooter 추가
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) setError(data.error)
      })
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