"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { MapPin, Navigation, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

// Simple map implementation without external dependencies
interface VehicleLocation {
  id: string
  registration: string
  latitude: number
  longitude: number
  speed: number
  heading: number
  driver: string
  status: "active" | "idle" | "stopped"
}

export function RealtimeMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleLocation | null>(null)
  const [vehicles, setVehicles] = useState<VehicleLocation[]>([
    {
      id: "1",
      registration: "VH-001",
      latitude: 40.7128,
      longitude: -74.006,
      speed: 65,
      heading: 45,
      driver: "John Doe",
      status: "active",
    },
    {
      id: "2",
      registration: "VH-002",
      latitude: 40.758,
      longitude: -73.9855,
      speed: 55,
      heading: 90,
      driver: "Jane Smith",
      status: "active",
    },
    {
      id: "3",
      registration: "VH-003",
      latitude: 40.7489,
      longitude: -73.968,
      speed: 0,
      heading: 0,
      driver: "Unassigned",
      status: "idle",
    },
    {
      id: "4",
      registration: "VH-004",
      latitude: 40.7614,
      longitude: -73.9776,
      speed: 70,
      heading: 180,
      driver: "Mike Johnson",
      status: "active",
    },
  ])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.fillStyle = "var(--card)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "var(--border)"
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Normalize coordinates to canvas
    const minLat = 40.7,
      maxLat = 40.77
    const minLng = -74.01,
      maxLng = -73.96

    vehicles.forEach((vehicle) => {
      const x = ((vehicle.longitude - minLng) / (maxLng - minLng)) * canvas.width
      const y = ((maxLat - vehicle.latitude) / (maxLat - minLat)) * canvas.height

      // Draw vehicle marker
      const color = vehicle.status === "active" ? "#10b981" : vehicle.status === "idle" ? "#f59e0b" : "#6b7280"
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fill()

      // Draw direction indicator
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.beginPath()
      const radians = (vehicle.heading * Math.PI) / 180
      ctx.moveTo(x, y)
      ctx.lineTo(x + Math.cos(radians) * 15, y + Math.sin(radians) * 15)
      ctx.stroke()

      // Draw info label
      if (selectedVehicle?.id === vehicle.id) {
        ctx.fillStyle = "var(--primary)"
        ctx.fillRect(x - 30, y - 30, 60, 25)
        ctx.fillStyle = "white"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(vehicle.registration, x, y - 15)
      }
    })
  }, [vehicles, selectedVehicle])

  return (
    <Card className="border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <div className="flex flex-col h-full md:h-[600px]">
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Real-Time Vehicle Tracking</h2>
          </div>
        </div>

        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Canvas Map */}
          <div className="flex-1 p-4 bg-gradient-to-br from-primary/5 to-accent/5 relative">
            <canvas
              ref={canvasRef}
              className="w-full h-full border border-border/50 rounded-lg bg-card cursor-pointer"
              onClick={(e) => {
                const canvas = canvasRef.current
                if (!canvas) return
                const rect = canvas.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top

                // Find nearest vehicle
                const minLat = 40.7,
                  maxLat = 40.77
                const minLng = -74.01,
                  maxLng = -73.96

                for (const vehicle of vehicles) {
                  const vx = ((vehicle.longitude - minLng) / (maxLng - minLng)) * canvas.width
                  const vy = ((maxLat - vehicle.latitude) / (maxLat - minLat)) * canvas.height
                  const distance = Math.sqrt((x - vx) ** 2 + (y - vy) ** 2)
                  if (distance < 15) {
                    setSelectedVehicle(vehicle)
                    return
                  }
                }
                setSelectedVehicle(null)
              }}
            />
          </div>

          {/* Vehicle List */}
          <div className="w-80 border-l border-border/50 overflow-y-auto">
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-foreground text-sm mb-3">Active Vehicles</h3>
              {vehicles.map((vehicle) => (
                <button
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className={`w-full p-3 rounded-lg border transition-all text-left text-sm ${
                    selectedVehicle?.id === vehicle.id
                      ? "bg-primary/10 border-primary"
                      : "bg-muted/50 border-border/50 hover:border-border"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-foreground">{vehicle.registration}</p>
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        vehicle.status === "active"
                          ? "bg-green-500/20 text-green-700"
                          : vehicle.status === "idle"
                            ? "bg-yellow-500/20 text-yellow-700"
                            : "bg-gray-500/20 text-gray-700"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{vehicle.driver}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span>Speed: {vehicle.speed} km/h</span>
                    <span className="flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      {vehicle.heading}°
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Vehicle Details */}
        {selectedVehicle && (
          <div className="p-4 border-t border-border/50 bg-muted/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Vehicle</p>
                <p className="font-semibold text-foreground">{selectedVehicle.registration}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Driver</p>
                <p className="font-semibold text-foreground">{selectedVehicle.driver}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Current Speed</p>
                <p className="font-semibold text-foreground">{selectedVehicle.speed} km/h</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 border-border/50 bg-transparent">
                  <Phone className="w-3 h-3 mr-1" />
                  Call
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
