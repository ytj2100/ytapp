"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition, useState, useEffect } from "react"
import * as z from "zod"
import { register } from "@/actions/register"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"

const RegisterSchema = z.object({
  name    : z.string().min  (1, "이름을 입력해주세요."),
  email   : z.string().email("이메일 형식이 올바르지 않습니다."),
  password: z.string().min  (6, "비밀번호는 최소 6자 이상이어야 합니다."),
})

export const RegisterForm = () => {
  console.log(">> RegisterForm ㅜㅜㅜㅜㅜㅜ");
  useEffect(()=>{
    console.log(">> RegisterForm ㅗㅗㅗㅗㅗㅗ : UseEffect ");
  });
  
  const [error    , setError       ] = useState<string | undefined>("")
  const [success  , setSuccess     ] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "" },
  })
  
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.log(">> RegisterForm ㅜㅜㅜㅜㅜㅜ :: setError");
    setError("")
    console.log(">> RegisterForm ㅜㅜㅜㅜㅜㅜ :: setSuccess");
    setSuccess("")
    
    startTransition(() => {
      register(values).then((data) => {
        if (data.error) {
          console.log(">> RegisterForm ㅜㅜㅜㅜㅜㅜ :: setError2");
          setError(data.error)
        }
        if (data.success) {
          console.log(">> RegisterForm ㅜㅜㅜㅜㅜㅜ :: setSuccess");
          setSuccess(data.success)
          // 2초 후 로그인 화면(홈)으로 이동
          setTimeout(() => router.push("/"), 2000) 
        }
      })
    })
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>회원가입</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="홍길동" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="email@example.com" type="email" disabled={isPending} />
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
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {success && <div className="text-green-500 text-sm">{success}</div>}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "가입 중..." : "회원가입"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <Link href="/" className="text-sm text-blue-500 hover:underline">
          이미 계정이 있으신가요? 로그인
        </Link>
      </CardFooter>
    </Card>
  )
}