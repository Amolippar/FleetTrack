"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Phone, Calendar } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import Link from "next/link"

export default function DriversPage() {
  const [drivers] = useState([
    {
      id: 1,
      name: "John Doe",
      license_number: "DL-001",
      phone: "+1-555-0101",
      license_expiry: "2025-12-31",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      license_number: "DL-002",
      phone: "+1-555-0102",
      license_expiry: "2026-06-15",
      status: "active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      license_number: "DL-003",
      phone: "+1-555-0103",
      license_expiry: "2024-09-20",
      status: "active",
    },
    {
      id: 4,
      name: "Sarah Williams",
      license_number: "DL-004",
      phone: "+1-555-0104",
      license_expiry: "2025-03-10",
      status: "active",
    },
  ])

  const isLicenseExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry < 90
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={{ email: "user@example.com" }} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Driver Management</h1>
              <Link href="/dashboard/drivers/add">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Driver
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Total Drivers</p>
                <p className="text-2xl font-bold text-primary">24</p>
              </Card>
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Active</p>
                <p className="text-2xl font-bold text-green-500">22</p>
              </Card>
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">License Expiring</p>
                <p className="text-2xl font-bold text-orange-500">2</p>
              </Card>
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Inactive</p>
                <p className="text-2xl font-bold text-red-500">0</p>
              </Card>
            </div>

            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <Input placeholder="Search drivers..." className="bg-input border-border/50" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {drivers.map((driver) => (
                    <div
                      key={driver.id}
                      className="p-4 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-foreground">{driver.name}</p>
                          <p className="text-xs text-muted-foreground">{driver.license_number}</p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            isLicenseExpiringSoon(driver.license_expiry)
                              ? "bg-orange-500/20 text-orange-700"
                              : "bg-green-500/20 text-green-700"
                          }`}
                        >
                          {driver.status}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          {driver.phone}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          Expires: {new Date(driver.license_expiry).toLocaleDateString()}
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="w-full border-border/50 bg-transparent">
                        View Profile
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
