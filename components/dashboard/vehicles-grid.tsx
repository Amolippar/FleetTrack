"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, Battery, Gauge } from "lucide-react"

export function VehiclesGrid() {
  const vehicles = [
    { id: 1, reg: "VH-001", status: "active", driver: "John Doe", fuel: 75, speed: 65 },
    { id: 2, reg: "VH-002", status: "active", driver: "Jane Smith", fuel: 45, speed: 55 },
    { id: 3, reg: "VH-003", status: "idle", driver: "Unassigned", fuel: 90, speed: 0 },
    { id: 4, reg: "VH-004", status: "active", driver: "Mike Johnson", fuel: 30, speed: 70 },
  ]

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">Fleet Overview</h2>
        <p className="text-sm text-muted-foreground">Real-time status of all vehicles in your fleet</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {vehicles.map((vehicle) => (
          <Card
            key={vehicle.id}
            className="relative border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-5 rounded-xl overflow-hidden group hover:border-accent/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-primary/15 rounded-lg border border-primary/20 backdrop-blur-sm">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{vehicle.reg}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{vehicle.driver}</p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2.5 py-1.5 rounded-full font-medium border transition-all ${
                    vehicle.status === "active"
                      ? "bg-green-500/15 text-green-300 border-green-500/30"
                      : "bg-muted/50 text-muted-foreground border-border"
                  }`}
                >
                  {vehicle.status}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Battery className="w-4 h-4" />
                      <span className="text-xs font-medium">Fuel</span>
                    </div>
                    <span className="font-semibold text-foreground">{vehicle.fuel}%</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden border border-border/50">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        vehicle.fuel > 50
                          ? "bg-gradient-to-r from-green-500 to-green-400"
                          : vehicle.fuel > 25
                            ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                            : "bg-gradient-to-r from-red-500 to-red-400"
                      }`}
                      style={{ width: `${vehicle.fuel}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Gauge className="w-4 h-4" />
                      <span className="text-xs font-medium">Speed</span>
                    </div>
                    <span className="font-semibold text-foreground">{vehicle.speed} km/h</span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-4 text-xs bg-white/5 border-white/10 hover:bg-white/10 hover:border-accent/50 text-foreground rounded-lg font-medium transition-all duration-200"
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
