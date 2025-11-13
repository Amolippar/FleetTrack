"use client"

import { Card } from "@/components/ui/card"
import { Truck, Users, AlertTriangle, TrendingUp } from "lucide-react"

export function QuickStats() {
  const stats = [
    {
      label: "Active Vehicles",
      value: "24",
      change: "+2.5%",
      icon: Truck,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Active Drivers",
      value: "18",
      change: "+1.2%",
      icon: Users,
      color: "text-teal-500",
      bg: "bg-teal-500/10",
    },
    {
      label: "Active Alerts",
      value: "3",
      change: "-0.8%",
      icon: AlertTriangle,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      label: "Total Distance",
      value: "1,234 km",
      change: "+12.3%",
      icon: TrendingUp,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.label}
            className="relative p-6 border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl overflow-hidden group hover:border-white/20 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-3">{stat.value}</p>
                <p className="text-xs font-medium text-accent mt-3">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} backdrop-blur-sm border border-white/10`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
