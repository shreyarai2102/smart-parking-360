"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export function FutureIntegrations() {
  const integrations = [
    {
      title: "Live ANPR Camera Feeds",
      description: "Real-time video streams from parking enforcement cameras",
    },
    {
      title: "FASTag / UPI Payments",
      description: "Contactless payment integration for faster transactions",
    },
    {
      title: "MCD GIS Systems",
      description: "Geographic information system for zone mapping",
    },
    {
      title: "Traffic Police API",
      description: "Integration with Delhi traffic management systems",
    },
  ]

  return (
    <Card className="border-0 shadow-md bg-gradient-to-r from-purple-50 to-blue-50">
      <CardHeader>
        <CardTitle>Future Integrations (Coming Soon)</CardTitle>
        <CardDescription>Enhanced municipal ecosystem connectivity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {integrations.map((integration, idx) => (
            <div
              key={idx}
              className="p-4 bg-white rounded-lg border border-border hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-sm">{integration.title}</p>
                  <p className="text-xs text-muted-foreground mt-2">{integration.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
