"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TripAnalytics } from "@/components/analytics/trip-analytics"
import { DriverPerformance } from "@/components/analytics/driver-performance"
import { FuelEfficiency } from "@/components/analytics/fuel-efficiency"
import { Download, Calendar, Filter } from "lucide-react"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("month")

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={{ email: "user@example.com" }} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
              <div className="flex items-center gap-2">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-input border border-border/50 text-foreground text-sm"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
                <Button variant="outline" size="sm" className="border-border/50 bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  Custom Range
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            <Card className="border border-border/50 bg-card/50 p-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <Input placeholder="Filter by vehicle, driver, or route..." className="bg-input border-border/50" />
              </div>
            </Card>

            <TripAnalytics />

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Detailed Metrics</h2>
              <DriverPerformance />
              <FuelEfficiency />
            </div>

            <Card className="border border-border/50 bg-card/50 p-6">
              <h3 className="font-semibold text-foreground mb-4">Fleet Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Total Fleet Mileage</p>
                  <p className="text-3xl font-bold text-foreground">187,450 km</p>
                  <p className="text-xs text-green-600 mt-2">+15.3% vs last period</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Average Safety Rating</p>
                  <p className="text-3xl font-bold text-accent">94.2%</p>
                  <p className="text-xs text-green-600 mt-2">+2.1% vs last period</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Operating Cost per km</p>
                  <p className="text-3xl font-bold text-orange-500">$0.85</p>
                  <p className="text-xs text-red-600 mt-2">+1.8% vs last period</p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
