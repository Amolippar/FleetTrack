"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, AlertCircle, CheckCircle, X } from "lucide-react"

interface AlertCardProps {
  id: string
  type: string
  severity: "low" | "medium" | "high" | "critical"
  message: string
  vehicle?: string
  time: string
  onResolve?: () => void
  onDismiss?: () => void
}

export function AlertCard({ type, severity, message, vehicle, time, onResolve, onDismiss }: AlertCardProps) {
  const getSeverityIcon = (sev: string) => {
    switch (sev) {
      case "critical":
      case "high":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case "medium":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      default:
        return <CheckCircle className="w-5 h-5 text-blue-500" />
    }
  }

  const getSeverityBg = (sev: string) => {
    switch (sev) {
      case "critical":
      case "high":
        return "bg-red-500/10 border-red-500/30"
      case "medium":
        return "bg-yellow-500/10 border-yellow-500/30"
      default:
        return "bg-blue-500/10 border-blue-500/30"
    }
  }

  return (
    <div className={`p-4 rounded-lg border flex items-start gap-4 ${getSeverityBg(severity)}`}>
      {getSeverityIcon(severity)}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <p className="font-semibold text-foreground capitalize">{type.replace("_", " ")}</p>
            {vehicle && <p className="text-sm text-muted-foreground">{vehicle}</p>}
          </div>
          <Button variant="ghost" size="icon" className="flex-shrink-0" onClick={onDismiss}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{message}</p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{time}</p>
          {onResolve && (
            <Button variant="outline" size="sm" onClick={onResolve} className="border-border/50 bg-transparent">
              Mark Resolved
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
