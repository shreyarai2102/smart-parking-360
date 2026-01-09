"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { CitizenPortal } from "@/components/citizen-portal"
import { AdminDashboard } from "@/components/admin-dashboard"

type UserRole = "citizen" | "admin" | null

export default function Home() {
  const [userRole, setUserRole] = useState<UserRole>(null)

  if (!userRole) {
    return <LoginScreen onLogin={setUserRole} />
  }

  if (userRole === "admin") {
    return <AdminDashboard onLogout={() => setUserRole(null)} />
  }

  return <CitizenPortal onLogout={() => setUserRole(null)} />
}
