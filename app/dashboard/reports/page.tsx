"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, BarChart3, Users, Zap, AlertTriangle } from "lucide-react"

export default function ReportsPage() {
  const reports = [
    {
      title: "Trip Report",
      description: "Detailed trip statistics and route information",
      icon: BarChart3,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Driver Performance",
      description: "Driver safety scores and incident reports",
      icon: Users,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Fuel Analysis",
      description: "Fuel consumption and efficiency metrics",
      icon: Zap,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Safety Report",
      description: "Speeding, harsh braking, and safety incidents",
      icon: AlertTriangle,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={{ email: "user@example.com" }} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Generate Reports</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reports.map((report) => {
                const Icon = report.icon
                return (
                  <Card key={report.title} className="border border-border/50 bg-card/50 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${report.bg}`}>
                        <Icon className={`w-6 h-6 ${report.color}`} />
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{report.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      PDF, CSV, Excel formats available
                    </div>
                  </Card>
                )
              })}
            </div>

            <Card className="border border-border/50 bg-card/50 p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Scheduled Reports</h2>
              <div className="space-y-3">
                <div className="p-4 rounded-lg border border-border/50 bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-foreground">Weekly Performance Report</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-700">Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Sent every Monday at 9:00 AM</p>
                </div>
                <div className="p-4 rounded-lg border border-border/50 bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-foreground">Monthly Fleet Summary</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-700">Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Sent on the 1st of each month at 8:00 AM</p>
                </div>
              </div>
              <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                Configure Scheduled Reports
              </Button>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
