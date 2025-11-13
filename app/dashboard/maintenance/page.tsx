"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Calendar, DollarSign } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"

export default function MaintenancePage() {
  const [maintenance] = useState([
    {
      id: 1,
      vehicle: "VH-001",
      type: "Oil Change",
      date: "2024-01-15",
      cost: "$150",
      nextDue: "2024-04-15",
      status: "completed",
    },
    {
      id: 2,
      vehicle: "VH-002",
      type: "Tire Rotation",
      date: "2024-01-20",
      cost: "$200",
      nextDue: "2024-07-20",
      status: "completed",
    },
    {
      id: 3,
      vehicle: "VH-003",
      type: "Engine Inspection",
      date: "Scheduled",
      cost: "$300",
      nextDue: "2024-02-01",
      status: "pending",
    },
    {
      id: 4,
      vehicle: "VH-004",
      type: "Battery Replacement",
      date: "Due Soon",
      cost: "$250",
      nextDue: "2024-01-25",
      status: "urgent",
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
              <h1 className="text-3xl font-bold text-foreground">Maintenance Management</h1>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Service
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Completed This Month</p>
                <p className="text-2xl font-bold text-green-500">8</p>
              </Card>
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Pending Services</p>
                <p className="text-2xl font-bold text-yellow-500">3</p>
              </Card>
              <Card className="p-4 border border-border/50 bg-card/50">
                <p className="text-sm text-muted-foreground mb-2">Total Cost YTD</p>
                <p className="text-2xl font-bold text-blue-500">$4,250</p>
              </Card>
            </div>

            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <Input placeholder="Search maintenance records..." className="bg-input border-border/50" />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Vehicle</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Service Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Service Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Cost</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Next Due</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {maintenance.map((record) => (
                        <tr key={record.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4 font-medium text-foreground">{record.vehicle}</td>
                          <td className="py-3 px-4 text-muted-foreground">{record.type}</td>
                          <td className="py-3 px-4 text-muted-foreground flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {record.date}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            {record.cost}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{record.nextDue}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                record.status === "completed"
                                  ? "bg-green-500/20 text-green-700"
                                  : record.status === "urgent"
                                    ? "bg-red-500/20 text-red-700"
                                    : "bg-yellow-500/20 text-yellow-700"
                              }`}
                            >
                              {record.status}
                            </span>
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
    </div>
  )
}
