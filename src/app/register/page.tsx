import { RegisterForm } from "@/components/auth/register-form"
// import { useEffect } from "react";

export default function RegisterPage() {
  // console.log("■ RegisterPage ㅜㅜㅜㅜㅜㅜ");
  // useEffect(()=>{
    // console.log("■ RegisterPage ㅗㅗㅗㅗㅗㅗ : UseEffect ");
  // });
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <RegisterForm />
    </div>
  )
}