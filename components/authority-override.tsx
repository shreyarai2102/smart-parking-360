"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { useState } from "react"

export function AuthorityOverride() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <Card className="border-0 shadow-md bg-red-50 border border-red-200">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900">Municipal Override (Emergency Use Only)</h3>
            <p className="text-sm text-red-800 mt-1">
              Accessible only to authorized municipal officers during emergencies, public events, or disaster
              situations.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <input type="checkbox" id="override" disabled className="w-4 h-4 cursor-not-allowed opacity-50" />
              <label htmlFor="override" className="text-sm font-medium text-red-900 opacity-50 cursor-not-allowed">
                Enable Override (Disabled - Requires 2FA Authorization)
              </label>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="ml-auto text-xs text-red-600 hover:text-red-800 underline"
              >
                {showInfo ? "Hide" : "Show"} Details
              </button>
            </div>
            {showInfo && (
              <div className="mt-4 p-3 bg-white rounded border border-red-200 text-xs space-y-2 text-muted-foreground">
                <p>
                  <span className="font-medium">All overrides are time-bound and logged:</span>
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Maximum duration: 4 hours per override event</li>
                  <li>Requires approval from Municipal Commissioner</li>
                  <li>All actions logged with timestamp and officer details</li>
                  <li>Audit trail maintained for accountability</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
