"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ChevronDown } from "lucide-react"
import { useState } from "react"
import type { ANPRLog } from "@/hooks/use-simulation"

interface ExplainableAlertsProps {
  violations: number
  occupancy: number
  anprLogs: ANPRLog[]
}

export function ExplainableAlerts({ violations, occupancy, anprLogs }: ExplainableAlertsProps) {
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null)

  const alerts = [
    {
      id: "overstay",
      title: "Overstay Detected",
      count: violations,
      severity: violations > 20 ? "high" : "medium",
      explanation:
        "Detected via ANPR camera when parking occupancy exceeded allowed capacity for 12 minutes, violating MCD contract terms. Automatic penalty of ₹200 per violation has been issued.",
    },
    {
      id: "capacity",
      title: "Capacity Exceeded",
      count: occupancy > 90 ? 1 : 0,
      severity: occupancy > 90 ? "high" : "low",
      explanation:
        "Current occupancy is at " +
        occupancy +
        "%, exceeding the safe capacity threshold of 85%. Dynamic pricing has been activated to manage demand.",
    },
    {
      id: "pricing",
      title: "Pricing Updated",
      count: 1,
      severity: "info",
      explanation:
        "Dynamic pricing engine adjusted rates based on real-time occupancy and municipal demand management rules. Rate adjustment is logged for audit trail and contractor transparency.",
    },
  ]

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>Explainable Alerts (System Logic Transparency)</CardTitle>
        <CardDescription>Understand why each alert was triggered</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-lg p-4 ${
                alert.severity === "high"
                  ? "border-red-200 bg-red-50"
                  : alert.severity === "medium"
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-blue-200 bg-blue-50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <AlertCircle
                    className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      alert.severity === "high"
                        ? "text-red-600"
                        : alert.severity === "medium"
                          ? "text-yellow-600"
                          : "text-blue-600"
                    }`}
                  />
                  <div>
                    <h3 className="font-medium">{alert.title}</h3>
                    {alert.count > 0 && <p className="text-sm text-muted-foreground mt-1">Instances: {alert.count}</p>}
                  </div>
                </div>
                <button
                  onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expandedAlert === alert.id ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              {expandedAlert === alert.id && (
                <div className="mt-3 text-sm text-muted-foreground p-3 bg-white rounded">{alert.explanation}</div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
