"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUp, ArrowDown, AlertTriangle, CheckCircle2 } from "lucide-react"

export function ANPRActivityFeed() {
  const anprLogs = [
    {
      id: 1,
      timestamp: "3:45 PM",
      vehicle: "DL 01 AB 1234",
      action: "entry",
      location: "Downtown Central",
      status: "valid",
    },
    {
      id: 2,
      timestamp: "3:42 PM",
      vehicle: "MH 02 CD 5678",
      action: "exit",
      location: "Metro Station",
      status: "valid",
    },
    {
      id: 3,
      timestamp: "3:38 PM",
      vehicle: "HR 26 EF 9012",
      action: "entry",
      location: "Shopping Complex",
      status: "violation",
      reason: "Overstay detected",
    },
    {
      id: 4,
      timestamp: "3:35 PM",
      vehicle: "KA 01 GH 3456",
      action: "exit",
      location: "Airport Terminal",
      status: "valid",
    },
    {
      id: 5,
      timestamp: "3:32 PM",
      vehicle: "UP 16 IJ 7890",
      action: "entry",
      location: "Downtown Central",
      status: "valid",
    },
    {
      id: 6,
      timestamp: "3:28 PM",
      vehicle: "GJ 05 KL 2345",
      action: "entry",
      location: "Metro Station",
      status: "violation",
      reason: "Unregistered vehicle",
    },
  ]

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>ANPR Live Feed</CardTitle>
        <CardDescription>Real-time vehicle entry/exit activity with detection</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-3">
            {anprLogs.map((log) => (
              <div key={log.id} className="p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={`p-2 rounded-lg flex-shrink-0 ${
                        log.action === "entry" ? "bg-accent/20" : "bg-primary/20"
                      }`}
                    >
                      {log.action === "entry" ? (
                        <ArrowUp className={`w-5 h-5 ${log.action === "entry" ? "text-accent" : "text-primary"}`} />
                      ) : (
                        <ArrowDown className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-mono font-bold text-base">{log.vehicle}</p>
                        <Badge variant="outline" className="capitalize text-xs">
                          {log.action}
                        </Badge>
                        {log.status === "violation" && (
                          <Badge className="bg-destructive/20 text-destructive border-0 text-xs">Violation</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{log.location}</p>
                      {log.reason && (
                        <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {log.reason}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                    {log.status === "valid" && <CheckCircle2 className="w-5 h-5 text-accent mt-2 ml-auto" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
