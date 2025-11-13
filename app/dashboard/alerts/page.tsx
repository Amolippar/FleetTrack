"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertTriangle, AlertCircle, CheckCircle, Search, Filter, X } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"

export default function AlertsPage() {
  const [alerts] = useState([
    {
      id: 1,
      type: "speeding",
      vehicle: "VH-001",
      severity: "high",
      message: "Vehicle exceeding speed limit by 15 km/h",
      time: "2 minutes ago",
    },
    {
      id: 2,
      type: "geofence",
      vehicle: "VH-003",
      severity: "medium",
      message: "Geofence boundary crossed",
      time: "15 minutes ago",
    },
    {
      id: 3,
      type: "maintenance",
      vehicle: "VH-005",
      severity: "low",
      message: "Maintenance reminder: Oil change due in 500 km",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "harsh_braking",
      vehicle: "VH-002",
      severity: "high",
      message: "Harsh braking detected",
      time: "3 hours ago",
    },
    {
      id: 5,
      type: "fuel",
      vehicle: "VH-004",
      severity: "medium",
      message: "Fuel level below 30%",
      time: "4 hours ago",
    },
  ])

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case "medium":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      default:
        return <CheckCircle className="w-5 h-5 text-blue-500" />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={{ email: "user@example.com" }} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Alerts & Notifications</h1>
              <Button variant="outline" className="border-border/50 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-500">2</p>
              </Card>
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Warnings</p>
                <p className="text-2xl font-bold text-yellow-500">3</p>
              </Card>
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Information</p>
                <p className="text-2xl font-bold text-blue-500">5</p>
              </Card>
            </div>

            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <Input placeholder="Search alerts..." className="bg-input border-border/50" />
                </div>

                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-4 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors flex items-start gap-4"
                    >
                      {getAlertIcon(alert.severity)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <p className="font-semibold text-foreground">{alert.vehicle}</p>
                            <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="flex-shrink-0">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
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
