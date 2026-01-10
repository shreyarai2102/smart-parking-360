"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Lock } from "lucide-react"

export function GovernanceIntelligence() {
  const useCases = [
    "Identify high-risk parking zones",
    "Detect contractor non-compliance",
    "Deploy enforcement teams strategically",
    "Adjust pricing or capacity rules",
    "Improve citizen satisfaction and trust",
  ]

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>How Municipal Authorities Use This Data</CardTitle>
        <CardDescription>Decision support for smarter governance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {useCases.map((useCase, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{useCase}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-2">
            <Lock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">Privacy Notice</p>
              <p className="text-xs text-blue-800 mt-1">
                Complaint data is anonymized and used only for governance and planning purposes. Sensitive citizen
                information is protected under Delhi data privacy regulations.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
