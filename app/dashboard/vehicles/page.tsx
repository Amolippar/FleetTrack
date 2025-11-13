"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, MoreVertical, Eye } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { VehicleDetailModal } from "@/components/vehicles/vehicle-detail-modal"
import Link from "next/link"

export default function VehiclesPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)
  const [vehicles] = useState([
    {
      id: 1,
      registration_number: "VH-001",
      make: "Volvo",
      model: "FH16",
      year: 2022,
      status: "active",
      vehicle_type: "truck",
      fuel_type: "diesel",
      vin: "YV2XY3D40D2009652",
    },
    {
      id: 2,
      registration_number: "VH-002",
      make: "Scania",
      model: "R450",
      year: 2021,
      status: "active",
      vehicle_type: "truck",
      fuel_type: "diesel",
      vin: "XSCR24D40H2000645",
    },
    {
      id: 3,
      registration_number: "VH-003",
      make: "Mercedes",
      model: "Actros",
      year: 2020,
      status: "idle",
      vehicle_type: "truck",
      fuel_type: "diesel",
      vin: "WDAPD55J34B123456",
    },
    {
      id: 4,
      registration_number: "VH-004",
      make: "DAF",
      model: "XF105",
      year: 2019,
      status: "maintenance",
      vehicle_type: "truck",
      fuel_type: "diesel",
      vin: "XLRPD59DZ9E123456",
    },
  ])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={{ email: "user@example.com" }} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Vehicle Management</h1>
              <Link href="/dashboard/vehicles/add">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Vehicle
                </Button>
              </Link>
            </div>

            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <Input placeholder="Search vehicles..." className="bg-input border-border/50" />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Registration</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Make & Model</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Year</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                        <th className="text-right py-3 px-4 font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles.map((vehicle) => (
                        <tr key={vehicle.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4 font-medium text-foreground">{vehicle.registration_number}</td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {vehicle.make} {vehicle.model}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{vehicle.year}</td>
                          <td className="py-3 px-4 text-muted-foreground capitalize">{vehicle.vehicle_type}</td>
                          <td className="py-3 px-4">
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
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="sm" onClick={() => setSelectedVehicle(vehicle)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>

      {selectedVehicle && <VehicleDetailModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />}
    </div>
  )
}
