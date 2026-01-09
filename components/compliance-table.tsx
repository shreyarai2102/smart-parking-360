"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function ComplianceTable() {
  const contractors = [
    {
      id: 1,
      location: "Downtown Central",
      allowed: 150,
      actual: 128,
      violations: 2,
      compliance: 85,
      status: "good",
    },
    {
      id: 2,
      location: "Metro Station Lot",
      allowed: 200,
      actual: 90,
      violations: 0,
      compliance: 100,
      status: "excellent",
    },
    {
      id: 3,
      location: "Shopping Complex P1",
      allowed: 300,
      actual: 295,
      violations: 8,
      compliance: 72,
      status: "warning",
    },
    {
      id: 4,
      location: "Airport Terminal",
      allowed: 500,
      actual: 352,
      violations: 12,
      compliance: 65,
      status: "critical",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-accent/20 text-accent border-0"
      case "good":
        return "bg-blue-500/20 text-blue-700 border-0"
      case "warning":
        return "bg-yellow-500/20 text-yellow-700 border-0"
      case "critical":
        return "bg-destructive/20 text-destructive border-0"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getComplianceBarColor = (compliance: number) => {
    if (compliance >= 85) return "bg-accent"
    if (compliance >= 70) return "bg-yellow-500"
    return "bg-destructive"
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>Contractor Compliance</CardTitle>
        <CardDescription>Real-time parking contractor performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contractors.map((contractor) => (
            <div key={contractor.id} className="p-5 border border-border rounded-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-base">{contractor.location}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {contractor.actual} of {contractor.allowed} capacity
                  </p>
                </div>
                <Badge className={getStatusColor(contractor.status)}>
                  {contractor.violations > 0 && <AlertCircle className="w-3 h-3 mr-1" />}
                  {contractor.status === "excellent" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                  {contractor.status.charAt(0).toUpperCase() + contractor.status.slice(1)}
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Compliance Score</span>
                    <span className="text-lg font-bold text-primary">{contractor.compliance}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div
                      className={`h-full rounded-full transition-all ${getComplianceBarColor(contractor.compliance)}`}
                      style={{ width: `${contractor.compliance}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Occupancy</p>
                    <p className="font-bold text-sm">{Math.round((contractor.actual / contractor.allowed) * 100)}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Violations</p>
                    <p className={`font-bold text-sm ${contractor.violations > 5 ? "text-destructive" : ""}`}>
                      {contractor.violations}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Capacity</p>
                    <p className="font-bold text-sm">{contractor.allowed}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
