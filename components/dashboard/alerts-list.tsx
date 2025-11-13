"use client"

import { Card } from "@/components/ui/card"
import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react"

export function AlertsList() {
  const alerts = [
    { id: 1, type: "speeding", vehicle: "VH-001", severity: "high", message: "Vehicle exceeding speed limit" },
    { id: 2, type: "geofence", vehicle: "VH-003", severity: "medium", message: "Geofence boundary crossed" },
    { id: 3, type: "maintenance", vehicle: "VH-005", severity: "low", message: "Maintenance due soon" },
  ]

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "medium":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-blue-500" />
    }
  }

  return (
    <Card className="border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Recent Alerts</h3>
        <p className="text-xs text-muted-foreground mb-5">System notifications and warnings</p>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border transition-all duration-200 flex items-start gap-3 group hover:bg-white/5 ${
                alert.severity === "high"
                  ? "bg-red-500/10 border-red-500/30 hover:border-red-500/50"
                  : alert.severity === "medium"
                    ? "bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500/50"
                    : "bg-blue-500/10 border-blue-500/30 hover:border-blue-500/50"
              }`}
            >
              <div className="mt-0.5">{getSeverityIcon(alert.severity)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{alert.vehicle}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
