"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react"
import type { ParkingLot } from "@/hooks/use-simulation"

interface BookingFlowProps {
  parkingLotId: string
  onBook: () => void
  onCancel: () => void
  parkingLots: ParkingLot[]
}

export function BookingFlow({ parkingLotId, onBook, onCancel, parkingLots }: BookingFlowProps) {
  const [step, setStep] = useState<"duration" | "confirmation">("duration")
  const [duration, setDuration] = useState<30 | 60 | 120>(60)

  const lot = parkingLots.find((l) => l.id === parkingLotId) || parkingLots[0]
  const totalCost = (duration / 60) * lot.pricePerHour
  const qrCode = `QR-${parkingLotId}-${Date.now()}`

  if (step === "confirmation") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-2xl border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-accent/10 to-primary/10">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-accent" />
              Booking Confirmation
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Booking Details */}
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Parking Location</p>
                  <p className="text-xl font-bold">{lot.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Duration</p>
                    <p className="text-lg font-bold">{duration} mins</p>
                  </div>
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Total Cost</p>
                    <p className="text-lg font-bold text-accent">₹{totalCost}</p>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">Entry Time</p>
                  <p className="text-lg font-bold">{new Date().toLocaleTimeString()}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Exit by: {new Date(Date.now() + duration * 60000).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="flex flex-col items-center justify-center p-8 bg-secondary/20 rounded-lg">
                <div className="w-48 h-48 bg-white rounded-lg p-4 flex items-center justify-center border-2 border-primary">
                  <div className="text-center">
                    <p className="text-sm font-mono text-muted-foreground mb-2">QR Code</p>
                    <div className="w-32 h-32 bg-primary rounded flex items-center justify-center">
                      <p className="text-xs text-primary-foreground text-center break-all px-2">{qrCode}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">Show at entry gate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <Button variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Change Booking
              </Button>
              <Button onClick={onBook} className="flex-1 bg-accent hover:bg-accent/90">
                Confirm & Enter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader>
          <Button variant="ghost" size="sm" onClick={onCancel} className="w-fit mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <CardTitle>Choose Duration</CardTitle>
          <CardDescription>{lot.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            {[30, 60, 120].map((dur) => (
              <button
                key={dur}
                onClick={() => setDuration(dur as any)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  duration === dur ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{dur} Minutes</p>
                    <p className="text-sm text-muted-foreground">
                      {dur < 60 ? `${dur} min` : `${(dur / 60).toFixed(1)} hours`}
                    </p>
                  </div>
                  <Badge className="bg-accent text-accent-foreground">₹{(dur / 60) * lot.pricePerHour}</Badge>
                </div>
              </button>
            ))}
          </div>

          {lot.occupancy > 80 && (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-900">High Occupancy</p>
                <p className="text-yellow-800">This lot is almost full. Book quickly!</p>
              </div>
            </div>
          )}

          <Button onClick={() => setStep("confirmation")} className="w-full bg-primary hover:bg-primary/90">
            Continue to Payment
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
