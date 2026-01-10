"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { useState } from "react"

interface ComplianceScoreProps {
  violations: number
  occupancy: number
  capacity: number
}

export function ComplianceScore({ violations, occupancy, capacity }: ComplianceScoreProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  // Calculate compliance score (0-100)
  const capacityAdherence = Math.max(0, 100 - (occupancy > 95 ? 20 : occupancy > 85 ? 10 : 0))
  const violationPenalty = Math.max(0, 100 - violations * 2)
  const paymentCompliance = 95 // Mock payment compliance
  const complianceScore = Math.round((capacityAdherence + violationPenalty + paymentCompliance) / 3)

  const scoreColor =
    complianceScore >= 80 ? "text-green-600" : complianceScore >= 60 ? "text-yellow-600" : "text-red-600"
  const scoreBg = complianceScore >= 80 ? "bg-green-50" : complianceScore >= 60 ? "bg-yellow-50" : "bg-red-50"

  return (
    <Card className={`border-0 shadow-md ${scoreBg}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Contractor Compliance</CardTitle>
          <div className="relative">
            <button
              onClick={() => setShowTooltip(!showTooltip)}
              className="text-muted-foreground hover:text-foreground"
            >
              <AlertCircle className="w-4 h-4" />
            </button>
            {showTooltip && (
              <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg p-3 text-sm shadow-lg z-10">
                <p className="font-medium mb-2">How is compliance calculated?</p>
                <p className="text-muted-foreground text-xs">
                  Compliance is calculated using real-time capacity monitoring, ANPR violations, and municipal contract
                  rules. Exceeding capacity or overstay violations reduce the score.
                </p>
              </div>
            )}
          </div>
        </div>
        <CardDescription>Municipal contract adherence metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center">
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 rounded-full border-8 border-secondary" />
            <div
              className="absolute inset-0 rounded-full border-8 border-transparent"
              style={{
                borderTopColor:
                  scoreColor === "text-green-600"
                    ? "#22c55e"
                    : scoreColor === "text-yellow-600"
                      ? "#eab308"
                      : "#ef4444",
                borderRightColor:
                  scoreColor === "text-green-600"
                    ? "#22c55e"
                    : scoreColor === "text-yellow-600"
                      ? "#eab308"
                      : "#ef4444",
                borderBottomColor:
                  scoreColor === "text-green-600"
                    ? "#22c55e"
                    : scoreColor === "text-yellow-600"
                      ? "#eab308"
                      : "#ef4444",
              }}
              style={{
                borderTopColor:
                  scoreColor === "text-green-600"
                    ? "#22c55e"
                    : scoreColor === "text-yellow-600"
                      ? "#eab308"
                      : "#ef4444",
                transform: `rotate(${(complianceScore / 100) * 360}deg)`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-4xl font-bold ${scoreColor}`}>{complianceScore}</div>
                <div className="text-xs text-muted-foreground mt-1">out of 100</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Capacity Adherence</span>
            <span className="text-sm font-bold">{capacityAdherence}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="h-full rounded-full bg-blue-500" style={{ width: `${capacityAdherence}%` }} />
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-medium">Overstay Violations</span>
            <span className="text-sm font-bold">{violationPenalty}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="h-full rounded-full bg-red-500" style={{ width: `${violationPenalty}%` }} />
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-medium">Payment Compliance</span>
            <span className="text-sm font-bold">{paymentCompliance}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="h-full rounded-full bg-green-500" style={{ width: `${paymentCompliance}%` }} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
