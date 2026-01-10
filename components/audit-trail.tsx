"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AuditEvent {
  timestamp: string
  event: string
  description: string
  status: "completed" | "pending" | "alert"
}

export function AuditTrail() {
  const events: AuditEvent[] = [
    {
      timestamp: "3:58 PM",
      event: "Vehicle Entry",
      description: "DL 01 AB 1234 entered Downtown Central",
      status: "completed",
    },
    {
      timestamp: "3:55 PM",
      event: "Parking Full",
      description: "Downtown Central reached 98% capacity",
      status: "alert",
    },
    {
      timestamp: "3:52 PM",
      event: "Overstay Detected",
      description: "MH 02 CD 5678 exceeded 2-hour parking limit",
      status: "alert",
    },
    {
      timestamp: "3:48 PM",
      event: "Penalty Issued",
      description: "₹200 penalty issued for overstay violation",
      status: "completed",
    },
    {
      timestamp: "3:45 PM",
      event: "Price Updated",
      description: "Dynamic pricing adjusted from ₹40 to ₹60",
      status: "completed",
    },
  ]

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>Audit Trail</CardTitle>
        <CardDescription>Tamper-proof municipal accountability log</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full ${
                    event.status === "completed"
                      ? "bg-green-500"
                      : event.status === "alert"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                  }`}
                />
                {index < events.length - 1 && <div className="w-0.5 h-12 bg-border mt-2" />}
              </div>
              <div className="pb-4 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{event.event}</p>
                    <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{event.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
