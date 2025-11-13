"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface GeofenceFormProps {
  onSubmit: (data: any) => Promise<void>
  initialData?: any
  isLoading?: boolean
}

export function GeofenceForm({ onSubmit, initialData, isLoading }: GeofenceFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    latitude: initialData?.latitude || "",
    longitude: initialData?.longitude || "",
    radius_meters: initialData?.radius_meters || 500,
    fence_type: initialData?.fence_type || "inclusion",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.name || !formData.latitude || !formData.longitude) {
      setError("Please fill in all required fields")
      return
    }

    try {
      await onSubmit(formData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save geofence")
    }
  }

  return (
    <Card className="border border-border/50 bg-card/50 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">Geofence Name *</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Warehouse A"
              className="bg-input border-border/50"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Latitude *</label>
            <Input
              type="number"
              step="0.00001"
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: Number.parseFloat(e.target.value) })}
              placeholder="40.7128"
              className="bg-input border-border/50"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Longitude *</label>
            <Input
              type="number"
              step="0.00001"
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: Number.parseFloat(e.target.value) })}
              placeholder="-74.0060"
              className="bg-input border-border/50"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Radius (meters)</label>
            <Input
              type="number"
              value={formData.radius_meters}
              onChange={(e) => setFormData({ ...formData, radius_meters: Number.parseInt(e.target.value) })}
              className="bg-input border-border/50"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Fence Type</label>
            <select
              value={formData.fence_type}
              onChange={(e) => setFormData({ ...formData, fence_type: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-input border border-border/50 text-foreground disabled:opacity-50"
              disabled={isLoading}
            >
              <option value="inclusion">Inclusion (vehicles should be inside)</option>
              <option value="exclusion">Exclusion (vehicles should stay outside)</option>
            </select>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isLoading ? "Saving..." : initialData ? "Update Geofence" : "Create Geofence"}
        </Button>
      </form>
    </Card>
  )
}
