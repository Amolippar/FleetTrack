"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSession } from "@/lib/mock-auth"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card } from "@/components/ui/card"

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const session = getSession()
      if (!session?.isAuthenticated) {
        router.push("/auth/login")
        return
      }
      setUser(session.user)
      setLoading(false)
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-auto">
          <div className="p-8 space-y-8 max-w-7xl mx-auto">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Active Vehicles", value: "24", icon: "🚚" },
                { label: "Online Drivers", value: "18", icon: "👥" },
                { label: "Routes Today", value: "12", icon: "📍" },
                { label: "Alerts", value: "3", icon: "⚠️" },
              ].map((stat) => (
                <Card key={stat.label} className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                    </div>
                    <div className="text-4xl opacity-50">{stat.icon}</div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm h-96">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Live Map</h2>
                  <div className="w-full h-80 bg-muted/30 rounded-lg flex items-center justify-center border border-border/30">
                    <div className="text-center">
                      <div className="text-5xl mb-2">🗺️</div>
                      <p className="text-muted-foreground">Real-time vehicle tracking map</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Recent Alerts</h2>
                  <div className="space-y-3">
                    {[
                      { type: "Speeding", vehicle: "VH-001", icon: "⚠️" },
                      { type: "Low Fuel", vehicle: "VH-005", icon: "⛽" },
                      { type: "Maintenance Due", vehicle: "VH-012", icon: "🔧" },
                    ].map((alert) => (
                      <div
                        key={alert.vehicle}
                        className="p-3 bg-muted/30 rounded-lg border border-border/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{alert.icon}</span>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{alert.type}</p>
                            <p className="text-xs text-muted-foreground">{alert.vehicle}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Active Routes</h2>
                  <div className="space-y-3">
                    {[
                      { route: "Route A", distance: "45 km", eta: "2h 30m" },
                      { route: "Route B", distance: "32 km", eta: "1h 45m" },
                    ].map((route) => (
                      <div
                        key={route.route}
                        className="p-3 bg-muted/30 rounded-lg border border-border/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-foreground">{route.route}</p>
                            <p className="text-xs text-muted-foreground">{route.distance}</p>
                          </div>
                          <p className="text-xs font-semibold text-primary">{route.eta}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* Vehicles Grid */}
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-foreground mb-4">Vehicles Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "VH-001", status: "Active", speed: "65 km/h", fuel: "85%" },
                  { name: "VH-002", status: "Active", speed: "48 km/h", fuel: "72%" },
                  { name: "VH-003", status: "Idle", speed: "0 km/h", fuel: "90%" },
                ].map((vehicle) => (
                  <div
                    key={vehicle.name}
                    className="p-4 bg-muted/20 rounded-lg border border-border/30 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-foreground">{vehicle.name}</p>
                        <p className="text-xs text-muted-foreground">{vehicle.status}</p>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/20 text-primary">
                        {vehicle.status === "Active" ? "🟢" : "🔵"} {vehicle.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Speed</span>
                        <span className="text-foreground font-medium">{vehicle.speed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fuel</span>
                        <span className="text-foreground font-medium">{vehicle.fuel}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
