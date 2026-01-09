"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ParkingCircle, MapPin, LogOut, Clock, AlertCircle, CheckCircle } from "lucide-react"
import { ParkingCard } from "@/components/parking-card"
import { BookingFlow } from "@/components/booking-flow"
import { NotificationsPanel } from "@/components/notifications-panel"

interface CitizenPortalProps {
  onLogout: () => void
}

export function CitizenPortal({ onLogout }: CitizenPortalProps) {
  const [activeBooking, setActiveBooking] = useState<string | null>(null)
  const [completedBooking, setCompletedBooking] = useState(false)
  const [currentTab, setCurrentTab] = useState("nearby")

  const mockParkingLots = [
    {
      id: "1",
      name: "Downtown Central",
      area: "Central Business District",
      distance: 0.3,
      occupancy: 85,
      totalSpots: 150,
      pricePerHour: 50,
      availableSpots: 22,
    },
    {
      id: "2",
      name: "Metro Station Lot",
      area: "Transport Hub",
      distance: 0.5,
      occupancy: 45,
      totalSpots: 200,
      pricePerHour: 30,
      availableSpots: 110,
    },
    {
      id: "3",
      name: "Shopping Complex P1",
      area: "Retail District",
      distance: 0.8,
      occupancy: 92,
      totalSpots: 300,
      pricePerHour: 40,
      availableSpots: 24,
    },
    {
      id: "4",
      name: "Airport Terminal",
      area: "Airport Area",
      distance: 1.2,
      occupancy: 60,
      totalSpots: 500,
      pricePerHour: 80,
      availableSpots: 200,
    },
  ]

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
          <Button variant="ghost" size="sm" onClick={onLogout} className="text-primary-foreground hover:bg-white/20">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
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
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {mockParkingLots.map((lot) => (
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
          />
        )}
      </div>
    </div>
  )
}
