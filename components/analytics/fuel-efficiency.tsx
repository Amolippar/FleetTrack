"use client"

import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const fuelEfficiencyData = [
  { vehicle: "VH-001", efficiency: 8.2, consumption: 1240 },
  { vehicle: "VH-002", efficiency: 7.9, consumption: 1385 },
  { vehicle: "VH-003", efficiency: 8.5, consumption: 1150 },
  { vehicle: "VH-004", efficiency: 7.6, consumption: 1520 },
]

const fuelTypeData = [
  { name: "Diesel", value: 65, color: "#3b82f6" },
  { name: "Petrol", value: 25, color: "#f59e0b" },
  { name: "Electric", value: 10, color: "#10b981" },
]

export function FuelEfficiency() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border border-border/50 bg-card/50 backdrop-blur-sm p-6">
        <h3 className="font-semibold text-foreground mb-4">Vehicle Fuel Efficiency</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={fuelEfficiencyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="vehicle" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
            <Bar dataKey="efficiency" fill="var(--primary)" name="km/L" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="border border-border/50 bg-card/50 backdrop-blur-sm p-6">
        <h3 className="font-semibold text-foreground mb-4">Fleet Fuel Composition</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={fuelTypeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {fuelTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
