"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, AlertTriangle, Zap } from "lucide-react"

interface DriverPerformance {
  name: string
  trips: number
  distance: number
  avgSpeed: number
  safetyScore: number
  speedingIncidents: number
  harshBraking: number
}

const driverData: DriverPerformance[] = [
  {
    name: "John Doe",
    trips: 145,
    distance: 5240,
    avgSpeed: 62,
    safetyScore: 94,
    speedingIncidents: 2,
    harshBraking: 1,
  },
  {
    name: "Jane Smith",
    trips: 132,
    distance: 4850,
    avgSpeed: 58,
    safetyScore: 96,
    speedingIncidents: 1,
    harshBraking: 0,
  },
  {
    name: "Mike Johnson",
    trips: 118,
    distance: 4320,
    avgSpeed: 65,
    safetyScore: 88,
    speedingIncidents: 5,
    harshBraking: 3,
  },
  {
    name: "Sarah Williams",
    trips: 152,
    distance: 5680,
    avgSpeed: 59,
    safetyScore: 97,
    speedingIncidents: 0,
    harshBraking: 0,
  },
]

export function DriverPerformance() {
  return (
    <Card className="border border-border/50 bg-card/50 backdrop-blur-sm p-6">
      <h3 className="font-semibold text-foreground mb-4">Driver Performance Report</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Driver</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">Trips</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">Distance (km)</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">Avg Speed</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">Safety Score</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">Incidents</th>
              <th className="text-right py-3 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {driverData.map((driver) => (
              <tr key={driver.name} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 font-medium text-foreground">{driver.name}</td>
                <td className="py-3 px-4 text-center text-muted-foreground">{driver.trips}</td>
                <td className="py-3 px-4 text-center text-muted-foreground">{driver.distance.toLocaleString()}</td>
                <td className="py-3 px-4 text-center text-muted-foreground">{driver.avgSpeed} km/h</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex-1 max-w-xs">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            driver.safetyScore >= 95
                              ? "bg-green-500"
                              : driver.safetyScore >= 90
                                ? "bg-blue-500"
                                : driver.safetyScore >= 85
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                          }`}
                          style={{ width: `${driver.safetyScore}%` }}
                        />
                      </div>
                    </div>
                    <span className="font-semibold">{driver.safetyScore}%</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {driver.speedingIncidents > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-700">
                        <AlertTriangle className="w-3 h-3" />
                        {driver.speedingIncidents}
                      </span>
                    )}
                    {driver.harshBraking > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-700">
                        <Zap className="w-3 h-3" />
                        {driver.harshBraking}
                      </span>
                    )}
                    {driver.speedingIncidents === 0 && driver.harshBraking === 0 && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-700">
                        <Award className="w-3 h-3" />
                        Clean
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="border-border/50 bg-transparent">
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
