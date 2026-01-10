"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Shield, LogOut, TrendingUp, AlertCircle, Users, Zap } from "lucide-react"
import { ANPRActivityFeed } from "@/components/anpr-activity-feed"
import { ComplianceTable } from "@/components/compliance-table"
import { ComplianceScore } from "@/components/compliance-score"
import { ExplainableAlerts } from "@/components/explainable-alerts"
import { SystemStatusBar } from "@/components/system-status-bar"
import { AuditTrail } from "@/components/audit-trail"
import { WhatIfSimulation } from "@/components/what-if-simulation"
import { AuthorityOverride } from "@/components/authority-override"
import { MCD311Integration } from "@/components/mcd-311-integration"
import { ComplaintHeatmap } from "@/components/complaint-heatmap"
import { GovernanceIntelligence } from "@/components/governance-intelligence"
import { FutureIntegrations } from "@/components/future-integrations"
import type { useSimulation } from "@/hooks/use-simulation"

interface AdminDashboardProps {
  onLogout: () => void
  simulation: ReturnType<typeof useSimulation>
  demoMode: boolean
  onDemoModeChange: (mode: boolean) => void
}

export function AdminDashboard({ onLogout, simulation, demoMode, onDemoModeChange }: AdminDashboardProps) {
  const [timeRange, setTimeRange] = useState("today")

  const totalCapacity = useMemo(
    () => simulation.parkingLots.reduce((sum, lot) => sum + lot.totalSpots, 0),
    [simulation.parkingLots],
  )

  const totalOccupied = useMemo(
    () => simulation.parkingLots.reduce((sum, lot) => sum + (lot.totalSpots - lot.availableSpots), 0),
    [simulation.parkingLots],
  )

  const avgOccupancy = useMemo(() => Math.round((totalOccupied / totalCapacity) * 100), [totalOccupied, totalCapacity])

  const occupancyData = useMemo(() => {
    return simulation.parkingLots.map((lot) => ({
      time: lot.name.split(" ")[0],
      occupancy: lot.occupancy,
    }))
  }, [simulation.parkingLots])

  const revenueData = useMemo(() => {
    return simulation.parkingLots.map((lot) => ({
      lot: lot.name.split(" ")[0],
      revenue: Math.round((lot.occupancy / 100) * lot.totalSpots * lot.pricePerHour * 24),
    }))
  }, [simulation.parkingLots])

  const violationData = [
    { name: "No Violation", value: Math.max(80, 100 - simulation.violations), color: "#5ebc5e" },
    { name: "Overstay Detected", value: simulation.violations, color: "#ef4444" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6" />
            <div>
              <h1 className="text-xl font-bold">Smart Parking 360</h1>
              <p className="text-xs opacity-80">Municipal Authority Dashboard</p>
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
        <div className="mb-6 bg-primary/10 border border-primary/30 rounded-lg p-3 flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-primary font-medium">Municipal Rule Engine (Simulated Real-Time)</span>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Total Capacity</p>
                  <p className="text-3xl font-bold mt-2">{totalCapacity.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">parking spots</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Current Occupancy</p>
                  <p className="text-3xl font-bold mt-2">{totalOccupied}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{avgOccupancy}%</span>
                    <div className="w-full bg-secondary rounded-full h-1.5 flex-1">
                      <div
                        className={`h-full rounded-full ${
                          avgOccupancy < 50 ? "bg-accent" : avgOccupancy < 80 ? "bg-yellow-500" : "bg-destructive"
                        }`}
                        style={{ width: `${avgOccupancy}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Active Violations</p>
                  <p className="text-3xl font-bold mt-2 text-destructive">{simulation.violations}</p>
                  <p className="text-xs text-muted-foreground mt-1">requiring action</p>
                </div>
                <div className="bg-destructive/10 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Revenue (Today)</p>
                  <p className="text-3xl font-bold mt-2 text-accent">
                    ₹{revenueData.reduce((sum, r) => sum + r.revenue, 0).toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-accent" />
                    <span className="text-xs text-accent">Dynamic pricing active</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <ComplianceScore violations={simulation.violations} occupancy={avgOccupancy} capacity={totalCapacity} />
          <SystemStatusBar />
        </div>

        <ExplainableAlerts violations={simulation.violations} occupancy={avgOccupancy} anprLogs={simulation.anprLogs} />

        <div className="my-8">
          <AuditTrail />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <WhatIfSimulation currentOccupancy={avgOccupancy} currentCapacity={totalCapacity} />
          <AuthorityOverride />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <ComplaintHeatmap />
          <GovernanceIntelligence />
        </div>

        <div className="mb-8">
          <MCD311Integration />
        </div>

        <div className="mb-8">
          <FutureIntegrations />
        </div>
        {/* </CHANGE> */}

        {/* Analytics Tabs */}
        <Tabs defaultValue="occupancy" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="occupancy">Occupancy Trends</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
            <TabsTrigger value="violations">Violations</TabsTrigger>
            <TabsTrigger value="anpr">ANPR Activity</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          {/* Occupancy Chart */}
          <TabsContent value="occupancy">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Occupancy Trends (Live ANPR Feed)</CardTitle>
                    <CardDescription>Real-time parking capacity by lot</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {["today", "week", "month"].map((range) => (
                      <Button
                        key={range}
                        variant={timeRange === range ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeRange(range)}
                        className="capitalize"
                      >
                        {range}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={occupancyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "none", borderRadius: "0.5rem" }}
                    />
                    <Legend />
                    <Bar dataKey="occupancy" fill="hsl(var(--primary))" name="Occupancy %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Chart */}
          <TabsContent value="revenue">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Revenue by Location (AI-Based Dynamic Pricing)</CardTitle>
                <CardDescription>Estimated earnings per parking lot</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="lot" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "none", borderRadius: "0.5rem" }}
                    />
                    <Bar dataKey="revenue" fill="hsl(var(--accent))" name="Revenue (₹)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Violations Chart */}
          <TabsContent value="violations">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Violation Distribution (Overstay Detection)</CardTitle>
                <CardDescription>Automated enforcement by system</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row items-center justify-center gap-8">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={violationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {violationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3 min-w-[200px]">
                  {violationData.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ANPR Activity */}
          <TabsContent value="anpr">
            <ANPRActivityFeed anprLogs={simulation.anprLogs} />
          </TabsContent>

          {/* Compliance */}
          <TabsContent value="compliance">
            <ComplianceTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
