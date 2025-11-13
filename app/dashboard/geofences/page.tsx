"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit2, Trash2, Shield } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"

export default function GeofencesPage() {
  const [geofences] = useState([
    {
      id: 1,
      name: "Main Warehouse",
      latitude: 40.7128,
      longitude: -74.006,
      radius: 500,
      type: "inclusion",
      active: true,
    },
    {
      id: 2,
      name: "City Center Restricted",
      latitude: 40.758,
      longitude: -73.9855,
      radius: 1000,
      type: "exclusion",
      active: true,
    },
    {
      id: 3,
      name: "Port Terminal",
      latitude: 40.6892,
      longitude: -74.0445,
      radius: 800,
      type: "inclusion",
      active: true,
    },
    {
      id: 4,
      name: "Industrial Zone",
      latitude: 40.7489,
      longitude: -73.968,
      radius: 1200,
      type: "inclusion",
      active: false,
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
              <h1 className="text-3xl font-bold text-foreground">Geofences</h1>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Create Geofence
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Total Geofences</p>
                <p className="text-2xl font-bold text-primary">{geofences.length}</p>
              </Card>
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Active</p>
                <p className="text-2xl font-bold text-green-500">{geofences.filter((g) => g.active).length}</p>
              </Card>
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Breaches (24h)</p>
                <p className="text-2xl font-bold text-orange-500">12</p>
              </Card>
            </div>

            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <Input placeholder="Search geofences..." className="bg-input border-border/50" />
                </div>

                <div className="space-y-3">
                  {geofences.map((geofence) => (
                    <div
                      key={geofence.id}
                      className="p-4 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              geofence.active
                                ? geofence.type === "inclusion"
                                  ? "bg-green-500/20"
                                  : "bg-red-500/20"
                                : "bg-gray-500/20"
                            }`}
                          >
                            <Shield
                              className={`w-5 h-5 ${
                                geofence.active
                                  ? geofence.type === "inclusion"
                                    ? "text-green-600"
                                    : "text-red-600"
                                  : "text-gray-600"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{geofence.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {geofence.latitude.toFixed(4)}, {geofence.longitude.toFixed(4)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              geofence.type === "inclusion"
                                ? "bg-blue-500/20 text-blue-700"
                                : "bg-red-500/20 text-red-700"
                            }`}
                          >
                            {geofence.type}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              geofence.active ? "bg-green-500/20 text-green-700" : "bg-gray-500/20 text-gray-700"
                            }`}
                          >
                            {geofence.active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Radius: {geofence.radius} meters</p>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
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
