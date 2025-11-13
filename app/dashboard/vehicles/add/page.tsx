"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { VehicleForm } from "@/components/vehicles/vehicle-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddVehiclePage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      // In a real app, this would call an API route
      console.log("Vehicle data:", data)
      // await createVehicle(data);
      router.push("/dashboard/vehicles")
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={{ email: "user@example.com" }} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/dashboard/vehicles">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-foreground">Add New Vehicle</h1>
            </div>

            <VehicleForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  )
}
