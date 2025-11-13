"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { mockSignOut } from "@/lib/mock-auth"

interface HeaderProps {
  user?: any
}

export function Header({ user }: HeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await mockSignOut()
    router.push("/auth/login")
  }

  return (
    <header className="border-b border-white/10 bg-gradient-to-r from-white/5 to-white/[0.02] backdrop-blur-xl sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Fleet Dashboard</h1>
            <p className="text-xs text-muted-foreground mt-1">Real-time vehicle tracking & management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all duration-200"
            title="Notifications"
          >
            🔔
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all duration-200"
            title="Settings"
          >
            ⚙️
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground hover:bg-destructive/10 rounded-lg transition-all duration-200 text-xs"
          >
            🚪 Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
