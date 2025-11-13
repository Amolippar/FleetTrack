"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { RealtimeMap } from "@/components/dashboard/realtime-map"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Zap } from "lucide-react"

export default function MapPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={{ email: "user@example.com" }} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Live Map</h1>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-border/50 bg-transparent">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Zap className="w-4 h-4 mr-2" />
                  Live Updates On
                </Button>
              </div>
            </div>

            <RealtimeMap />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Vehicles Tracked</p>
                <p className="text-2xl font-bold text-primary">24</p>
              </Card>
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Average Speed</p>
                <p className="text-2xl font-bold text-accent">62 km/h</p>
              </Card>
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Total Distance Today</p>
                <p className="text-2xl font-bold text-green-500">1,234 km</p>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
