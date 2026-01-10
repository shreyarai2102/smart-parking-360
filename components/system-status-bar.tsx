"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Activity } from "lucide-react"
import { useState, useEffect } from "react"

export function SystemStatusBar() {
  const [blinkAnpr, setBlinkAnpr] = useState(true)
  const [blinkPricing, setBlinkPricing] = useState(false)
  const [blinkEnforcement, setBlinkEnforcement] = useState(false)

  useEffect(() => {
    const intervals = [
      setInterval(() => setBlinkAnpr((prev) => !prev), 1500),
      setInterval(() => setBlinkPricing((prev) => !prev), 2000),
      setInterval(() => setBlinkEnforcement((prev) => !prev), 2500),
    ]
    return () => intervals.forEach(clearInterval)
  }, [])

  const systems = [
    { name: "ANPR", status: "Active", blink: blinkAnpr },
    { name: "Pricing Engine", status: "Running", blink: blinkPricing },
    { name: "Enforcement Engine", status: "Live", blink: blinkEnforcement },
  ]

  return (
    <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-blue-100/50">
      <CardContent className="pt-6">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Real-Time System Status
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {systems.map((system) => (
            <div key={system.name} className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${system.blink ? "bg-green-500" : "bg-green-600"} transition-all`}
                style={{ animation: system.blink ? "pulse 1s infinite" : "none" }}
              />
              <div className="text-sm">
                <p className="font-medium">{system.name}</p>
                <p className="text-xs text-muted-foreground">{system.status}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
