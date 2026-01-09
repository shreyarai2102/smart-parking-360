"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertTriangle, Clock, TrendingUp } from "lucide-react"

export function NotificationsPanel() {
  const notifications = [
    {
      id: 1,
      type: "confirmation",
      title: "Booking Confirmed",
      message: "Your parking at Downtown Central is confirmed until 4:30 PM",
      time: "2 hours ago",
      icon: CheckCircle2,
      color: "text-accent",
    },
    {
      id: 2,
      type: "warning",
      title: "Dynamic Price Increase",
      message: "Price at Metro Station increased to ₹35/hr due to high demand",
      time: "1 hour ago",
      icon: TrendingUp,
      color: "text-yellow-600",
    },
    {
      id: 3,
      type: "alert",
      title: "Overstay Warning",
      message: "Your parking expires in 30 minutes. Extend now to avoid penalties.",
      time: "30 minutes ago",
      icon: AlertTriangle,
      color: "text-destructive",
    },
    {
      id: 4,
      type: "info",
      title: "Parking Available",
      message: "Shopping Complex P1 now has 50+ available spots",
      time: "45 minutes ago",
      icon: Clock,
      color: "text-blue-600",
    },
  ]

  return (
    <div className="space-y-4">
      {notifications.map((notif) => {
        const Icon = notif.icon
        return (
          <Card key={notif.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className={`${notif.color} flex-shrink-0 mt-1`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold">{notif.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs whitespace-nowrap ml-2">
                      {notif.time}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
