"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Plus, Search, Clock, Navigation } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"

export default function RoutesPage() {
  const [routes] = useState([
    {
      id: 1,
      name: "Downtown Route A",
      from: "Warehouse",
      to: "City Center",
      distance: "45 km",
      eta: "2:30 PM",
      vehicle: "VH-001",
      status: "active",
    },
    {
      id: 2,
      name: "Suburban Route B",
      from: "Hub",
      to: "Suburbs",
      distance: "62 km",
      eta: "3:45 PM",
      vehicle: "VH-002",
      status: "active",
    },
    {
      id: 3,
      name: "Industrial Route C",
      from: "Factory",
      to: "Port",
      distance: "38 km",
      eta: "1:15 PM",
      vehicle: "VH-003",
      status: "planned",
    },
    {
      id: 4,
      name: "Express Route D",
      from: "Central",
      to: "Airport",
      distance: "28 km",
      eta: "4:00 PM",
      vehicle: "VH-004",
      status: "completed",
    },
  ])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={{ email: "user@example.com" }} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Routes Management</h1>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Create Route
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Active Routes</p>
                <p className="text-2xl font-bold text-green-500">6</p>
              </Card>
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Planned Routes</p>
                <p className="text-2xl font-bold text-blue-500">3</p>
              </Card>
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Total Distance</p>
                <p className="text-2xl font-bold text-accent">1,234 km</p>
              </Card>
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Avg. Speed</p>
                <p className="text-2xl font-bold text-orange-500">62 km/h</p>
              </Card>
            </div>

            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <Input placeholder="Search routes..." className="bg-input border-border/50" />
                </div>

                <div className="space-y-3">
                  {routes.map((route) => (
                    <div
                      key={route.id}
                      className="p-4 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-foreground">{route.name}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {route.from} → {route.to}
                            </div>
                            <div className="flex items-center gap-1">
                              <Navigation className="w-4 h-4" />
                              {route.distance}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            route.status === "active"
                              ? "bg-green-500/20 text-green-700"
                              : route.status === "planned"
                                ? "bg-blue-500/20 text-blue-700"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {route.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Vehicle: {route.vehicle}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          ETA: {route.eta}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
