"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ParkingCircle, MapPin, LogOut, Clock, AlertCircle, CheckCircle, Zap } from "lucide-react"
import { ParkingCard } from "@/components/parking-card"
import { BookingFlow } from "@/components/booking-flow"
import { NotificationsPanel } from "@/components/notifications-panel"
import type { useSimulation } from "@/hooks/use-simulation"

interface CitizenPortalProps {
  onLogout: () => void
  simulation: ReturnType<typeof useSimulation>
  demoMode: boolean
  onDemoModeChange: (mode: boolean) => void
}

export function CitizenPortal({ onLogout, simulation, demoMode, onDemoModeChange }: CitizenPortalProps) {
  const [activeBooking, setActiveBooking] = useState<string | null>(null)
  const [completedBooking, setCompletedBooking] = useState(false)
  const [currentTab, setCurrentTab] = useState("nearby")

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy < 50) return "bg-accent text-accent-foreground"
    if (occupancy < 80) return "bg-yellow-500 text-white"
    return "bg-destructive text-destructive-foreground"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ParkingCircle className="w-6 h-6" />
            <div>
              <h1 className="text-xl font-bold">Smart Parking 360</h1>
              <p className="text-xs opacity-80">Driver Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDemoModeChange(!demoMode)}
              className="text-primary-foreground hover:bg-white/20 flex items-center gap-2"
              title={demoMode ? "Demo Mode (Fast)" : "Live Mode"}
            >
              <Zap className="w-4 h-4" />
              {demoMode ? "Demo" : "Live"}
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout} className="text-primary-foreground hover:bg-white/20">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!activeBooking && !completedBooking ? (
          <>
            {/* Nearby Parking Section */}
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="nearby" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Nearby Parking
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Booking History
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Notifications
                </TabsTrigger>
              </TabsList>

              <TabsContent value="nearby" className="space-y-6">
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="text-accent font-medium">Real-Time Pricing Engine (Simulated)</span>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {simulation.parkingLots.map((lot) => (
                    <ParkingCard
                      key={lot.id}
                      {...lot}
                      onBook={() => setActiveBooking(lot.id)}
                      occupancyColor={getOccupancyColor(lot.occupancy)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>Your last 5 parking sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { date: "Today, 2:30 PM", lot: "Downtown Central", duration: "2 hours", amount: "₹100" },
                        { date: "Yesterday, 4:00 PM", lot: "Metro Station Lot", duration: "1.5 hours", amount: "₹45" },
                        { date: "Jan 7, 11:00 AM", lot: "Shopping Complex P1", duration: "3 hours", amount: "₹120" },
                      ].map((booking, idx) => (
                        <div key={idx} className="flex justify-between items-center p-4 bg-secondary/20 rounded-lg">
                          <div>
                            <p className="font-medium">{booking.lot}</p>
                            <p className="text-sm text-muted-foreground">{booking.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{booking.amount}</p>
                            <p className="text-sm text-muted-foreground">{booking.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <NotificationsPanel />
              </TabsContent>
            </Tabs>
          </>
        ) : completedBooking ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-md border-0 shadow-xl">
              <CardContent className="pt-8 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="bg-accent/20 p-4 rounded-full">
                    <CheckCircle className="w-12 h-12 text-accent" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                <p className="text-muted-foreground mb-6">
                  Your parking has been reserved. Check your notifications for details.
                </p>
                <Button
                  onClick={() => {
                    setCompletedBooking(false)
                    setActiveBooking(null)
                  }}
                  className="w-full bg-accent hover:bg-accent/90"
                >
                  Back to Parking
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <BookingFlow
            parkingLotId={activeBooking || ""}
            onBook={() => setCompletedBooking(true)}
            onCancel={() => setActiveBooking(null)}
            parkingLots={simulation.parkingLots}
          />
        )}
      </div>
    </div>
  )
}
