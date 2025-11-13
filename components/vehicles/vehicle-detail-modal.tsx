"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Edit2, Trash2 } from "lucide-react"

interface VehicleDetailModalProps {
  vehicle: any
  onClose: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function VehicleDetailModal({ vehicle, onClose, onEdit, onDelete }: VehicleDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="border border-border/50 bg-card w-full max-w-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{vehicle.registration_number}</h2>
            <p className="text-muted-foreground">
              {vehicle.make} {vehicle.model}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Make & Model</p>
            <p className="font-medium text-foreground">
              {vehicle.make} {vehicle.model}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Year</p>
            <p className="font-medium text-foreground">{vehicle.year}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Vehicle Type</p>
            <p className="font-medium text-foreground capitalize">{vehicle.vehicle_type}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Fuel Type</p>
            <p className="font-medium text-foreground capitalize">{vehicle.fuel_type}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-muted-foreground mb-1">VIN</p>
            <p className="font-medium text-foreground">{vehicle.vin || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Status</p>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                vehicle.status === "active"
                  ? "bg-green-500/20 text-green-700"
                  : vehicle.status === "maintenance"
                    ? "bg-orange-500/20 text-orange-700"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {vehicle.status}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          {onEdit && (
            <Button onClick={onEdit} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button onClick={onDelete} variant="destructive" className="flex-1">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          )}
          <Button onClick={onClose} variant="outline" className="flex-1 border-border/50 bg-transparent">
            Close
          </Button>
        </div>
      </Card>
    </div>
  )
}
