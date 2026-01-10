"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useMemo } from "react"

interface WhatIfSimulationProps {
  currentOccupancy: number
  currentCapacity: number
  onValuesChange?: (occupancy: number, capacity: number) => void
}

export function WhatIfSimulation({ currentOccupancy, currentCapacity, onValuesChange }: WhatIfSimulationProps) {
  const [occupancy, setOccupancy] = useState(currentOccupancy)
  const [capacity, setCapacity] = useState(currentCapacity)

  const calculatePrice = (occ: number): number => {
    if (occ < 50) return 20
    if (occ < 80) return 40
    return 60
  }

  const simulatedData = useMemo(
    () => ({
      price: calculatePrice(occupancy),
      violations: occupancy > 85 ? Math.floor((occupancy - 85) * 2) : 0,
      compliance: Math.max(0, 100 - occupancy + 50),
      revenue: Math.round((occupancy / 100) * capacity * calculatePrice(occupancy) * 24),
    }),
    [occupancy, capacity],
  )

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>What-If Simulation Controls</CardTitle>
        <CardDescription>Simulated data for demo purposes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Parking Occupancy (%)</label>
            <span className="text-lg font-bold text-primary">{occupancy}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="100"
            value={occupancy}
            onChange={(e) => {
              const val = Number.parseInt(e.target.value)
              setOccupancy(val)
              onValuesChange?.(val, capacity)
            }}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Allowed Capacity</label>
            <span className="text-lg font-bold text-primary">{capacity}</span>
          </div>
          <input
            type="range"
            min="100"
            max="1000"
            step="50"
            value={capacity}
            onChange={(e) => {
              const val = Number.parseInt(e.target.value)
              setCapacity(val)
              onValuesChange?.(occupancy, val)
            }}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground">Dynamic Price</p>
            <p className="text-2xl font-bold text-primary mt-1">₹{simulatedData.price}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground">Est. Violations</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{simulatedData.violations}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground">Compliance Score</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{simulatedData.compliance}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground">Est. Revenue</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">₹{simulatedData.revenue}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
