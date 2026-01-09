"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUp, ArrowDown, AlertTriangle, CheckCircle2 } from "lucide-react"
import type { ANPRLog } from "@/hooks/use-simulation"

interface ANPRActivityFeedProps {
  anprLogs: ANPRLog[]
}

export function ANPRActivityFeed({ anprLogs }: ANPRActivityFeedProps) {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>ANPR Live Feed (Simulated)</CardTitle>
        <CardDescription>Real-time vehicle entry/exit activity with detection</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-3">
            {anprLogs.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Waiting for vehicle detections...</p>
            ) : (
              anprLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div
                        className={`p-2 rounded-lg flex-shrink-0 ${
                          log.action === "entry" ? "bg-accent/20" : "bg-primary/20"
                        }`}
                      >
                        {log.action === "entry" ? (
                          <ArrowUp className={`w-5 h-5 text-accent`} />
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
                            {log.penalty && ` • Penalty: ₹${log.penalty}`}
                          </p>
                        )}
                        {log.duration && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Duration: {Math.round(log.duration / 60000)} mins
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
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
