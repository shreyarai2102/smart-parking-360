"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ParkingCircle, Shield } from "lucide-react"

interface LoginScreenProps {
  onLogin: (role: "citizen" | "admin") => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [citizenInput, setCitizenInput] = useState("")
  const [adminInput, setAdminInput] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-primary p-3 rounded-lg">
              <ParkingCircle className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Smart Parking 360</h1>
              <p className="text-sm text-muted-foreground">Smart City Governance</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="citizen" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="citizen">Citizen</TabsTrigger>
            <TabsTrigger value="admin">Authority</TabsTrigger>
          </TabsList>

          {/* Citizen Tab */}
          <TabsContent value="citizen">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
                <CardTitle>Driver Portal</CardTitle>
                <CardDescription>Login with mobile number or vehicle number</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Input
                    placeholder="Mobile Number or Vehicle Number"
                    value={citizenInput}
                    onChange={(e) => setCitizenInput(e.target.value)}
                    className="h-10"
                  />
                  <Button
                    onClick={() => onLogin("citizen")}
                    disabled={!citizenInput}
                    className="w-full h-10 bg-accent hover:bg-accent/90"
                  >
                    Enter Portal
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Demo: Enter any mobile number or vehicle number
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Tab */}
          <TabsContent value="admin">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Municipal Authority
                </CardTitle>
                <CardDescription>Access real-time governance dashboard</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Input
                    placeholder="Officer ID"
                    value={adminInput}
                    onChange={(e) => setAdminInput(e.target.value)}
                    className="h-10"
                  />
                  <Button
                    onClick={() => onLogin("admin")}
                    disabled={!adminInput}
                    className="w-full h-10 bg-primary hover:bg-primary/90"
                  >
                    Access Dashboard
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">Demo: Enter any officer ID</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          A prototype for smart city parking governance demo
        </p>
      </div>
    </div>
  )
}
