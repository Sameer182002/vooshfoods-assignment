'use client'
import { cookie } from "@/apis/cookies";
import "./globals.css";
import { RecoilRoot } from "recoil";
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const token = cookie.userToken
  const pathName = usePathname()
  const router = useRouter()

  useEffect(()=>{
    if(token){
      console.log({token})
      if(pathName == "/"){
        router.push("/task")
        return
      }
      if(pathName !== "/task"){
        router.push("/")
        return
      }
    }
  },[])

  return (
    <html lang="en">
      <body>
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  );
}
