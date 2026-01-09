"use client"

import { useState, useEffect, useCallback } from "react"

export interface ParkingLot {
  id: string
  name: string
  area: string
  distance: number
  occupancy: number
  totalSpots: number
  pricePerHour: number
  availableSpots: number
}

export interface ANPRLog {
  id: number
  timestamp: string
  vehicle: string
  action: "entry" | "exit"
  location: string
  status: "valid" | "violation"
  reason?: string
  entryTime?: number
  exitTime?: number
  duration?: number
  penalty?: number
}

const VEHICLE_PREFIXES = ["DL", "MH", "KA", "TN", "GJ", "HR", "UP", "RJ", "PB", "WB"]
const DEMO_MODE_SPEED = 2000 // ms between updates in demo mode
const LIVE_MODE_SPEED = 5000 // ms between updates in live mode
const ALLOWED_DURATION_DEMO = 2 * 60 * 1000 // 2 minutes in demo (represents 2 hours)

const generateVehicleNumber = () => {
  const prefix = VEHICLE_PREFIXES[Math.floor(Math.random() * VEHICLE_PREFIXES.length)]
  const state = String(Math.floor(Math.random() * 99) + 1).padStart(2, "0")
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
  const plate = String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0")
  return `${prefix} ${state} ${letter} ${plate}`
}

export function useSimulation(demoMode = true) {
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([
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
  ])

  const [anprLogs, setANPRLogs] = useState<ANPRLog[]>([
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
  ])

  const [violations, setViolations] = useState(24)

  const calculatePrice = (occupancy: number): number => {
    if (occupancy < 50) return 20
    if (occupancy < 80) return 40
    return 60
  }

  const simulateOccupancyChange = useCallback(() => {
    setParkingLots((prev) =>
      prev.map((lot) => {
        const change = Math.floor(Math.random() * 5) - 2
        const newOccupancy = Math.max(5, Math.min(98, lot.occupancy + change))
        const occupied = Math.floor((newOccupancy / 100) * lot.totalSpots)
        const available = lot.totalSpots - occupied

        return {
          ...lot,
          occupancy: newOccupancy,
          availableSpots: available,
          pricePerHour: calculatePrice(newOccupancy),
        }
      }),
    )
  }, [])

  const simulateANPREntry = useCallback(() => {
    const lots = ["Downtown Central", "Metro Station", "Shopping Complex", "Airport Terminal"]
    const vehicle = generateVehicleNumber()
    const lot = lots[Math.floor(Math.random() * lots.length)]
    const now = new Date()

    const newLog: ANPRLog = {
      id: Date.now(),
      timestamp: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      vehicle,
      action: "entry",
      location: lot,
      status: "valid",
      entryTime: Date.now(),
    }

    setANPRLogs((prev) => [newLog, ...prev.slice(0, 9)])

    // Simulate occupancy increase
    setParkingLots((prev) =>
      prev.map((lot_obj) => {
        if (lot_obj.name.includes(lot.split(" ")[0])) {
          const newOccupancy = Math.min(98, lot_obj.occupancy + 2)
          return {
            ...lot_obj,
            occupancy: newOccupancy,
            availableSpots: Math.max(0, lot_obj.availableSpots - 1),
            pricePerHour: calculatePrice(newOccupancy),
          }
        }
        return lot_obj
      }),
    )
  }, [])

  const simulateANPRExit = useCallback(() => {
    if (anprLogs.length === 0) return

    const entryLogs = anprLogs.filter((log) => log.action === "entry" && !log.exitTime)
    if (entryLogs.length === 0) return

    const exitLog = entryLogs[Math.floor(Math.random() * entryLogs.length)]
    const exitTime = Date.now()
    const duration = exitLog.entryTime ? exitTime - exitLog.entryTime : ALLOWED_DURATION_DEMO + 30000
    const isOverstay = duration > ALLOWED_DURATION_DEMO
    const penalty = isOverstay ? 200 : 0

    setANPRLogs((prev) =>
      prev.map((log) => {
        if (log.id === exitLog.id) {
          return {
            ...log,
            action: "exit",
            exitTime,
            duration,
            status: isOverstay ? "violation" : "valid",
            reason: isOverstay ? "Overstay detected (exceeded 2 hours)" : undefined,
            penalty,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          }
        }
        return log
      }),
    )

    if (isOverstay) {
      setViolations((prev) => prev + 1)
    }

    // Simulate occupancy decrease
    setParkingLots((prev) =>
      prev.map((lot) => {
        if (lot.name.includes(exitLog.location.split(" ")[0])) {
          const newOccupancy = Math.max(5, lot.occupancy - 2)
          return {
            ...lot,
            occupancy: newOccupancy,
            availableSpots: Math.min(lot.totalSpots, lot.availableSpots + 1),
            pricePerHour: calculatePrice(newOccupancy),
          }
        }
        return lot
      }),
    )
  }, [anprLogs])

  useEffect(() => {
    const interval = setInterval(
      () => {
        simulateOccupancyChange()
        if (Math.random() > 0.5) simulateANPREntry()
        if (Math.random() > 0.6) simulateANPRExit()
      },
      demoMode ? DEMO_MODE_SPEED : LIVE_MODE_SPEED,
    )

    return () => clearInterval(interval)
  }, [demoMode, simulateOccupancyChange, simulateANPREntry, simulateANPRExit])

  return {
    parkingLots,
    anprLogs,
    violations,
    simulateANPREntry,
    simulateANPRExit,
  }
}
