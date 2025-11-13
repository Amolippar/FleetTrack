"use client"

import { Card } from "@/components/ui/card"
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
} from "recharts"
import { TrendingUp, Clock, Navigation, DollarSign } from "lucide-react"

const tripData = [
  { date: "Mon", trips: 12, distance: 450, fuel: 180, cost: 540 },
  { date: "Tue", trips: 10, distance: 320, fuel: 128, cost: 384 },
  { date: "Wed", trips: 15, distance: 620, fuel: 248, cost: 744 },
  { date: "Thu", trips: 11, distance: 380, fuel: 152, cost: 456 },
  { date: "Fri", trips: 18, distance: 850, fuel: 340, cost: 1020 },
  { date: "Sat", trips: 13, distance: 520, fuel: 208, cost: 624 },
  { date: "Sun", trips: 8, distance: 280, fuel: 112, cost: 336 },
]

export function TripAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border border-border/50 bg-card/50">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Trips</p>
              <p className="text-2xl font-bold text-foreground">1,847</p>
              <p className="text-xs text-green-600 mt-2">+12.3% from last month</p>
            </div>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4 border border-border/50 bg-card/50">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Distance</p>
              <p className="text-2xl font-bold text-foreground">34,240 km</p>
              <p className="text-xs text-green-600 mt-2">+8.5% from last month</p>
            </div>
            <Navigation className="w-5 h-5 text-accent" />
          </div>
        </Card>

        <Card className="p-4 border border-border/50 bg-card/50">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Avg Trip Duration</p>
              <p className="text-2xl font-bold text-foreground">2h 24m</p>
              <p className="text-xs text-green-600 mt-2">-3.2% from last month</p>
            </div>
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
        </Card>

        <Card className="p-4 border border-border/50 bg-card/50">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Fuel Cost</p>
              <p className="text-2xl font-bold text-foreground">$28,450</p>
              <p className="text-xs text-green-600 mt-2">-2.1% from last month</p>
            </div>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border/50 bg-card/50 backdrop-blur-sm p-6">
          <h3 className="font-semibold text-foreground mb-4">Weekly Trips & Distance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tripData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
              <Legend />
              <Bar dataKey="trips" fill="var(--primary)" name="Trips" />
              <Bar dataKey="distance" fill="var(--accent)" name="Distance (km)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="border border-border/50 bg-card/50 backdrop-blur-sm p-6">
          <h3 className="font-semibold text-foreground mb-4">Fuel & Cost Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tripData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
              <Legend />
              <Line type="monotone" dataKey="fuel" stroke="var(--chart-3)" name="Fuel (L)" strokeWidth={2} />
              <Line type="monotone" dataKey="cost" stroke="var(--chart-4)" name="Cost ($)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
