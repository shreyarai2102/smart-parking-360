"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
import { Shield, LogOut, TrendingUp, AlertCircle, Users } from "lucide-react"
import { ANPRActivityFeed } from "@/components/anpr-activity-feed"
import { ComplianceTable } from "@/components/compliance-table"

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [timeRange, setTimeRange] = useState("today")

  // Mock Analytics Data
  const occupancyData = [
    { time: "6 AM", occupancy: 15 },
    { time: "9 AM", occupancy: 65 },
    { time: "12 PM", occupancy: 78 },
    { time: "3 PM", occupancy: 82 },
    { time: "6 PM", occupancy: 75 },
    { time: "9 PM", occupancy: 45 },
  ]

  const revenueData = [
    { lot: "Downtown", revenue: 15000 },
    { lot: "Metro", revenue: 8500 },
    { lot: "Shopping", revenue: 12000 },
    { lot: "Airport", revenue: 22000 },
  ]

  const violationData = [
    { name: "No Violation", value: 85, color: "#5ebc5e" },
    { name: "Minor Violation", value: 10, color: "#eab308" },
    { name: "Serious Violation", value: 5, color: "#ef4444" },
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
          <Button variant="ghost" size="sm" onClick={onLogout} className="text-primary-foreground hover:bg-white/20">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Total Capacity</p>
                  <p className="text-3xl font-bold mt-2">1,150</p>
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
                  <p className="text-3xl font-bold mt-2">865</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">75%</span>
                    <div className="w-full bg-secondary rounded-full h-1.5 flex-1">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: "75%" }} />
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
                  <p className="text-3xl font-bold mt-2 text-destructive">24</p>
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
                  <p className="text-3xl font-bold mt-2 text-accent">₹57,500</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-accent" />
                    <span className="text-xs text-accent">+12% vs yesterday</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
                    <CardTitle>Occupancy Trends</CardTitle>
                    <CardDescription>Real-time parking capacity throughout the day</CardDescription>
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
                  <LineChart data={occupancyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "none", borderRadius: "0.5rem" }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="occupancy"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Occupancy %"
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Chart */}
          <TabsContent value="revenue">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Revenue by Location</CardTitle>
                <CardDescription>Today's earnings per parking lot</CardDescription>
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
                <CardTitle>Violation Distribution</CardTitle>
                <CardDescription>Current parking violations by severity</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row items-center justify-center gap-8">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={violationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
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
                        <p className="text-xs text-muted-foreground">{item.value}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ANPR Activity */}
          <TabsContent value="anpr">
            <ANPRActivityFeed />
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
