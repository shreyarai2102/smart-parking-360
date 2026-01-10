"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ComplaintHeatmap() {
  const zones = [
    { name: "Downtown Central", complaints: 45, level: "high" },
    { name: "Metro Station Lot", complaints: 12, level: "low" },
    { name: "Shopping Complex P1", complaints: 34, level: "high" },
    { name: "Airport Terminal", complaints: 8, level: "low" },
  ]

  const getColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 border-red-300"
      case "medium":
        return "bg-yellow-100 border-yellow-300"
      default:
        return "bg-green-100 border-green-300"
    }
  }

  const getTextColor = (level: string) => {
    switch (level) {
      case "high":
        return "text-red-900"
      case "medium":
        return "text-yellow-900"
      default:
        return "text-green-900"
    }
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>Zone-based Complaint Heatmap</CardTitle>
        <CardDescription>
          High complaint density zones indicate enforcement gaps, contractor violations, or pricing issues.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {zones.map((zone) => (
            <div key={zone.name} className={`p-4 rounded-lg border-2 ${getColor(zone.level)}`}>
              <p className={`font-medium text-sm ${getTextColor(zone.level)}`}>{zone.name}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <p className={`text-2xl font-bold ${getTextColor(zone.level)}`}>{zone.complaints}</p>
                <p className={`text-xs ${getTextColor(zone.level)}`}>complaints</p>
              </div>
              <div className="w-full bg-white/50 rounded-full h-2 mt-3">
                <div
                  className={`h-full rounded-full ${zone.level === "high" ? "bg-red-500" : zone.level === "medium" ? "bg-yellow-500" : "bg-green-500"}`}
                  style={{ width: `${(zone.complaints / 50) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
