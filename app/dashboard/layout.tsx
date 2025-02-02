'use client'

import { useSession } from "next-auth/react";
import SideNav from "../ui/dashboard/sidenav";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {

  const {data: session, status} = useSession()
  const router = useRouter()

  useEffect(() => {
    if(status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status])

  if(status !== 'authenticated') return null

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  )
}