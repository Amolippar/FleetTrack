"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", symbol: "📊" },
  { name: "Live Map", href: "/dashboard/map", symbol: "🗺️" },
  { name: "Vehicles", href: "/dashboard/vehicles", symbol: "🚚" },
  { name: "Drivers", href: "/dashboard/drivers", symbol: "👥" },
  { name: "Routes", href: "/dashboard/routes", symbol: "📍" },
  { name: "Alerts", href: "/dashboard/alerts", symbol: "⚠️" },
  { name: "Maintenance", href: "/dashboard/maintenance", symbol: "🔧" },
  { name: "Analytics", href: "/dashboard/analytics", symbol: "📈" },
  { name: "Settings", href: "/dashboard/settings", symbol: "⚙️" },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "☰"}
      </Button>

      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-40 w-64 bg-card/95 backdrop-blur-sm border-r border-border/50 transition-transform duration-300 transform",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="p-6 pt-16 md:pt-6 space-y-8">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <span className="text-lg">🚗</span>
            </div>
            <span className="font-bold text-lg text-foreground">FleetTrack</span>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm font-medium",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                >
                  <span className="text-lg">{item.symbol}</span>
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {isOpen && <div className="fixed inset-0 z-30 bg-black/20 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
