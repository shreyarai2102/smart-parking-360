"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, IndianRupee } from "lucide-react"

interface ParkingCardProps {
  id: string
  name: string
  area: string
  distance: number
  occupancy: number
  totalSpots: number
  pricePerHour: number
  availableSpots: number
  occupancyColor: string
  onBook: () => void
}

export function ParkingCard({
  id,
  name,
  area,
  distance,
  occupancy,
  totalSpots,
  pricePerHour,
  availableSpots,
  occupancyColor,
  onBook,
}: ParkingCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {area}
            </p>
          </div>
          <Badge variant="secondary">{distance} km</Badge>
        </div>

        <div className="space-y-3 mb-4">
          {/* Occupancy Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Occupancy</span>
              <Badge className={occupancyColor}>{occupancy}%</Badge>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className={`h-full rounded-full transition-all ${
                  occupancy < 50 ? "bg-accent" : occupancy < 80 ? "bg-yellow-500" : "bg-destructive"
                }`}
                style={{ width: `${occupancy}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {availableSpots} of {totalSpots} spots available
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
            <span className="text-sm font-medium">Rate</span>
            <div className="flex items-center gap-1 font-bold text-accent">
              <IndianRupee className="w-4 h-4" />
              {pricePerHour}
              <span className="text-xs font-normal text-muted-foreground">/hr</span>
            </div>
          </div>
        </div>

        <Button onClick={onBook} disabled={availableSpots === 0} className="w-full bg-primary hover:bg-primary/90">
          {availableSpots === 0 ? "Full" : "Book Spot"}
        </Button>
      </CardContent>
    </Card>
  )
}
