"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { CitizenPortal } from "@/components/citizen-portal"
import { AdminDashboard } from "@/components/admin-dashboard"
import { useSimulation } from "@/hooks/use-simulation"

type UserRole = "citizen" | "admin" | null

export default function Home() {
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [demoMode, setDemoMode] = useState(true)
  const simulation = useSimulation(demoMode)

  if (!userRole) {
    return <LoginScreen onLogin={setUserRole} />
  }

  if (userRole === "admin") {
    return (
      <AdminDashboard
        onLogout={() => setUserRole(null)}
        simulation={simulation}
        demoMode={demoMode}
        onDemoModeChange={setDemoMode}
      />
    )
  }

  return (
    <CitizenPortal
      onLogout={() => setUserRole(null)}
      simulation={simulation}
      demoMode={demoMode}
      onDemoModeChange={setDemoMode}
    />
  )
}
