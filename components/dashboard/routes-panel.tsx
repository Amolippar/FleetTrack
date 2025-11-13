"use client"

import { Card } from "@/components/ui/card"
import { MapPin, Clock } from "lucide-react"

export function RoutesPanel() {
  const routes = [
    { id: 1, name: "Route A", vehicle: "VH-001", eta: "2:30 PM", distance: "45 km" },
    { id: 2, name: "Route B", vehicle: "VH-002", eta: "3:45 PM", distance: "62 km" },
  ]

  return (
    <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-4">Active Routes</h3>
        <div className="space-y-3">
          {routes.map((route) => (
            <div key={route.id} className="p-3 rounded-lg bg-muted/50 border border-border/50">
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-medium text-foreground">{route.name}</p>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">{route.vehicle}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {route.distance}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {route.eta}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
