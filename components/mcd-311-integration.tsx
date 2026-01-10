"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { X } from "lucide-react"

type IssueType = "illegal-parking" | "overcharging" | "overcapacity" | "contractor-misconduct" | "anpr-error"

interface ComplaintData {
  issueType: IssueType
  location: string
  description: string
  status: "submitted" | "reviewing" | "escalated"
}

export function MCD311Integration() {
  const [showComplaintForm, setShowComplaintForm] = useState(false)
  const [complaints, setComplaints] = useState<ComplaintData[]>([])
  const [formData, setFormData] = useState({
    issueType: "illegal-parking" as IssueType,
    location: "Downtown Central",
    description: "",
  })

  const locations = ["Downtown Central", "Metro Station Lot", "Shopping Complex P1", "Airport Terminal"]
  const issueTypes = [
    { value: "illegal-parking", label: "Illegal Parking" },
    { value: "overcharging", label: "Overcharging" },
    { value: "overcapacity", label: "Overcapacity" },
    { value: "contractor-misconduct", label: "Contractor Misconduct" },
    { value: "anpr-error", label: "ANPR Error" },
  ]

  const handleSubmit = () => {
    if (formData.description.trim()) {
      setComplaints((prev) => [{ ...formData, status: "submitted" }, ...prev])
      setFormData({ issueType: "illegal-parking", location: "Downtown Central", description: "" })
      setShowComplaintForm(false)
    }
  }

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Report Parking Issue – MCD 311</CardTitle>
          <CardDescription>Official grievance redressal platform of Municipal Corporation of Delhi</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() =>
              window.open(
                "https://mcd.everythingcivic.com/citizen/createissue?app_id=U2FsdGVkX180J3mGnJmT5QpgtPjhfjtzyXAAccBUxGU%3D&api_key=e34ba86d3943bd6db9120313da011937189e6a9625170905750f649395bcd68312cf10d264c9305d57c23688cc2e5120",
                "_blank",
              )
            }
            className="w-full bg-primary hover:bg-primary/90"
          >
            Open MCD 311 App / Website
          </Button>
          <p className="text-xs text-muted-foreground">
            Official grievance redressal platform of Municipal Corporation of Delhi.
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>In-Portal Parking Complaint Box</CardTitle>
              <CardDescription>Submit complaints directly through Smart Parking 360</CardDescription>
            </div>
            {!showComplaintForm && (
              <Button onClick={() => setShowComplaintForm(true)} variant="outline" size="sm">
                New Complaint
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {showComplaintForm ? (
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Submit Parking Complaint</h3>
                <button onClick={() => setShowComplaintForm(false)}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Issue Type</label>
                <select
                  value={formData.issueType}
                  onChange={(e) => setFormData({ ...formData, issueType: e.target.value as IssueType })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                >
                  {issueTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location / Parking Zone</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the issue..."
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm h-20 resize-none"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSubmit} className="flex-1 bg-primary hover:bg-primary/90">
                  Submit Parking Complaint
                </Button>
                <Button onClick={() => setShowComplaintForm(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground text-sm">No complaints yet</p>
            </div>
          )}

          {complaints.length > 0 && (
            <div className="mt-6 space-y-3 border-t pt-6">
              <h3 className="font-medium text-sm">Complaint Status</h3>
              {complaints.map((complaint, idx) => (
                <div key={idx} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        {issueTypes.find((t) => t.value === complaint.issueType)?.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{complaint.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">{complaint.description}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2 ${
                        complaint.status === "submitted"
                          ? "bg-blue-200 text-blue-800"
                          : complaint.status === "reviewing"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                      }`}
                    >
                      {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1).replace(/_/g, " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
